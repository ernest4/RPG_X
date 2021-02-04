import { Scene } from "phaser";
import { Engine } from "../../ecs";
import System from "../../ecs/System";
import { QuerySet } from "../../ecs/types";
import SerializeEvent from "../components/SerializeEvent";
import * as availableComponents from "../components";

class Serialization extends System {
  private _scene: Scene;
  private _state: any;

  constructor(engine: Engine, scene: Scene) {
    super(engine);
    this._scene = scene;
  }

  start(): void {
    // TODO: handle initial deserialization to load the entire game in

    this._state = this._scene.cache.json.get("state_scenes_main");

    this.loadStateIntoEngine();
  }

  update(): void {
    this.engine.query(this.handleSerializeEvents, SerializeEvent);
  }

  destroy(): void {}

  private loadStateIntoEngine = () => {
    // TODO: ...
    console.log(this._state); // TESTING

    this.engine.importEntityIdPool(this._state.entityIdPool);

    this.loadComponents();
  };

  private loadComponents = () => {
    this._state.components.forEach(({ entityId, name, properties }: any) => { // TODO: types ???
      const componentClass = (availableComponents as any)[name];
      const component = new componentClass(entityId);

      Object.entries(properties).forEach(([property, value]: [string, any]) => {
        if (property.indexOf(".") === -1) return ((component as any)[property] = value);

        const [propertyVector, propertyVectorAxis] = property.split(".");
        (component as any)[propertyVector][propertyVectorAxis] = value;
      });

      this.engine.addComponent(component);
    });
  };

  private handleSerializeEvents = (querySet: QuerySet) => {
    const [serializeEvent] = querySet as [SerializeEvent];

    console.log(serializeEvent); // TESTING: ...

    this.engine.removeEntity(serializeEvent.id);

    // TODO: serialize once per N serializeEvents to prevent spam

    // TODO: serialize https://web.dev/file-system-access/#read-a-file-from-the-file-system
  };
}

export default Serialization;
