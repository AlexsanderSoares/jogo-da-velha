import { Match } from "../../../domain/entities/Match";
import { CreateMatchUseCase } from "./CreateMatchUseCase";

export class CreateMatchController{
    constructor(
        private createMatchUseCase: CreateMatchUseCase
    ){}

    async handle(player1: {name: string, socket_id: string}): Promise<Match>{
        try{
            
            return await this.createMatchUseCase.execute(player1);

        }catch(err){

            console.log(err);

        }
    }
}