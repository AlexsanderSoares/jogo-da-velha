import { CreateMatchUseCase } from "./CreateMatchUseCase";

export class CreateMatchController{
    constructor(
        private createMatchUseCase: CreateMatchUseCase
    ){}

    async handle(roomId: string): Promise<boolean>{
        try{
            
            await this.createMatchUseCase.execute(roomId);

            return true;

        }catch(err){

            return false;

        }
    }
}