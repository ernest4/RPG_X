import System from "../../ecs/System";
import Transform from "../components/Transform";
import Sprite from "../components/Sprite";
import { EntityId, QuerySet, SceneItemType } from "../../ecs/types";
import SparseSet from "../../ecs/utils/SparseSet";
import SceneItem from "./render/SceneItem";
import {
  Scene as BabylonScene,
  Engine as BabylonEngine,
  Nullable,
  SpriteManager as BabylonSpriteManager,
  Sprite as BabylonSprite,
  Mesh as BabylonMesh,
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  Color3,
  PointLight,
} from "babylonjs";
import Mesh from "../components/Mesh";

// NOTE: Render tends to be the heaviest system, so the code is leaning towards lots of caching and
// inlining of variables to reduce indirection and increase speed.
class Render extends System {
  private _renderEngine!: BabylonEngine;
  private _scene!: BabylonScene;
  private _sceneItemsLists!: { [key: string]: SparseSet };

  start(): void {
    const canvas = document.getElementById("canvas") as Nullable<
      HTMLCanvasElement | WebGLRenderingContext
    >;

    this._renderEngine = new BabylonEngine(canvas);

    window.addEventListener("resize", () => this._renderEngine.resize());

    this._scene = new BabylonScene(this._renderEngine);

    // TODO: add the fps counter back in ASAP to track performance !!!

    // TODO: move some of this set up out ?!?! there should be a camera component so it can be 
    // accessible to other systems !!!
    // TODO: remember we basically want arc with vertical tilt only, no left-right rotation...wip
    const camera = new ArcRotateCamera("Camera", 1, 0.8, 8, new Vector3(0, 0, 0), this._scene);
    camera.attachControl(canvas, true);

    // const light = new PointLight("Point", new Vector3(5, 10, 5), this._scene);

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

    // NOTE: need to keep a ref of scene graph items, so can dispose once Sprite/Mesh etc components
    // are removed from entity
    this._sceneItemsLists = {
      SpriteManager: new SparseSet(),
      Sprite: new SparseSet(),
      // some camera ...
      // TODO: rest ...
    };

    // TODO: set up action manager to send input events... (code in testScene.ts)
  }

  update(): void {
    this.engine.query(this.updateSprites, Transform, Sprite);
    this.engine.query(this.updateMeshes, Transform, Mesh);
    this.disposeUnusedSceneEntities();
    this._scene.render();
  }

  updateSprites = (querySet: QuerySet) => {
    const [transform, sprite] = querySet as [Transform, Sprite];

    // NOTE: reducing indirection by caching objects
    const spriteId = sprite.id;

    let spriteManagerItem = this.getSceneItem<BabylonSpriteManager>(
      spriteId,
      SceneItemType.SPRITE_MANGER
    );
    let babylonSpriteManager = spriteManagerItem?.ref;

    let spriteItem = this.getSceneItem<BabylonSprite>(spriteId, SceneItemType.SPRITE);
    let babylonSprite = spriteItem?.ref;

    // TODO: refactor this once SpriteManager and Sprite are treated as separate components instead
    // of both being bundled into Sprite component.
    // At the moment, it's just sufficient to check for SpriteManager presence, later on, both
    // SpriteManager and Sprite will need their own checks!
    if (!babylonSpriteManager) {
      // NOTE: reducing indirection by caching objects
      const spriteSpriteManager = sprite.spriteManager;
      const spriteIdString = spriteId.toString();

      babylonSpriteManager = new BabylonSpriteManager(
        spriteIdString,
        spriteSpriteManager.url,
        spriteSpriteManager.capacity,
        spriteSpriteManager.cellSize,
        this._scene
      );
      babylonSpriteManager.isPickable = spriteSpriteManager.isPickable;
      spriteManagerItem = this.addSceneItem(
        spriteId,
        SceneItemType.SPRITE_MANGER,
        babylonSpriteManager
      );

      babylonSprite = new BabylonSprite(spriteIdString, babylonSpriteManager);
      babylonSprite.isPickable = sprite.sprite.isPickable;
      spriteItem = this.addSceneItem(spriteId, SceneItemType.SPRITE, babylonSprite);
    }

    // NOTE: reducing indirection by caching objects
    const babylonSpritePosition = babylonSprite!.position;
    const transformPosition = transform.position;
    const transformScale = transform.scale;
    const transformRotation = transform.rotation;

    babylonSpritePosition.x = transformPosition.x;
    babylonSpritePosition.y = transformPosition.y;
    babylonSpritePosition.z = transformPosition.z;

    babylonSprite!.size = transformScale.z; // NOTE: just using 'z' value to represent 2d scale
    babylonSprite!.angle = transformRotation.z; // NOTE: just using 'z' value to represent 2d angle

    // NOTE: mark scene items as rendered, so disposeUnusedSceneEntities() leaves it alone
    spriteManagerItem!.rendered = true;
    spriteItem!.rendered = true;
  };

  updateMeshes = (querySet: QuerySet) => {
    const [transform, mesh] = querySet as [Transform, Mesh];

    //
    // similar flow to update sprites, but for 3d meshes
    //
    // TODO: will need to handle rotation and scale in all 3 dimensions for meshes...
    // mesh.position... / mesh.rotation... / mesh.scale...
  };

  private getSceneItem = <T>(
    entityId: EntityId,
    itemClassName: SceneItemType
  ): SceneItem<T> | null => {
    return this._sceneItemsLists[itemClassName].get(entityId) as SceneItem<T> | null;
  };

  private addSceneItem = <T>(entityId: EntityId, itemClassName: SceneItemType, item: T) => {
    const sceneItem = new SceneItem<T>(entityId, item);
    this._sceneItemsLists[itemClassName].add(sceneItem);
    return sceneItem;
  };

  private removeSceneItem = (entityId: EntityId, itemClassName: SceneItemType) => {
    this._sceneItemsLists[itemClassName].remove(entityId);
  };

  private disposeUnusedSceneEntities = () => {
    Object.entries(this._sceneItemsLists).forEach(([sceneItemsListType, sceneItemsList]) =>
      sceneItemsList.stream((sceneItem: SceneItem<BabylonSpriteManager | BabylonSprite>) =>
        this.disposeUnusedSceneEntity(sceneItemsListType as SceneItemType, sceneItem)
      )
    );
  };

  private disposeUnusedSceneEntity = (
    itemClassName: SceneItemType,
    sceneItem: SceneItem<BabylonSpriteManager | BabylonSprite>
  ) => {
    if (sceneItem.rendered) {
      sceneItem.rendered = false; // NOTE: reset the flag before next render
      return;
    }

    sceneItem.ref.dispose();
    this.removeSceneItem(sceneItem.id, itemClassName);
  };

  destroy(): void {}
}

export default Render;
