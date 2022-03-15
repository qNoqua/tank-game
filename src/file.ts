export const yoba = 1;
function sum (a:number):number {
    let b = a*2;
    return b;
}
sum(4);


interface iFone {
    name:string,
    model:number,
}
function phone (phone:iFone):void {
    phone.model
}

interface iCoordinate {
    x:number,
    y:number,
}

interface iTank {
    name:string,
    id:number,
}

interface item {
    coordinate:iCoordinate,
    tank:iTank,
    id:number,
}

function biba (item:item):item {
    return item;
}