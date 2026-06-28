import { cart, addToCart } from "../../data/cart.js";

Describe('test suite: addToCart', () =>{
    it('adds an existing product to the cart', () =>{
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
        expect(cart.length).toEqual(1)

    })
    it('adds a new product to the cart', () =>{
        addToCart('3ebe75dc-64d2-4137-8860-1f5a963e534b')
        expect(cart.length).toEqual(1);

    })

})

// export function addToCart(productId){
//     const matchingItem = cart.find(element => element.productId === productId);
//     const quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
//     if(matchingItem){    
//         matchingItem.quantity ++ ;
//     }
//     else{
//         cart.push({        
//             productId,
//             quantity,
//             deliveryOptionId: '1'
//         })
//     }

//     saveToStorage();

// }