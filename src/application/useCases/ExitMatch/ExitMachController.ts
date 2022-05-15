import { ExitMatchUseCase } from "./ExitMatchUseCase";

export class ExitMatchController{
    constructor(
        private exitMatchUseCase: ExitMatchUseCase
    ){}

    async handle(socketPlayerId){
        try{

            const matchExited = await this.exitMatchUseCase.execute(socketPlayerId);

            return matchExited;
            
        }catch(err){

            console.log(err);

        }
    }
}