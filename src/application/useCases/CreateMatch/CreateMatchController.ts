import { CreateMatchUseCase } from "./CreateMatchUseCase";

export class CreateMatchController{
    constructor(
        private createMatchUseCase: CreateMatchUseCase
    ){}

    async handle(player1: {name: string, socket_id: string}): Promise<string>{
        try{
            
            const roomId = await this.createMatchUseCase.execute(player1);

            return roomId;

        }catch(err){

            console.log(err);

        }
    }
}