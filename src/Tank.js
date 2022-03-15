import { Gun }  from "./Gun";
import { Settings } from "./Settings";
// import { Bullet } from "./Bullet";

export class Tank {
    constructor (name){
        this.name = name;
        this.settings = new Settings(name)
    }
    get healh (){
        return this.settings[this.name].hp;
    }   
    get fire (){
        const config = this.settings[this.name];
        this.gun = new Gun(config.gun.random, config.gun.bullets);
        return this.gun.fire;
    }
    get bullets () {
        return this.settings[this.name].gun.bullets;
    }
     
}




