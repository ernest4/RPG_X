import { Scene } from "phaser";
import FpsCounter from "../utils/FpsCounter";
import { Engine } from "../../ecs";
import Manager from "../systems/Manager";
import Render from "../systems/Render";
import Input from "../systems/Input";
import Movement from "../systems/Movement";
import MovementControl from "../systems/MovementControl";
import { DEVELOPMENT } from "../utils/environment";
import SceneEditor from "../systems/SceneEditor";

export default class Main extends Scene {
  dudeQuads!: any[];
  lastDeltaTime: any;
  lastFrame: any;
  fpsCounter!: FpsCounter;
  private _engine!: Engine;

  preload() {
    // TODO: testing. Most assets will loaded async !!!
    // this.load.image("turtle", "assets/turtle.jpg");
    // this.load.spritesheet("dude", "assets/dude.png", { frameWidth: 32, frameHeight: 48 });
  }

  create() {
    // this._engine = new Engine();
    this._engine = new Engine(DEVELOPMENT);
    // TODO: test all systems.
    this._engine.addSystem(new Manager(this._engine));
    // this._engine.addSystem(new SceneLoader(this._engine)); // TODO: either make this system or do the loading in manager... https://web.dev/file-system-access/#read-a-file-from-the-file-system
    if (DEVELOPMENT) this._engine.addSystem(new SceneEditor(this._engine));
    this._engine.addSystem(new Input(this._engine, this));
    this._engine.addSystem(new MovementControl(this._engine));
    // ai
    // physics
    this._engine.addSystem(new Movement(this._engine));
    // this._engine.addSystem(new Animation(this._engine)); // will hook into state of the entity (animation state machine)
    this._engine.addSystem(new Render(this._engine, this));
    // analysis -> print how long each system is taking / where is the bottleneck?

    // TODO: move to camera component
    this.cameras.main.setBackgroundColor(0xffffff);

    // TODO: move to some system 'Debug' system?
    this.fpsCounter = new FpsCounter();
  }

  update(time: number, deltaTime: number) {
    this.fpsCounter.update(deltaTime);

    this._engine.update(deltaTime);

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
