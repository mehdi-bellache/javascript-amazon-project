function buildSelect(){
    let word ; 
    word = '<select> <option selected value="1">1</option>' ; 
    for(let i = 2; i<=10; i++){
        word += '<option value="${i}">${i}</option> ' ;
    }

    word += '</select>' ;
}

ll

function f1(element){
    let word = '<div class = "product-container">'
    word += '<div class="product-image-container"><img class="product-image" src = ${element.image} ></div>' ;
    word += '<div class="product-name limit-text-to-2-lines">${element.name}</div>' ; 
    word += '<div class="product-rating-container"> <img class="product-rating-stars" src = "images/ratings/rating-${element.ratings.stars * 10}.png"> <div class= "product-rating-count link-primary">${element.ratings.count} </div></div>' ;
    word += '<div class= "product-price"> $${element.priceCents / 100} </div>';
    word += '<div class= "product-price"> $${element.priceCents / 100} </div>';
    word += '<div class = "product-quantity-container"> ${buildSelect()}</div>' ;
    word += '<div class= "product-spacer"> </div>';
    word += '<div class= "added-to-cart"> <img src="images/icons/checkmark.png">Added</div>';
    word += '<button class= "add-to-cart-button button-primary">Add to Cart</button>';
    word += '</div>'
    
    return word ;
}



function f2(array){
    let result ;
    array.forEach(element => {
        result += f1(element) ;
    });

    return result ;

}