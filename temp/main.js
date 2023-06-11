require('dotenv').config();
const { Sequelize, QueryTypes, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL_MAIN);

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.NUMBER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog',
  }
);

const main = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    // await blogs.sync()
    const blogs = await sequelize.query('SELECT * FROM blogs', {
      type: QueryTypes.SELECT,
    });

    console.log(blogs);

    sequelize.close();

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

main();
