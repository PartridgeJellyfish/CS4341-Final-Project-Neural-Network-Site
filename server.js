var http = require('http')
  , fs   = require('fs')
  , url  = require('url')
  , indexPage = require('./index.js')
  , port = 8080;


function sendIndex(res) {
    var contentType = 'text/html', html = '';
    
    html += indexPage.index(indexPage.loginForm());
    
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
    default:
      res.end('404 not found')
  }
})

server.listen(process.env.PORT || port);
console.log('listening on 8080')

// subroutines

function sendFile(res, filename) {

  fs.readFile(filename, function(error, content) {
    res.writeHead(200, {'Content-type': 'text/html'})
    res.end(content, 'utf-8')
  })

}
