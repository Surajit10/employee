//const api_url = "<heroku_app_url>"
// const api_url = "http://localhost:8088/project-details"
const api_url = "https://employeedbesd.herokuapp.com/project-details"

function loadData(records = []) {
    var table_data = "";
    for (let i = 0; i < records.length; i++) {
        table_data += `<tr>`;
        table_data += `<td>${records[i].project_name}</td>`;
        table_data += `<td>${records[i].project_manager}</td>`;
        table_data += `<td>${records[i].project_capital}</td>`;
        table_data += `<td>${records[i].project_start_date}</td>`;
        table_data += `<td>${records[i].project_deadline}</td>`;
        table_data += `<td>${records[i].no_of_employees}</td>`;
        table_data += `<td>`;
        table_data += `<a href="editproject.html?id=${records[i]._id}"><button class="btn btn-primary">Edit</button></a>`;
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
    var p_name = document.getElementById("project_name").value;
    var p_manager = document.getElementById("project_manager").value;
    var p_capital = document.getElementById("project_capital").value;
    var p_psdate = document.getElementById("psdate").value;
    var p_psddate = document.getElementById("psddate").value;
    var p_emp = document.getElementById("no_of_employees").value;
    data = { project_name: p_name, project_manager: p_manager, project_capital: p_capital, project_start_date: p_psdate, project_deadline: p_psddate, no_of_employees: p_emp};


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
            window.location.href = "homeproject.html";
        })
}


function putData() {

    var p_name = document.getElementById("project_name").value;
    var p_manager = document.getElementById("project_manager").value;
    var p_capital = document.getElementById("project_capital").value;
    var p_psdate = document.getElementById("psdate").value;
    var p_psddate = document.getElementById("psddate").value;
    var p_emp = document.getElementById("no_of_employees").value;
    data = { project_name: p_name, project_manager: p_manager, project_capital: p_capital, project_start_date: p_psdate, project_deadline: p_psddate, no_of_employees: p_emp};
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
            window.location.href = "homeproject.html";
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

