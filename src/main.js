import { Tank } from "./Tank";
import { Battlefield } from "./Battlefield";
import { BattlefieldController } from "./Controllers/BattlefieldController";
import { Connection } from "./server/Connection";
import "./utils/helpers.js";
import "./styles/styles.scss";
import { BattlefieldViews } from "./views/BattlefieldView";
const tank1 = new Tank("tank_1");
const tank2 = new Tank("tank_2");

const connection = new Connection();
const areaSize = connection.whatIsThisSize();

areaSize
  .then(function (size) {
    let _size = size;
    let positionY = Math.floor(_size.y / 2);
    let positionX_1 = 0;
    let positionX_2 = _size.x - 1;
    console.log("Area Ready");
    const battlefield = new Battlefield(_size.y, _size.x);
    new BattlefieldController(battlefield, tank1, {
      y: positionY,
      x: positionX_1,
      control: controls1,
      direction: "down",
    });
    new BattlefieldController(battlefield, tank2, {
      y: positionY,
      x: positionX_2,
      control: controls2,
      direction: "top",
    });
    const battlefieldViews = new BattlefieldViews();
    setInterval(() => {
      battlefieldViews.update(battlefield.coordinates);
    }, 150);
  })
  .catch(function (e) {
    console.error("Area Error");
    console.log(e);
  });

const controls1 = {
  UP: "KeyW",
  DOWN: "KeyS",
  LEFT: "KeyA",
  RIGHT: "KeyD",
  FIRE: "Space",
};
const controls2 = {
  UP: "ArrowUp",
  DOWN: "ArrowDown",
  LEFT: "ArrowLeft",
  RIGHT: "ArrowRight",
  FIRE: "Enter",
};
