import { StartMatchMongoRepository } from "../../repositories/implementations/Mongodb/StartMatchMongoRepository";
import { StartMatchController } from "./StartMatchController";
import { StartMatchUseCase } from "./StartMatchUseCase";

const startMatchMongoRepository = new StartMatchMongoRepository();

const startMatchUseCase = new StartMatchUseCase(startMatchMongoRepository);

const startMatchController = new StartMatchController(startMatchUseCase);

export {startMatchUseCase, startMatchController};