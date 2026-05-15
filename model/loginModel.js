// save user name and assword within local storage
localStorage.setItem("userName","pisepala@gmail.com");
localStorage.setItem("password","1234");

// get saved usename
let getUserName= ()=>{
   return  localStorage.getItem("userName");
}
// get saved password
let getUserPassword= ()=>{
   return  localStorage.getItem("password");
}
export {getUserName,getUserPassword}