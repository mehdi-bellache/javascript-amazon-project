export let cart = JSON.parse(localStorage.getItem('cart')) || [] ;

function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(productId){
    const matchingItem = cart.find(element => element.productId === productId);
    const quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
    if(matchingItem){
        matchingItem.quantity ++ ;
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

export function deleteProductFromCart(productId){
    const newCart = cart.filter(cartElement =>{ 
        if( cartElement.productId === productId){
            return false ;
        }
        return true ;
    
    })
    cart = newCart ;

    saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId){
    let matchingItem ;

    cart.forEach(cartItem => {
        if(cartItem.productId === productId){
            matchingItem = cartItem ;
        }
        
    });
    matchingItem.deliveryOptionId = deliveryOptionId ;

    saveToStorage();
}