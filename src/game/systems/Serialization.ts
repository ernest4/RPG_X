import System from "../../ecs/System";
import { QuerySet } from "../../ecs/types";
import SerializeEvent from "../components/SerializeEvent";

class Serialization extends System {
  start(): void {
    // TODO: handle initial deserialization to load the entire game in
  }

  update(): void {
    this.engine.query(this.handleSerializeEvents, SerializeEvent);
  }

  destroy(): void {}

  private handleSerializeEvents = (querySet: QuerySet) => {
    const [serializeEvent] = querySet as [SerializeEvent];

    console.log(serializeEvent); // TESTING: ...

    this.engine.removeEntity(serializeEvent.id);

    // TODO: serialize once per N serializeEvents to prevent spam

    // TODO: serialize https://web.dev/file-system-access/#read-a-file-from-the-file-system
  };
}

export default Serialization;
