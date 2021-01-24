import { Scene } from "phaser";
import { EntityId } from "../_legacy_ecs/types";
import Behavior from "./behaviors/Behavior";
import Component from "./components/Component";

class Entity {
  private _id: EntityId;
  private _scene: Scene;
  private _events: Phaser.Events.EventEmitter;
  private _components: { [key: string]: Component };
  private _behaviors: { [key: string]: Behavior };

  // constructor(id?: EntityId) { // wip...
  constructor(scene: Scene, id: EntityId) {
    this._id = id; // || ... generate ID...
    this._scene = scene;
    this._events = scene.registry.events; // Global, cross scene, event emitter
    this._components = {};
    this._behaviors = {};
  }

  // TODO: will have default load system that will execute when loadable resource is added ??

  addComponent = (component: Component) => {
    // TODO: ...
    // component.emitter = this._emitter;
    this._components[component.constructor.name] = component;
    component.onAdd(() => console.log(`${component.constructor.name}: added !`));
  };

  // removeComponent = () => {
  //   // TODO: ...
  // };

  addBehavior = (action: Behavior) => {
    // TODO: ...
    this._behaviors[action.constructor.name] = action;
    action.onAdd();
  };

  // removeAction = () => {
  //   // TODO: ...
  // };

  get id() {
    return this._id;
  }

  get scene() {
    return this._scene;
  }

  get components() {
    return this._components;
  }

  get behaviors() {
    return this._behaviors;
  }

  get events() {
    return this._events;
  }

  emit = (to: string, message?: any) => {
    const destination = `${to}_${this.id}`;
    this._events.emit(destination, message);
  };

  // on = (destination: string, callback: Function) => {
  //   // WIP ...
  //   // use id...
  //   this._events.on();
  // };
}

export default Entity;

// // https://phasergames.com/phaser-3-dispatching-custom-events/
// // https://rexrainbow.github.io/phaser3-rex-notes/docs/site/eventemitter3/

// // Broadcast approach? Each entity that listens to 'ATTACK' will process.
// // Most will discard this as their entityId wont match.
// // Many callbacks will be fired.
// scene.events.emit('ATTACK', {weapon:'sword',entityId:123});
// scene.events.on('ATTACK', callback, scope); // Called many times....

// // Namespace events? Each entity will know to register to it's own listener based on entityId and
// // sender will need to grab their entityId to construct event.
// scene.events.emit('ATTACK_123', {weapon:'sword'});
// scene.events.on('ATTACK_123', callback, scope); // Called once !!

// // EVENT better, use the registry, game wide global data bus !! (so all scenes can access it)
// scene.registry.events.emit(...);
// scene.registry.events.on(...);
