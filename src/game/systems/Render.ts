import System from "../../ecs/System";
import Transform from "../components/Transform";
import Display from "../components/Display";
import { QuerySet } from "../../ecs/types";
import { Scene, Engine as RenderEngine, Nullable, SpriteManager, Sprite } from "babylonjs";

class Render extends System {
  private _renderEngine!: RenderEngine;
  private _scene!: Scene;

  start(): void {
    const canvas = document.getElementById("canvas") as Nullable<
      HTMLCanvasElement | WebGLRenderingContext
    >;

    this._renderEngine = new RenderEngine(canvas);

    window.addEventListener("resize", () => this._renderEngine.resize());

    this._scene = new Scene(this._renderEngine);

    // TODO: move some of this set up out ?!?!
  }

  update(): void {
    this.engine.query(this.renderEntity, Transform, Display);
  }

  renderEntity = (querySet: QuerySet) => {
    const [transform, display] = querySet as [Transform, Display];

    // TODO: add / remove items from scene graph.
    // If removed from scene graph, remove render component?
    if (!display.inScene) {
      const spriteManager = new SpriteManager(
        display.id.toString(),
        display.spriteManager.url,
        display.spriteManager.capacity,
        display.spriteManager.cellSize,
        this._scene
      );
      spriteManager.isPickable = display.spriteManager.isPickable;

      const sprite = new Sprite(display.id.toString(), spriteManager);
      sprite.isPickable = display.sprite.isPickable;
    }

    if (display.shouldDispose) {
      // TODO: ...
    }
    //
    // TODO:
    // for every entity with display object and position:
    // add position & rotation info to display object https://github.com/abiyasa/ashteroids-js/blob/master/src/systems/ThreeRenderSystem.js#L78
  };

  destroy(): void {}
}

export default Render;
