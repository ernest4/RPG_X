import { Scene } from "phaser";
import { Engine } from "../../ecs";
import System from "../../ecs/System";
import { QuerySet } from "../../ecs/types";
import SerializeEvent from "../components/SerializeEvent";
import Transform from "../components/Transform";
import * as availableComponents from "../components";
import Vector3BufferView from "../../ecs/utils/Vector3BufferView";

class Serialization extends System {
  private _scene: Scene;
  private _state: any;
  private _serialize!: boolean;

  constructor(engine: Engine, scene: Scene) {
    super(engine);
    this._scene = scene;
  }

  start(): void {
    this._state = this._scene.cache.json.get("state_scenes_main");
    this.loadStateIntoEngine();
  }

  update(): void {
    this.engine.query(this.handleSerializeEvents, SerializeEvent);

    if (this._serialize) {
      this.engine.query(this.serializeEntities, Transform); // NOTE: any entity with Transform only
      this._serialize = false; // NOTE: resetting the flag
    }
  }

  destroy(): void {}

  private loadStateIntoEngine = () => {
    // TODO: ...
    console.log(this._state); // TESTING

    this.engine.importEntityIdPool(this._state.entityIdPool);

    this.loadComponents();
  };

  // TODO: test by simple engine look up & print to console....
  private loadComponents = () => {
    this._state.components.forEach(({ entityId, name, properties }: any) => {
      // TODO: types ???
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

    this.engine.removeEntity(serializeEvent.id);

    // NOTE: set flag to serialize once per N serializeEvents to prevent spam
    this._serialize = true;
  };

  private serializeEntities = (querySet: QuerySet) => {
    const [transform] = querySet as [Transform];

    // TODO: serialize https://web.dev/file-system-access/#read-a-file-from-the-file-system

    const components = this.engine.getComponents(transform.id);
    const permittedComponents = components.filter(({ serializable }) => serializable);

    permittedComponents.forEach(component => {
      const componentHash = {
        entityId: component.id,
        name: component.constructor.name,
        properties: {},
      };

      Object.entries(component).forEach(([property, value]) => {
        if (property === "_id") return;
        if (property === "_values") return;
        if (property === "loaded") return;
        if (property === "processed") return;
        if (property === "_serializable") return;

        if (value.constructor.name === "Vector3BufferView") {
          return this.vectorSerialize({ property, value, properties: componentHash.properties });
        }

        if (typeof value === "boolean") {
          return this.booleanSerialize({ property, value, properties: componentHash.properties });
        }

        if (typeof value === "string") {
          return this.stringSerialize({ property, value, properties: componentHash.properties });
        }

        if (!isNaN(value)) {
          return this.numberSerialize({ property, value, properties: componentHash.properties });
        }

        // return JSON.stringify(value); // unknown / ref / catch all
      });

      console.log(componentHash); // TESTING
    });
  };

  private vectorSerialize = ({
    property,
    value,
    properties,
  }: {
    property: string;
    value: Vector3BufferView;
    properties: any;
  }) => {
    properties[`${property}.x`] = value.x;
    properties[`${property}.y`] = value.y;
    properties[`${property}.z`] = value.z;
  };

  private booleanSerialize = ({
    property,
    value,
    properties,
  }: {
    property: string;
    value: boolean;
    properties: any;
  }) => {
    properties[property] = value;
  };

  private stringSerialize = ({
    property,
    value,
    properties,
  }: {
    property: string;
    value: string;
    properties: any;
  }) => {
    properties[property] = value;
  };

  private numberSerialize = ({
    property,
    value,
    properties,
  }: {
    property: string;
    value: number;
    properties: any;
  }) => {
    properties[property] = value;
  };
}

export default Serialization;
