import { ExitMatchUseCase } from "./ExitMatchUseCase";

export class ExitMatchController{
    constructor(
        private exitMatchUseCase: ExitMatchUseCase
    ){}

    async handle(socketPlayerId){
        try{

            const exited = await this.exitMatchUseCase.execute(socketPlayerId);

            return exited;
            
        }catch(err){

            console.log(err);

        }
    }
}