import { Scene } from "phaser";
// import store from "../store";
// import * as gameActions from "../store/actions/game";

// TODO: instead of Entity Component System, have Entity Callback System
// Classic ECS:
// One system, process all matching entities, walks through all if else branches for each entity
// Our Phaser ECS proposal:
// Each entity, executes appropriate slice of system, triggered by standard callback event
// Some reactive (React?) like inspired architecture??
// Service workers to simulate threading... (compute path-finding, AI etc)

// Some sketches below:
class Entity {
  // TODO: ...
  // add standardized callbacks to standardized events?
  constructor(id?: EntityId) {
    // this._id = id || ... generate ID...
    // this._events = ... assign the global event emitter ...scene.registry.events...
    this._components = [];
    this._systems = [];
  }

  // TODO: will have default load system that will execute when loadable resource is added
}

class Action {
  // call
}

class Render extends Action {}

class Movement extends Action {}

class AI extends Action {
  constructor(entity: Entity) {
    // TODO: ...
    // TODO: register itself to callback based on some event
  }

  // inherited override...
  call = () => {
    // logic here
  }

  private callbackLogic = () => {
    // TODO: ...
  };
}

const entity1 = new Entity();
// components determine data available on an entity.
// this determines what, if anything an action/system can do e.g.:
// TakeDamage (action) will apply damage to entity's Health component if it has one (e.g. Enemy)
// but will not do anything if the entity does not have Health component (e.g. Enemy has gained
// vulnerability, so Health component was removed to represent that...)
entity1.addComponent(new Transform());
entity1.addComponent(new Sprite());
entity1.addAction(new Movement());
entity1.addAction(new Render());
// TODO: need some way to keep the entity inactive until all components / systems ready?

// https://phasergames.com/phaser-3-dispatching-custom-events/
// https://rexrainbow.github.io/phaser3-rex-notes/docs/site/eventemitter3/

// Broadcast approach? Each entity that listens to 'ATTACK' will process.
// Most will discard this as their entityId wont match.
// Many callbacks will be fired.
scene.events.emit('ATTACK', {weapon:'sword',entityId:123});
scene.events.on('ATTACK', callback, scope); // Called many times....

// Namespace events? Each entity will know to register to it's own listener based on entityId and
// sender will need to grab their entityId to construct event.
scene.events.emit('ATTACK_123', {weapon:'sword'});
scene.events.on('ATTACK_123', callback, scope); // Called once !!

// EVENT better, use the registry, game wide global data bus !! (so all scenes can access it)
scene.registry.events.emit(...);
scene.registry.events.on(...);

export default class Main extends Scene {
  dudeQuads!: any[];
  lastDeltaTime: any;
  lastFrame: any;

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
      frameRate: 10,
      repeat: -1,
    });

    let player;
    let quadPlayer;

    // TODO: perf test vs Babylon JS.
    // TODO: animate & skew!
    // for (let i = 0; i < 10; i++) {
    //   // const image1 = this.add.image(100 * (i % 7), 300, 'ayu');
    //   player = this.add.sprite(100 + 20 * (i % 50), 300, "dude");
    //   // player = this.add.quad(100 * (i % 7), 300, 'dude');
    //   // player = new Phaser.GameObjects.Quad(this, 100 * (i % 7), 300, 'dude');
    //   player.anims.play("left", true);
    // }

    this.dudeQuads = [];

    const vertices = [-1, 1, 1, 1, -1, -1, 1, -1];

    const uvs = [0, 0, 1, 0, 0, 1, 1, 1];

    const indices = [0, 2, 1, 2, 3, 1];

    // can handle 40k @ 60fps; 60k at 45fps;
    // for (let i = 0; i < 40000; i++) {
    for (let i = 0; i < 4; i++) {
      // QUAD IS GONE !!!!
      // quadPlayer = this.add.quad(100 + 20 * (i % 50), 300, "dude");
      quadPlayer = this.add.mesh(100 + 20 * (i % 50), 600, "dude");
      // quadPlayer = this.add.sprite(100 + 20 * (i % 50), 600, "dude");
      quadPlayer.addVertices(vertices, uvs, indices);
      quadPlayer.panZ(9);
      // quadPlayer.topLeftX = -10;
      quadPlayer.scaleY = 0.4;
      // const skewFactor = 40;
      // quadPlayer.topLeftX = quadPlayer.x - 32 / 2 - skewFactor;
      // quadPlayer.topRightX = quadPlayer.x + 32 / 2 - skewFactor;
      this.dudeQuads.push(quadPlayer);
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
  }

  update(time: number, deltaTime: number) {
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

    this.lastDeltaTime += deltaTime;
    if (125 < this.lastDeltaTime) {
      this.lastDeltaTime = 0;
      this.lastFrame++;
      // this.fpsElement.innerHTML = 1000 / deltaTime;
    }

    if (3 < this.lastFrame) this.lastFrame = 0;

    // this.dudeQuads.forEach(dudeQuad => dudeQuad.setFrame(this.lastFrame));
  }
}
