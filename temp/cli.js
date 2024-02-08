import dotenv from 'dotenv';
dotenv.config();
import { Sequelize, QueryTypes, Model, DataTypes } from 'sequelize';

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
    // console.log('Executing (default): SELECT * FROM blogs')
    // const blogs = JSON.stringify(await Blog.findAll(), null, 2)
    const blogs = await sequelize.query('SELECT * FROM blogs', {
      type: QueryTypes.SELECT,
    });

    const print = (i) => console.log(i);
    for (let i = 0; i < blogs.length; i++) {
      console.log(`${blogs[i].author}: ${blogs[i].title}, ${blogs[i].likes} likes`)
    }

    // const blogs = await sequelize.query('SELECT * FROM blogs', {
    //   type: QueryTypes.SELECT,
    // });

    // console.log(blogs);

    sequelize.close();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

main();
