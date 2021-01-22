import { Scene } from "phaser";
import FpsCounter from "../utils/FpsCounter";
// import store from "../store";
// import * as gameActions from "../store/actions/game";

// TODO: instead of Entity Component System, have Entity Callback System
// Classic ECS:
// One system, process all matching entities, walks through all if else branches for each entity
// Our Phaser ECS proposal:
// Each entity, executes appropriate slice of system, triggered by standard callback event
// Some reactive (React?) like inspired architecture??
// Service workers to simulate threading... (compute path-finding, AI etc)

// // Some sketches below:
// class Entity {
//   // TODO: ...
//   // add standardized callbacks to standardized events?
//   constructor(id?: EntityId) {
//     // this._id = id || ... generate ID...
//     // this._events = ... assign the global event emitter ...scene.registry.events...
//     this._components = [];
//     this._systems = [];
//   }

//   // TODO: will have default load system that will execute when loadable resource is added
// }

// class Action {
//   // call
// }

// class Render extends Action {}

// class Movement extends Action {}

// class AI extends Action {
//   constructor(entity: Entity) {
//     // TODO: ...
//     // TODO: register itself to callback based on some event
//   }

//   // inherited override...
//   call = () => {
//     // logic here
//   }

//   private callbackLogic = () => {
//     // TODO: ...
//   };
// }

// const entity1 = new Entity();
// // components determine data available on an entity.
// // this determines what, if anything an action/system can do e.g.:
// // TakeDamage (action) will apply damage to entity's Health component if it has one (e.g. Enemy)
// // but will not do anything if the entity does not have Health component (e.g. Enemy has gained
// // vulnerability, so Health component was removed to represent that...)
// entity1.addComponent(new Transform());
// entity1.addComponent(new Sprite());
// entity1.addAction(new Movement());
// entity1.addAction(new Render());
// // TODO: need some way to keep the entity inactive until all components / systems ready?

// // https://phasergames.com/phaser-3-dispatching-custom-events/
// // https://rexrainbow.github.io/phaser3-rex-notes/docs/site/eventemitter3/

// // Broadcast approach? Each entity that listens to 'ATTACK' will process.
// // Most will discard this as their entityId wont match.
// // Many callbacks will be fired.
// scene.events.emit('ATTACK', {weapon:'sword',entityId:123});
// scene.events.on('ATTACK', callback, scope); // Called many times....

// // Namespace events? Each entity will know to register to it's own listener based on entityId and
// // sender will need to grab their entityId to construct event.
// scene.events.emit('ATTACK_123', {weapon:'sword'});
// scene.events.on('ATTACK_123', callback, scope); // Called once !!

// // EVENT better, use the registry, game wide global data bus !! (so all scenes can access it)
// scene.registry.events.emit(...);
// scene.registry.events.on(...);

// shaders, trying to skew sprite

// class GrayscalePipeline extends Phaser.Renderer.WebGL.Pipelines.SinglePipeline {
//   constructor(game: Phaser.Game) {
//     let config = {
//       game,
//       renderer: game.renderer,
//       fragShader: `
//       precision mediump float;
//       uniform sampler2D uMainSampler;
//       varying vec2 outTexCoord;
//       void main(void) {
//       vec4 color = texture2D(uMainSampler, outTexCoord);
//       float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
//       gl_FragColor = vec4(vec3(gray), 1.0);
//       }`,
//     };
//     super(config);
//   }
// }

class SkewQuadPipeline extends Phaser.Renderer.WebGL.Pipelines.SinglePipeline {
  constructor(game: Phaser.Game) {
    let config = {
      game,
      renderer: game.renderer,
      vertShader: `
      precision mediump float;

      uniform mat4 uProjectionMatrix;

      attribute vec2 inPosition;
      attribute vec2 inTexCoord;
      attribute float inTexId;
      attribute float inTintEffect;
      attribute vec4 inTint;

      uniform float inHorizontalSkew;
      // uniform float verticalSkew;

      varying vec2 outTexCoord;
      varying float outTintEffect;
      varying vec4 outTint;

      void main ()
      {
          float h = inHorizontalSkew;
          float v = 0.0; // _VerticalSkew;
          mat4 skew = mat4(1.0,   h, 0.0, 0.0,  // 1. column
                              v, 1.0, 0.0, 0.0,  // 2. column
                            0.0, 0.0, 1.0, 0.0,  // 3. column
                            0.0, 0.0, 0.0, 1.0); // 4. column

          gl_Position = uProjectionMatrix * vec4(inPosition, 1.0, 1.0) * skew;

          outTexCoord = inTexCoord;
          outTint = inTint;
          outTintEffect = inTintEffect;
      }
      `,
    };
    super(config);
  }
}

// class OutlinePipeline extends Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline {
//   constructor(game: Phaser.Game) {
//     let config = {
//       game: game,
//       renderer: game.renderer,
//       fragShader: `
//           precision mediump float;
//           uniform sampler2D uMainSampler;
//           varying vec2 outTexCoord;
//           void main(void) {
//               vec4 color = texture2D(uMainSampler, outTexCoord);
//               vec4 colorU = texture2D(uMainSampler, vec2(outTexCoord.x, outTexCoord.y - 0.001));
//               vec4 colorD = texture2D(uMainSampler, vec2(outTexCoord.x, outTexCoord.y + 0.001));
//               vec4 colorL = texture2D(uMainSampler, vec2(outTexCoord.x + 0.001, outTexCoord.y));
//               vec4 colorR = texture2D(uMainSampler, vec2(outTexCoord.x - 0.001, outTexCoord.y));

//               gl_FragColor = color;

//               if (color.a == 0.0 && (colorU.a != 0.0 || colorD.a != 0.0 || colorL.a != 0.0 || colorR.a != 0.0)  ) {
//                   gl_FragColor = vec4(1.0, 0.0, 0.0, .2);
//               }
//           }`,
//     };
//     super(config);
//   }
// }

export default class Main extends Scene {
  dudeQuads!: any[];
  lastDeltaTime: any;
  lastFrame: any;
  fpsCounter!: FpsCounter;

  preload() {
    // TODO: testing. Most assets will loaded async !!!
    this.load.image("turtle", "assets/turtle.jpg");
    // this.load.image("sky", "assets/sky.png");
    // this.load.image("ground", "assets/platform.png");
    // this.load.image("star", "assets/star.png");
    // this.load.image("bomb", "assets/bomb.png");
    this.load.spritesheet("dude", "assets/dude.png", { frameWidth: 32, frameHeight: 48 });
  }

  create() {
    // this.game.renderer.addPipeline("grayscale", new GrayscalePipeline(this.game));
    // this.game.renderer.addPipeline("outline", new OutlinePipeline(this.game));
    // this.add.shader()

    // console.log(this.renderer);
    // this.renderer.pipelines.add("grayscale", new GrayscalePipeline(this.game));
    // @ts-ignore
    this.renderer.pipelines.add("skewQuad", new SkewQuadPipeline(this.game));

    // const text = this.add.text(250, 250, "Toggle UI", {
    //   backgroundColor: "white",
    //   color: "blue",
    //   fontSize: 48,
    // });

    // text.setInteractive({ useHandCursor: true });

    // text.on("pointerup", () => {
    //   store.dispatch(gameActions.showUI(!store.getState().showUi));
    // });

    // this.add.image(800, 800, "turtle").setScale(2, 2);

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 5,
      repeat: -1,
    });

    let sprite;
    let spriteShadow;
    let spriteContainer;

    // TODO: perf test vs Babylon JS.
    // TODO: animate & skew!
    // for (let i = 0; i < 10; i++) {
    //   // const image1 = this.add.image(100 * (i % 7), 300, 'ayu');
    //   player = this.add.sprite(100 + 20 * (i % 50), 300, "dude");
    //   // player = this.add.quad(100 * (i % 7), 300, 'dude');
    //   // player = new Phaser.GameObjects.Quad(this, 100 * (i % 7), 300, 'dude');
    //   player.anims.play("left", true);
    // }

    // this.dudeQuads = [];

    // can handle 40k @ 60fps; 60k at 45fps;
    // for (let i = 0; i < 40000; i++) {
    for (let i = 0; i < 1; i++) {
      // hmm maybe not use containers? there's perf penalty so might be better to manually track
      // position of shadow sprite?
      // spriteContainer = this.add.container(100 + 20 * (i % 50), 300);

      // positions will be relative to the Container x/y
      sprite = this.add.sprite(100 + 20 * (i % 50), 300, "dude");
      sprite.setDepth(1);
      sprite.anims.play("left");

      // positions will be relative to the Container x/y
      spriteShadow = this.add.sprite(100 + 20 * (i % 50), 300, "dude");
      let scaleY = 0.4;
      spriteShadow.y = spriteShadow.y + (spriteShadow.height * (1 - scaleY)) / 2;
      spriteShadow.scaleY = scaleY;
      spriteShadow.setDepth(0);
      spriteShadow.anims.play("left");
      // quadPlayer.topLeftX = -10;
      spriteShadow.tint = 0x000000; // disable for testing grayscale shader
      spriteShadow.alpha = 0.5;
      // spriteShadow.setPipeline("grayscale"); // testing
      spriteShadow.setPipeline("skewQuad"); // WIP add vertex shader
      spriteShadow.pipeline.set1f("inHorizontalSkew", 0.5);

      // const skewFactor = 40;
      // quadPlayer.topLeftX = quadPlayer.x - 32 / 2 - skewFactor;
      // quadPlayer.topRightX = quadPlayer.x + 32 / 2 - skewFactor;
      // this.dudeQuads.push(sprite);

      // NOTE: order important!! depth sorting does not work within container, so items are drawn
      // in order they are added. Thus shadow needs to be added first.
      // HOWEVER: you can use container methods like bringToTop(child), bringToBack(child)... etc.
      // to move container children depth after they have been added too!!!
      // spriteContainer.add(spriteShadow);
      // spriteContainer.add(sprite);

      // this.tweens.add({
      //   targets: spriteContainer,
      //   x: 400,
      //   duration: 2000,
      //   yoyo: true,
      //   // delay: 1000,
      //   repeat: -1,
      // });

      // this.tweens.add({
      //   targets: sprite,
      //   x: 400,
      //   duration: 2000,
      //   yoyo: true,
      //   // delay: 1000,
      //   repeat: -1,
      // });

      // this.tweens.add({
      //   targets: spriteShadow,
      //   x: 400,
      //   duration: 2000,
      //   yoyo: true,
      //   // delay: 1000,
      //   repeat: -1,
      // });
    }

    // const entity1 = new Entity();

    // debugger;

    // cursors = this.input.keyboard.onKeyDown(e => {
    //   console.log(e);
    // });

    // this.input.keyboard.on("keydown_UP", e => {
    //   // TODO: need access to delta time, maybe set flag here and act on it in update?
    //   console.log(e);
    //   // this.cameras.main.y += this.scrollSpeed;

    //   this.cameras.main.pan(500, 500, 2000, "Power2"); // messing around with pan and zoom
    //   this.cameras.main.zoomTo(4, 3000);
    // });

    // this.input.keyboard.on("keydown_DOWN", e => {
    //   this.cameras.main.y -= this.scrollSpeed;
    // });

    // this.input.keyboard.on("keydown_LEFT", e => {
    //   this.cameras.main.x += this.scrollSpeed;
    // });

    // this.input.keyboard.on("keydown_RIGHT", e => {
    //   this.cameras.main.x -= this.scrollSpeed;
    // });

    // fpsCounter();

    // fps
    // this.fpsElement = document.createElement("span");
    // this.fpsElement.style.cssText = `
    //   position: fixed;
    //   bottom: 0px;
    //   color: black;
    //   background: white;
    // `;
    // document.body.appendChild(this.fpsElement);

    // this.lastFrame = 0;
    // this.lastDeltaTime = 0;

    this.cameras.main.setBackgroundColor(0xffffff);

    this.fpsCounter = new FpsCounter();
  }

  update(time: number, deltaTime: number) {
    this.fpsCounter.update(deltaTime);
    // TODO: ...

    // if (cursors.up.isDown) {
    //   this.game.camera.y -= this.scrollSpeed;
    // } else if (cursors.down.isDown) {
    //   this.game.camera.y += this.scrollSpeed;
    // }
    // if (cursors.left.isDown) {
    //   this.game.camera.x -= this.scrollSpeed;
    // } else if (cursors.right.isDown) {
    //   this.game.camera.x += this.scrollSpeed;
    // }

    // FPS count
    // this.fpsElement.innerHTML = 1000 / deltaTime;
  }
}

// cracking the new mesh...

// class Example extends Phaser.Scene
// {
//     preload ()
//     {
//       // this is 5 x 5 sprite sheet
//         this.load.spritesheet('mummy', 'assets/sprites/metalslug_mummy37x45.png', { frameWidth: 37, frameHeight: 45 });
//     }

//     create ()
//     {
//         // const vertices = [
//         //     -1, 1,
//         //     1, 1,
//         //     -1, -1,
//         //     1, -1
//         // ];

//         const vertices = [
//           -2, 0.4,
//           0, 0.4,
//           -1, -1,
//           1, -1
//         ];

//         // const uvs = [
//         //     0, 0,
//         //     1, 0,
//         //     0, 1,
//         //     1, 1
//         // ];

//         console.log(this.textures.get('mummy'));

//         // display the 3rd frame, top row. tweak this for animation / frame selection
//         const uvs = [
//             2/5, 0,
//             3/5, 0,
//             2/5, 1/5,
//             3/5, 1/5
//         ];

//         const indicies = [ 0, 2, 1, 2, 3, 1 ];

//         const mesh = this.add.mesh(400, 300, 'mummy');
//         mesh.addVertices(vertices, uvs, indicies);
//         // to set tint:
//         mesh.addVertices(vertices, uvs, indicies, false, null, 0xff0000);
//         // CANT FIGURE OUT THE PANZ value or what to set it to while preserving original sprite dimensions...
//         mesh.panZ(100);
//         // mesh.displayWidth = 37;
//         mesh.displayHeight = 40;
//         // mesh.setScale(0.5);
//         mesh.setDepth(1);
//         mesh.x = 0;
//         mesh.y = 40;
//         // mesh.scaleY = 0.5 * 0.5;

//         console.log(mesh);

//         const mesh2 = this.add.mesh(0, 0, 'mummy');
//         mesh2.addVertices(vertices, uvs, indicies);
//         // to set tint:
//         mesh2.addVertices(vertices, uvs, indicies, false, null, 0x00ff00);
//         mesh2.panZ(100);
//         // mesh2.setScale(0.5);
//         mesh2.displayHeight = 40;
//         mesh2.setDepth(0);
//         // mesh.setTint(0x000000); // not a function

//         this.cameras.main.centerOn(400, 400);
//     }
// }
