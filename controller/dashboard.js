import {customerArray, itemArray} from "../db/db.js";

$('#content02').css({display:'none'});
$('#content').hide();
$('#content03').hide();
$('#content04').hide();
$('#content05').show();


$('#navBarName').text("Dashboard");
$('ul').on('click', 'li', function () {
    $(this).closest('ul').find('li').removeClass('active');
    $(this).addClass('active');
});
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
$('#Customer').on('click', function (){
    $('#content').show();
    $('#navBarName').text("Customers Manage");
    $('#content02').css({display:'none'});
    $('#content03').css({display:'none'});
    $('#content04').css({display:'none'});
    $('#content05').css({display:'none'});
    // $('#content02').hide();
});
$('#item').on('click', function (){
    $('#content').hide();
    $('#content03').hide();
    $('#content04').hide();
    $('#content05').hide();
    $('#content02').show();
    $('#navBarName').text("Item Manage");


})
$('#placeOrder').on('click', function (){
    $('#content').hide();
    $('#content02').hide();
    $('#content04').hide();
    $('#content05').hide();
    $('#content03').show();
    $('#navBarName').text("place Order Manage");


})
$('#orderHistory').on('click', function (){
    $('#content').hide();
    $('#content02').hide();
    $('#content03').hide();
    $('#content05').hide();
    $('#content04').show();
    $('#navBarName').text("Order History");


})
function runTime(){
    let getDate=new Date();
    let change=getDate.toLocaleString();
    document.getElementById('Time').innerHTML=change
}
setInterval(runTime,0)