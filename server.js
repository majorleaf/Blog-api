const express = require('express');
const db = require('./inventory/db.js'); 
const app = express();

// Middleware to parse incoming JSON bodies
app.use(express.json());


const validatePost = (req, res, next) => {
  const { title, content } = req.body;
  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'Valid title is required' });
  }
  if (!content || typeof content !== 'string') {
    return res.status(400).json({ error: 'Valid content is required' });
  }
 next()
};


// READ ALL: Get a list of articles
app.get('/posts', (req, res) => {
  const { tag } = req.query;
  const posts = db.getAll();
  
  if (tag) {
    const filteredPosts = posts.filter(p => p.tags && p.tags.includes(tag));
    return res.json(filteredPosts);
  }
  
  res.json(posts);
});


app.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  const post = db.getById(id);
  
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  
  res.json(post);
});


app.post('/posts', validatePost, (req, res) => {
  const { title, content, tags } = req.body;
  const newPost = db.add(title, content, tags);
  
  res.status(201).json(newPost);
});

app.put('/posts/:id', validatePost, (req, res) => {
  const { id } = req.params;
  const { title, content, tags } = req.body;
  
  const updatedPost = db.update(id, title, content, tags);
  
  if (!updatedPost) {
    return res.status(404).json({ error: 'Post not found' });
  }
  
  res.json(updatedPost);
});

// DELETE: Remove an article
app.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  const success = db.delete(id);
  
  if (!success) {
    return res.status(404).json({ error: 'Post not found' });
  }
  
  res.status(200).json({ message: `Post ${id} successfully deleted` });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});