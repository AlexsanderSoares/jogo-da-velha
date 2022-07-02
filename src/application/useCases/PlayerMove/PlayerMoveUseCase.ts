import { Move } from "../../../domain/entities/Match";
import { PlayerMoveRepository } from "../../repositories/PlayerMoveRepository";

export class PlayerMoveUseCase{
    
    constructor(
        private playerMoveRepository: PlayerMoveRepository
    ){}
    
    async execute(socket_id: string, move: {column: number, line: number}){
        
        const match = await this.playerMoveRepository.findMatch(socket_id);

        if(!match)
            throw new Error("Partida não encontrada");

        if(match.player_turn.socket_id !== socket_id)
            throw new Error("Não é a sua vez de jogar");

        if((move.column < 0 || move.column > 2) || (move.line < 0 || move.line > 2))
            throw new Error("Essa posição é invalida");
            
        if(match.board[move.column][move.line] !== null)
            throw new Error("Essa posição ja foi escolhida.");


        const player = match.player1.socket_id === socket_id ? {player: match.player1, symbol: 'X'} : {player: match.player2, symbol: 'O'};
        
        match.board[move.column][move.line] = player.symbol;

        match.moves.push({player: player.player, column: move.column, line: move.line, symbol: player.symbol});
        
        console.log(player.symbol);

        if(player.symbol === 'X')
            match.player_turn = match.player2;
            
        else if(player.symbol === 'O')
            match.player_turn = match.player1;

        const matchWithMove = await this.playerMoveRepository.updateMatchWithPlayerMove(match);

        if(!matchWithMove)
            throw new Error("Não foi possivel registrar o movimento");

    }
}