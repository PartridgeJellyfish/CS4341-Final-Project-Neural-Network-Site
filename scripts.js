/* Corey Dixon
 * 12/9/16
 * scripts.js
 */

// when the page loads
window.onload = function(e) {
    document.getElementById("login").onclick = login;
    document.getElementById("signup").onclick = showSignup;
}

function updateContents(contents) {
    document.getElementById("content").innerHTML = contents;
}

function signupFormReady(e) {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            updateContents(httpRequest.responseText);
            document.getElementById("signup").onclick = signup;
        }
    }
}

function showSignup() {
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = signupFormReady;
    httpRequest.open('GET', "signupform");
    httpRequest.send();
}

function signup() {
    console.log("Signup");
}

function login() {
    console.log("Login");
}