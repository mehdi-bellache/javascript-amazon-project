export const cart = [] ;

export function addToCart(productId){
    const matchingItem = cart.find(element => element.productId === productId);
    if(matchingItem){
        matchingItem.quantity ++ ;
    }
    else{
        cart.push({        
            productId: productId,
            quantity: 1
        })
    }

}