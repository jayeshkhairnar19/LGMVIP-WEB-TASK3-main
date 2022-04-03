showStudents();
let addStd = document.getElementById('addStd');
let msgBox = document.getElementById('msgBox');

addStd.addEventListener("click", function (e) {

    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let website = document.getElementById('website');
    let gender;
    let skills;

    let maleRadio = document.getElementById('maleRadio');
    let femaleRadio = document.getElementById('femaleRadio');

    let html = document.getElementById('html');
    let css = document.getElementById('css');
    let js = document.getElementById('js');
    
    if (maleRadio.checked) {
        gender = maleRadio.value;
    }
    else if (femaleRadio.checked) {
        gender =femaleRadio.value;
    }

    if (html.checked && css.checked && js.checked)  {
        skills = html.value + " " + css.value + " " + js.value;
    }
    else if (html.checked && css.checked) {
        skills = html.value + " " + css.value;
    }
    else if (html.checked && js.checked) {
        skills = html.value + " " + js.value;
    }
    else if (css.checked && js.checked) {
        skills = css.value + " " + js.value;
    }
    else if (html.checked) {
        skills = html.value;
    }
    else if (css.checked) {
        skills =css.value;
    }
    else if (js.checked) {
        skills = js.value;
    }
    else{
        skills = "No skills";
    }

    let student = localStorage.getItem("student");

    if (student == null) {
        studentList = [];
    }
    else {
        studentList = JSON.parse(student);
    }


    let myObj = {
        name: name.value,
        email: email.value,
        gender : gender,
        website: website.value,
        skills : skills
    }


    if (name.value == "" || email.value == "" || website.value == "") {
        msgBox.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                                <strong>Error !!</strong> All fields are required.
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>`

        setTimeout(() => {
            msgBox.innerHTML = "";
        },2000);
    }
    else {
        studentList.push(myObj);
        localStorage.setItem("student", JSON.stringify(studentList));
        name.value = "";
        email.value = "";
        website.value = "";
        msgBox.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                <strong>Success !!</strong> Successfully added student to the list.
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>`

        setTimeout(() => {
            msgBox.innerHTML = "";
        }, 2000);
        showStudents();
    }

});

function showStudents() {
    let student = localStorage.getItem("student");

    if (student == null) {
        studentList = [];
    }
    else {
        studentList = JSON.parse(student);
    }



    let html = "";
    studentList.forEach(function (element, index) {
        if (element.gender == "Male") {
            gender = "male";
        }
        else{
            gender = "female";
        }
        html += `
                <div class="row my-5">
                    <div class="col-6 d-flex justify-content-center align-items-center">
                        <img src="${gender}.jpg" class="rounded-circle" alt="student image" style="width:12rem; height:12rem;">
                    </div>
                    <div class="col-6">
                        <h5>Name : ${element.name}</h5>
                        <h6>Gender : ${element.gender}</h6>
                        <p>Email ID : <a href="#">${element.email}</a></p>
                        <p>Website : <a href="#">${element.website}</a></p>
                        <p>Skills : ${element.skills}</p>
                        <button href="#" id="${index}" onclick="deleteStudent(this.id)" class="btn btn-danger">Delete Student</button>
                    </div>
                </div>
                `
    });

    let std = document.getElementById('students');
    if (studentList.length != 0) {
        std.innerHTML = html;
    }
    else {
        std.innerHTML = `Nothing to show! Use "Enroll Student" above to add student to the list.`
    }
};

function deleteStudent(index) {
    let student = localStorage.getItem("student");

    if (student == null) {
        studentList = [];
    }
    else {
        studentList = JSON.parse(student);
    }

    msgBox.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">Student is successfully deleted from the list.
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`

    setTimeout(() => {
        msgBox.innerHTML = "";
    }, 2000);

    studentList.splice(index, 1);
    localStorage.setItem("student", JSON.stringify(studentList));
    showStudents()
}


