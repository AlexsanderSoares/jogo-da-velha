import { IJoinRoomProps, JoinRoomUseCase } from "./JoinRoomUseCase";

export class JoinRoomController{

    constructor(
        private updateMatchUseCase: JoinRoomUseCase
    ){}

    async handle(id: string, updateMatch: IJoinRoomProps){

        try{

            const match = await this.updateMatchUseCase.execute(id, updateMatch);

            return match;

        }catch(err){
            console.log(err);
        }
        
    }
}