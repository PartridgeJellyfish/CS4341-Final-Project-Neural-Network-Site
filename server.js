var http = require('http')
  , fs   = require('fs')
  , url  = require('url')
  , qs = require('querystring')
  , indexPage = require('./index.js')
  , cookie = require('cookie')
  , port = 8080;

var sqlite3 = require('sqlite3');
var crypto = require('crypto');
var db = new sqlite3.Database('PUFFINFINGER.sqlite');

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

function hashPassword(password, salt) {
  var hash = crypto.createHash('sha512');
  hash.update(password);
  hash.update(salt);
  return hash.digest('hex');
}

function parseCookie(req) {
  if( !req.headers.cookie ) return {}
  var rc = req.headers.cookie
  return cookie.parse( rc )
}

function handleLoginQuery(req, res) {
    if (req.method === 'POST') {
        var body = '';
        
        req.on('data', function (data) {
            body += data;
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6) {
                // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
                req.connection.destroy();
            }
        });
        
        req.on('end', function () {
            var POST = qs.parse(body);
            var userName = POST.userName;
            var password = POST.password;
            
            db.get('SELECT username, password, email, salt FROM users WHERE username = ?', userName, function(err, row) {
                if (!row) 
                    return handleLogin(req, res, POST, false);
                return handleLogin(req, res, POST, row);
            });
        });
                   
    }
    else {
        res.end('404 not found');
    }
}

function handleLogin(req, res, post, row) {
    var hashedPass = '';
    
    if(row) { // user found
        hashedPass = hashPassword(post.password, row.salt);
        if(hashedPass == row.password) {
            // correct login
            successfulLogin(req, res, post.userName);
            return;
        }
    }
    failedLogin(req, res);
}

function successfulLogin(req, res, user) {
    res.writeHead(200, { 'Set-Cookie': ['user=' + user] }); // TODO come up with a better cookie
    res.end("Logged in", 'utf-8'); // security flaws in just setting a user= cookie, research session ids
}

function failedLogin(req, res) {
    var contentType = 'text/html';
    res.writeHead(200, {'Content-type': contentType});
    res.end('<div id="error">Failed to log in</div>' + indexPage.loginForm(), 'utf-8');
}

function handleSignupQuery(req, res) {
    if (req.method === 'POST') {
        var body = '';
        
        req.on('data', function (data) {
            body += data;
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6) {
                // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
                req.connection.destroy();
            }
        });
        
        req.on('end', function () {
            var POST = qs.parse(body);
            var userName = POST.userName;
            var password = POST.password;
            var email = POST.email;
            
            // TODO find better way to tell user without replacing the whole form
            
            // check if valid username, password and email
            if(userName.length < 3) { // must be at least 3 characters
                return failedSignup(req, res, "Invalid username");
            }
            else if(password.length < 6) { // must be at least 6 characters
                return failedSignup(req, res, "Invalid password");
            }
            else if(email.indexOf('@') == -1) { // TODO handle domain extensions
                return failedSignup(req, res, "Invalid email");
            }
            // check if user exists in db
            db.get('SELECT username FROM users WHERE username = ?', userName, function(err, row) {
                if (!row) {
                    createUser(userName, password, email);
                    return successfulLogin(req, res, userName);
                }
                return failedSignup(req, res, "User exists");
            });
        });
                   
    }
    else {
        res.end('404 not found');
    }
}

function createUser(userName, password, email) {
    var currentdate = new Date();
    var hash = crypto.createHash('sha512');
    hash.update("" + currentdate.getMilliseconds());
    var salt = hash.digest('hex');
    var sql = "INSERT INTO users VALUES ('" + userName + "', '" + hashPassword(password, salt) + "', '" + email + "', '" + salt + "')";
    db.run(sql);
}

function failedSignup(req, res, msg) {
    var contentType = 'text/html';
    res.writeHead(200, {'Content-type': contentType});
    res.end('<div id="error">' + msg + '</div>' + indexPage.signupForm(), 'utf-8');
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
    case '/login':
        handleLoginQuery(req, res);
        break;
    case '/signupform':
        sendHTML(res, indexPage.signupForm());
        break;
    case '/signup':
        handleSignupQuery(req, res);
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


