const { PORT } = require('./util/config.js');
const { connectToDatabase } = require('./util/db.js');

const app = require('./app');


const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  })
};

start()