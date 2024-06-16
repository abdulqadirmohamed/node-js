const http = require('http')
const fs = require('fs')
const _ = require('lodash')

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    // const num = _.random(0, 20)
    // console.log(num)

    const great = _.once(() => {
        console.log('hello')
    })
    great()
    great()

    res.statusCode = 200;
    res.setHeader('Content-Type', 'html');

    let path = './views/';
    switch (req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            break;
        default:
            path += '404.html';
            break;
    }
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end()
        } else {
            res.write(data);
            res.end()
        }
    })
});

server.listen(3000, hostname, () => {
    console.log('Listing request on port 3000')
})