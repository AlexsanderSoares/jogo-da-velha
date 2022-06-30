import { StartMatchUseCase } from "./StartMatchUseCase";

export class StartMatchController{
    constructor(
        private startMatchUseCase: StartMatchUseCase
    ){}

    async handle(socketId){
        return await this.startMatchUseCase.execute(socketId);
    }
}