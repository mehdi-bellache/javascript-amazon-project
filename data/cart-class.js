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

const cart = Cart('cart-oop');

const businessCart = Cart('cart-business');


cart.loadFromStorage();

console.log(cart);
console.log(businessCart);