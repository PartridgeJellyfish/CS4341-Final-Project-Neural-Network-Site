/* Corey Dixon
 * 12/9/16
 * index.js
 * Page Template code
 */

var fs = require('fs');

var indexHead = function () {
    var html = '\t<head>\n';
    html += '\t<title>Neural Network Builder</title>';
    html += '\t\t<link rel="stylesheet" type="text/css" href="style.css"/>\n';
    html += '\t\t<script type="text/javascript" src="scripts.js"></script>\n';
    html += '\t</head>';
    return html;
};

var indexBody = function (content) {
    var html ='\t<body>\n';
    html += '\t\t<div id="content">\n\t\t\t';
    html += content;
    html +=  '\n\t\t</div>\n';
    html +=  '\t</body>\n';
    return html;
};

var index = function (content) {
    var html =  '<html>\n';
    html += indexHead();
    html += indexBody(content);

    html +=  '</html>\n';
    return html;
};

var loginForm = function() {
    var html = '<form action="submit" method="post" onsubmit="return false;">';
    html += '<label for="userName">Username: </label>'
    html += '<input id="userName" name="userName" type="text">';
    html += '<label for="userName">Password: </label>'
    html += '<input id="password" name="password" type="password">';
    html += '<button id="login" name="login" type="submit">Login</button>';
    html += '</form>';
    html += '<button id="signup" name="signup">Signup</button>';
    return html;
};

var signupForm = function() {
    var html = '<form action="submit" method="post" onsubmit="return false;">';
    html += '<label for="userName">Username: </label>'
    html += '<input id="userName" name="userName" type="text">';
    html += '<label for="userName">Password: </label>'
    html += '<input id="password" name="password" type="password">';
    html += '<label for="email">Email: </label>'
    html += '<input id="email" name="email" type="text">';
    html += '<button id="signup" name="signup" type="submit">Signup</button>';
    html += '</form>';
    return html;
};

var setUpCanvas = function(){
  var html = '';
  html += '<canvas id="canvas">' + '\n';
  html += 'Your browser does not support the HTML5 canvas tag.</canvas>' + '\n';
  html += '<script>'  + '\n'
  html += 'var canvas = document.getElementById("canvas");' + '\n'
  html += 'var context = canvas.getContext("2d");' + '\n'
  html += '// resize the canvas to fill browser window dynamically' + '\n'
  html += 'window.addEventListener("resize", resizeCanvas, false);' + '\n'
  html += 'function resizeCanvas() {' + '\n'
  html += ' canvas.width = window.innerWidth;' + '\n'
  html += ' canvas.height = window.innerHeight;' + '\n'
  html += ' /**' + '\n'
  html += ' * Your drawings need to be inside this function otherwise they will be reset when ' + '\n'
  html += ' * you resize the browser window and the canvas goes will be cleared.' + '\n'
  html += ' */' + '\n'
  html += ' drawStuff(); ' + '\n'
  html += '}' + '\n'
  html += 'resizeCanvas();' + '\n'
  html += 'function drawStuff() {' + '\n'
  html += ' // do your drawing stuff here' + '\n'
  html += ' context.moveTo(0,0);' + '\n'
  html += ' context.lineTo(window.innerWidth, window.innerHeight);' + '\n'
  html += ' context.stroke();' + '\n'
  html += '}' + '\n'
  html += '</script>' + '\n'
  return html;
};

var setUpSVG = function(){
	var html = fs.readFileSync("builder.html", "utf-8");
	return html;
};

console.log(setUpSVG());

module.exports = {
    head : indexHead,
    body : indexBody,
    index : index,
    loginForm : loginForm,
    signupForm : signupForm,
    setUpCanvas : setUpCanvas,
		setUpSVG : setUpSVG
};
