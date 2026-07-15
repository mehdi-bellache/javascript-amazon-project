// import { calculateCartQuantity } from "../../data/cart.js" ;
import { cart } from "../../data/cart-class.js" ;

export function renderCheckoutHeader(){
    document.querySelector('.js-checkout-header-middle-section').innerHTML = `Checkout (<a class="return-to-home-link"
            href="amazon.html">${cart.calculateCartQuantity()}</a>)` ;
}