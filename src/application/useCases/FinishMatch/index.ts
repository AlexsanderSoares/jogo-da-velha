import { FinishMatchMongoRepository } from "../../repositories/implementations/Mongodb/FinishMatchMongoRepository";
import { FinishMatchController } from "./FinishMatchController";
import { FinishMatchUseCase } from "./FinishMatchUseCase";

const finishMatchRepository = new FinishMatchMongoRepository();

const finishMatchUseCase = new FinishMatchUseCase(finishMatchRepository);

const finishMatchController = new FinishMatchController(finishMatchUseCase);

export {finishMatchUseCase, finishMatchController}