import { addToCart, cart, loadFromStorage, removeProductFromCart, updateDeliveryOption } from "../../data/cart.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";

describe('test suite: addToCart', () =>{
    const productId = '3ebe75dc-64d2-4137-8860-1f5a963e534b' ;
    beforeEach(() =>{
        spyOn(localStorage, 'setItem');
    })

    it('adds an existing product to the cart', () =>{

        spyOn(localStorage, 'getItem').and.callFake(() =>{
            return JSON.stringify([{
                productId: '3ebe75dc-64d2-4137-8860-1f5a963e534b',
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });
        loadFromStorage();

        addToCart(productId, 1);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
            productId: '3ebe75dc-64d2-4137-8860-1f5a963e534b',
            quantity: 2,
            deliveryOptionId: '1'
        }]));
        expect(cart[0].productId).toEqual(productId) ;
        expect(cart[0].quantity).toEqual(2) ;

    })

    it('adds a new product to the cart', () =>{
        spyOn(localStorage, 'getItem').and.callFake(() =>{
            return JSON.stringify([]);
        });

        loadFromStorage();


        addToCart(productId, 1);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
            productId: '3ebe75dc-64d2-4137-8860-1f5a963e534b',
            quantity: 1,
            deliveryOptionId: '1'
        }]));
        expect(cart[0].productId).toEqual(productId) ;
        expect(cart[0].quantity).toEqual(1) ;

    })

})


describe('test suite: removeProductFromCart', () =>{
    const productId1 = '3ebe75dc-64d2-4137-8860-1f5a963e534b';
    beforeEach(() =>{
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() =>{
            return JSON.stringify([]);
        });

        loadFromStorage();
    })

    it('remove a productId that is in the cart', () =>{
        addToCart(productId1);
        removeProductFromCart(productId1);
        expect(cart.length).toEqual(0);
        expect(localStorage.setItem).toHaveBeenCalledTimes(2);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([]));
        
    })
    it('remove a productId that is not in the cart', () =>{ 
        addToCart(productId1, 1);
        removeProductFromCart('wrong-id');
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual('3ebe75dc-64d2-4137-8860-1f5a963e534b');
        expect(cart[0].quantity).toEqual(1);
        expect(cart[0].deliveryOptionId).toEqual('1');
        expect(localStorage.setItem).toHaveBeenCalledTimes(2);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
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
        spyOn(localStorage, 'getItem').and.callFake(() =>{
            return JSON.stringify([{
                productId: productId1,
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });
    })
    
    it('update the delivery option of a product in the cart', () =>{
        loadFromStorage();
        updateDeliveryOption(productId1, '3');
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual('3ebe75dc-64d2-4137-8860-1f5a963e534b');
        expect(cart[0].quantity).toEqual(1);
        expect(cart[0].deliveryOptionId).toEqual('3');
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    })
    
    it('update the delivery option of a product that is not in the cart', () =>{
        loadFromStorage();
        updateDeliveryOption('wrong-id', '3');
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual('3ebe75dc-64d2-4137-8860-1f5a963e534b');
        expect(cart[0].quantity).toEqual(1);
        expect(cart[0].deliveryOptionId).toEqual('1');
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    })
    
})