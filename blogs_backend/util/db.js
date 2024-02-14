const { Sequelize } = require('sequelize');
const { DOCKER_DATABASE_URL } = require('./config.js');
const { Umzug, SequelizeStorage } = require('umzug');

const sequelize = new Sequelize(DOCKER_DATABASE_URL);

const runMigrations = async () => {
  const migrator = new Umzug({
    migrations: {
      glob: 'migrations/*.js',
    },
    storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
    context: sequelize.getQueryInterface(),
    logger: console,
  });

  const migrations = await migrator.up();
  
  console.log('Migrations are up to date', {
    files: migrations.map(mig => mig.name),
  });
}


const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    const migrationsTableExists = await sequelize
      .getQueryInterface()
      .showAllTables()
      .then((tables) => tables.includes('migrations'));
    
    if (!migrationsTableExists) {
      await runMigrations()
    }
    console.log('Connected to the database.')
  } catch (error) {
    console.log('DB CONNECTION ERROR: ', error)
    console.log('Failed to connect to the database.')
    return process.exit(1)
  }

  return null
}

module.exports = {
  connectToDatabase,
  sequelize
}