import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { cart, loadFromStorage } from "../../data/cart.js";


describe('test suite: renderOrderSummary', () =>{
    it('displays the cart', () => {
        document.querySelector('.js-test-container').innerHTML =  `
            <div class="js-order-summary"></div> ` ;

        const productId1 = 'e4f64a65-1377-42bc-89a5-e572d19252e2' ;
        const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d' ;
            spyOn(localStorage, 'getItem').and.callFake(() =>{
            return JSON.stringify([{
                productId: productId1,
                quantity: 2,
                deliveryOptions: '2'

            }, {
                productId: productId2,
                quantity: 1,
                deliveryOptions: '2'
            }]);
        });
        loadFromStorage();

        renderOrderSummary();


        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2) ;
        expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 2');
        expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 1');

        document.querySelector('.js-test-container').innerHTML =  `` ;
    })

    it('removes a product', () =>{
        spyOn(localStorage, 'setItem');

        document.querySelector('.js-test-container').innerHTML =  `
            <div class="js-order-summary"></div> 
            <div class="js-payment-summary"></div> ` ;

        const productId1 = 'e4f64a65-1377-42bc-89a5-e572d19252e2' ;
        const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d' ;
        spyOn(localStorage, 'getItem').and.callFake(() =>{
            return JSON.stringify([{
                productId: productId1,
                quantity: 2,
                deliveryOptions: '2'

            }, {
                productId: productId2,
                quantity: 1,
                deliveryOptions: '2'
            }]);
        });
        loadFromStorage();

        renderOrderSummary();

        document.querySelector(`.js-delete-link-${productId1}`).click() ;
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1) ;
        expect(document.querySelectorAll(`.js-cart-item-container-{productId1}`).length).toEqual(null) ;
        expect(document.querySelectorAll(`.js-cart-item-container-{productId2}`).length).not.toEqual(null) ;
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId2);

        document.querySelector('.js-test-container').innerHTML =  `` ;

    })
})