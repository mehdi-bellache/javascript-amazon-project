import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage } from "../../data/cart.js";


describe('test suite: renderOrderSummary', () =>{
    it('displays the cart', () => {
        document.querySelector('.js-test-container').innerHTML =  `
            <div class="js-order-summary"></div> ` ;

    spyOn(localStorage, 'getItem').and.callFake(() =>{
            return JSON.stringify([{
                productId: 'e4f64a65-1377-42bc-89a5-e572d19252e2',
                quantity: 2,
                deliveryOptions: '2'

            }, {
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptions: '2'
            }]);
        });
        loadFromStorage();

        renderOrderSummary();
    })
})