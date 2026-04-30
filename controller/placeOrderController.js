import {itemArray,placeOrderItemArray,customerArray,placeOrderArray} from "../db/db.js"
import {getItemArray, getItemName} from "../model/itemModel.js";
import {addItemDetails} from "./itemController.js";
import {addPlaceOrderItems,addPlaceOrderItemsArr} from "../model/placeOrderModel.js";
import {findCustomerPhone} from "../model/customerModel.js"

// import {addOrderHistoryDetails} from "OrderHistoryController,js";


class placeOrder{
    #CustomerName
    #ItemName
    #ItemPrice
    #itemQty

    constructor(CustomerName ,ItemName,ItemPrice,itemQty) {
        this.#CustomerName=CustomerName;
        this.#ItemName=ItemName;
        this.#ItemPrice=ItemPrice;
        this.#itemQty=itemQty;
    }
    get CustomerName(){
        return this.#CustomerName
    }
    set CustomerName(CustomerName){
        this.#CustomerName=CustomerName;
    }
    get ItemName(){
        return this.#ItemName
    }
    set ItemName(ItemName){
        this.#ItemName=ItemName;
    }
    get ItemPrice(){
        return this.#ItemPrice
    }
    set ItemPrice(ItemPrice){
        this.#ItemPrice=ItemPrice;
    }
    get itemQty(){
        return this.#itemQty
    }
    set itemQty(itemQty){
        this.#itemQty=itemQty;
    }
}
function loadItems() {

    $('#itemContainer').empty();
    let itmArr=getItemArray();
    itmArr.forEach(item => {

        let card = `
        <div  class="item-card text-center m-2 p-2 " id="itemCard" >
            
            <p>${item.name}</p>
            <p>Rs. ${item.unitPrice}.00</p>

            <div style="width: 80px; height: 50px; margin: 0 auto">
                <button class="decrease">-</button>
                <span class="itemQty">0</span>
                <button class="increase">+</button>
            </div>
            <div>
            <button class="itemBox" data-name="${item.name}"
     data-price="${item.unitPrice}">get</button>
</div>

        </div>
        `;

        $('#itemContainer').append(card);
    });
}
const discount=200;
const tax=0.05;
// let quantity=new Array(itemArray.length).fill(0);
let itemTotPrice=0;
$(document).on('click', '.itemBox', function () {
    let totTax;
    $('.priceValue').empty();
    $('.taxValue').empty();
    $('.finalTot').empty();
    let name = $(this).data('name');
    let price = $(this).data('price');
    let qty = Number($(this).closest('.item-card').find('.itemQty').text());
    let totalPrice=Number(price)*qty;
    let placeOd=addPlaceOrderItems(name,totalPrice,qty);
    itemTotPrice+=totalPrice;
    totTax=itemTotPrice*tax;
    $('.priceValue').append(itemTotPrice);
    $('.taxValue').append(totTax);
    $('.finalTot').append(itemTotPrice-discount+totTax);

    if(placeOd.qty > 0){
        addPlaceOrderItemsArr(placeOd);
    }else {
        alert("cant load")
    }
    $('#placeItemDt').empty();
    placeOrderItemArray.forEach(item => {

        // let price = Number(item.unitPrice);
        // let tot=qty*price;
           let card=`<div style="max-width: 300px; max-height:110px; margin: 20px; background-color: rgba(124,111,247,0.4); border-radius: 1em">
            
            <p>Item Name :  ${item.name}</p>
            <p class="totalValue">Total Price : ${item.unitPrice}</p>
            <p>Item Quantity : ${item.qty}</p>

<!--            <p> Number(${item.unitPrice})*Number($(this).siblings('.itemQty'))</p>-->

        </div>`


        // $('.totalValue').val(qty*price)
        $('#placeItemDt').append(card)
    })
    console.log("Name:", name);
    console.log("Price:", price);

});
$(document).on('click', '.increase', function () {
    let qtyElement= $(this).siblings('.itemQty');

    let value = Number(qtyElement.text());
    value += 1;

    qtyElement.text(value);

});
$(document).on('click', '.decrease', function () {
    let qtyElement= $(this).siblings('.itemQty');

    let value = Number(qtyElement.text());
        value -= 1;



    qtyElement.text(value);

});

$('#cus_phone_input').on('keypress', function(e) {
    if (e.which === 13) {
        $('#cus_name_input').val("");
        $('#cus_nic_input').val("");
        let contactNumber=$('#cus_phone_input').val()
        let cusObj=findCustomerPhone(contactNumber);
        console.log(cusObj)
        if(cusObj){
            $('#cus_name_input').val(cusObj.name)
            $('#cus_nic_input').val(cusObj.nic)
        }else{
            Swal.fire({
                icon: "error",
                title: "Cant find Customer",


            })
        }
    }
})
$('#orderPlaceBtn').on('click',()=> {
    let cusName=$('#cus_name_input').val();
    console.log(cusName)
    if(cusName == ""){
        Swal.fire({
            icon: "error",
            title: "please Select the Customer First",


        })
    }else{
        placeOrderItemArray.forEach((item) =>{
            placeOrderArray.push(new placeOrder(cusName,item.name,item.unitPrice ,item.qty));
        });
        addOrderHistoryDetails();
    }
});
const addOrderHistoryDetails=()=>{
    $('#orderHistoryTbody').empty();
    placeOrderArray.map((item, index)=>{
        let itemObj=getItemName(item.ItemName);
        if(itemObj.quantity>item.itemQty){
            itemObj.quantity=Number(itemObj.quantity)-item.itemQty;
            addItemDetails();
            let nextRow=`<tr> <td>${item.CustomerName}</td> <td>${item.ItemName}</td> <td>${item.ItemPrice}</td> <td>${item.itemQty}</td></tr>`;
            $("#orderHistoryTbody").append(nextRow);
            Swal.fire({
                title: "All Orders Delivered Successfully",
                icon: "success",
                draggable: true
            });


        }else{
            Swal.fire({
                icon: "error",
                title: "all Orders Not place Sucessfully",


            })


        }


        console.log(itemObj);

    })
    $('#cus_name_input').val("");
    $('#cus_nic_input').val("");
    $('#cus_phone_input').val("");
    $('#placeItemDt').empty();
    $('.priceValue').empty();
    $('.taxValue').empty();
    $('.finalTot').empty();
    placeOrderItemArray.length=0;
    itemTotPrice=0;
}
export {loadItems}