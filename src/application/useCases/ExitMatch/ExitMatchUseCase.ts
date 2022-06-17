import { ExitMatchRepository } from "../../repositories/ExitMatchRepository";

export class ExitMatchUseCase{
    
    constructor(
        private exitMatchRepository: ExitMatchRepository
    ){}

    async execute(socketPlayerId){

        const match = await this.exitMatchRepository.findMatchByPlayerId(socketPlayerId);
         
        const playerLeaving = match.player1.socket_id === socketPlayerId ? {player: match.player1, isPlayerOne: true} : {player: match.player2, isPlayerOne: false}    
        
        if(match.start)
            return await this.exitMatchRepository.exitPlayerAndFinishMatch(match._id, playerLeaving.player);

        else
            return await this.exitMatchRepository.exitPlayer(match._id, playerLeaving.isPlayerOne);

    }
}