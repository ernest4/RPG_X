export default {
  scenes: [
    {
      active: true,
      name: "empty",
      babylonScene: { gravity: [0, 0, 0], collisionsEnabled: false },
      ecs: {
        entityIdPool: { lastUsedEntityId: -1, reclaimedEntityIdPool: [] },
        componentLists: {},
      },
    },
    {
      active: true,
      name: "menu",
      babylonScene: { gravity: [0, 0, 0], collisionsEnabled: false },
      ecs: {
        entityIdPool: { lastUsedEntityId: 1, reclaimedEntityIdPool: [] },
        // componentLists: { Transform: [{ entityId: 0, position: [0, 0, 0] }] },
        componentLists: {
          Transform: [
            {
              entityId: 0,
              position: { x: 0, y: 0, z: 0 },
              rotation: { x: 0, y: 0, z: 0 },
              scale: { x: 0, y: 0, z: 0 },
            },
            {
              entityId: 1,
              position: { x: 1, y: 1, z: 1 },
              rotation: { x: 0, y: 0, z: 0 },
              scale: { x: 0, y: 0, z: 0 },
            },
          ],
        },
      },
    },
    {
      active: false,
      name: "world",
      babylonScene: { gravity: [0, 0, 0], collisionsEnabled: false },
      ecs: {
        entityIdPool: { lastUsedEntityId: 2, reclaimedEntityIdPool: [] },
        componentLists: {
          Transform: [
            {
              entityId: 0,
              position: { x: 0, y: 0, z: 0 },
              rotation: { x: 0, y: 0, z: 0 },
              scale: { x: 0, y: 0, z: 0 },
            },
            {
              entityId: 1,
              position: { x: 2, y: 3, z: 4 },
              rotation: { x: 0, y: 0, z: 0 },
              scale: { x: 0, y: 0, z: 0 },
            },
            {
              entityId: 2,
              position: { x: 5, y: 5, z: 5 },
              rotation: { x: 0, y: 0, z: 0 },
              scale: { x: 0, y: 0, z: 0 },
            },
          ],
        },
      },
    },
  ],
};
