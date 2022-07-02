import { Match } from "../../../domain/entities/Match";
import { KickoutMatchRepository } from "../../repositories/KickoutMatchRepository";

export class KickoutMatchUseCase{

    constructor(
        private kickoutMatchRepository: KickoutMatchRepository
    ){}

    async execute(socketId: string){

        const match = await this.kickoutMatchRepository.findMatchByPlayerId(socketId);

        if(!match)
            throw new Error("Você não é o administrador da sala");
            
        if(match.start)
            throw new Error("A partida ja começou");
        
        const newMatch = await this.kickoutMatchRepository.kickoutMatchPlayer(match);

        if(!newMatch)
            throw new Error("Não foi possível remover o jogador");
            
        return newMatch;

    }

}