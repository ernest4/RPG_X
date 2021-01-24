import { Scene } from "phaser";
import Sprite from "../components/Sprite";
import Transform from "../components/Transform";
import Controls from "../components/Controls";
import Entity from "../Entity";
import FpsCounter from "../utils/FpsCounter";
import PhysicsBody from "../components/PhysicsBody";
import Movement from "../behaviors/Movement";
// import store from "../store";
// import * as gameActions from "../store/actions/game";

// TODO: instead of Entity Component System, have Entity Callback System
// Classic ECS:
// One system, process all matching entities, walks through all if else branches for each entity
// Our Phaser ECS proposal:
// Each entity, executes appropriate slice of system, triggered by standard callback event
// Some reactive (React?) like inspired architecture??
// Service workers to simulate threading... (compute path-finding, AI etc)

// const entity1 = new Entity();
// // components determine data available on an entity.
// // this determines what, if anything an action/system can do e.g.:
// // TakeDamage (action) will apply damage to entity's Health component if it has one (e.g. Enemy)
// // but will not do anything if the entity does not have Health component (e.g. Enemy has gained
// // vulnerability, so Health component was removed to represent that...)
// entity1.addComponent(new Transform());
// entity1.addComponent(new Sprite());
// entity1.addAction(new Input()); // for player, Input will change transform, for NPCs AI will change transform
// entity1.addAction(new Render());
// // TODO: need some way to keep the entity inactive until all components / systems (particularly render) ready?

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
    // this.load.spritesheet("dude", "assets/dude.png", { frameWidth: 32, frameHeight: 48 });
  }

  create() {
    // this.game.renderer.addPipeline("grayscale", new GrayscalePipeline(this.game));
    // this.game.renderer.addPipeline("outline", new OutlinePipeline(this.game));
    // this.add.shader()

    // console.log(this.renderer);
    // this.renderer.pipelines.add("grayscale", new GrayscalePipeline(this.game));
    // @ts-ignore
    // this.renderer.pipelines.add("skewQuad", new SkewQuadPipeline(this.game));

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

    // this.anims.create({
    //   key: "left",
    //   frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
    //   frameRate: 5,
    //   repeat: -1,
    // });

    // // this.anims.exists("left");

    // let sprite;
    // let spriteShadow;
    // let spriteContainer;

    // // this.dudeQuads = [];

    // can handle 40k @ 60fps; 60k at 45fps;
    // for (let i = 0; i < 40000; i++) {
    // for (let i = 0; i < 1; i++) {
    //   // hmm maybe not use containers? there's perf penalty so might be better to manually track
    //   // position of shadow sprite?
    //   // spriteContainer = this.add.container(100 + 20 * (i % 50), 300);

    //   // positions will be relative to the Container x/y
    //   sprite = this.add.sprite(100 + 20 * (i % 50), 300, "dude");
    //   sprite.setDepth(1);
    //   sprite.anims.play("left");

    //   // positions will be relative to the Container x/y
    //   spriteShadow = this.add.sprite(100 + 20 * (i % 50), 300, "dude");
    //   let scaleY = 0.4;
    //   spriteShadow.y = spriteShadow.y + (spriteShadow.height * (1 - scaleY)) / 2;
    //   spriteShadow.scaleY = scaleY;
    //   spriteShadow.setDepth(0);
    //   spriteShadow.anims.play("left");
    //   // quadPlayer.topLeftX = -10;
    //   spriteShadow.tint = 0x000000; // disable for testing grayscale shader
    //   spriteShadow.alpha = 0.5;
    //   // spriteShadow.setPipeline("grayscale"); // testing
    //   spriteShadow.setPipeline("skewQuad"); // WIP add vertex shader
    //   // spriteShadow.pipeline.set1f("inHorizontalSkew", 0.2);

    //   attachSliderControls(spriteShadow);

    //   // NOTE: order important!! depth sorting does not work within container, so items are drawn
    //   // in order they are added. Thus shadow needs to be added first.
    //   // HOWEVER: you can use container methods like bringToTop(child), bringToBack(child)... etc.
    //   // to move container children depth after they have been added too!!!
    //   // spriteContainer.add(spriteShadow);
    //   // spriteContainer.add(sprite);

    //   // this.tweens.add({
    //   //   targets: spriteContainer,
    //   //   x: 400,
    //   //   duration: 2000,
    //   //   yoyo: true,
    //   //   // delay: 1000,
    //   //   repeat: -1,
    //   // });

    //   // this.tweens.add({
    //   //   targets: sprite,
    //   //   x: 400,
    //   //   duration: 2000,
    //   //   yoyo: true,
    //   //   // delay: 1000,
    //   //   repeat: -1,
    //   // });

    //   // this.tweens.add({
    //   //   targets: spriteShadow,
    //   //   x: 400,
    //   //   duration: 2000,
    //   //   yoyo: true,
    //   //   // delay: 1000,
    //   //   repeat: -1,
    //   // });
    // }

    const entities = [];
    let entity;

    for (let i = 0; i < 1; i++) {
      let x = 100 + 20 * (i % 50);
      let y = 300;

      entity = new Entity(this, i);
      entity.addComponent(new Sprite(entity, x, y, "assets/dude.png", 0, 32, 48));
      entity.addComponent(new PhysicsBody(entity));
      // entity.addComponent(new Shadow());
      // entity.addComponent(new Animation());
      // entity.addAction(new Render());
      entity.addComponent(new Controls(entity));
      entity.addBehavior(new Movement(entity));

      entities.push(entity);

      // // hmm maybe not use containers? there's perf penalty so might be better to manually track
      // // position of shadow sprite?
      // // spriteContainer = this.add.container(100 + 20 * (i % 50), 300);

      // // positions will be relative to the Container x/y
      // sprite = this.add.sprite(100 + 20 * (i % 50), 300, "dude", 0);
      // sprite.setDepth(1);
      // sprite.anims.play("left");

      // // positions will be relative to the Container x/y
      // spriteShadow = this.add.sprite(100 + 20 * (i % 50), 300, "dude");
      // let scaleY = 0.4;
      // spriteShadow.y = spriteShadow.y + (spriteShadow.height * (1 - scaleY)) / 2;
      // spriteShadow.scaleY = scaleY;
      // spriteShadow.setDepth(0);
      // spriteShadow.anims.play("left");
      // // quadPlayer.topLeftX = -10;
      // spriteShadow.tint = 0x000000; // disable for testing grayscale shader
      // spriteShadow.alpha = 0.5;
      // // spriteShadow.setPipeline("grayscale"); // testing
      // spriteShadow.setPipeline("skewQuad"); // WIP add vertex shader
      // // spriteShadow.pipeline.set1f("inHorizontalSkew", 0.2);

      // attachSliderControls(spriteShadow);
    }

    this.cameras.main.setBackgroundColor(0xffffff);

    this.fpsCounter = new FpsCounter();
  }

  update(time: number, deltaTime: number) {
    this.fpsCounter.update(deltaTime);

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
  }
}

const attachSliderControls = (sprite: Phaser.GameObjects.Sprite) => {
  const vec4values = [
    // { name: "r1c1", value: 1 },
    // { name: "r1c2", value: 0 },
    // { name: "r1c3", value: 0 },
    // { name: "r1c4", value: 0 },

    // { name: "r2c1", value: 0 },
    // { name: "r2c2", value: 1 },
    // { name: "r2c3", value: 0 },
    // { name: "r2c4", value: 0 },

    // { name: "r3c1", value: 0 },
    // { name: "r3c2", value: 0 },
    // { name: "r3c3", value: 1 },
    // { name: "r3c4", value: 0 },

    // { name: "r4c1", value: 0 },
    // { name: "r4c2", value: 0 },
    // { name: "r4c3", value: 0 },
    // { name: "r4c4", value: 1 },

    { name: "inHorizontalSkew", value: 0 },
  ];

  const controlContainer = document.createElement("div");
  controlContainer.style.cssText = `
    position: fixed;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
  `;

  vec4values.forEach(vec4valueObject => {
    const labelElement = document.createElement("label");
    labelElement.innerHTML = `${vec4valueObject.name}: ${vec4valueObject.value}`;

    controlContainer.appendChild(labelElement);

    // <input type="range" min="1" max="100" value="50" class="slider" id="myRange">
    const inputElement = document.createElement("input");
    inputElement.style.cssText = `
      padding-bottom: 10px;
    `;
    inputElement.type = "number";
    inputElement.min = "-10";
    inputElement.max = "10";
    inputElement.value = vec4valueObject.value.toString();
    inputElement.id = vec4valueObject.name;
    sprite.pipeline.set1f(vec4valueObject.name, vec4valueObject.value);
    inputElement.addEventListener("change", range => {
      // @ts-ignore
      sprite.pipeline.set1f(vec4valueObject.name, range.target.value);
      // @ts-ignore
      labelElement.innerHTML = `${vec4valueObject.name}: ${range.target.value}`;
    });

    controlContainer.appendChild(inputElement);
  });

  document.body.appendChild(controlContainer);
};
