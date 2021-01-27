import { Scene } from "phaser";
import { Engine } from "../../ecs";
import Component from "../../ecs/Component";
import System from "../../ecs/System";
import { QuerySet } from "../../ecs/types";
import SparseSet from "../../ecs/utils/SparseSet";
import Sprite from "../components/Sprite";
import Transform from "../components/Transform";
import SceneItem from "./render/SceneItem";

// NOTE: Render tends to be the heaviest system, so the code is leaning towards lots of caching and
// inlining of variables to reduce indirection and increase speed.
class Render extends System {
  private _scene: Scene;
  private _sceneItemsList: SparseSet;
  private _textureLoadLists: { [key: string]: SparseSet };

  constructor(engine: Engine, scene: Scene) {
    super(engine);
    this._scene = scene;
    this._textureLoadLists = {};
    this._sceneItemsList = new SparseSet();
  }

  start(): void {}

  update(): void {
    this.initializePendingSceneItems();
    // this.engine.query(this.updateCameras, Transform, Camera); // TODO: move this out to its own 'Camera' system....
    this.engine.query(this.updateSprites, Transform, Sprite);
    this.disposeUnusedSceneItems();
  }

  // TODO: move this out to its own 'Camera' system....
  // updateCameras = (querySet: QuerySet) => {
  //   // const [transform, camera] = querySet as [Transform, Camera];
  //   // wip...
  //   // if (...) create
  //   // update
  // };

  private initializePendingSceneItems = () => {
    Object.entries(this._textureLoadLists).forEach(([textureUrl, sprites]) => {
      if (this.isTextureLoading(textureUrl)) return;

      sprites.stream((sprite: Sprite) => {
        const { textureUrl, frame } = sprite;
        const phaserSprite = this._scene.add.sprite(0, 0, textureUrl, frame);
        sprite.loaded = true;
        sprite.phaserSpriteRef = phaserSprite;
        this.addSceneItem(sprite, phaserSprite);
      });

      this._textureLoadLists[textureUrl].clear();
    });
  };

  private isTextureLoading = (textureUrl: string): boolean => {
    return this._scene.textures.get(textureUrl).key === "__MISSING";
  };

  private updateSprites = (querySet: QuerySet) => {
    const [transform, sprite] = querySet as [Transform, Sprite];

    sprite.loaded ? this.updateSprite(sprite, transform) : this.loadSprite(sprite);
  };

  private updateSprite = (sprite: Sprite, transform: Transform) => {
    const phaserSpriteSceneItem = this.getSceneItem<Phaser.GameObjects.Sprite>(sprite);

    if (!phaserSpriteSceneItem) return;

    const phaserSprite = phaserSpriteSceneItem.itemRef;

    phaserSprite.x = transform.position.x;
    phaserSprite.y = transform.position.y;

    phaserSprite.angle = transform.rotation.z;

    phaserSprite.scaleX = transform.scale.x;
    phaserSprite.scaleY = transform.scale.y;

    // NOTE: mark scene items as rendered, so disposeUnusedSceneItems() leaves it alone
    phaserSpriteSceneItem.rendered = true;
  };

  private loadSprite = (sprite: Sprite) => {
    const { textureUrl, frameWidth, frameHeight } = sprite;

    if (!this._textureLoadLists[textureUrl]) {
      // First instance, initiate texture load once !!
      this._textureLoadLists[textureUrl] = new SparseSet();
      this._textureLoadLists[textureUrl].add(sprite); // Add first sprite to initialize when ready

      // add load task
      this._scene.load.spritesheet(textureUrl, textureUrl, { frameWidth, frameHeight });
      // start loading (can call this over and over, even when already loading...no harm)
      this._scene.load.start();
      return;
    }

    // NOTE: sparse sets prevent duplication by default, so safe to add over and over
    this._textureLoadLists[textureUrl].add(sprite);
  };

  private getSceneItem = <T>(component: Component): SceneItem<T> | null => {
    return this._sceneItemsList.get(component.id) as SceneItem<T> | null;
  };

  private addSceneItem = <T>(component: Component, itemRef: T) => {
    const sceneItem = new SceneItem<T>(component.id, itemRef);
    this._sceneItemsList.add(sceneItem);
    return sceneItem;
  };

  private removeSceneItem = (component: Component) => {
    this._sceneItemsList.remove(component.id);
  };

  private disposeUnusedSceneItems = () => {
    this._sceneItemsList.stream((sceneItem: SceneItem<any>) =>
      this.disposeUnusedSceneItem(sceneItem)
    );
  };

  private disposeUnusedSceneItem = (sceneItem: SceneItem<any>) => {
    if (sceneItem.rendered) {
      sceneItem.rendered = false; // NOTE: reset the flag before next render
      return;
    }

    sceneItem.itemRef.destroy(); // TODO: pooling instead => active(false); visible(false); ???
    this.removeSceneItem(sceneItem.itemRef);
  };

  destroy(): void {}
}

export default Render;
