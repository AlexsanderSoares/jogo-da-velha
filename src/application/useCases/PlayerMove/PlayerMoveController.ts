import { PlayerMoveUseCase } from "./PlayerMoveUseCase";

export class PlayerMoveController{
    
    constructor(
        private playerMoveUseCase: PlayerMoveUseCase
    ){}

    async handler(socket_id: string, move: {column: number, line: number}){
        
        return await this.playerMoveUseCase.execute(socket_id, move);
        
    }
}