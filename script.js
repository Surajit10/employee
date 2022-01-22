//const api_url = "<heroku_app_url>"
// const api_url = "http://localhost:8088/employee-details"
const api_url = "https://employeedbesd.herokuapp.com/employee-details"

function loadData(records = []) {
    var table_data = "";
    for (let i = 0; i < records.length; i++) {
        table_data += `<tr>`;
        table_data += `<td>${records[i].emp_name}</td>`;
        table_data += `<td>${records[i].emp_email}</td>`;
        table_data += `<td>${records[i].emp_mobileno}</td>`;
        table_data += `<td>${records[i].Date_of_birth}</td>`;
        table_data += `<td>${records[i].job_name}</td>`;
        table_data += `<td>${records[i].Date_of_Joining}</td>`;
        table_data += `<td>${records[i].Salary}</td>`;
        table_data += `<td>${records[i].Comission}</td>`;
        table_data += `<td>${records[i].Address}</td>`;
        table_data += `<td>${records[i].department}</td>`;
        table_data += `<td>${records[i].managers_name}</td>`;
        table_data += `<td>`;
        table_data += `<a href="edit.html?id=${records[i]._id}"><button class="btn btn-primary">Edit</button></a>`;
        table_data += '&nbsp;&nbsp;&nbsp;&nbsp';
        table_data += `<button class="btn btn-danger" onclick=deleteData('${records[i]._id}')>Delete</button>`;
        table_data += `</td>`;
        table_data += `</tr>`;
    }
    //console.log(table_data);
    document.getElementById("tbody").innerHTML = table_data;
}

function getData() {
    fetch(api_url)
        .then((response) => response.json())
        .then((data) => {
            console.table(data);
            loadData(data);
        });
}


function getDataById(id) {
    fetch(`${api_url}/${id}`)
        .then((response) => response.json())
        .then((data) => {
            console.log("this point")
            console.log(data)
            document.getElementById("id").value = id;
        })
}


function postData() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var mobileno = document.getElementById("mobileno").value;
    var dob = document.getElementById("dob").value;
    var job_name = document.getElementById("job_name").value;
    var doj = document.getElementById("doj").value;
    var salary = document.getElementById("salary").value;
    var comission = document.getElementById("comission").value;
    var address = document.getElementById("address").value;
    var department = document.getElementById("department").value;
    var manager_name = document.getElementById("manager_name").value;
    data = { emp_name: name, emp_email: email, emp_mobileno: mobileno, Date_of_birth: dob, job_name: job_name, Date_of_Joining: doj, Salary: salary, Comission: comission, Address: address, department: department, managers_name: manager_name };


    fetch(api_url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            window.location.href = "index.html";
        })
}


function putData() {

    var _id = document.getElementById("id").value;
    console.log(_id)
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var mobileno = document.getElementById("mobileno").value;
    console.log(mobileno)
    var dob = document.getElementById("dob").value;
    var job_name = document.getElementById("job_name").value;
    var doj = document.getElementById("doj").value;
    var salary = document.getElementById("salary").value;
    var comission = document.getElementById("comission").value;
    var address = document.getElementById("address").value;
    var department = document.getElementById("department").value;
    var manager_name = document.getElementById("manager_name").value;
    data = { _id: _id, emp_name: name, emp_email: email, emp_mobileno: mobileno, Date_of_birth: dob, job_name: job_name, Date_of_Joining: doj, Salary: salary, Comission: comission, Address: address, department: department, managers_name: manager_name };
    console.log("Hello World");
    console.log(data)
    fetch(api_url, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then((response) => response.json())
        .then((data) => {
            console.table(data);
            window.location.href = "index.html";
        })
}


function deleteData(id) {
    console.log(id)
    user_input = confirm("Are you sure you want to delete this record?");
    if (user_input) {
        fetch(api_url, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "_id": id })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                window.location.reload();
            })
    }
}

