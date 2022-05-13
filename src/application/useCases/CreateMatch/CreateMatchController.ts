import { CreateMatchUseCase } from "./CreateMatchUseCase";

export class CreateMatchController{
    constructor(
        private createMatchUseCase: CreateMatchUseCase
    ){}

    async handle(roomId: string): Promise<string>{
        try{
            
            const roomId = await this.createMatchUseCase.execute();

            return roomId;

        }catch(err){

            console.log("Unexpected Error");

        }
    }
}