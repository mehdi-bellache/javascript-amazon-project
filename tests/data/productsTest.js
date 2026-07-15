import { Product, Clothing, Appliance } from "../../data/products.js";


//  getStarsUrl(){
//     return `images/ratings/rating-${this.rating.stars * 10}.png` ;
//   }

//   getPrice(){
//     return formatCurrency(this.priceCents);
//   }

//   extraInfoHTML(){
//     return ``;
//   }

describe('test suite: Product', () =>{
    const product = new Product({
        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        image: "images/products/athletic-cotton-socks-6-pairs.jpg",
        name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
        rating: {
            stars: 4.5,
            count: 87
        },
        priceCents: 1090,
        keywords: [
            "socks",
            "sports",
            "apparel"
        ]
    })

    it('has the correct properties', () =>{
        expect(product.id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(product.image).toEqual('images/products/athletic-cotton-socks-6-pairs.jpg');
        expect(product.rating.stars).toEqual(4.5);
        expect(product.rating.count).toEqual(87);
        expect(product.priceCents).toEqual(1090);
    })

    it('gets the stars url', ()=>{
        expect(product.getStarsUrl()).toEqual(`images/ratings/rating-${product.rating.stars * 10}.png`);
    })

    it('gets the correct price', () =>{
        expect(product.getPrice()).toEqual('10.90');
    })

    it('does not display any extra info', () =>{
        expect(product.extraInfoHTML()).toEqual(``);    
    })


})

// describe('Clothing', () =>{

// })

// describe('Appliance', () =>{

// })