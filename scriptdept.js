//const api_url = "<heroku_app_url>"
// const api_url = "http://localhost:8088/department-details"
const api_url = "https://employeedbesd.herokuapp.com/department-details"

function loadData(records = []) {
    var table_data = "";
    for (let i = 0; i < records.length; i++) {
        table_data += `<tr>`;
        table_data += `<td>${records[i].dept_name}</td>`;
        table_data += `<td>${records[i].dept_location}</td>`;
        table_data += `<td>${records[i].dept_incharge_name}</td>`;
        table_data += `<td>`;
        table_data += `<a href="editdept.html?id=${records[i]._id}"><button class="btn btn-primary">Edit</button></a>`;
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
    var dept_name = document.getElementById("dept_name").value;
    var dept_location = document.getElementById("dept_location").value;
    var dept_incharge_name = document.getElementById("dept_inchargename").value;
    data = { dept_name: dept_name, dept_location: dept_location, dept_incharge_name: dept_incharge_name }

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
            window.location.href = "homedept.html";
        })
}


function putData() {

    var _id = document.getElementById("id").value;
    var dept_name = document.getElementById("dept_name").value;
    var dept_location = document.getElementById("dept_location").value;
    var dept_incharge_name = document.getElementById("dept_inchargename").value;
    data = { _id:_id,dept_name: dept_name, dept_location: dept_location, dept_incharge_name: dept_incharge_name }
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
            window.location.href = "homedept.html";
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

