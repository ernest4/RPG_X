// NOTE: more custom type examples
// type Foot = number;
// type Pound = number;

// type Patient = {
//   name: string;
//   height: Foot;
//   weight: Pound;
// };

type DeltaTime = number;
type EntityId = number;
type QuerySet = Component[];
type QueryCallback = (querySet: QuerySet) => void;
type ComponentClass = { name: string; prototype: Component };
type EntityIdPoolParams = {
  lastUsedEntityId?: EntityId;
  reclaimedEntityIdPool?: EntityId[];
  reclaimedEntityIdPoolSize?: number;
};

// NOTE: using string enums over number enums as number enums are not enforceable in the type check!
// https://stackoverflow.com/questions/57334349/typescript-why-is-exact-enum-type-not-enforced
declare const enum ShapeType {
  BOX = "0",
  SPHERE = "1",
}

declare const enum TransformValueIndexes {
  // position
  POSITION_X = 0,
  POSITION_Y = 1,
  POSITION_Z = 2,
  // rotation
  ROTATION_X = 3,
  ROTATION_Y = 4,
  ROTATION_Z = 5,
  // scale
  SCALE_X = 6,
  SCALE_Y = 7,
  SCALE_Z = 8,
}

declare const enum ColliderValueIndexes {
  SHAPE_TYPE = 0,
  SPHERE_RADIUS = 1,
  BOX_SIZE_X = 2,
  BOX_SIZE_Y = 3,
  BOX_SIZE_Z = 4,
}

type BoxColliderSize = { x: number; y: number; z: number };
