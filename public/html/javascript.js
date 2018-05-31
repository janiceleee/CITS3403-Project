function match() {
    if (document.getElementById("password").value !== document.getElementById("cPassword").value) {
        alert("Passwords do not match");
    }
}

function time() {
    var d = new Date().toLocaleTimeString();
    return ("The time is: " + d);
}

function lastModified() {
    return ("Last modified: " + document.lastModified);
}

function getNavigation() {
    document.getElementById("navigation").innerHTML = '<a href="home.html">Home</a><a href="login.html">Log In</a><a href="sign-up.html">Sign Up</a><a href="reference.html">References</a>';
}

function loggedInNav() {
    document.getElementById("navigation").innerHTML = '<a href="home.html">Home</a><a href="announcements.html">Announcements</a><a href="events.html">Events</a><a href="project.html">Projects</a><a href="to-do.html">To Do</a><a href="reference.html">References</a>';
}

function getLinks() {
    document.getElementById("link").innerHTML = '<br> <a href="home.html">Home</a> | <a href="login.html">Log In</a> | <a href="sign-up.html">Sign Up</a> | <a href="reference.html">References</a>';
}

function loggedInLinks() {
    document.getElementById('loggedInLink').innerHTML = '<br> <a href="home.html">Home</a> | <a href="announcements.html">Announcements</a> | <a href="events.html">Events</a> | <a href="project.html">Projects</a> | <a href="to-do.html">To Do</a> | <a href="reference.html">References</a>'
}

function getTimeStamp() {
    document.getElementById("timeStamp").innerHTML = time() + "<br>" + lastModified();
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

function addTextbox(placeholder) {
    var text = document.createElement("input");
    text.setAttribute("type", "text");
    text.setAttribute("class", "textbox");
    text.setAttribute("placeholder", placeholder);
    return text;
}

function removeLine(id) {
    var no = document.getElementById(id);
    if (no != null) {
        no.parentNode.removeChild(no);
    }
}

function getPrivacy() {
    var select = document.getElementById('privacy');
    var value = select.options[select.selectedIndex].value;

    return value;
}

function addTodo() {
    if (validate('todo', 'To Do') && validate('date', 'Date') && validateTime('date')) {
        //Add checkbox
        var checkbox = '<input type="checkbox" class="checkbox" value="Done" style="float:left">';

        //Add todo
        var add = document.getElementById('add-todo');
        var get = document.getElementById('todo').value;
        var text = document.createElement('p');
        text.innerHTML = checkbox + ' ' + get;
        add.appendChild(text);

        //Add date
        addText('date');

        emptyTextbox('todo');
        emptyTextbox('date');
    }
}

function addEvent() {
    if (validate('event', 'Event') && validateTime('time')) {
        //Add privacy
        var privacy = getPrivacy();

        //Add event
        var add = document.getElementById('event').parentNode;
        var get = document.getElementById('event').value;
        var text = document.createElement('p');
        text.innerHTML = get + ' (' + privacy + ')';
        add.appendChild(text);
        var br = document.createElement('br');
        add.appendChild(br);

        //Add time
        addText('time');

        //empty textbox after event is added
        emptyTextbox('event');
        emptyTextbox('time');
    }

}

//add extra textbox for members and tasks in project page
function addExtra(placeholder, element) {
    var add = addTextbox(placeholder);
    add.setAttribute("style", "width:85%");
    add.setAttribute("name", placeholder);

    document.getElementById(element).appendChild(add);
}

function createProject(element, id) {
    var project = document.createElement(element);
    var value = document.getElementById(id).value;
    project.innerHTML = value;
    
    return project;
}

//create div element for task and priorities
function createDiv(parent) {
    var child = document.createElement('div');
    child.setAttribute('class', 'column-middle');
    child.setAttribute('style', 'width:35%');

    var name = document.createElement('h4');
    child.appendChild(name);

    parent.appendChild(child);
    return child;
}

function createPriority() {
    var priorityNum = document.getElementsByName('Task').length;
    var i;
    var priority = '<select>';
    for (i = 1; i < priorityNum + 2; i++) {
        priority += '<option value=' + i + '>' + i + '</option>';
    }
    priority += '</select>';
    return priority;
}

function getProject() {
    if (validate('project-name', 'Project name') && validate('member', 'Leader name') && validate('task', 'Task')) {
        //remove no project line
        removeLine('no-project');

        var div = document.createElement('div');
        document.getElementById('current-project').appendChild(div);

        //Project Name
        var project = createProject('h3', 'project-name');
        emptyTextbox("project-name");
        div.appendChild(project);

        //Privacy
        var privacy = getPrivacy();

        //Team Members
        var members = document.createElement('p');
        var memberValue = '';
        var member = document.getElementsByName('Team Member');
        var j;
        for (j = 0; j < member.length; j++) {
            memberValue += ', ' + member[j].value;
        }
        members.innerHTML = document.getElementById('member').value + memberValue + ' (' + privacy + ')';
        div.appendChild(members);
        emptyTextbox('member');
        while (member.length !== 0) {
            member[0].parentNode.removeChild(member[0]);
        }

        //Task and Priority
        var tasks = createDiv(div);
        var priorities = createDiv(div);
        var row = document.createElement('div');
        row.setAttribute('class', 'row');
        div.appendChild(row);

        var task = document.getElementsByName('Task');
        var i;
        var taskValue = '<h2>Tasks: </h2> <p>' +  document.getElementById('task').value + '<br>';
        var priority = '<h2> Priority: </h2>' + createPriority() + '<br>';
        for (i = 0; i<task.length; i++) {
            taskValue += task[i].value + '<br>';
            priority += createPriority() + '<br>';
        }
        
        tasks.innerHTML = taskValue + '</p>';
        priorities.innerHTML = priority;
        emptyTextbox('task');
        while (task.length != 0) {
            task[0].parentNode.removeChild(task[0]);
        }

        var line = document.createElement('hr');
        div.appendChild(line);

    }
}

function addAnnouncement() {
    if (validate('title', 'Title') && validate('content', 'Announcement')) {
        //remove no announcement line
        removeLine('no-announcement');

        //announcement
        var box = document.createElement('div');
        box.setAttribute('id', 'announcement');
        document.getElementById('announcements').appendChild(box);

        //get announcement and title
        var title = document.getElementById('title').value;
        var content = document.getElementById('content').value;

        //title
        var titleNode = document.createElement('h2');
        titleNode.setAttribute('id', 'aTitle');
        box.appendChild(titleNode);

        //announcement date
        var d = new Date();
        var date = d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear();

        //announcement
        var contentNode = document.createElement('p');
        contentNode.setAttribute('id', 'aContent');
        box.appendChild(contentNode);

        titleNode.innerHTML = title + ' (' + date + ')';
        contentNode.innerHTML = content;

        var hr = document.createElement('hr');
        document.getElementById('announcements').appendChild(hr);

        //empty textbox
        emptyTextbox('title');
        emptyTextbox('content');
    }
}

function fun(){
    var st = document.getElementById('content').innerHTML; 
    return st.replace('team', 'lol');
}