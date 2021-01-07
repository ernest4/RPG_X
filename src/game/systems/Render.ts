import System from "../../ecs/System";
import Transform from "../components/Transform";
import Display from "../components/Display";
import { QuerySet } from "../../ecs/types";
import {
  Scene,
  Engine as RenderEngine,
  Nullable,
  SpriteManager,
  Sprite,
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  Color3,
  PointLight,
} from "babylonjs";

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
    const camera = new ArcRotateCamera("Camera", 1, 0.8, 8, new Vector3(0, 0, 0), this._scene);
    camera.attachControl(canvas, true);

    const light = new PointLight("Point", new Vector3(5, 10, 5), this._scene);

    // // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    // // Hemispheric light provides ambient lighting
    // const light = new HemisphericLight("light1", new Vector3(0, 1, 0), this._scene);
    // // Default intensity is 1. Let's dim the light a small amount
    // light.intensity = 0.7;

    // // Set default ambient lighting. Tweaking this is good way to create moods with
    // // blue lighting for sad, dark, scary.
    // // Orange lighting for light, bright, energetic.
    // // Red light if you're in a building on fire or in a spaceship with hight alert.
    // // Simple black and white if you're in outer space (pitch black shadows, i.e. no back light).
    // light.diffuse = new Color3(0.95, 0.95, 0.95);
    // light.specular = new Color3(0.95, 0.95, 0.95);
    // light.groundColor = new Color3(0.3, 0.3, 0.3);

    // TODO: set up action manager to send input events... (code in testScene.ts)
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
      display.spriteManager.ref = spriteManager;

      const sprite = new Sprite(display.id.toString(), spriteManager);
      sprite.isPickable = display.sprite.isPickable;
      display.sprite.ref = sprite;
    }

    if (display.shouldDispose) {
      // TODO: ...
      // dispose...
      // ... return
    }

    // NOTE: reducing indirection by caching objects
    const displaySpriteRef = display.sprite.ref!;
    const displayPosition = displaySpriteRef.position;
    const transformPosition = transform.position;
    const transformScale = transform.scale;
    const transformRotation = transform.rotation;

    displayPosition.x = transformPosition.x;
    displayPosition.y = transformPosition.y;
    displayPosition.z = transformPosition.z;

    if (display.is2d) {
      displaySpriteRef.size = transformScale.z; // NOTE: just using 'z' value to represent 2d scale
      displaySpriteRef.angle = transformRotation.z; // NOTE: just using 'z' value to represent 2d angle
    } else {
      // TODO: will need to handle rotation and scale in all 3 dimensions for meshes...
      // mesh.position... / mesh.rotation... / mesh.scale...
    }
  };

  destroy(): void {}
}

export default Render;
