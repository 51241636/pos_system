import {getItemId,itemData,getItemArray,itemDelete,getDataIndex,itemDataUpdate,getItemName} from "../model/itemModel.js";
import {loadItems} from "../controller/placeOrderController.js";
import {customerDataUpdate, customerDelete, getCustomerArray, getCustomerId} from "../model/customerModel.js";
import {customerArray, itemArray} from "../db/db.js";

document.getElementById('form02').style.display="none";
let form_Oper=true;
document.getElementById('addItemBtn').addEventListener('click',function (){
    if(form_Oper){
        document.getElementById('form02').style.display="none";
        form_Oper=false;
    }else {
        document.getElementById('form02').style.display="block";
        form_Oper=true;
    }
})
// item save
$('#itemSavebtn').on('click',()=>{
    let id=$('#item_id_input').val();
    let name=$('#item_name_input').val();
    let uPrice=$('#item-unit-price').val();
    let qty=$('#item-qty').val();
    if(id == ""){
        Swal.fire({
            icon: "error",
            title: "id dosen't match",


        })
    }else if(name == ""){
        Swal.fire({
            icon: "error",
            title: "name dosen't match",


        })
    }else if(getItemId(id)){
        Swal.fire({
            icon: "error",
            title: "id duplicated ",


        })
    }
    else if(uPrice == ""){
        Swal.fire({
            icon: "error",
            title: "unitPrice dosen't type ",


        })
    }
    else if(qty == ""){
        Swal.fire({
            icon: "error",
            title: "quantity dosen't type ",


        })
    }else {
        itemData(id,name,uPrice,qty);
        addItemDetails();
        Swal.fire({
            title: "item added successfully",
            icon: "success",
            draggable: true
        });
    }



});
// load item data

const addItemDetails=()=>{
    $('#itemTbody').empty();
    let itemArr=getItemArray();
    itemArr.map((item, index)=>{
        let data=`${item.id},${item.name},${item.unitPrice},${item.quantity},`;
        let nextRow=`<tr data-index="${data}"> <td>${item.id}</td> <td>${item.name}</td> <td>${item.unitPrice}</td> <td>${item.quantity}</td><td>
<button class="btnDelete"><i class="fa-solid fa-xmark" style="color: rgb(99, 230, 190);"></i></button>
</td></tr>`;
        $("#itemTbody").append(nextRow);
        loadItems();
        clearForm();
        $('#itmCount').empty();
        $('#itmCount').append(itemArray.length);

    })
}
// click get data from table
$('#itemTbody').on('click','tr',function (){
    document.getElementById('form02').style.display="block";
    let item_obj=getDataIndex($(this).index());
    $('#item_id_input').val(item_obj.id);
    $('#item_name_input').val(item_obj.name);
    $('#item-unit-price').val(item_obj.unitPrice);
    $('#item-qty').val(item_obj.quantity);

})
// delete
$(document).on('click','.btnDelete',function (){
    let row=$(this).closest('tr');
    let data=row.data('index');
    let itemDt=getDataIndex(data)
    itemDelete(itemDt)
    addItemDetails()
})
// update
$('#itemUpdateBtn').on('click',() => {
    let id=$('#item_id_input').val();
    let name=$('#item_name_input').val();
    let uPrice=$('#item-unit-price').val();
    let qty=$('#item-qty').val();
    if(id == ""){
        Swal.fire({
            icon: "error",
            title: "id dosen't match",


        })
    }else if(name == ""){
        Swal.fire({
            icon: "error",
            title: "name dosen't match",


        })
    }else if(!getItemId(id)){
        Swal.fire({
            icon: "error",
            title: "id cant change ",


        })
    } else if(uPrice == ""){
        Swal.fire({
            icon: "error",
            title: "unitPrice dosen't type ",


        })
    }
    else if(qty == ""){
        Swal.fire({
            icon: "error",
            title: "quantity dosen't type ",


        })
    }else{
        itemDataUpdate(id,name,uPrice,qty);
        addItemDetails();
        Swal.fire({
            title: "item added successfully",
            icon: "success",
            draggable: true
        });
        clearForm();
    }

})
// clear form
function clearForm(){
    $('#itemResetButton').click();
}
$('#searchItem').on('keypress', function(e) {
    if (e.which === 13) {
       let value=$('#searchItem').val();
       if(value == ""){
           addItemDetails();
       }else{
           $('#itemTbody').empty();
           console.log(value);
           let item_obj=getItemName(value);
           console.log(item_obj);
           if(item_obj != null){
               let nextRow=`<tr> <td>${item_obj.id}</td> <td>${item_obj.name}</td> <td>${item_obj.unitPrice}</td> <td>${item_obj.quantity}</td><td>
<button class="btnDelete"><i class="fa-solid fa-xmark" style="color: rgb(99, 230, 190);"></i></button>
</td></tr>`;
               $("#itemTbody").append(nextRow)
           }else {
               Swal.fire({
                   icon: "error",
                   title: "cant find item",


               })
           }

       }
    }
});
export {addItemDetails};
