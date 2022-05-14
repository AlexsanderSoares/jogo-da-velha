import { MongoMatchRepository } from "../../repositories/implementations/Mongodb/MongoMatchRepository";
import { UpdateMatchController } from "./UpdateMatchController";
import { UpdateMatchUseCase } from "./UpdateMatchUseCase";

const mongoMatchRepository = new MongoMatchRepository();

const updateMatchUseCase = new UpdateMatchUseCase(mongoMatchRepository);

const updateMatchController = new UpdateMatchController(updateMatchUseCase);

export {updateMatchController, updateMatchUseCase}