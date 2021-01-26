import Game from "./Game";
import { DEVELOPMENT } from "./game/utils/environment";

const game = new Game();
game.start();

console.log(`Running in ${DEVELOPMENT ? "dev" : "prod"} mode`);
