function match() {
    if (document.getElementById("password").value !== document.getElementById("cPassword").value) {
        alert("Passwords do not match");
    }
}


function getNavigation() {
    document.getElementById("navigation").innerHTML = '<a href="/">Home</a><a href="/login">Log In</a><a href="/register">Register</a><a href="/reference">References</a>';
}

function loggedInNav() {
    document.getElementById("navigation").innerHTML = '<a href="/index/account">Account</a><a href="/index/announcement">Announcements</a><a href="/index/project">Projects</a><a href="/index/todo">To Do</a><a href="/reference">References</a><a href="/">Log Out</a>';
}

function getLinks() {
    document.getElementById("link").innerHTML = '<br> <a href="/">Home</a> | <a href="/login">Log In</a> | <a href="/register">Register</a> | <a href="/reference">References</a>';
}

function loggedInLinks() {
    document.getElementById('link').innerHTML = '<br> <a href="/index/account">Account</a> | <a href="/index/announcement">Announcements</a> | <a href="/index/project">Projects</a> | <a href="/index/todo">To Do</a> | <a href="/reference">References</a>';
}

function getTimeStamp() {
    document.getElementById("timeStamp").innerHTML =  "Last modified: " + document.lastModified;
}

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    var t = setTimeout(startTime, 500);
    document.getElementById('clock').innerHTML =
    "The time is: " + h + ":" + m + ":" + s;
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function emptyTextbox(id) {
    document.getElementById(id).value = '';
}

function validate(id, name) {
    if (document.getElementById(id).value === '') {
        alert(name + ' required');
        document.getElementById(id).focus();
        return false;
    }
    return true;
}

function isIE(){
    // Internet Explorer 6-11
    var isIE = false || !!document.documentMode;
    return isIE;
}

//add placeholder for input=time if browser is Internet Explorer
function addPlaceholder(format) {
    if (isIE){
        var input = document.getElementById(format);

        if (format === 'date') {
            input.setAttribute('placeholder', 'dd/mm/yyyy');
        } 
        else if (format === 'time') {
            input.setAttribute('placeholder', 'HH:mm');
        }

    }
}

//Internet Explorer doesn't support time input 
function validateTime(format){
    if (isIE()){
        var input = document.getElementById(format);

        if (format === 'date') {
            var regex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
        }
        else if (format === 'time') {
            var regex = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/;
        }

        var valid = regex.test(input.value);
        if (!valid) {
            alert('Invalid format');
            document.getElementById(format).focus();
            return valid;
        }
        return valid;
    }
    return !isIE();
}

function addText(value) {
    var add = document.getElementById(value).parentNode;
    var get = document.getElementById(value).value;
    var text = document.createElement('p');
    text.innerHTML = get;
    add.appendChild(text);
    var br = document.createElement('br');
    add.appendChild(br);
}

function addTextbox(id, placeholder) {
    var text = document.createElement("input");
    text.setAttribute("type", "text");
    text.setAttribute("class", "textbox");
    text.setAttribute("placeholder", placeholder);
    text.setAttribute('name', id);
    
    document.getElementById(id).appendChild(text);
}

function removeButton(id) {
    var button = document.getElementById(id);
    button.parentNode.removeChild(button);
}