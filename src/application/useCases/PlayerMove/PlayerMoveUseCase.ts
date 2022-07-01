import { Move } from "../../../domain/entities/Match";
import { PlayerMoveRepository } from "../../repositories/PlayerMoveRepository";

export class PlayerMoveUseCase{
    
    constructor(
        private playerMoveRepository: PlayerMoveRepository
    ){}
    
    async execute(socket_id: string, move: {column: number, line: number}){
        
        const match = await this.playerMoveRepository.findMatch(socket_id);

        if(!match){
            console.log("Partida não encontrada");
            return;
        }

        if(match.player_turn.socket_id !== socket_id){
            console.log("Não é a vez no jogador");
            return;
        }

        if((move.column < 0 || move.column > 2) || (move.line < 0 || move.line > 2)){
            console.log("Posição invalida");
            return;
        }
        
        if(match.board[move.column][move.line] !== null){
            console.log("Essa posição não está dipsonivel");
            return;
        }

        const player = match.player1.socket_id === socket_id ? {player: match.player1, symbol: 'X'} : {player: match.player2, symbol: 'O'};
        
        match.board[move.column][move.line] = player.symbol;

        match.moves.push({player: player.player, column: move.column, line: move.line, symbol: player.symbol});
        
        console.log(player.symbol);

        if(player.symbol === 'X')
            match.player_turn = match.player2;
            
        else if(player.symbol === 'O')
            match.player_turn = match.player1;

        return await this.playerMoveRepository.updateMatchWithPlayerMove(match);

    }
}