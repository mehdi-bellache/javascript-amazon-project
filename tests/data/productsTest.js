import { Product, Clothing, Appliance } from "../../data/products.js";


 getStarsUrl(){
    return `images/ratings/rating-${this.rating.stars * 10}.png` ;
  }

  getPrice(){
    return formatCurrency(this.priceCents);
  }

  extraInfoHTML(){
    return ``;
  }

describe('test suite: Product', () =>{
    const product = new Product({
        id: '1',
        image: 'images/products/test.png',
        rating: {
            stars: 4.5,
            count: 55
        },
        priceCents: 1899
    })

    it('', () =>{
        expect(product.id).toEqual('1');
        expect(product.image).toEqual('images/products/test.png');
        expect(product.rating.stars).toEqual(4.5);
        expect(product.rating.count).toEqual(55);
        expect(product.priceCents).toEqual(1899);
        expect(product.getStarsUrl()).toEqual(`images/ratings/rating-${product.rating.stars * 10}.png`);
        expect(product.getPrice()).toEqual(18.99);
        expect(product.extraInfoHTML()).toEqual(``);
    })

})

describe('Clothing', () =>{

})

describe('Appliance', () =>{

})