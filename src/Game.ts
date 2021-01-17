import { Engine } from "./ecs";
// import TickProvider from "./ecs/utils/TickProvider";
// import GameManager from "./game/systems/GameManager";
// import Render from "./game/systems/Render";
import { Game as PhaserGame } from "phaser";
import Main from "./game/scenes/Main";

class Game {
  // private _ecs: Engine;
  // private _tickProvider: TickProvider;
  private _config: any;

  // constructor() {
  //   this._ecs = new Engine();
  //   // NOTE: minimal set up to get something rendering to screen, GameManager & Render
  //   this._ecs.addSystem(new GameManager(this._ecs));
  //   this._ecs.addSystem(new Render(this._ecs));

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

  //   this._tickProvider = new TickProvider(this._ecs.update);
  // }

  constructor() {
    this._config = {
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      parent: "phaser-game",
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      // NOTE: can't have multiple scenes and ECS...cleanly...
      // So just have a UI 'system' in the main game...
      scene: [Main],
    };
  }

  start = () => {
    // this._tickProvider.start();

    new PhaserGame(this._config);
  };
}

export default Game;
