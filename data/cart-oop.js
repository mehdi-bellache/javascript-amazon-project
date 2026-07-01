function Cart(localStorageKey){
    const cart = {
    cartItems: undefined,
    loadFromStorage(){ this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [] ; },
    saveToStorage(){ localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems)) ; },
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
    },
    deleteProductFromCart(productId){
        const newCart = this.cartItems.filter(cartElement =>{ 
            if( cartElement.productId === productId){
                return false ;
            }
            return true ;
    
        })
        this.cartItems = newCart ;

        this.saveToStorage();
    },
    calculateCartQuantity(){
        let totalQuantity = 0 ;
        this.cartItems.forEach(cartItem => {
            totalQuantity += cartItem.quantity ; 
        });

        return totalQuantity ;
    },
    updateDeliveryOption(productId, deliveryOptionId){
        let matchingItem ;

        this.cartItems.forEach(cartItem => {
            if(cartItem.productId === productId){
                matchingItem = cartItem ;
            }
        
        });
        matchingItem.deliveryOptionId = deliveryOptionId ;

        this.saveToStorage();
    },
    updateQuantity(productId, newQuantity){
        this.cartItems.forEach((cartItem) => {
            if(cartItem.productId === productId){
                cartItem.quantity = newQuantity ;
            }
        })

        this.saveToStorage();
    }


    };
    return cart ;

}

const cart = Cart();

const businessCart = Cart();


cart.loadFromStorage();

console.log(cart);
console.log(businessCart);



// class Cart{
//     constructor(productId, quantity, deliveryOptionId){
//         this.productId = productId;
//         this.quantity = quantity;
//         this.deliveryOptionId = deliveryOptionId;
//     }

//     get productId(){
//         return this.productId ;
//     }
//     get quantity(){
//         return this.quantity ;
//     }
//     get deliveryOptionId(){
//         return this.deliveryOptionId ;
//     }

//     loadFromStorage(){
//         this.cart = JSON.parse(localStorage.getItem('cart')) ;
//     }
    
//     saveToStorage(){
//         localStorage.setItem('cart', JSON.stringify(this.cart)) || [] ;
//     }


//     addToCart(productId, quantity){
//         const matchingItem = cart.find(element => element.productId === productId);
//         if(matchingItem){
//             matchingItem.quantity += quantity ;
//         }
//         else{
//             cart.push({        
//                 productId,
//                 quantity,
//                 deliveryOptionId: '1'
//             })
//         }
    
//         this.saveToStorage();
    
//     }
    
//     export function deleteProductFromCart(productId){
//         const newCart = cart.filter(cartElement =>{ 
//             if( cartElement.productId === productId){
//                 return false ;
//             }
//             return true ;
        
//         })
//         cart = newCart ;
    
//         saveToStorage();
//     }
    
//     export function calculateCartQuantity(){
//         let totalQuantity = 0 ;
//         cart.forEach(cartItem => {
//             totalQuantity += cartItem.quantity ; 
//         });
    
//         return totalQuantity ;
    
//     }
    
//     export function updateDeliveryOption(productId, deliveryOptionId){
//         let matchingItem ;
    
//         cart.forEach(cartItem => {
//             if(cartItem.productId === productId){
//                 matchingItem = cartItem ;
//             }
            
//         });
//         matchingItem.deliveryOptionId = deliveryOptionId ;
    
//         saveToStorage();
//     }
    
//     export function updateQuantity(productId, newQuantity){
//         cart.forEach((cartItem) => {
//             if(cartItem.productId === productId){
//                 cartItem.quantity = newQuantity ;
//             }
//         })
    
//         saveToStorage();
//     }



// }