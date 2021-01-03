import ScenesManager from "./game/ScenesManager";

console.log(`Running in ${process.env.NODE_ENV !== "production" ? "dev" : "prod"} mode`);

const scenes = new ScenesManager();
scenes.load(); // TODO: load whole game from serialized JSON blob

// TODO: SceneManager & SceneManagers

// SceneManager will hold reference to scene & ecs & entity factory that will uses both ecs and scene together
// SceneManagers will choose which scenes are rendered
