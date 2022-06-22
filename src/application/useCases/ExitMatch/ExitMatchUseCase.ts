import { Match } from "../../../domain/entities/Match";
import { ExitMatchRepository } from "../../repositories/ExitMatchRepository";

export class ExitMatchUseCase{
    
    constructor(
        private exitMatchRepository: ExitMatchRepository
    ){}

    async execute(socketPlayerId): Promise<Match>{

        const match = await this.exitMatchRepository.findMatchByPlayerId(socketPlayerId);

        if(!match)
            return;
         
        const playerLeaving = match.player1.socket_id === socketPlayerId ? {playerWinner: match.player2, isPlayerOne: true} : {playerWinner: match.player1, isPlayerOne: false}    
        
        if(match.start)
            return await this.exitMatchRepository.exitPlayerAndFinishMatch(match._id, playerLeaving.playerWinner);

        else
            return await this.exitMatchRepository.exitPlayer(match._id, playerLeaving.isPlayerOne);

    }
}