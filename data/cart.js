export const cart = [{
    productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2
}] ;

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