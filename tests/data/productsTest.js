import { Product, Clothing, Appliance, products } from "../../data/products.js";


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
    let product ;
    beforeEach(()=>{
        product = new Product({
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

describe('test suite: Clothing', () =>{
    let product;
    beforeEach(()=>{
        product = new Clothing({
            id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
            image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
            name: "Adults Plain Cotton T-Shirt - 2 Pack",
            rating: {
                stars: 4.5,
                count: 56
            },
            priceCents: 799,
            keywords: [
                "tshirts",
                "apparel",
                "mens"
            ],
            type: "clothing",
            sizeChartLink: "images/clothing-size-chart.png"
        })
    })

    it('has the correct properties', () =>{
        expect(product.id).toEqual('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
        expect(product.image).toEqual('images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg');
        expect(product.rating.stars).toEqual(4.5);
        expect(product.rating.count).toEqual(56);
        expect(product.priceCents).toEqual(799);
        expect(product.sizeChartLink).toEqual('images/clothing-size-chart.png');
    })


    it('gets the stars url', ()=>{
        expect(product.getStarsUrl()).toEqual(`images/ratings/rating-${product.rating.stars * 10}.png`);
    })

    it('gets the correct price', () =>{
        expect(product.getPrice()).toEqual('7.99');
    })

    it('does not display any extra info', () =>{
        expect(product.extraInfoHTML()).toEqual(`<a href="${product.sizeChartLink}" target="_blank">Size chart</a>`);    
    })

})

describe('test suite: Appliance', () =>{
    let product;
    beforeEach(()=>{
        product = new Appliance({
            id: "54e0eccd-8f36-462b-b68a-8182611d9add",
            image: "images/products/black-2-slot-toaster.jpg",
            name: "2 Slot Toaster - Black",
            rating: {
                stars: 5,
                count: 2197
            },
            priceCents: 1899,
            keywords: [
                "toaster",
                "kitchen",
                "appliances"
            ],
            type: "appliance",
            instructionsLink: "images/appliance-instructions.png",
            warrantyLink: "images/appliance-warranty.png"
        })
    })

    it('has the correct properties', () =>{
        expect(product.id).toEqual('54e0eccd-8f36-462b-b68a-8182611d9add');
        expect(product.image).toEqual('images/products/black-2-slot-toaster.jpg');
        expect(product.rating.stars).toEqual(5);
        expect(product.rating.count).toEqual(2197);
        expect(product.priceCents).toEqual(1899);
        expect(product.instructionsLink).toEqual('images/appliance-instructions.png');
        expect(product.warrantyLink).toEqual('images/appliance-warranty.png');
    })


    it('gets the stars url', ()=>{
        expect(product.getStarsUrl()).toEqual(`images/ratings/rating-${product.rating.stars * 10}.png`);
    })

    it('gets the correct price', () =>{
        expect(product.getPrice()).toEqual('18.99');
    })

    it('does not display any extra info', () =>{
        expect(product.extraInfoHTML()).toEqual(
            `<a href="${this.instructionsLink}" target="_blank">Instructions</a> 
            <a href="${this.warrantyLink}" target= "_blank">Warranty.</a>`);    
    })

})