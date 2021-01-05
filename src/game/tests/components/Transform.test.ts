import Transform from "../../components/Transform";

describe(Transform, () => {
  const entityId = 123;
  const position = { x: 1, y: 2, z: 3 };
  const rotation = { x: 4, y: 5, z: 6 };
  const scale = { x: 7, y: 8, z: 9 };

  let subject: Transform;

  beforeEach(() => {
    subject = new Transform(entityId);

    subject.position.x = position.x;
    subject.position.y = position.y;
    subject.position.z = position.z;

    subject.rotation.x = rotation.x;
    subject.rotation.y = rotation.y;
    subject.rotation.z = rotation.z;

    subject.scale.x = scale.x;
    subject.scale.y = scale.y;
    subject.scale.z = scale.z;
  });

  it("gets and sets position, rotation, scale", () => {
    expect(subject.position.x).toEqual(position.x);
    expect(subject.position.y).toEqual(position.y);
    expect(subject.position.z).toEqual(position.z);

    expect(subject.rotation.x).toEqual(rotation.x);
    expect(subject.rotation.y).toEqual(rotation.y);
    expect(subject.rotation.z).toEqual(rotation.z);

    expect(subject.scale.x).toEqual(scale.x);
    expect(subject.scale.y).toEqual(scale.y);
    expect(subject.scale.z).toEqual(scale.z);
  });
});
