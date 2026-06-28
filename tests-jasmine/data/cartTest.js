import { addToCart } from "../../data/cart.js";



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