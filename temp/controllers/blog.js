import Blog from '../models/blog.js';
import express from 'express';

const blogRouter = express.Router();

blogRouter.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    console.log(JSON.stringify(blogs, null, 2));
    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).send({ error });
  }
});

blogRouter.post('/api/blogs', async (req, res) => {
  try {
    console.log(req.body);

    const blog = Blog.build(req.body);

    await blog.save();

    return res.status(200).json(blog);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

blogRouter.delete('/api/blogs/:id', async (req, res) => {
  try {
    console.log(req.params)
    const { id } = req.params;
    console.log(req.params.id)
    const blog = await Blog.destroy({ where: { id: id } });

    res.status(200).json({"message": `Blog with an ID of ${id} has been deleted successfully.`});
  } catch (error) {
    res.status(400).send({ error });
  }
});

export default blogRouter;