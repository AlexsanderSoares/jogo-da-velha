import { ExitMatchMongoRepository } from "../../repositories/implementations/Mongodb/ExitMatchMongoRepository";
import { ExitMatchController } from "./ExitMachController";
import { ExitMatchUseCase } from "./ExitMatchUseCase";

const exitMatchMongoRepository = new ExitMatchMongoRepository;

const exitMatchUseCase = new ExitMatchUseCase(exitMatchMongoRepository);

const exitMatchController = new ExitMatchController(exitMatchUseCase);

export {exitMatchController, exitMatchUseCase}