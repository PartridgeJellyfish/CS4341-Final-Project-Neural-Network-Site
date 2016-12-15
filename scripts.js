/* Corey Dixon
 * 12/9/16
 * scripts.js
 */

// when the page loads
window.onload = function(e) {
    if(document.getElementById("login")) // on login page
        setupLoginPage();
}
function setupLoginPage() {
    document.getElementById("login").onclick = login;
    document.getElementById("signup").onclick = showSignup;
}

function setupSignupPage() {
    document.getElementById("signup").onclick = signup;
}


function updateContents(contents) {
    document.getElementById("content").innerHTML = contents;
}

function signupFormReady(e) {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            updateContents(httpRequest.responseText);
            setupSignupPage();
        }
    }
}

function showSignup() {
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = signupFormReady;
    httpRequest.open('GET', "signupform");
    httpRequest.send();
}

function handleSignup(e) {
     if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            updateContents(httpRequest.responseText);
            if(document.getElementById("signup")) // we failed to signup
                setupSignupPage();
        }
    }
}

function signup() {
    var userName = document.getElementById("userName").value;
    var pass = document.getElementById("password").value;
    var email = document.getElementById("email").value;
    var postData = 'userName=' + userName + '&password=' + pass + '&email=' + email;

    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = handleSignup;
    httpRequest.open('POST', "signup");
    httpRequest.send(postData);
}

function handleLogin(e) {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            updateContents(httpRequest.responseText);
            if(document.getElementById("login")) // we failed to login
                setupLoginPage();
        }
    }
}

function login() {
    var userName = document.getElementById("userName").value;
    var pass = document.getElementById("password").value;
    var postData = 'userName=' + userName + '&password=' + pass;
    
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = handleLogin;
    httpRequest.open('POST', "login");
    httpRequest.send(postData);
}