import { ExitMatchRepository } from "../../repositories/ExitMatchRepository";

export class ExitMatchUseCase{
    
    constructor(
        private exitMatchRepository: ExitMatchRepository
    ){}

    async execute(socketPlayerId){

        const match = await this.exitMatchRepository.findMatchByPlayerId(socketPlayerId);
        
        if(match)
        {
            const player = match.player1.socket_id !== socketPlayerId ? match.player1 : match.player2

            const matchExited = await this.exitMatchRepository.exitPlayerAndFinishMatch(match._id, player);

            return matchExited;
        }
    }
}