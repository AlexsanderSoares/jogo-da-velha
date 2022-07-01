import { FinishMatchUseCase } from "./FinishMatchUseCase";

export class FinishMatchController{
    
    constructor(
        private finishMatchUseCase: FinishMatchUseCase
    ){}

    async handle(matchId: string){
        const match = await this.finishMatchUseCase.execute(matchId);

        if(!match)
            throw new Error("Partida não encontrada");

        return match;
            
    }

}