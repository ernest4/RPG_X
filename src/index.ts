import Game from "./Game";

const game = new Game();
game.start();

console.log(`Running in ${process.env.NODE_ENV !== "production" ? "dev" : "prod"} mode`);
