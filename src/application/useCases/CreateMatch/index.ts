import { MongoMatchRepository } from "../../repositories/implementations/Mongodb/MongoMatchRepository";
import { CreateMatchController } from "./CreateMatchController";
import { CreateMatchUseCase } from "./CreateMatchUseCase";

const mongoMatchrepository = new MongoMatchRepository();

const createMatchUseCase = new  CreateMatchUseCase(mongoMatchrepository);

const createMatchController = new CreateMatchController(createMatchUseCase);

export {createMatchUseCase, createMatchController};