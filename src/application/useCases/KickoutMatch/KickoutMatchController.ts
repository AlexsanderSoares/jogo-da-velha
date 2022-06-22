import { KickoutMatchUseCase } from "./KickoutMatchUseCase";

export class KickoutMatchController{
    constructor(
        private kickoutMatchUseCase: KickoutMatchUseCase
    ){}

    async handle(socketId: string){
        try{
            const match = await this.kickoutMatchUseCase.execute(socketId);

            return match;
        }catch(err){
            console.log(err);
        }
    }
}