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
