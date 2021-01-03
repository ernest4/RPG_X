class MovementSystem extends System {
  start(): void {}

  update(): void {
    // NOTE: streaming the entities one by one instead of creating new node lists...
    // const query = this.engine.query(Position, Velocity);
    // for (const querySet of query) this.updateEntity(querySet);

    this.engine.query(this.updateEntity, Transform, Velocity);
  }

  private updateEntity = (querySet: QuerySet) => {
    const [position, velocity] = querySet as [Transform, Velocity];

    position.x = velocity.x * this.deltaTime;
    position.y = velocity.y * this.deltaTime;
    position.rotation = velocity.angular * this.deltaTime;
  };

  destroy(): void {}
}
