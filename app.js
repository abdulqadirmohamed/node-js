const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const { result } = require('lodash')
const Blog = require('./models/blog')
const moment = require('moment')

const multer = require('multer');
const path = require('path');


const app = express()
const port = 3000

// database connection
const dbUrl = 'mongodb+srv://cajiibxaaji02:T3oCB1oD6kF439nW@cluster0.7qh5e7x.mongodb.net/ninja-blog'
mongoose.connect(dbUrl)
    .then((result) => app.listen(port))
    .catch((err) => console.log(err))

// Set up EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// middleware and static files
app.use(express.static('public')) //public - folder name
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Mongoose and Mongo sandbox routes
app.post('/blogs', upload.single("image"), (req, res) => {
    // const blog = new Blog(req.body);
    const { title, snippet, description } = req.body;
    const { filename, mimetype } = req.file;
    const imageBase64 = req.file.path;

    const blog = new Blog({
        title, snippet, description,
        image: {
            filename,
            contentType: mimetype,
            imageBase64
        }
    })
    blog.save()
        .then(result => {
            res.redirect('/blogs');
        })
        .catch(err => {
            console.log(err);
        });
})
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'create blog' })
})

app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => { console.log(err) })
})
// Fetching single blog
app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render('details', { blog: result, title: 'blog details' })
        })
})

// Delete 
app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: '/blogs' })
        }).catch((err) => { console.log(err) })
})
// Get app
app.get('/', (req, res) => {
    res.redirect('/blogs')
})
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'blogs', blogs: result, moment: moment })
        })
        .catch((err) => {
            console.log(err)
        })
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// Direct page
app.get('/about-us', (req, res) => {
    res.render('about')
})

// 404 Page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
})