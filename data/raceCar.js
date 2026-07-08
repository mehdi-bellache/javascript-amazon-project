import { Car } from '../data/car.js' ;
export class RaceCar extends Car{
    acceleration;
    constructor(brand, model, acceleration){
        super(brand, model);
        this.acceleration = acceleration ;
    }

    go(){
        if( this.isTrunkOpen === false){
            if( this.speed < 300){
                this.speed += this.acceleration ;
            }
        }
    }

    openTrunk(){}
    closeTrunk(){}

}

const car1 = new RaceCar('McLaren', 'F1', 20);
car1.displayInfo();
car1.go();
car1.displayInfo();
car1.openTrunk();
car1.displayInfo();