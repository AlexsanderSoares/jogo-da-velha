import { Match } from "../../../domain/entities/Match";
import { KickoutMatchRepository } from "../../repositories/KickoutMatchRepository";

export class KickoutMatchUseCase{

    constructor(
        private kickoutMatchRepository: KickoutMatchRepository
    ){}

    async execute(socketId: string){
        try{
            const match = await this.kickoutMatchRepository.findMatchByPlayerId(socketId);

            if(!match){
                console.log("Você não é o administrador");
                return;
            }
                
            
            return await this.kickoutMatchRepository.kickoutMatchPlayer(match);
        }catch(err){
            console.log(err);
        }
    }

}