class RaceCar extends Car{
    acceleration;
    constructor(acceleration){
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

