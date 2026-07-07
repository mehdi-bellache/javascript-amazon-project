export class Car{
    brand;
    model;
    speed ;
    isTrunkOpen;

    constructor(brand, model, isTrunkOpen){
        this.brand = brand;
        this.model = model;
        this.speed = 0;
        this.isTrunkOpen = isTrunkOpen ;
    }

    displayInfo(){
        console.log(`${this.brand} ${this.model}, Speed: ${this.speed} km/h`);
    }

    go(){
        if( this.speed < 200){
            this.speed += 5 ;
        }
        
    }

    brake(){
        if(this.speed > 0){
            this.speed -= 5 ;
        }
    }

    openTrunk(){
        if(this.speed === 0){
            this.isTrunkOpen = true ;
        }
    }
    
    closeTrunk(){
        this.isTrunkOpen = true ;
    }
}

const car1 = new Car('Toyota', 'Corolla');
const car2 = new Car('Tesla', 'Model 3');


car1.displayInfo();
car1.go();
car1.go();
car1.displayInfo();
car2.displayInfo();
car2.go();
car2.go();
car2.brake();
car2.displayInfo();