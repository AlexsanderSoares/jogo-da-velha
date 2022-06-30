import { StartMatchRepository } from "../../repositories/StartMatchRepository";

export class StartMatchUseCase{
    constructor(
        private startMatchRepository: StartMatchRepository
    ){}

    async execute(socketId){
        const match = await this.startMatchRepository.findMatchByPlayerId(socketId);

        if(!match){
            console.log("Partida não encontrada");
            return;
        }

        return await this.startMatchRepository.startMatch(match._id);

    }
}