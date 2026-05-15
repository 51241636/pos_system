import {getUserName,getUserPassword} from "../model/loginModel.js";

document.getElementById('loginBtn').addEventListener('click',()=>{
    let currentEmail=document.getElementById('form2Example11').value;
    let currentPassword=document.getElementById('form2Example22').value;
    if(currentEmail.match(getUserName()) && Number(currentPassword)===Number(getUserPassword())){
        window.location.replace("system.html");
    }else {
        Swal.fire({
            icon: "error",
            title: "name dosen't match",


        })
    }
})