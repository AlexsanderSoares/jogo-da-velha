import { Match, Player } from "../../../domain/entities/Match";
import { ExitMatchRepository } from "../../repositories/ExitMatchRepository";

export class ExitMatchUseCase{
    
    constructor(
        private exitMatchRepository: ExitMatchRepository
    ){}

    private async exitAndFinishMatch(matchId: string, playerWinner: Player){
        const match = this.exitMatchRepository.exitPlayerAndFinishMatch(matchId, playerWinner);
        
        if(!match)
            throw new Error("Não foi possível sair da partida");
        
        return match;
    }

    private async exitMatch(matchId: string, isPlayerOne: boolean){
        const match = this.exitMatchRepository.exitPlayer(matchId, isPlayerOne);
        
        if(!match)
            throw new Error("Não foi possível sair da partida");
        
        return match;
    }

    async execute(socketPlayerId): Promise<Match>{

        const match = await this.exitMatchRepository.findMatchByPlayerId(socketPlayerId);

        if(!match)
            throw new Error("Partida não encontrada");
         
        const playerLeaving = match.player1.socket_id === socketPlayerId ? {playerWinner: match.player2, isPlayerOne: true} : {playerWinner: match.player1, isPlayerOne: false}    
        
        if(match.start)
            return await this.exitAndFinishMatch(match._id, playerLeaving.playerWinner);

        else
            return await this.exitMatch(match._id, playerLeaving.isPlayerOne);

    }
}