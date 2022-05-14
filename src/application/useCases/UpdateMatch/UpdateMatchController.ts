import { IUpdateMatchProps, UpdateMatchUseCase } from "./UpdateMatchUseCase";

export class UpdateMatchController{

    constructor(
        private updateMatchUseCase: UpdateMatchUseCase
    ){}

    async handle(id: string, updateMatch: IUpdateMatchProps){

        try{

            const match = await this.updateMatchUseCase.execute(id, updateMatch);

            return match;

        }catch(err){
            console.log(err);
        }
        
    }
}