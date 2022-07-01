import { JoinRoomMongoRepository } from "../../repositories/implementations/Mongodb/JoinRoomMongoRepository";
import { JoinRoomController } from "./JoinRoomController";
import { JoinRoomUseCase } from "./JoinRoomUseCase";

const joinRoomMongoRepository = new JoinRoomMongoRepository();

const joinRoomUseCase = new JoinRoomUseCase(joinRoomMongoRepository);

const jonRoomController = new JoinRoomController(joinRoomUseCase);

export {jonRoomController, joinRoomUseCase}