import { Scene } from "phaser";
import { Engine } from "../../ecs";
import GameManager from "../systems/GameManager";
import Render from "../systems/Render";
// import store from "../store";
// import * as gameActions from "../store/actions/game";

export default class Main extends Scene {
  private _ecs!: Engine;

  create() {
    this._ecs = new Engine();
    // NOTE: minimal set up to get something rendering to screen, GameManager & Render
    this._ecs.addSystem(new GameManager(this._ecs));
    // this._ecs.addSystem(new Input(this._ecs, this));
    // AI
    this._ecs.addSystem(new Render(this._ecs, this));

    //   // TODO: add systems...
    //   // TODO: preload the default set of update functions !!!
    //   // TODO: handle priority lists...
    //   // [
    //   //   [sys, sys, ...], // INPUT: 0
    //   //   [sys, sys,...], // AI: 1
    //   //   ...
    //   // ]
    //   // ecs.addSystem(new Input(ecs), PRIORITY.INPUT); // NOTE: process inputs from player
    //   // // ecs.addSystem(new AI(ecs), PRIORITY.AI); // TODO: essentially second set of inputs, but from computer. This is NOT a default system, but users will slot any AI system in this order of priority !!!
    //   // // ecs.addSystem(new Physics(ecs), PRIORITY.PHYSICS);
    //   // ecs.addSystem(new Movement(ecs), PRIORITY.MOVEMENT);
    //   // // ecs.addSystem(new Collision(ecs), PRIORITY.COLLISION);
    //   // // TODO: ... (more game specific systems, PRIORITY.GAMEPLAY) need to dynamically load after default ones are set...
    //   // // ecs.addSystem(new Render(ecs), PRIORITY.RENDER, (optional_inner_priority)); // NOTE: render the result
    //   // ecs.addSystem(new Render(ecs), PRIORITY.RENDER); // NOTE: render the result
  }

  update(time: number, deltaTime: number) {
    this._ecs.update(deltaTime);
  }
}

// export default class Example extends Scene {
//   preload() {
//     // debugger
//     // TODO: load these assets in some ECS step...
//     this.load.image("turtle", "assets/turtle.jpg");
//     // this.load.image("sky", "assets/sky.png");
//     // this.load.image("ground", "assets/platform.png");
//     // this.load.image("star", "assets/star.png");
//     // this.load.image("bomb", "assets/bomb.png");
//     this.load.spritesheet("dude", "assets/dude.png", { frameWidth: 32, frameHeight: 48 });
//   }

//   create() {
//     // const text = this.add.text(250, 250, "Toggle UI", {
//     //   backgroundColor: "white",
//     //   color: "blue",
//     //   fontSize: 48,
//     // });

//     // text.setInteractive({ useHandCursor: true });

//     // text.on("pointerup", () => {
//     //   store.dispatch(gameActions.showUI(!store.getState().showUi));
//     // });

//     // this.add.image(800, 800, "turtle").setScale(2, 2);

//     this.anims.create({
//       key: "left",
//       frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
//       frameRate: 10,
//       repeat: -1,
//     });

//     let player;
//     let quadPlayer;

//     // TODO: perf test vs Babylon JS.
//     // TODO: animate & skew!
//     // for (let i = 0; i < 10; i++) {
//     //   // const image1 = this.add.image(100 * (i % 7), 300, 'ayu');
//     //   player = this.add.sprite(100 + 20 * (i % 50), 300, "dude");
//     //   // player = this.add.quad(100 * (i % 7), 300, 'dude');
//     //   // player = new Phaser.GameObjects.Quad(this, 100 * (i % 7), 300, 'dude');
//     //   player.anims.play("left", true);
//     // }

//     this.dudeQuads = [];

//     // can handle 40k @ 60fps; 60k at 45fps;
//     // for (let i = 0; i < 40000; i++) {
//     for (let i = 0; i < 4; i++) {
//       quadPlayer = this.add.quad(100 + 20 * (i % 50), 300, "dude");
//       // quadPlayer.topLeftX = -10;
//       quadPlayer.scaleY = 0.4;
//       const skewFactor = 40;
//       quadPlayer.topLeftX = quadPlayer.x - 32 / 2 - skewFactor;
//       quadPlayer.topRightX = quadPlayer.x + 32 / 2 - skewFactor;
//       this.dudeQuads.push(quadPlayer);
//     }

//     // debugger;

//     // cursors = this.input.keyboard.onKeyDown(e => {
//     //   console.log(e);
//     // });

//     // this.input.keyboard.on("keydown_UP", e => {
//     //   // TODO: need access to delta time, maybe set flag here and act on it in update?
//     //   console.log(e);
//     //   // this.cameras.main.y += this.scrollSpeed;

//     //   this.cameras.main.pan(500, 500, 2000, "Power2"); // messing around with pan and zoom
//     //   this.cameras.main.zoomTo(4, 3000);
//     // });

//     // this.input.keyboard.on("keydown_DOWN", e => {
//     //   this.cameras.main.y -= this.scrollSpeed;
//     // });

//     // this.input.keyboard.on("keydown_LEFT", e => {
//     //   this.cameras.main.x += this.scrollSpeed;
//     // });

//     // this.input.keyboard.on("keydown_RIGHT", e => {
//     //   this.cameras.main.x -= this.scrollSpeed;
//     // });

//     // fpsCounter();

//     // fps
//     this.fpsElement = document.createElement("span");
//     this.fpsElement.style.cssText = `
//       position: fixed;
//       bottom: 0px;
//       color: black;
//       background: white;
//     `;
//     document.body.appendChild(this.fpsElement);

//     this.lastFrame = 0;
//     this.lastDeltaTime = 0;
//   }

//   update(time, deltaTime) {
//     // if (cursors.up.isDown) {
//     //   this.game.camera.y -= this.scrollSpeed;
//     // } else if (cursors.down.isDown) {
//     //   this.game.camera.y += this.scrollSpeed;
//     // }
//     // if (cursors.left.isDown) {
//     //   this.game.camera.x -= this.scrollSpeed;
//     // } else if (cursors.right.isDown) {
//     //   this.game.camera.x += this.scrollSpeed;
//     // }

//     // FPS count
//     // this.fpsElement.innerHTML = 1000 / deltaTime;

//     this.lastDeltaTime += deltaTime;
//     if (125 < this.lastDeltaTime) {
//       this.lastDeltaTime = 0;
//       this.lastFrame++;
//       this.fpsElement.innerHTML = 1000 / deltaTime;
//     }

//     if (3 < this.lastFrame) this.lastFrame = 0;

//     // this.dudeQuads.forEach(dudeQuad => dudeQuad.setFrame(this.lastFrame));
//   }

//   render() {
//     // this.cameras.main.debug.cameraInfo(this.game.camera, 32, 32);
//     // console.log(this.game.loop.actualFps);
//   }
// }

// const fpsCounter = () => {
//   const times = [];
//   let fps;
//   let fpsElemenet = document.createElement("span");
//   fpsElemenet.style.cssText = `
//     position: fixed;
//     bottom: 0px;
//     color: black;
//     background: white;
//   `;
//   document.body.appendChild(fpsElemenet);

//   function refreshLoop() {
//     window.requestAnimationFrame(() => {
//       const now = performance.now();
//       while (times.length > 0 && times[0] <= now - 1000) {
//         times.shift();
//       }
//       times.push(now);
//       fps = times.length;
//       // console.log(fps);
//       fpsElemenet.innerHTML = fps;
//       refreshLoop();
//     });
//   }

//   refreshLoop();
// };
