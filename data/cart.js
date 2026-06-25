export let cart = JSON.parse(localStorage.getItem('cart')) || [] ;

function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(productId){
    const matchingItem = cart.find(element => element.productId === productId);
    if(matchingItem){
        matchingItem.quantity ++ ;
    }
    else{
        cart.push({        
            productId: productId,
            quantity: 1,
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