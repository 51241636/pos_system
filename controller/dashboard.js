import {customerArray, itemArray} from "../db/db.js";

$('#content02').css({display:'none'});
$('#content').hide();
$('#content03').hide();
$('#content04').hide();
$('#content05').show();

// nav bar active deactive
$('#navBarName').text("Dashboard");
$('ul').on('click', 'li', function () {
    $(this).closest('ul').find('li').removeClass('active');
    $(this).addClass('active');
});
// dashboard content show
$('#dashboard').on('click', function (){
    $('#content05').show();
    $('#navBarName').text("Dashboard");
    $('#content02').css({display:'none'});
    $('#content03').css({display:'none'});
    $('#content04').css({display:'none'});
    $('#content').css({display:'none'});
    $('#TotCusCount').empty();
    $('#TotItmCount').empty();
    $('#TotCusCount').append(customerArray.length);
    $('#TotItmCount').append(itemArray.length);
    // $('#content02').hide();
});
// customer content show
$('#Customer').on('click', function (){
    $('#content').show();
    $('#navBarName').text("Customers Manage");
    $('#content02').css({display:'none'});
    $('#content03').css({display:'none'});
    $('#content04').css({display:'none'});
    $('#content05').css({display:'none'});
    // $('#content02').hide();
});
// item content show
$('#item').on('click', function (){
    $('#content').hide();
    $('#content03').hide();
    $('#content04').hide();
    $('#content05').hide();
    $('#content02').show();
    $('#navBarName').text("Item Manage");


})
// place order content show
$('#placeOrder').on('click', function (){
    $('#content').hide();
    $('#content02').hide();
    $('#content04').hide();
    $('#content05').hide();
    $('#content03').show();
    $('#navBarName').text("place Order Manage");


})
// orderhistpory content show
$('#orderHistory').on('click', function (){
    $('#content').hide();
    $('#content02').hide();
    $('#content03').hide();
    $('#content05').hide();
    $('#content04').show();
    $('#navBarName').text("Order History");


})
// logout the system
$('#logOutBtn').on('click',()=>{

        // localStorage.clear();

    window.location.replace("index.html")


});
function runTime(){
    let getDate=new Date();
    let change=getDate.toLocaleString();
    document.getElementById('Time').innerHTML=change
}
setInterval(runTime,0)