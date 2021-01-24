import Sprite from "../components/Sprite";
import Entity from "../Entity";
import Behavior from "./Behavior";

class Movement extends Behavior {
  constructor(entity: Entity) {
    super(entity);
  }

  onAdd() {
    const scene = this.entity.scene;
    const components = this.entity.components;
    const Sprite = components.Sprite as Sprite;

    // TODO: ...
    this.entity.events.on(`Movement_${this.entity.id}`, (params: any) => {
      scene.tweens.add({
        targets: Sprite,
        y: params.y, // meters / second
        duration: 1, // second
        // yoyo: true,
        // delay: 1000,
        // repeat: -1,
      });
    });
  }

  onRemove(): void {
    // TODO: ...
  }
}

export default Movement;
