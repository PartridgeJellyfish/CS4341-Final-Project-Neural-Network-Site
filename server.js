var http = require('http')
  , fs   = require('fs')
  , url  = require('url')
  , qs = require('querystring')
  , indexPage = require('./index.js')
  , cookie = require('cookie')
  , port = 8080;

var sqlite3 = require('sqlite3');
var crypto = require('crypto');

// subroutines

function sendFile(res, filename, contentType) {
    contentType = contentType || 'text/html';

    fs.readFile(filename, function (error, content) {
        res.writeHead(200, {'Content-type': contentType});
        res.end(content, 'utf-8');
    });

}

function sendIndex(res) {
    var contentType = 'text/html', html = '';
    
    html += indexPage.index(indexPage.loginForm());
    
    res.writeHead(200, {'Content-type': contentType});
    res.end(html, 'utf-8');
}

function sendHTML(res, html) {
    var contentType = 'text/html';
    res.writeHead(200, {'Content-type': contentType});
    res.end(html, 'utf-8');
}


// server
var server = http.createServer (function (req, res) {
    var uri = url.parse(req.url)

    switch( uri.pathname ) {
    case '/':
        sendIndex(res);
        break
    case '/index.html':
        sendIndex(res);
        break
    case '/style.css':
        sendFile(res, 'style.css', 'text/css');
        break;
    case '/scripts.js':
        sendFile(res, 'scripts.js', 'text/javascript');
        break;
    case '/loginform':
        sendHTML(res, indexPage.loginForm());
        break;
    case '/signupform':
        sendHTML(res, indexPage.signupForm());
        break;
    case '/README.md':
        sendFile(res, 'readme.txt', 'text/plain');
        break;
    default:
        res.end('404 not found')
    }
});

server.listen(process.env.PORT || port);
console.log('listening on 8080');


