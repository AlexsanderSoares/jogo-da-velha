import { KickoutMatchMongoRepository } from "../../repositories/implementations/Mongodb/KickoutMatchMongoRepository";
import { KickoutMatchController } from "./KickoutMatchController";
import { KickoutMatchUseCase } from "./KickoutMatchUseCase";

const kickoutMatchRepository = new KickoutMatchMongoRepository();

const kickoutMatchUseCase = new KickoutMatchUseCase(kickoutMatchRepository);

const kickoutMatchController = new KickoutMatchController(kickoutMatchUseCase);

export {kickoutMatchUseCase, kickoutMatchController}