import { getDeliveryOption } from "./deliveryOptions";

export let cart ;

loadFromStorage();

export function loadFromStorage(){
    cart = JSON.parse(localStorage.getItem('cart')) || [];
}

function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart))  ;
}

export function addToCart(productId, quantity){
    const matchingItem = cart.find(element => element.productId === productId);
    if(matchingItem){
        matchingItem.quantity += quantity ;
    }
    else{
        cart.push({        
            productId,
            quantity,
            deliveryOptionId: '1'
        })
    }

    saveToStorage();

}

export function removeProductFromCart(productId){
    const newCart = cart.filter(cartElement =>{ 
        if( cartElement.productId === productId){
            return false ;
        }
        return true ;
    
    })
    cart = newCart ;

    saveToStorage();
}

export function calculateCartQuantity(){
    let totalQuantity = 0 ;
    cart.forEach(cartItem => {
        totalQuantity += cartItem.quantity ; 
    });

    return totalQuantity ;

}

export function updateDeliveryOption(productId, deliveryOptionId){
    let matchingItem ;
    
    if(!getDeliveryOption(deliveryOptionId)){
        return ;
    }

    cart.forEach(cartItem => {
        if(cartItem.productId === productId){
            matchingItem = cartItem ;
        }
        
    });
    if(!matchingItem){
        return ;
    }

    matchingItem.deliveryOptionId = deliveryOptionId ;

    saveToStorage();
}

export function updateQuantity(productId, newQuantity){
    cart.forEach((cartItem) => {
        if(cartItem.productId === productId){
            cartItem.quantity = newQuantity ;
        }
    })

    saveToStorage();
}

export function loadCart(fun){

  const xhr = new XMLHttpRequest(fun);
  xhr.addEventListener('load',() =>{
    console.log(xhr.response);
    fun();
  })

  xhr.open('GET', 'https://supersimplebackend.dev/cart' );
  xhr.send();
}