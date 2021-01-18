import System from "../../ecs/System";
import Transform from "../components/Transform";
import Sprite from "../components/Sprite";
import { EntityId, QuerySet, SceneItemType } from "../../ecs/types";
import SparseSet from "../../ecs/utils/SparseSet";
import SceneItem from "./render/SceneItem";
import Phaser, { Game, Scene, GameObjects } from "phaser";
import Camera from "../components/Camera";
import { Engine } from "../../ecs";

// NOTE: Render tends to be the heaviest system, so the code is leaning towards lots of caching and
// inlining of variables to reduce indirection and increase speed.
class Render extends System {
  // private _renderEngine!: BabylonEngine;
  private _scene: Scene;
  private _sceneItemsLists!: { [key: string]: SparseSet };

  constructor(engine: Engine, scene: Scene) {
    super(engine);
    this._scene = scene;
  }

  start(): void {
    // TODO: phaser 3 scene init stuff...
    // TODO: add the fps counter back in ASAP to track performance !!!
    // NOTE: need to keep a ref of scene graph items, so can dispose once Sprite/Mesh etc components
    // are removed from entity
    // this._sceneItemsLists = {
    //   Sprite: new SparseSet(),
    //   // some camera ...
    //   // TODO: rest ...
    // };
    // TODO: send input events to create input event entities
  }

  update(): void {
    // this.engine.query(this.updateCameras, Transform, Camera);
    this.engine.query(this.updateSprites, Transform, Sprite);
    // this.engine.query(this.updateMeshes, Transform, Mesh);
    // this.disposeUnusedSceneEntities();
    // this._scene.render();
  }

  updateCameras = (querySet: QuerySet) => {
    const [transform, camera] = querySet as [Transform, Camera];

    // wip...
    // if (...) create
    // update
  };

  // updateSprites = (querySet: QuerySet) => {
  //   const [transform, sprite] = querySet as [Transform, Sprite];

  //   // NOTE: reducing indirection by caching objects
  //   const spriteId = sprite.id;

  //   let spriteManagerItem = this.getSceneItem<BabylonSpriteManager>(
  //     spriteId,
  //     SceneItemType.SPRITE_MANGER
  //   );
  //   let babylonSpriteManager = spriteManagerItem?.ref;

  //   let spriteItem = this.getSceneItem<BabylonSprite>(spriteId, SceneItemType.SPRITE);
  //   let babylonSprite = spriteItem?.ref;

  //   // TODO: refactor this once SpriteManager and Sprite are treated as separate components instead
  //   // of both being bundled into Sprite component.
  //   // At the moment, it's just sufficient to check for SpriteManager presence, later on, both
  //   // SpriteManager and Sprite will need their own checks!
  //   if (!babylonSpriteManager) {
  //     // NOTE: reducing indirection by caching objects
  //     const spriteSpriteManager = sprite.spriteManager;
  //     const spriteIdString = spriteId.toString();

  //     babylonSpriteManager = new BabylonSpriteManager(
  //       spriteIdString,
  //       spriteSpriteManager.url,
  //       spriteSpriteManager.capacity,
  //       spriteSpriteManager.cellSize,
  //       this._scene
  //     );
  //     babylonSpriteManager.isPickable = spriteSpriteManager.isPickable;
  //     spriteManagerItem = this.addSceneItem(
  //       spriteId,
  //       SceneItemType.SPRITE_MANGER,
  //       babylonSpriteManager
  //     );

  //     babylonSprite = new BabylonSprite(spriteIdString, babylonSpriteManager);
  //     babylonSprite.isPickable = sprite.sprite.isPickable;
  //     spriteItem = this.addSceneItem(spriteId, SceneItemType.SPRITE, babylonSprite);
  //   }

  //   // NOTE: reducing indirection by caching objects
  //   const babylonSpritePosition = babylonSprite!.position;
  //   const transformPosition = transform.position;
  //   const transformScale = transform.scale;
  //   const transformRotation = transform.rotation;

  //   babylonSpritePosition.x = transformPosition.x;
  //   babylonSpritePosition.y = transformPosition.y;
  //   babylonSpritePosition.z = transformPosition.z;

  //   babylonSprite!.size = transformScale.z; // NOTE: just using 'z' value to represent 2d scale
  //   babylonSprite!.angle = Tools.ToRadians(transformRotation.z); // NOTE: just using 'z' value to represent 2d angle

  //   // NOTE: mark scene items as rendered, so disposeUnusedSceneEntities() leaves it alone
  //   spriteManagerItem!.rendered = true;
  //   spriteItem!.rendered = true;
  // };

  updateSprites = (querySet: QuerySet) => {
    const [transform, sprite] = querySet as [Transform, Sprite];

    // NOTE: reducing indirection by caching objects
    const spriteId = sprite.id;

    // let spriteManagerItem = this.getSceneItem<BabylonSpriteManager>(
    //   spriteId,
    //   SceneItemType.SPRITE_MANGER
    // );
    // let babylonSpriteManager = spriteManagerItem?.ref;

    // let spriteItem = this.getSceneItem<GameObjects.Sprite>(spriteId, SceneItemType.SPRITE);
    // let babylonSprite = spriteItem?.ref;

    let quadItem = this.getSceneItem<GameObjects.Quad>(spriteId, SceneItemType.QUAD);
    let phaserQuad = quadItem?.ref;

    // TODO: refactor this once SpriteManager and Sprite are treated as separate components instead
    // of both being bundled into Sprite component.
    // At the moment, it's just sufficient to check for SpriteManager presence, later on, both
    // SpriteManager and Sprite will need their own checks!
    // if (!babylonSpriteManager) {
    if (!phaserQuad) {
      // NOTE: reducing indirection by caching objects
      // const spriteSpriteManager = sprite.spriteManager;
      const spriteIdString = spriteId.toString();

      // babylonSpriteManager = new BabylonSpriteManager(
      //   spriteIdString,
      //   spriteSpriteManager.url,
      //   spriteSpriteManager.capacity,
      //   spriteSpriteManager.cellSize,
      //   this._scene
      // );
      // babylonSpriteManager.isPickable = spriteSpriteManager.isPickable;
      // spriteManagerItem = this.addSceneItem(
      //   spriteId,
      //   SceneItemType.SPRITE_MANGER,
      //   babylonSpriteManager
      // );

      // check texture presence, load if missing....(will need callback logic...)
      this.textures.get('some_key').key === "__MISSING"

      // phaserQuad = new BabylonSprite(spriteIdString, babylonSpriteManager);
      phaserQuad = this._scene.add.quad(0, 0, texture, frame);
      // phaserQuad = new GameObjects.Quad(this._scene);
      phaserQuad.isPickable = sprite.sprite.isPickable;
      quadItem = this.addSceneItem(spriteId, SceneItemType.SPRITE, phaserQuad);
    }

    // NOTE: reducing indirection by caching objects
    const babylonSpritePosition = phaserQuad!.position;
    const transformPosition = transform.position;
    const transformScale = transform.scale;
    const transformRotation = transform.rotation;

    babylonSpritePosition.x = transformPosition.x;
    babylonSpritePosition.y = transformPosition.y;
    babylonSpritePosition.z = transformPosition.z;

    phaserQuad!.size = transformScale.z; // NOTE: just using 'z' value to represent 2d scale
    phaserQuad!.angle = Tools.ToRadians(transformRotation.z); // NOTE: just using 'z' value to represent 2d angle

    // NOTE: mark scene items as rendered, so disposeUnusedSceneEntities() leaves it alone
    spriteManagerItem!.rendered = true;
    quadItem!.rendered = true;
  };

  // updateMeshes = (querySet: QuerySet) => {
  //   const [transform, mesh] = querySet as [Transform, Mesh];

  //   //
  //   // similar flow to update sprites, but for 3d meshes
  //   //
  //   // TODO: will need to handle rotation and scale in all 3 dimensions for meshes...
  //   // mesh.position... / mesh.rotation... / mesh.scale...
  // };

  // private getSceneItem = <T>(
  //   entityId: EntityId,
  //   itemClassName: SceneItemType
  // ): SceneItem<T> | null => {
  //   return this._sceneItemsLists[itemClassName].get(entityId) as SceneItem<T> | null;
  // };

  private addSceneItem = <T>(entityId: EntityId, itemClassName: SceneItemType, item: T) => {
    const sceneItem = new SceneItem<T>(entityId, item);
    this._sceneItemsLists[itemClassName].add(sceneItem);
    return sceneItem;
  };

  // private removeSceneItem = (entityId: EntityId, itemClassName: SceneItemType) => {
  //   this._sceneItemsLists[itemClassName].remove(entityId);
  // };

  // private disposeUnusedSceneEntities = () => {
  //   // TODO: handle cameras here too...??
  //   Object.entries(this._sceneItemsLists).forEach(([sceneItemsListType, sceneItemsList]) =>
  //     sceneItemsList.stream((sceneItem: SceneItem<BabylonSpriteManager | BabylonSprite>) =>
  //       this.disposeUnusedSceneEntity(sceneItemsListType as SceneItemType, sceneItem)
  //     )
  //   );
  // };

  // private disposeUnusedSceneEntity = (
  //   itemClassName: SceneItemType,
  //   sceneItem: SceneItem<BabylonSpriteManager | BabylonSprite>
  // ) => {
  //   if (sceneItem.rendered) {
  //     sceneItem.rendered = false; // NOTE: reset the flag before next render
  //     return;
  //   }

  //   sceneItem.ref.dispose();
  //   this.removeSceneItem(sceneItem.id, itemClassName);
  // };

  destroy(): void {}
}

export default Render;
