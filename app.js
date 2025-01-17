const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();

let posts = []; // In-memory storage for posts

// Middleware
app.set('view engine', 'ejs'); // Set EJS as templating engine
app.use(express.static('public')); // Serve static files (CSS)
app.use(bodyParser.urlencoded({ extended: true })); // Parse form data
app.use(methodOverride('_method')); // For PUT and DELETE methods in forms

// Routes
app.get('/', (req, res) => {
    res.render('home', { posts });
});

app.get('/posts/new', (req, res) => {
    res.render('create');
});

app.post('/posts', (req, res) => {
    const { title, content } = req.body;
    posts.push({ id: Date.now(), title, content });
    res.redirect('/');
});

app.get('/posts/:id/edit', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    res.render('edit', { post });
});

app.put('/posts/:id', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    post.title = req.body.title;
    post.content = req.body.content;
    res.redirect('/');
});

app.delete('/posts/:id', (req, res) => {
    posts = posts.filter(p => p.id != req.params.id);
    res.redirect('/');
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
