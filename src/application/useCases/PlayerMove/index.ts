import { PlayerMoveMongoRepository } from "../../repositories/implementations/Mongodb/PlayerMoveMongoRepository";
import { PlayerMoveController } from "./PlayerMoveController";
import { PlayerMoveUseCase } from "./PlayerMoveUseCase";

const playerMoveMongoRepository = new PlayerMoveMongoRepository();

const playerMoveUseCase = new PlayerMoveUseCase(playerMoveMongoRepository);

const playerMoveController = new PlayerMoveController(playerMoveUseCase);

export {playerMoveController, playerMoveUseCase}