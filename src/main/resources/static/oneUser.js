
const tableUsers = document.getElementById("oneUserTable2")
fetch("/api/user").then(
    response => {
        response.json().then(
            data => {
                const rowElement = document.createElement("tr");
                rowElement.innerHTML = `
            <td>${data.id}</td>
            <td>${data.username}</td>
            <td>${data.lastname}</td>
            <td>${data.age}</td>
            <td>${data.email}</td>
            <td>${data.role}</td>     
            `
                tableUsers.append(rowElement);
            })
    })