/*
 name: contact data modal
 purpose: show contact data in a modal
 version: 1.0
 author: Tarun Chauhan
 date: 3/12/2018
*/
window.onload = function () {
    //variables
    var form = document.getElementById("contactform");
    var name = document.getElementById("name");
    var email = document.getElementById("email");
    var subject = document.getElementById("subject");
    var message = document.getElementById("messagedata");
    var btn = document.getElementById("contactbtn");
    var list = document.getElementById("contactdatalist");
    var btnClr = document.getElementById("btnClr");


    //     <li class="list-group-item justify-content-between">
    //     <span class="badge badge-primary badge-pill">14</span>
    //       Hiiiiii                        
    //   </li>

    var id = 1;
    // listItem = {item: "todo item", checked: flase}
    var liItem = "";
    var List = [];

    //button event listener
    btn.addEventListener("click", addItem);

    btnClr.addEventListener("click", clearList);

    //checking localstorage has data
    if (localStorage.length > 0) {
        displayList();
    }

    //add todo item to list
    function addItem() {
        if (name.value === "" || email.value === "" || subject.value === "" || message.value === "") {
            alert("Fields can't be empty!");
        }
        else {
            var nametext = name.value;
            var emailtext = email.value;
            var subjecttext = subject.value;
            var msgtext = message.value;


            var item = `<li id="li-${id}" class="list-group-item justify-content-between">
            <span class="badge badge-primary badge-pill">${nametext}</span>
            <span class="badge badge-primary badge-pill">${emailtext}</span>
            <span class="badge badge-primary badge-pill">${subjecttext}</span>
            <span class="badge badge-primary badge-pill">${msgtext}</span></li>`;
            list.insertAdjacentHTML('beforeend', item);
            liItem = { name: nametext, email: emailtext, subject: subjecttext, msg: msgtext };
            List.push(liItem);
            id++;
            addToLocalStorage()
            form.reset();
        }
    }

    //adding data to local storage
    function addToLocalStorage() {
        if (typeof (Storage) !== "undefined") {
            localStorage.setItem("List", JSON.stringify(List));
        }
        else {
            alert("browser doesn't support local storage!");
        }
    }

    //display all todo list
    function displayList() {
        List = JSON.parse(localStorage.getItem("List"));
        List.forEach(function (element) {
            console.log(element.item);
            var nametext = element.name;
            var emailtext = element.email;
            var subjecttext = element.subject;
            var msgtext = element.msg;

            var item = `<li id="li-${id}" class="list-group-item justify-content-between">
            <span class="badge badge-primary badge-pill">${nametext}</span>
            <span class="badge badge-primary badge-pill">${emailtext}</span>
            <span class="badge badge-primary badge-pill">${subjecttext}</span>
            <span class="badge badge-primary badge-pill">${msgtext}</span></li>`;
            list.insertAdjacentHTML("beforeend", item);
            id++;
        });
    }

    function clearList() {
        List = [];
        localStorage.clear();
        list.innerHTML = "";
    }
}