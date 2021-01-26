import { Scene } from "phaser";
import { Engine } from "../../ecs";
import System from "../../ecs/System";
import { EntityId, QuerySet, SceneItemType } from "../../ecs/types";
import SparseSet from "../../ecs/utils/SparseSet";
import Sprite from "../components/Sprite";
import Transform from "../components/Transform";
import SceneItem from "./render/SceneItem";

// NOTE: Render tends to be the heaviest system, so the code is leaning towards lots of caching and
// inlining of variables to reduce indirection and increase speed.
class Render extends System {
  private _scene: Scene;
  private _sceneItemsLists!: { [key: string]: SparseSet };

  constructor(engine: Engine, scene: Scene) {
    super(engine);
    this._scene = scene;
  }

  // start(): void {
  //   // TODO: set up action manager to send input events... (code in test_Scene.ts)
  // }

  start(): void {
    // TODO: phaser 3 game init stuff...
    // NOTE: need to keep a ref of scene graph items, so can dispose once Sprite / Camera etc.
    //  components are removed from entity

    this._sceneItemsLists = {
      Sprite: new SparseSet(),
      // some camera ...
      // TODO: rest ...
    };
  }

  update(): void {
    // this.engine.query(this.updateCameras, Transform, Camera); // TODO: move this out to its own 'Camera' system....
    this.engine.query(this.updateSprites, Transform, Sprite);
    // this.engine.query(this.updateMeshes, Transform, Mesh);
    this.disposeUnusedSceneItems();
    // this.__scene.render();
  }

  // TODO: move this out to its own 'Camera' system....
  // updateCameras = (querySet: QuerySet) => {
  //   // const [transform, camera] = querySet as [Transform, Camera];
  //   // wip...
  //   // if (...) create
  //   // update
  // };

  // TODO: currently, resources will load async thus introducing pop in... might be a better way
  updateSprites = (querySet: QuerySet) => {
    const [transform, sprite] = querySet as [Transform, Sprite];

    let spriteSceneItem = this.getSceneItem<Phaser.GameObjects.Sprite>(
      sprite.id,
      SceneItemType.SPRITE
    );

    // Cold path
    if (!spriteSceneItem) return this.createSpriteSceneItem(sprite);

    // Hot path
    if (spriteSceneItem.loaded) return this.updateSpriteSceneItem(spriteSceneItem, transform);

    // else, must still be loading...
  };

  private updateSpriteSceneItem = (
    spriteSceneItem: SceneItem<Phaser.GameObjects.Sprite>,
    transform: Transform
  ) => {
    const phaserSprite = spriteSceneItem.itemRef;

    phaserSprite.x = transform.position.x;
    phaserSprite.y = transform.position.y;

    phaserSprite.angle = transform.rotation.z;

    phaserSprite.scaleX = transform.scale.x;
    phaserSprite.scaleY = transform.scale.y;

    // NOTE: mark scene items as rendered, so disposeUnusedSceneEntities() leaves it alone
    spriteSceneItem.rendered = true;
  };

  private createSpriteSceneItem = ({ textureUrl }: Sprite) => {
    // Initialization path
    // const { _scene } = this;
    // const { textureUrl, frameWidth, frameHeight, frame } = sprite;

    const spriteSceneItem = this.addSceneItem(sprite.id, SceneItemType.SPRITE);

    if (this.isTextureLoaded(textureUrl)) return spriteSceneItem.init();

    // initialization queue
    this._loadingTextures[textureUrl].push(spriteSeneItem);

    if (this.isTextureLoading(textureUrl)) return;

    this.loadTexture(textureUrl);
  };

  private isTextureLoading = (textureUrl: string): boolean => {
    return (
      this._scene.textures.get(textureUrl).key === "__MISSING" && this._loadingTextures[textureUrl]
    );
  };

  // NOTE: not the most efficient, but not a hot path...
  private onTextureLoaded = (key, type, texture) => {
    // const phaserSprite = _scene.add.sprite(0, 0, textureUrl, frame);
    // const spriteItem = this.addSceneItem(sprite.id, SceneItemType.SPRITE, phaserSprite);

    this._loadingTextures[key].forEach(spriteSceneItem => {
      // const phaserSprite = _scene.add.sprite(0, 0, key, frame);
      // spriteSceneItem.add(phaserSprite);
      spriteSceneItem.init();
    });

    // this.updateSprite(spriteItem, transform);
  };

  private loadTexture = (textureUrl: string) => {
    // console.log(_scene.textures.get(textureUrl).key); // TESTING

    // if (_scene.textures.get(textureUrl).key !== "__MISSING") return onTextureLoaded();

    // if (_scene.load.progress < 1) return; // continue loading
    _scene.load.spritesheet(textureUrl, textureUrl, { frameWidth, frameHeight }); // add load task
    _scene.load.on("filecomplete", this.onTextureLoaded); // add callback of 'complete' event
    _scene.load.start(); // start loading (should be able to call this over and over, even when already loading...no harm)
  };

  private getSceneItem = <T>(
    entityId: EntityId,
    itemClassName: SceneItemType
  ): SceneItem<T> | null => {
    return this._sceneItemsLists[itemClassName].get(entityId) as SceneItem<T> | null;
  };

  private addSceneItem = <T>(entityId: EntityId, itemClassName: SceneItemType, itemRef: T) => {
    const sceneItem = new SceneItem<T>(entityId, itemRef);
    this._sceneItemsLists[itemClassName].add(sceneItem);
    return sceneItem;
  };

  private removeSceneItem = (entityId: EntityId, itemClassName: SceneItemType) => {
    this._sceneItemsLists[itemClassName].remove(entityId);
  };

  private disposeUnusedSceneItems = () => {
    // TODO: handle cameras here too...??
    Object.entries(this._sceneItemsLists).forEach(([sceneItemsListType, sceneItemsList]) =>
      // sceneItemsList.stream((sceneItem: SceneItem<BabylonSpriteManager | BabylonSprite>) =>
      sceneItemsList.stream((sceneItem: SceneItem<Phaser.GameObjects.Sprite>) =>
        this.disposeUnusedSceneItem(sceneItemsListType as SceneItemType, sceneItem)
      )
    );
  };

  private disposeUnusedSceneItem = (
    itemClassName: SceneItemType,
    sceneItem: SceneItem<Phaser.GameObjects.Sprite>
  ) => {
    if (sceneItem.rendered) {
      sceneItem.rendered = false; // NOTE: reset the flag before next render
      return;
    }

    sceneItem.itemRef.destroy(); // TODO: pooling instead => active(false); visible(false); ???
    this.removeSceneItem(sceneItem.id, itemClassName);
  };

  destroy(): void {}
}

export default Render;
