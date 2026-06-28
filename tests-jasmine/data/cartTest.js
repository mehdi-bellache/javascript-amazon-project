import { cart, loadFromStorage, addToCart } from "../../data/cart.js";

describe('test suite: addToCart', () =>{
    // it('adds an existing product to the cart', () =>{
    //     addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
    //     addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
    //     expect(cart.length).toEqual(1);

    // })
    it('adds a new product to the cart', () =>{

        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() =>{
            return JSON.stringify([]);
        });
        loadFromStorage();

        const productId = '3ebe75dc-64d2-4137-8860-1f5a963e534b' ;

        document.querySelector('.js-test-container').innerHTML = `
            <select class="js-quantity-selector-${productId}">
                <option value="1" selected>1</option>
            </select>
        `;

        addToCart(productId);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    })

})