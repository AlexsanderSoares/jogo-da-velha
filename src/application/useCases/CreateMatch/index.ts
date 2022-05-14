import { CreateMatchMongoRepository } from "../../repositories/implementations/Mongodb/CreateMatchMongoRepository";
import { CreateMatchController } from "./CreateMatchController";
import { CreateMatchUseCase } from "./CreateMatchUseCase";

const createMatchMongoRepository = new CreateMatchMongoRepository();

const createMatchUseCase = new  CreateMatchUseCase(createMatchMongoRepository);

const createMatchController = new CreateMatchController(createMatchUseCase);

export {createMatchUseCase, createMatchController};