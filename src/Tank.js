import { Gun }  from "./Gun";
import { Settings } from "./Settings";

export class Tank {
    constructor (name){
        this.name = name;
        this.settings = new Settings(name)
        this.health = this.settings[this.name].hp;
    }
    get fire (){
        const config = this.settings[this.name];
        this.gun = new Gun(config.gun.random, config.gun.bullets);
        return this.gun.fire;
    }
    get bullets () {
        return this.settings[this.name].gun.bullets;
    }
    doDamage (bullet) {
        return this.health = this.health - bullet.damage;
    }
}




