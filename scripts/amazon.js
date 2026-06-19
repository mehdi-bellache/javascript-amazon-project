function buildQuantitySelect(){
    let html = `<select> <option selected value="1">1</option>` ; 
    for(let i = 2; i<=10; i++){
        html += `<option value="${i}">${i}</option> ` ;
    }

    html += `</select>` ;

    return html ;
}


function buildProductHTML(product){
    let html = `<div class = "product-container">` ;
    html += `<div class="product-image-container"><img class="product-image" src = ${product.image} ></div>` ;
    html += `<div class="product-name limit-text-to-2-lines">${product.name}</div> ` ; 
    html += `<div class="product-rating-container"> <img class="product-rating-stars" src = "images/ratings/rating-${product.rating.stars * 10}.png"> <div class= "product-rating-count link-primary">${product.rating.count} </div></div>` ;
    html += `<div class= "product-price"> $${(product.priceCents / 100).toFixed(2)} </div> `;
    html += `<div class = "product-quantity-container"> ${buildQuantitySelect()}</div>` ;
    html += `<div class= "product-spacer"> </div>`;
    html += `<div class= "added-to-cart"> <img src="images/icons/checkmark.png">Added</div>`;
    html += `<button class= "add-to-cart-button button-primary js-add-to-cart" data-product-name="${product.name}">Add to Cart</button>` ;
    html += `</div>` ;
    
    return html ;
}



function buildAllProductsHTML(products){
    let allProductsHTML = `` ;
    products.forEach(product => {
        allProductsHTML += buildProductHTML(product) ;
    });

    return allProductsHTML ;

}

function renderProducts(){
    document.querySelector('.products-grid').innerHTML = buildAllProductsHTML(products);
}

renderProducts() ;

document.querySelectorAll('.js-add-to-cart').forEach((button) => { 
    button.addEventListener('click', function(){ 
       const productName = button.dataset.productName ; })
    // we are not sure if the quantity to be added is only one or not.
    

    // document.querySelector('.cart-quantity').innerHTML = Number(document.querySelector('.cart-quantity').textContent) + 1 ;
})