(function(t){function e(e){for(var i,r,s=e[0],u=e[1],c=e[2],d=0,h=[];d<s.length;d++)r=s[d],Object.prototype.hasOwnProperty.call(o,r)&&o[r]&&h.push(o[r][0]),o[r]=0;for(i in u)Object.prototype.hasOwnProperty.call(u,i)&&(t[i]=u[i]);l&&l(e);while(h.length)h.shift()();return a.push.apply(a,c||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],i=!0,s=1;s<n.length;s++){var u=n[s];0!==o[u]&&(i=!1)}i&&(a.splice(e--,1),t=r(r.s=n[0]))}return t}var i={},o={app:0},a=[];function r(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=t,r.c=i,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(n,i,function(e){return t[e]}.bind(null,i));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/tank-game/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],u=s.push.bind(s);s.push=e,s=s.slice();for(var c=0;c<s.length;c++)e(s[c]);var l=u;a.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"3c61":function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var i=n("d4ec"),o=n("bee2"),a=(n("b0c0"),n("3835")),r=function(){function t(e,n){Object(i["a"])(this,t),this.damage=e,this.bullets=n}return Object(o["a"])(t,[{key:"fire",get:function(){var t=Object(a["a"])(this.damage,2),e=t[0],n=t[1],i=Math.random()*(n-e)+e;return Math.round(i)}}]),t}(),s=n("ade3"),u=Object(o["a"])((function t(){Object(i["a"])(this,t),Object(s["a"])(this,"tank_1",{gun:{random:[15,45],bullets:5},hp:120}),Object(s["a"])(this,"tank_2",{gun:{random:[13,38],bullets:6},hp:130})})),c=function(){function t(e){Object(i["a"])(this,t),this.name=e,this.settings=new u(e),this.health=this.settings[this.name].hp}return Object(o["a"])(t,[{key:"fire",get:function(){var t=this.settings[this.name];return this.gun=new r(t.gun.random,t.gun.bullets),this.gun.fire}},{key:"bullets",get:function(){return this.settings[this.name].gun.bullets}},{key:"doDamage",value:function(t){return this.health=this.health-t.damage}}]),t}(),l=n("b85c"),d=(n("cb29"),n("7db0"),n("d3b7"),n("4de4"),n("caad"),{empty:" ",tank:"T",mount:"M",bullet:"B"}),h=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:8,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:8;Object(i["a"])(this,t),Object(s["a"])(this,"tanks",[]),Object(s["a"])(this,"bullets",[]),Object(s["a"])(this,"mountains",[]),Object(s["a"])(this,"coordinates",[]),Object(s["a"])(this,"timers",[]),Object(s["a"])(this,"bulletCounter",0),this.createArea(e,n),this.addMountains(e,n)}return Object(o["a"])(t,[{key:"createArea",value:function(t,e){this.coordinates=[];for(var n=0;n<e;n++){var i=new Array(t).fill(d.empty);this.coordinates.push(i)}}},{key:"addMountains",value:function(t,e){for(var n=2*Math.round(Math.random()*t+Math.random()*e),i=0;i<n;i++){var o=Math.floor(Math.random()*t),a=Math.floor(Math.random()*e),r={coordinates:{x:o,y:a},hp:3};this.coordinates[a][o]=d.mount,this.mountains.push(r)}}},{key:"addPlayer",value:function(t,e){var n={tank:t,coordinates:e,id:this.tanks.length};return this.tanks.length>=this.coordinates[0].length*this.coordinates.length||this.isTankOnCoord(n.coordinates.x,n.coordinates.y)?"error":(this.tanks.push(n),this.updateBattlefieldCoordinates(n.coordinates,n.coordinates,d.tank),n)}},{key:"getTankByCoords",value:function(t,e){return this.tanks.find((function(n){return n.coordinates.x===t&&n.coordinates.y===e}))}},{key:"isTankOnCoord",value:function(t,e){return this.tanks.some((function(n){return n.coordinates.x===t&&n.coordinates.y===e}))}},{key:"isMountOnCoords",value:function(t,e){var n,i=!1,o=Object(l["a"])(this.mountains);try{for(o.s();!(n=o.n()).done;){var a=n.value;a.coordinates.x===t&&a.coordinates.y===e&&(a.hp--,a.hp<=0?(this.destroyMount(a),i=!1):i=!0)}}catch(r){o.e(r)}finally{o.f()}return i}},{key:"setTankPosition",value:function(t,e){var n=this.tanks[t];return void 0===n||this.isTankOnCoord(e.x,e.y)||this.isMountOnCoords(e.x,e.y)||!0!==this.isPointOnArea(e.x,e.y)?"error":(this.updateBattlefieldCoordinates(n.coordinates,e,d.tank),this.tanks[t].coordinates=e,n)}},{key:"isPointOnArea",value:function(t,e){return!(t<0||e<0)&&(!(t>this.coordinates[0].length-1)&&!(e>this.coordinates.length-1))}},{key:"updateBattlefieldCoordinates",value:function(t,e,n){this.coordinates[t.y][t.x]=d.empty,this.coordinates[e.y][e.x]=n}},{key:"destroyMount",value:function(t){this.coordinates[t.coordinates.y][t.coordinates.x]=d.empty,this.mountains=this.mountains.filter((function(t){return t.hp>1}))}},{key:"addBullet",value:function(t){var e=this,n=this.changeBulletCoordinates(t),i={coordinates:n,id:this.bulletCounter,damage:150},o=function t(){return setTimeout((function(){var n=e.isBulletAvailableToMove(i);n&&(t(),"function"===typeof e.bulletUpdateCallback&&e.bulletUpdateCallback(i))}),150)};this.bullets.push(i),this.bulletCounter++,o(),this.updateBattlefieldCoordinates(n,n,d.bullet),"function"===typeof this.bulletUpdateCallback&&this.bulletUpdateCallback(i)}},{key:"changeBulletCoordinates",value:function(t){switch(t.direction){case"top":return{y:t.y,x:t.x-1,direction:t.direction};case"down":return{y:t.y,x:t.x+1,direction:t.direction};case"left":return{x:t.x,y:t.y-1,direction:t.direction};case"right":return{x:t.x,y:t.y+1,direction:t.direction}}}},{key:"isBulletAvailableToMove",value:function(t){var e={x:t.coordinates.x,y:t.coordinates.y};return this.collisionBullet(t.id)?(t.coordinates=this.changeBulletCoordinates(t.coordinates),this.updateBattlefieldCoordinates(e,t.coordinates,d.bullet),!0):(this.updateBattlefieldCoordinates(e,t.coordinates,d.kust),!1)}},{key:"collisionBullet",value:function(t){var e=this.bullets.find((function(e){return e.id===t}));if(e){var n=e.coordinates.x,i=e.coordinates.y;if(["top","down"].includes(e.coordinates.direction)&&(n+="top"==e.coordinates.direction?-1:1),["left","right"].includes(e.coordinates.direction)&&(i+="left"==e.coordinates.direction?-1:1),!this.isPointOnArea(n,i))return this.removeBullet(t),!1;if(this.isMountOnCoords(n,i))return this.removeBullet(t),!1;var o=this.getTankByCoords(n,i);if(void 0!==o){var a=o.tank.health;return o.tank.doDamage(e),a<=0&&(this.removeTank(o.id),this.updateBattlefieldCoordinates(o.coordinates,o.coordinates,d.kust),this.gameOverCallback(this.tanks)),!1}return!0}}},{key:"removeBullet",value:function(t){this.bullets=this.bullets.filter((function(e){return t!==e.id}))}},{key:"addBulletUpdateCallback",value:function(t){this.bulletUpdateCallback=t}},{key:"removeTank",value:function(t){this.tanks=this.tanks.filter((function(e){return t!==e.id}))}},{key:"addGameCallback",value:function(t){this.gameOverCallback=t}}]),t}(),f=(n("99af"),function(){function t(){Object(i["a"])(this,t)}return Object(o["a"])(t,[{key:"init",value:function(t){if(null===document.querySelector(".container")){this.coordinates=t;var e=document.createElement("div");e.classList.add("container");for(var n=0;n<t.length;n++){var i=t[n],o=document.createElement("div");o.classList.add("row");for(var a=0;a<i.length;a++){var r=this.createSection(i[n],n,a);o.appendChild(r)}e.appendChild(o)}document.body.appendChild(e)}}},{key:"update",value:function(t){this.coordinates=t;for(var e=0;e<t.length;e++)for(var n=t[e],i=0;i<n.length;i++)document.querySelector('[data-y="'.concat(i,'"][data-x="').concat(e,'"]')).dataset.type=n[i]}},{key:"createSection",value:function(t,e,n){var i=document.createElement("div");return i.classList.add("cell"),i.dataset.type=t,i.dataset.x=e,i.dataset.y=n,i}},{key:"updateTankPosition",value:function(t,e,n){var i=document.getElementById(e);i&&(i.removeAttribute("id"),i.classList.remove("left","right","top","down"));var o=document.querySelector('[data-y="'.concat(t.x,'"][data-x="').concat(t.y,'"]'));o.id=e,o.classList.add(n)}},{key:"updateBulletDirection",value:function(t){var e=document.querySelector('[data-y="'.concat(t.coordinates.x,'"][data-x="').concat(t.coordinates.y,'"]'));e.classList.add(t.coordinates.direction)}}]),t}());function y(t,e){var n=!0;return function(){n&&(setTimeout((function(){n=!0}),e),n=!1,t.apply(this,arguments))}}var v=function(){function t(e,n,o){Object(i["a"])(this,t),this.battlefield=e,this.tank=n,this.config=o,this.onKeyDown=y(this.onKeyDown,150),this.onFireButtonPress=y(this.onFireButtonPress,2e3),this.initBattlefieldView(),this.player=e.addPlayer(n,o),this.updatePlayer(),this.updateTankPosition(o.direction),this.eventListener()}return Object(o["a"])(t,[{key:"initBattlefieldView",value:function(){this.battlefieldView=new f,this.battlefieldView.init(this.battlefield.coordinates)}},{key:"updatePlayer",value:function(){this.battlefieldView.update(this.battlefield.coordinates)}},{key:"onKeyDown",value:function(t){t.code===this.config.control.UP&&(this.moveTop(),this.updatePlayer()),t.code===this.config.control.DOWN&&(this.moveDown(),this.updatePlayer()),t.code===this.config.control.LEFT&&(this.moveLeft(),this.updatePlayer()),t.code===this.config.control.RIGHT&&(this.moveRight(),this.updatePlayer())}},{key:"eventListener",value:function(){var t=this;document.addEventListener("keydown",(function(e){return t.onFireButtonPress(e)})),document.addEventListener("keydown",(function(e){return t.onKeyDown(e)})),this.battlefield.addBulletUpdateCallback((function(e){t.battlefieldView.updateBulletDirection(e)})),this.battlefield.addGameCallback((function(t){console.log(t),alert("Игрок ".concat(t[0].tank.name," победил"))}))}},{key:"updateConfig",value:function(t){"error"!==t&&(this.config.x=t.coordinates.x,this.config.y=t.coordinates.y)}},{key:"moveTop",value:function(){var t=this.config,e=t.x,n=t.y,i=this.battlefield.setTankPosition(this.player.id,{y:n,x:e-1});this.updateConfig(i),this.updateTankPosition("top")}},{key:"moveDown",value:function(){var t=this.config,e=t.y,n=t.x,i=this.battlefield.setTankPosition(this.player.id,{y:e,x:n+1});this.updateConfig(i),this.updateTankPosition("down")}},{key:"moveLeft",value:function(){var t=this.config,e=t.y,n=t.x,i=this.battlefield.setTankPosition(this.player.id,{y:e-1,x:n});this.updateConfig(i),this.updateTankPosition("left")}},{key:"moveRight",value:function(){var t=this.config,e=t.y,n=t.x,i=this.battlefield.setTankPosition(this.player.id,{y:e+1,x:n});this.updateConfig(i),this.updateTankPosition("right")}},{key:"updateTankPosition",value:function(t){this.player.coordinates.direction=t,this.battlefieldView.updateTankPosition(this.player.coordinates,this.player.id,t)}},{key:"onFireButtonPress",value:function(t){t.code===this.config.control.FIRE&&this.battlefield.addBullet(this.player.coordinates)}}]),t}(),p=n("1da1"),b=n("4143"),k=n("34d8"),m=(n("96cf"),n("3ca3"),n("1fe2"),n("ddb0"),new WeakSet),g=function(){function t(){Object(i["a"])(this,t),Object(b["a"])(this,m)}return Object(o["a"])(t,[{key:"requestFieldSize",value:function(){return new Promise((function(t,e){setTimeout((function(){var n=8+Math.ceil(16*Math.random()),i=n;Math.random()>=0?t({x:n,y:i}):e("SLOMANO")}),1500*Math.random())}))}},{key:"requestSecondPlayerPosition",value:function(){var t=Object(p["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(k["a"])(this,m,w).call(this);case 2:return t.abrupt("return",{x:0,y:3});case 3:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},{key:"requestAllowingToPlay",value:function(){var t=Object(p["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",new Promise((function(t){setTimeout((function(){t(Math.random()>.5)}),3e3*Math.random())})));case 1:case"end":return t.stop()}}),t)})));function e(){return t.apply(this,arguments)}return e}()}]),t}();function w(){return new Promise((function(t){setTimeout((function(){t()}),3e3*Math.random())}))}var O=function(){function t(){Object(i["a"])(this,t),this.serverConnect=new g}return Object(o["a"])(t,[{key:"whatIsThisSize",value:function(){return this.serverConnect.requestFieldSize()}},{key:"isReadyPlayer",value:function(){}}]),t}(),x=(n("3c61"),new c("tank_1")),P=new c("tank_2"),C=new O,T=C.whatIsThisSize();T.then((function(t){var e=t,n=Math.floor(e.y/2),i=0,o=e.x-1;console.log("Area Ready");var a=new h(e.y,e.x);new v(a,x,{y:n,x:i,control:j,direction:"down"}),new v(a,P,{y:n,x:o,control:B,direction:"top"});var r=new f;setInterval((function(){r.update(a.coordinates)}),150)})).catch((function(t){console.error("Area Error"),console.log(t)}));var j={UP:"KeyW",DOWN:"KeyS",LEFT:"KeyA",RIGHT:"KeyD",FIRE:"Space"},B={UP:"ArrowUp",DOWN:"ArrowDown",LEFT:"ArrowLeft",RIGHT:"ArrowRight",FIRE:"Enter"}}});
//# sourceMappingURL=app.068d032a.js.map