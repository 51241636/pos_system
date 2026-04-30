import {placeOrderItemArray} from "../db/db.js";

class placeOrderItems{
    #name
    #unitPrice
    #qty

    constructor(name ,unitPrice,qty) {
        this.#name=name;
        this.#unitPrice=unitPrice;
        this.#qty=qty;
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
    set unitPrice(unitPrice){
        this.#unitPrice=unitPrice;
    }
    get qty(){
        return this.#qty
    }
    set qty(qty){
        this.#qty=qty;
    }
}
const addPlaceOrderItems=(name,totalPrice,qty)=>{
    return new placeOrderItems(name,totalPrice,qty);
}
const addPlaceOrderItemsArr=(placeOd)=>{
    placeOrderItemArray.push(placeOd);
}

export {addPlaceOrderItems,addPlaceOrderItemsArr}