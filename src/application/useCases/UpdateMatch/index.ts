import { UpdateMatchMongoRepository } from "../../repositories/implementations/Mongodb/UpdateMatchMongoRepository";
import { UpdateMatchController } from "./UpdateMatchController";
import { UpdateMatchUseCase } from "./UpdateMatchUseCase";

const updateMatchMongoRepository = new UpdateMatchMongoRepository();

const updateMatchUseCase = new UpdateMatchUseCase(updateMatchMongoRepository);

const updateMatchController = new UpdateMatchController(updateMatchUseCase);

export {updateMatchController, updateMatchUseCase}