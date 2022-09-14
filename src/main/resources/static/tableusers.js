$(function() {
    getTableOfUsers();
});

async function getTableOfUsers() {

    const response = await fetch("/api/admin/users");
    await response.json().then(data => getTable(data));

    function getTable(data) {

        const tableUsers = document.getElementById("tableOfUsers")
        tableUsers.innerHTML = "";
        data.forEach(({id, username, lastname, age, email, role}) => {
            const rowElement = document.createElement("tr");
            rowElement.innerHTML = `
            <td>${id}</td>
            <td>${username}</td>
            <td>${lastname}</td>
            <td>${age}</td>
            <td>${email}</td>
            <td>${role}</td>
            <td>
                <button type="button" class="btn btn-info text-white" 
                data-bs-userId=${id}
                data-bs-userName=${username} 
                data-bs-userLastname=${lastname} 
                data-bs-userAge=${age}
                data-bs-userEmail=${email} 
                data-bs-toggle="modal"
                data-bs-target="#ModalEdit">Edit</button>
            </td>
            <td>
                <button type="button" class="btn btn-danger" 
                data-bs-userId=${id}
                data-bs-userName=${username} 
                data-bs-userLastname=${lastname} 
                data-bs-userAge=${age}
                data-bs-userEmail=${email} 
                data-bs-toggle="modal"
                data-bs-target="#deleteModal">Delete</button>
            </td>            
            `
            tableUsers.append(rowElement);
        })
    }
}

////////////////////////////Modal Edit////////////////////////////

const editModal = document.getElementById('ModalEdit')
editModal.addEventListener('show.bs.modal', event => {

    const button = event.relatedTarget

    const editUserId = editModal.querySelector('#userId')
    const editUserName = editModal.querySelector('#userName')
    const editUserLastname = editModal.querySelector('#userLastname')
    const editUserAge = editModal.querySelector('#userAge')
    const editUserEmail = editModal.querySelector('#userEmail')

    editUserId.value = button.getAttribute('data-bs-userId')
    editUserName.value = button.getAttribute('data-bs-userName')
    editUserLastname.value = button.getAttribute('data-bs-userLastname')
    editUserAge.value = button.getAttribute('data-bs-userAge')
    editUserEmail.value = button.getAttribute('data-bs-userEmail')


})

////////////////////////////Modal Delete////////////////////////////

const deleteModal = document.getElementById('deleteModal')
deleteModal.addEventListener('show.bs.modal', event => {

    const deleteButton = event.relatedTarget

    const deleteUserId = deleteModal.querySelector('#readId')
    const deleteUserName = deleteModal.querySelector('#readName')
    const deleteUserSurname = deleteModal.querySelector('#readLastName')
    const deleteUserAge = deleteModal.querySelector('#readAge')
    const deleteUserEmail = deleteModal.querySelector('#readEmail')


    deleteUserId.value = deleteButton.getAttribute('data-bs-userId')
    deleteUserName.value = deleteButton.getAttribute('data-bs-userName')
    deleteUserSurname.value = deleteButton.getAttribute('data-bs-userSurname')
    deleteUserAge.value = deleteButton.getAttribute('data-bs-userAge')
    deleteUserEmail.value = deleteButton.getAttribute('data-bs-userEmail')


})

////////////////////////////Edit////////////////////////////

const formEdit = document.getElementById("formEdit");
formEdit.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(formEdit);
    const object = {
        roles: []
    };
    formData.forEach((value, key) => {
        console.log(key)
        if (key === "editRoles") {
            const roleId = value.split(" ")[0];
            const roleName = value.split(" ")[1];
            const role = {
                id: roleId,
                name: roleName
            };
            object.roles.push(role);
        } else {
            object[key] = value;
        }
    });

    fetch("api/admin/users", {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(
            object
        )
    })
        .then(() => getTableOfUsers());
    $("#ModalEdit").modal("hide");
    formEdit.reset();

})

document.addEventListener('click', e => {
    if (e.target.closest('#btnEdit')) {
        $("#ModalEdit").modal("hide");
    }
})
document.addEventListener('click', e => {
    if (e.target.closest('#btnEdit2')) {
        $("#ModalEdit").modal("hide");
    }
})

////////////////////////////Delete////////////////////////////

const formDelete = document.getElementById('formDelete')
formDelete.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(formDelete);
    fetch("api/admin/users/" + formData.get("id"), {
        method: "DELETE"
    })
        .then(() => getTableOfUsers());
    $("#deleteModal").modal("hide");
    formDelete.reset();
})

document.addEventListener('click', e => {
    if (e.target.closest('#btnDelete')) {
        $("#deleteModal").modal("hide");
    }
})
document.addEventListener('click', e => {
    if (e.target.closest('#btnDelete2')) {
        $("#deleteModal").modal("hide");
    }
})
////////////////////////////Add////////////////////////////

const formAdd = document.getElementById("formNewUser");
formAdd.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(formAdd);
    const object = {
        roles: []
    };
    formData.forEach((value, key) => {
        console.log(key)
        if (key === "addRoles") {
            const roleId = value.split(" ")[0];
            const roleName = value.split(" ")[1];
            const role = {
                id: roleId,
                name: roleName
            };
            object.roles.push(role);
        } else {
            object[key] = value;
        }
    });

    let addUser = {
        username: this.usernameAdd.value,
        lastname: this.lastnameAdd.value,
        age: this.ageAdd.value,
        email: this.emailAdd.value,
        password: this.passwordAdd.value,
        roles: object.roles
    }

    fetch("api/admin/users/new", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(addUser)
    })
        .then(function () {
            getTableOfUsers()
         $('#tableUsers').tab('show')
        formAdd.reset()
        })
})

////////////////////////////User Page////////////////////////////

    const tableUsers = document.getElementById("oneUserTable")
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