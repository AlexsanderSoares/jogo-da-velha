import { Match, Player } from "../../../domain/entities/Match";
import { FinishMatchRepository } from "../../repositories/FinishMatchRepository";

export class FinishMatchUseCase{

    private playerWinner: Player;
    private match: Match;


    constructor(
        private finishMatchRepository: FinishMatchRepository
    ){}


    private verifyPlayerWin(positions: Array<string>): void {

        const isEqualPositions = new Set([positions]).size === 1;

        if(isEqualPositions && positions[0] === 'X')
            this.playerWinner = this.match.player1;
        
        if(isEqualPositions && positions[0] === 'O')
            this.playerWinner = this.match.player2;
            
    }


    async execute(matchId: string){

        this.match = await this.finishMatchRepository.findMatchById(matchId);

        if(!this.match)
            throw new Error("Partida não encontrada");

        this.verifyPlayerWin([this.match.board[0][0], this.match.board[0][1], this.match.board[0][2]]);
        this.verifyPlayerWin([this.match.board[1][0], this.match.board[1][1], this.match.board[1][2]]);
        this.verifyPlayerWin([this.match.board[2][0], this.match.board[2][1], this.match.board[2][2]]);
        this.verifyPlayerWin([this.match.board[0][0], this.match.board[1][0], this.match.board[2][0]]);
        this.verifyPlayerWin([this.match.board[0][1], this.match.board[1][1], this.match.board[2][1]]);
        this.verifyPlayerWin([this.match.board[0][2], this.match.board[1][2], this.match.board[2][2]]);
        this.verifyPlayerWin([this.match.board[0][0], this.match.board[1][1], this.match.board[2][2]]);
        this.verifyPlayerWin([this.match.board[2][0], this.match.board[1][1], this.match.board[0][2]]);

        if(this.playerWinner)
            this.match = await this.finishMatchRepository.finishMatch(this.match._id.toString(), this.playerWinner);

        if(!this.match)
            throw new Error("Erro na finalização da partida");

        return this.match;
            
    }


}