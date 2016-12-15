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
    document.getElementById("loginButton").onclick = login;
    document.getElementById("signupButton").onclick = signup;
}

function updateContents(contents) {
    document.body.innerHTML = contents;
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
    var userName = document.getElementById("signupUserName").value;
    var pass = document.getElementById("signupPassword").value;
    var email = document.getElementById("signupEmail").value;
    var postData = 'userName=' + userName + '&password=' + pass + '&email=' + email;

    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = handleSignup;
    httpRequest.open('POST', "signup");
    httpRequest.send(postData);
}

function handleNewNet() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            updateContents(httpRequest.responseText);
            // TODO do what now
        }
    }
}

function newNetwork() {
    var netName = "";
    while(netName == "") {
        netName = window.prompt("Enter a name for the network", "");
    }
    var postData = 'netName=' + netName;

    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = handleNewNet;
    httpRequest.open('POST', "newNet");
    httpRequest.send(postData);
}


function handleLogin(e) {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            updateContents(httpRequest.responseText);
            if(document.getElementById("login")) // we failed to login
                setupLoginPage();
            else {
                attachEditEventHandler();
                attachExportEventHandler();
                attachRemoveEventHandler();
                document.getElementById("newNetworkButton").onclick = newNetwork;
            }
        }
    }
}

function login() {
    var userName = document.getElementById("loginUserName").value;
    var pass = document.getElementById("loginPassword").value;
    var postData = 'userName=' + userName + '&password=' + pass;
    
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = handleLogin;
    httpRequest.open('POST', "login");
    httpRequest.send(postData);
}


// edit

function attachEditEventHandler() {
   var editButtons = document.getElementsByClassName("glyphicon-edit");
    for(var i = 0; i < editButtons.length; i++)
        editButtons[i].onclick = buttonEditClicked;
}

function buttonEditClicked(e) {
    networkName = e.currentTarget.parentElement.parentElement.firstElementChild.innerText;
    var postData = 'networkName=' + networkName;
    console.log("clicked " + networkName);
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = handleEdit;
    httpRequest.open('POST', "edit");
    httpRequest.send(postData); 
}

function handleEdit(e) {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            updateContents(httpRequest.responseText);

        }
    }
}


// remove

function attachRemoveEventHandler() {
   var removeButtons = document.getElementsByClassName("glyphicon-remove");
    for(var i = 0; i < removeButtons.length; i++)
        removeButtons[i].onclick = buttonRemoveClicked;
}

function buttonRemoveClicked(e) {
    networkName = e.currentTarget.parentElement.parentElement.firstElementChild.innerText;
    var postData = 'networkName=' + networkName;

    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = handleRemove;
    httpRequest.open('POST', "remove");
    httpRequest.send(postData); 
}

function handleRemove(e) {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            updateContents(httpRequest.responseText);

        }
    }
}


// saved
/*
function attachSaveEventHandler() {
   var list = document.getElementsByClassName("glyphicon-floppy-saved");
    for(int i = 0; i < list.length; i++)
        list[0].onclick = buttonSaveClicked;
}

function buttonSaveClicked(e) {
    networkName = e.currentTarget.parentElement.parentElement.firstChild.innerText;
    var postData = 'networkName=' + networkName;

    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = handleSave;
    httpRequest.open('POST', "save");
    httpRequest.send(postData); 
}

function handleSave(e) {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            updateContents(httpRequest.responseText);

        }
    }
}
*/

// export

function attachExportEventHandler() {
   var exportButtons = document.getElementsByClassName("glyphicon-floppy-saved");
    for(var i = 0; i < exportButtons.length; i++)
        exportButtons[i].onclick = buttonExportClicked;
}

function buttonExportClicked(e) {
    networkName = e.currentTarget.parentElement.parentElement.firstElementChild.innerText;
    var postData = 'networkName=' + networkName;

    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = handleExport;
    httpRequest.open('POST', "export");
    httpRequest.send(postData); 
}

function handleExport(e) {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            updateContents(httpRequest.responseText);

        }
    }
}