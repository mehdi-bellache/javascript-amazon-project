// je dois utiliser cette class Cart qui est dans le fichier cart-class.js au lieu de cart.js

import { validDeliveryOption } from "./deliveryOptions.js";

class Cart{

    cartItems;
    #localStorageKey;

    constructor(localStorageKey){
        this.#localStorageKey =  localStorageKey;
        this.#loadFromStorage();
    }
    #loadFromStorage(){ 
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [] ; 
    }

    saveToStorage(){ 
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems)) ;
    }

    addToCart(productId, quantity){
        const matchingItem = this.cartItems.find(element => element.productId === productId);
        if(matchingItem){
            matchingItem.quantity += quantity ;
        }
        else{
            this.cartItems.push({     
                productId,
                quantity,
                deliveryOptionId: '1'
            })
        }
        this.saveToStorage();
    }

    removeProductFromCart(productId){
        const newCart = this.cartItems.filter(cartElement =>{ 
            if( cartElement.productId === productId){
                return false ;
            }
            return true ;
    
        })
        this.cartItems = newCart ;

        this.saveToStorage();
    }

    calculateCartQuantity(){
        let totalQuantity = 0 ;
        this.cartItems.forEach(cartItem => {
            totalQuantity += cartItem.quantity ; 
        });

        return totalQuantity ;
    }

    updateDeliveryOption(productId, deliveryOptionId){
        let matchingItem ;

        if(!validDeliveryOption(deliveryOptionId)){
            return ;
        }   

        this.cartItems.forEach(cartItem => {
            if(cartItem.productId === productId){
                matchingItem = cartItem ;
            }
        
        });
        if(!matchingItem){
            return ;
        }
        matchingItem.deliveryOptionId = deliveryOptionId ;

        this.saveToStorage();
    }

    updateQuantity(productId, newQuantity){
        this.cartItems.forEach((cartItem) => {
            if(cartItem.productId === productId){
                cartItem.quantity = newQuantity ;
            }
        })

        this.saveToStorage();
    }

    loadCart(fun){
        const xhr = new XMLHttpRequest(fun);
        xhr.addEventListener('load',() =>{
            console.log(xhr.response);
            fun();
        })

        xhr.open('GET', 'https://supersimplebackend.dev/cart' );
        xhr.send();
    }


}

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');


console.log(cart);
console.log(businessCart);

console.log(cart instanceof Cart);
console.log(businessCart instanceof Cart);