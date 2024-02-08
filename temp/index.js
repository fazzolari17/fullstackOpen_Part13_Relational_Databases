import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';
import express, { json } from 'express';
import blogRouter from './controllers/blog.js';
const app = express();

app.use(json());
app.use(blogRouter)

// const sequelize = new Sequelize(process.env.DATABASE_URL);

app.get('/api/health', (req, res) => {
  res.status(200).send({ status: 200, health: 'ok' })
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})

