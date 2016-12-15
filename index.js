/* Corey Dixon
 * 12/9/16
 * index.js
 * Page Template code
 */

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
}

var generateTable = function(content) {
    var html = '<table>';
    html += content;
    html += '</table>';
    return html;
}

var generateTableElement = function(nameOfNeuralNetwork) {
    var html = '<table>';
    html += '<tr>';
    html += '<td>';
    html +=  nameOfNeuralNetwork;
    html += '</td>';
    html += '<td>';
    html += '<button onclick="delete()">Delete</button>';
    html += '</td>';
    html += '<td>';
    html += '<button onclick="edit()">Edit</button>';
    html += '</td>';
    html += '<td>';
    html += '<button onclick="export()">Export</button>';
    html += '</td>';
    html += '</tr>';
    html += '</table>';
    return html;
}


module.exports = {
    head : indexHead,
    body : indexBody,
    index : index,
    loginForm : loginForm,
    signupForm : signupForm
};