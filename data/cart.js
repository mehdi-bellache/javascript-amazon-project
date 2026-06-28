export let cart ;

export function loadFromStorage(){
    cart = JSON.parse(localStorage.getItem('cart')) || [] ;
}

loadFromStorage();

function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
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