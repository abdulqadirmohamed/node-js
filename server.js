const http = require('http')
const fs = require('fs')

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'html');

    fs.readFile('./views/index.html', (err, data) => {
        if (err) {
            console.log(err);
            res.end()
        } else {
            res.write(data);
            res.end()
        }
    })
});

server.listen(port, hostname, () => {
    console.log('Listing request on port 3000')
})