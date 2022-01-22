//const api_url = "<heroku_app_url>"
// const api_url = "http://localhost:8088/contact-details"
const api_url = "https://employeedbesd.herokuapp.com/contact-details"

function loadData(records = []) {
    var table_data = "";
    for (let i = 0; i < records.length; i++) {
        table_data += `<tr>`;
        table_data += `<td>${records[i].name}</td>`;
        table_data += `<td>${records[i].email}</td>`;
        table_data += `<td>${records[i].mobile}</td>`;
        table_data += `<td>${records[i].subject}</td>`;
        table_data += `<td>${records[i].message}</td>`;
        table_data += `<td>`;
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
    var mobile = document.getElementById("mobile").value;
    var subject = document.getElementById("subject").value;
    var message = document.getElementById("message").value;
    data = { name: name, email: email, mobile: mobile, subject: subject, message: message };


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
            window.location.href = "contactget.html";
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

