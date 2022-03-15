export class Gun {

    constructor (damage, bullets) {
        this.damage = damage;
        this.bullets = bullets;
    }
    get fire () {
        const [ min, max ] = this.damage;
        const shoot = Math.random() * (max - min) + min;
        return Math.round(shoot); 
    }
}




