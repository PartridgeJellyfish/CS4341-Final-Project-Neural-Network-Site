/* Corey Dixon
 * 12/9/16
 * index.js
 * Page Template code
 */

var indexHead = function () {
    var html = '<head> \
    <meta charset="utf-8"> \
    <meta name="viewport" content="width=device-width, initial-scale=1"> \
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css"> \
    <link rel="stylesheet" type="text/css" href="style.css"> \
    <script type="text/javascript" src="scripts.js"></script>\
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script> \
    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script> \
    </head>';
    return html;
};

var indexBody = function (content) {
    var html ='\t<body>\n';
    html += '\t\t<div id="container">\n\t\t\t';
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

var frontPage = function() {
    var html = '    <h3>Neural Network Builder</h3>\
    <button type="button" class="btn oc" data-toggle="modal" data-target="#login">Login</button>\
    <div class="modal fade" id="login">\
        <div class="modal-dialog">\
            <div class="modal-content">\
                <div class="modal-header">\
                    <button type="button" class="close" data-dismiss="modal">&times;</button>\
                    <h3 class="modal-title">Log In</h3>\
                </div>\
                <div class="modal-body">\
                    <form role="form">\
                        <div class="form-group">\
                            <input id="loginUserName" type="email" class="form-control" placeholder="Username">\
                        </div>\
                        <div class="form-group">\
                            <input id="loginPassword" type="password" class="form-control" placeholder="Password">\
                        </div>\
                    </form>\
                </div>\
                <div class="modal-footer">\
                    <button id="loginButton" class="btn btn-primary btn-block">Submit</button>\
                </div>\
            </div>\
        </div>\
    </div>\
  <button type="button" class="btn oc" data-toggle="modal" data-target="#signUp">Sign Up</button>\
    <div class="modal fade" id="signUp">\
        <div class="modal-dialog">\
            <div class="modal-content">\
                <div class="modal-header">\
                    <button type="button" class="close" data-dismiss="modal">&times;</button>\
                    <h3 class="modal-title">Sign Up</h3>\
                </div>\
                <div class="modal-body">\
                    <form role="form">\
                        <div class="form-group">\
                            <input id="signupEmail" type="email" class="form-control" placeholder="Email">\
                        </div>\
                        <div class="form-group">\
                            <input id="signupUserName" type="username" class="form-control" placeholder="Username">\
                        </div>\
                        <div class="form-group">\
                            <input id="signupPassword" type="password" class="form-control" placeholder="Password">\
                        </div>\
                    </form>\
                </div>\
                <div class="modal-footer">\
                    <button id="signupButton" class="btn btn-primary btn-block">Submit</button>\
                </div>\
            </div>\
        </div>\
    </div>';
    return html;
}

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

var generateTable = function(names) {
    var html = '<div class="container">\
          <h2>Neural Networks</h2>\
          <table class="table table-striped">\
              <thead>\
              <tr>\
                  <th class="col-md-9 col-sm-9 col-xs-9">Name</th>\
                  <th class="col-md-1 col-sm-1 col xs-1">Edit</th>\
                  <th class="col-md-1 col-sm-1 col xs-1">Delete</th>\
                  <th class="col-md-1 col-sm-1 col xs-1">Export</th>\
              </tr>\
              </thead>\
              <tbody>';
    // names is an array of strings

    for (var i = 0; i < names.length; i++) {
        html +=  '<tr>\
                  <td>' + names[i] + '</td>\
                  <td><span class="glyphicon glyphicon-edit"></span></td>\
                  <td><span class="glyphicon glyphicon-remove"></span></td>\
                  <td><span class="glyphicon glyphicon-floppy-saved"></span></td>\
              </tr>';
    };
    html += '</tbody>\
          </table>\
      </div>';
    return html;
}

module.exports = {
    head : indexHead,
    body : indexBody,
    index : index,
    frontPage : frontPage,
    generateTable : generateTable,
    loginForm : loginForm,
    signupForm : signupForm
};