import {customerArray} from "../db/db.js"

class Customer{
    #id
    #name
    #nic
    #phone
    #address

    constructor(id,name,nic,phone,address) {
        this.#id=id;
        this.#name=name;
        this.#nic=nic;
        this.#phone=phone
        this.#address=address
    }
    get id(){
        return this.#id
    }
    set id(id){
        this.#id=id;
    }
    get name(){
        return this.#name
    }
    set name(name){
        this.#name=name;
    }
    get nic(){
        return this.#nic
    }
    set nic(nic){
        this.#nic=nic;
    }
    get phone(){
        return this.#phone
    }
    set phone(phone){
        this.#phone=phone;
    }
    get address(){
        return this.#address
    }
    set address(address){
        this.#address=address;
    }
}

const customerData=(id,name,nic,phone,address) =>{
    let customer=new Customer(id,name,nic,phone,address);
    customerArray.push(customer);
}
const getCustomerArray=()=>{
    return customerArray;
}
const getCustomerId=(id)=>{
    console.log(customerArray.find(item => item.id==id));
    return customerArray.find(item => item.id==id)

}
const customerDelete=(obj_index) => {
    customerArray.splice(obj_index,1)

}
const getDataIndex=(index)=> {
    return customerArray[index];
}
const customerDataUpdate=(id,name,nic,phone,address)=>{
    let cus_obj=customerArray.find(item => item.id == id);
    cus_obj.id=id;
    cus_obj.name=name;
    cus_obj.nic=nic;
    cus_obj.phone=phone;
    cus_obj.address=address;
}
const findCustomerPhone=(contactNumber)=>{
   return  customerArray.find(item => item.phone == contactNumber )
}
export {getCustomerId,customerData,getCustomerArray,customerDelete,getDataIndex,customerDataUpdate,findCustomerPhone}