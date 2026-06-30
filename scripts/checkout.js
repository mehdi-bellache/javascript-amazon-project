import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js" ;
import { calculateCartQuantity } from "../data/cart.js" ;

export function renderCheckoutHeader(){
    document.querySelector('.js-checkout-header-middle-section').innerHTML = `Checkout (<a class="return-to-home-link"
            href="amazon.html">${calculateCartQuantity()}</a>)` ;
}


renderOrderSummary();
renderPaymentSummary();
renderCheckoutHeader();
