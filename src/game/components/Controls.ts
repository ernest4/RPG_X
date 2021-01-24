import Movement from "../behaviors/Movement";
import Entity from "../Entity";
import Component from "./Component";

class Controls extends Component {
  constructor(entity: Entity) {
    super(entity);
  }

  // inputs should be globally read by anyone who wants to listen...
  // move it out of here...
  onAdd(onReadyCallback: Function): void {
    const scene = this.entity.scene;
    const Movement = this.entity.behaviors.Movement as Movement;
    const events = this.entity.events;

    scene.input.keyboard.on("keydown-UP", (e: any) => {
      // TODO: need access to delta time, maybe set flag here and act on it in update?
      console.log(e);
      // // this.cameras.main.y += this.scrollSpeed;
      // this.cameras.main.pan(500, 500, 2000, "Power2"); // messing around with pan and zoom
      // this.cameras.main.zoomTo(4, 3000);
      // entity.components["Sprite"].y = 10 * deltaTime;

      events.emit("Movement", { y: 10 });

      // scene.tweens.add({
      //   targets: Sprite,
      //   // @ts-ignore
      //   y: PhysicsBody.velocity.linear.y, // meters / second
      //   duration: 1, // second
      //   // yoyo: true,
      //   // delay: 1000,
      //   // repeat: -1,
      // });
    });

    scene.input.keyboard.on("keydown-DOWN", (e: any) => {
      // this.cameras.main.y -= this.scrollSpeed;
      console.log(e);
    });

    scene.input.keyboard.on("keydown-LEFT", (e: any) => {
      // this.cameras.main.x += this.scrollSpeed;
      console.log(e);
    });

    scene.input.keyboard.on("keydown-RIGHT", (e: any) => {
      // this.cameras.main.x -= this.scrollSpeed;
      console.log(e);
    });

    onReadyCallback();
  }

  onRemove(): void {
    // throw new Error("Method not implemented.");
  }
}

export default Controls;
