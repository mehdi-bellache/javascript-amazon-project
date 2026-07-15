import { cart } from "../../data/cart-class.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";

describe('test suite: addToCart', () =>{
    const productId = '3ebe75dc-64d2-4137-8860-1f5a963e534b' ;
    beforeEach(() =>{
        spyOn(localStorage, 'setItem');
    })

    it('adds an existing product to the cart', () =>{

        cart.cartItems = [{
            productId: '3ebe75dc-64d2-4137-8860-1f5a963e534b',
            quantity: 1,
            deliveryOptionId: '1'
        }]

        cart.addToCart(productId, 1);
        expect(cart.cartItems.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
            productId: '3ebe75dc-64d2-4137-8860-1f5a963e534b',
            quantity: 2,
            deliveryOptionId: '1'
        }]));
        expect(cart.cartItems[0].productId).toEqual(productId) ;
        expect(cart.cartItems[0].quantity).toEqual(2) ;

    })

    it('adds a new product to the cart', () =>{

        cart.cartItems = [];
        cart.addToCart(productId, 1);
        expect(cart.cartItems.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
            productId: '3ebe75dc-64d2-4137-8860-1f5a963e534b',
            quantity: 1,
            deliveryOptionId: '1'
        }]));
        expect(cart.cartItems[0].productId).toEqual(productId) ;
        expect(cart.cartItems[0].quantity).toEqual(1) ;

    })

})


describe('test suite: removeProductFromCart', () =>{
    const productId1 = '3ebe75dc-64d2-4137-8860-1f5a963e534b';
    beforeEach(() =>{
        spyOn(localStorage, 'setItem');
        cart.cartItems = [];

    })

    it('remove a productId that is in the cart', () =>{
        cart.addToCart(productId1);
        cart.removeProductFromCart(productId1);
        expect(cart.cartItems.length).toEqual(0);
        expect(localStorage.setItem).toHaveBeenCalledTimes(2);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([]));
        
    })
    it('remove a productId that is not in the cart', () =>{ 
        cart.addToCart(productId1, 1);
        cart.removeProductFromCart('wrong-id');
        expect(cart.cartItems.length).toEqual(1);
        expect(cart.cartItems[0].productId).toEqual('3ebe75dc-64d2-4137-8860-1f5a963e534b');
        expect(cart.cartItems[0].quantity).toEqual(1);
        expect(cart.cartItems[0].deliveryOptionId).toEqual('1');
        expect(localStorage.setItem).toHaveBeenCalledTimes(2);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
            productId: productId1,
            quantity: 1,
            deliveryOptionId: '1'
        }]));
        
    })
})

describe('test suite: updateDeliveryOption', () =>{
    const productId1 = '3ebe75dc-64d2-4137-8860-1f5a963e534b';
    beforeEach(() =>{
        spyOn(localStorage, 'setItem');
        cart.cartItems = [{
            productId: productId1,
            quantity: 1,
            deliveryOptionId: '1'
        }]
    })
    
    it('update the delivery option of a product in the cart', () =>{
        cart.updateDeliveryOption(productId1, '3');
        expect(cart.cartItems.length).toEqual(1);
        expect(cart.cartItems[0].productId).toEqual('3ebe75dc-64d2-4137-8860-1f5a963e534b');
        expect(cart.cartItems[0].quantity).toEqual(1);
        expect(cart.cartItems[0].deliveryOptionId).toEqual('3');
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    })
    
    it('update the delivery option of a product that is not in the cart', () =>{
        cart.updateDeliveryOption('wrong-id', '3');
        expect(cart.cartItems.length).toEqual(1);
        expect(cart.cartItems[0].productId).toEqual('3ebe75dc-64d2-4137-8860-1f5a963e534b');
        expect(cart.cartItems[0].quantity).toEqual(1);
        expect(cart.cartItems[0].deliveryOptionId).toEqual('1');
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    })

    it('use a delivery option that does not exist in the cart', () =>{
        cart.updateDeliveryOption(productId1, 'wrong-deliveryOptionId');
        expect(cart.cartItems.length).toEqual(1);
        expect(cart.cartItems[0].productId).toEqual('3ebe75dc-64d2-4137-8860-1f5a963e534b');
        expect(cart.cartItems[0].quantity).toEqual(1);
        expect(cart.cartItems[0].deliveryOptionId).toEqual('1');
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    })
    
})