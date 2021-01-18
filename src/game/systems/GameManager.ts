import System from "../../ecs/System";
import Sprite from "../components/Sprite";
import Transform from "../components/Transform";

// TODO: [GameManager] this first system will orchestrate everything. Signal game serialization and
// deserialization, switch scenes signals etc.
class GameManager extends System {
  start(): void {
    // TODO:
    setUpTestScene(this);
  }

  update(): void {
    // TODO: ...
  }

  destroy(): void {}
}

export default GameManager;

const setUpTestScene = (system: System) => {
  // TODO: ...
  const entity1 = system.engine.generateEntityId();

  const transform1 = new Transform(entity1);
  transform1.scale.x = 1;
  transform1.scale.y = 1;
  system.engine.addComponent(transform1);

  const sprite1 = new Sprite(entity1);
  sprite1.url = "assets/turtle.jpg";
  system.engine.addComponent(sprite1);
};

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
