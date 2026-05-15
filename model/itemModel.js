import {itemArray} from "../db/db.js"
// item class
class Item{
    #id
    #name
    #unitPrice
    #quantity

    constructor(id,name,unitPrice,quantity) {
        this.#id=id;
        this.#name=name;
        this.#unitPrice=unitPrice;
        this.#quantity=quantity
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
    get unitPrice(){
        return this.#unitPrice
    }
    set unitPrice(quantity){
        this.#quantity=quantity;
    }
    get quantity(){
        return this.#quantity
    }
    set quantity(quantity){
        this.#quantity=quantity;
    }
}
//item add for the array
const itemData=(id,name,unitPrice,quantity) =>{
    let item=new Item(id,name,unitPrice,quantity);
    itemArray.push(item);
}
// gt the items
const getItemArray=()=>{
    return itemArray;
}
// find some items using id
const getItemId=(id)=>{
    return itemArray.find(item => item.id==id)

}
// find item using name
const getItemName=(name)=>{
    return itemArray.find(item =>   item.name.toLowerCase().trim() === name.toLowerCase().trim())

}
// item remove
const itemDelete=(obj_index) => {
    itemArray.splice(obj_index,1)

}
// get data using index
const getDataIndex=(index)=> {
    return itemArray[index];
}
// item data update
const itemDataUpdate=(id,name,unitPrice,quantity)=>{
    let item_obj=itemArray.find(item => item.id == id);
    console.log(item_obj);
    item_obj.id=id;
    item_obj.name=name;
    item_obj.unitPrice=unitPrice;
    item_obj.quantity=quantity;
}
export {getItemId,itemData,getItemArray,itemDelete,getDataIndex,itemDataUpdate,getItemName}