import {getCustomerId,customerData,getCustomerArray,customerDelete,getDataIndex,customerDataUpdate,findCustomerPhone} from "../model/customerModel.js";
// import {getItemName} from "../model/itemModel";
// import {addItemDetails} from "./itemController";
import {check_nic,check_phone} from "../util/RegexUtil.js"
import {customerArray} from "../db/db.js";

document.getElementById('form').style.display="none";
let form_Oper=true;
document.getElementById('addCustomerBtn').addEventListener('click',function (){
    if(form_Oper){
        document.getElementById('form').style.display="none";
        form_Oper=false;
    }else {
        document.getElementById('form').style.display="block";
        form_Oper=true;
    }
})
// customer save
$('#savebtn').on('click',()=>{
    let id=$('#customer_id_input').val();
    let name=$('#customer_name_input').val();
    let nic=$('#customer_nic_input').val();
    let phone=$('#customer_phone_input').val();
    let address=$('#customer_address_input').val();
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
    }else if(getCustomerId(id)){
        Swal.fire({
            icon: "error",
            title: "id duplicated ",


        })
    }else if(!check_nic(nic)){
        Swal.fire({
            icon: "error",
            title: "nic does not valid ",


        })
    }
    else if(!check_phone(phone)){
        Swal.fire({
            icon: "error",
            title: "phone number does not valid ",


        })
    }
    else {
        customerData(id,name,nic,phone,address);
        addCustomerDetails();
    }



})
// customer load
const addCustomerDetails=()=>{
    $('#customerTbody').empty();
    let cusArr=getCustomerArray();
    cusArr.map((item, index)=>{
        let data=`${item.id},${item.name},${item.nic},${item.phone},${item.address}`;
        let nextRow=`<tr data-index="${data}"> <td>${item.id}</td> <td>${item.name}</td> <td>${item.nic}</td> <td>${item.phone}</td><td>${item.address}</td><td>
<button class="btnDelete"><i class="fa-solid fa-xmark" style="color: rgb(99, 230, 190);"></i></button>
</td></tr>`;
        $("#customerTbody").append(nextRow);
        clearForm();
        $('#cusCount').empty();
        $('#cusCount').append(customerArray.length);
        Swal.fire({
            title: "Customer added successfully",
            icon: "success",
            draggable: true
        });
    })
}

// $('#updateBtn').on('click',)
$('#customerTbody').on('click','tr',function (){
    document.getElementById('form').style.display="block";
    let customer_obj=getDataIndex($(this).index());
    $('#customer_id_input').val(customer_obj.id);
    $('#customer_name_input').val(customer_obj.name);
    $('#customer_nic_input').val(customer_obj.nic);
    $('#customer_phone_input').val(customer_obj.phone);
    $('#customer_address_input').val(customer_obj.address);

})
$(document).on('click','#btnDelete',function (){
        let row=$(this).closest('tr');
        let data=row.data('index');
        let customerDt=getDataIndex(data)
        customerDelete(customerDt)
        addCustomerDetails()
        console.log(data);
})
// update
$('#updateBtn').on('click',() => {
    let id=$('#customer_id_input').val();
    let name=$('#customer_name_input').val();
    let nic=$('#customer_nic_input').val();
    let phone=$('#customer_phone_input').val();
    let address=$('#customer_address_input').val();
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
    }else if(!getCustomerId(id)){
        Swal.fire({
            icon: "error",
            title: "id cant change ",


        })
    }
    else if(!check_nic(nic)){
        Swal.fire({
            icon: "error",
            title: "nic does not valid ",


        })
    }
    else if(!check_phone(phone)){
        Swal.fire({
            icon: "error",
            title: "phone number does not valid ",


        })
    }else{
        customerDataUpdate(id,name,nic,phone,address);
        addCustomerDetails();
        clearForm();
    }

});
// search Customer
$('#searchCustomer').on('keypress', function(e) {
    if (e.which === 13) {
        let value=$('#searchCustomer').val();
        if(value == ""){
            addCustomerDetails();
        }else{
            $('#customerTbody').empty();
            console.log(value);
            let cus_obj=findCustomerPhone(value);
            console.log(cus_obj);
            if(cus_obj != null){
                let nextRow=`<tr> <td>${cus_obj.id}</td> <td>${cus_obj.name}</td> <td>${cus_obj.nic}</td> <td>${cus_obj.phone}</td><td>${cus_obj.address}</td><td>
<button class="btnDelete"><i class="fa-solid fa-xmark" style="color: rgb(99, 230, 190);"></i></button>
</td></tr>`;
                $("#customerTbody").append(nextRow)
            }else {
                alert("cant load ")
            }

        }
    }
});
// clear form
function clearForm(){
    $('#resetButton').click();
}
