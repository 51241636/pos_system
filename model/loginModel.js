
localStorage.setItem("userName","pisepala@gmail.com");
localStorage.setItem("password","1234");


let getUserName= ()=>{
   return  localStorage.getItem("userName");
}
let getUserPassword= ()=>{
   return  localStorage.getItem("password");
}
export {getUserName,getUserPassword}