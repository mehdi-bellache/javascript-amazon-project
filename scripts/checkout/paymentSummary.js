import {cart} from '../../data/cart.js' ;



function countItems(){
    let itemsNumber = 0 ;
    cart.forEach(element => {
        itemsNumber += element.quantity ; 
    });

    return itemsNumber ;

}
function renderProducts(){
    document.querySelector('.js-items').innerHTML = `Items ${countItems()}:` ;
}