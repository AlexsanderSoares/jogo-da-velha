import { StartMatchRepository } from "../../repositories/StartMatchRepository";

export class StartMatchUseCase{
    constructor(
        private startMatchRepository: StartMatchRepository
    ){}

    async execute(socketId){

        const match = await this.startMatchRepository.findMatchByPlayerId(socketId);

        if(!match)
            throw new Error("Partida não encontrada");

        if(!match.player2)
            throw new Error("Nenhum adversário na sala");

        const startMatch = await this.startMatchRepository.startMatch(match._id);

        if(!startMatch)
            throw new Error("Não foi possível iniciar a partida");

        return startMatch;

    }
}