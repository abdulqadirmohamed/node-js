const express = require('express')

const app = express()
const port = 3000

// Register view engine
app.set('view engine', 'ejs');

// Get app
app.get('/', (req, res) => {
    const blogs = [
        { title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    ];
    res.render('index', { title: 'Home', blogs });
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});
app.get('/blogs/create', (req, res)=>{
    res.render('create', {title:'create blog'})
})

// Direct page
app.get('/about-us', (req, res) => {
    res.render('about')
})

// 404 Page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
})

// Listen port
app.listen(port)