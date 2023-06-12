require('dotenv').config();
const { Sequelize, Model, QueryTypes, DataTypes, DATE } = require('sequelize');
const express = require('express');
const app = express();

app.use(express.json());

const sequelize = new Sequelize(process.env.DATABASE_URL);

class Blog extends Model { }

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
      defaultValue: 0
    }
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog',
  }
);

app.get('/api/health', (req, res) => {
  res.status(200).send({ status: 200, health: 'ok' })
})

app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    console.log(JSON.stringify(blogs, null, 2));
    res.status(200).json(blogs);
    
  } catch (error) {
    res.status(400).send({ error });
  }
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})

app.post('/api/blogs', async (req, res) => {
  try {
    console.log(req.body);
  
    const blog = Blog.build(req.body);

    await blog.save();
  
    return res.status(200).json(blog);
    
  } catch (error) {
    return res.status(400).json({ error })
  }
})

app.delete('/api/blogs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.destroy(
      { where: { id: id } }
    );

    res.status(200).send(blog);
    
  } catch (error) {
    console.log(error)
    // res.status(400).send({ error })
  }
})

// const main = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');

//     const blogs = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT });
//     console.log(blogs);

//     sequelize.close();
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// };

// main();
