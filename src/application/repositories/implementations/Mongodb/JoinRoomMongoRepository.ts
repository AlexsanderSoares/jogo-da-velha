import { Match } from "../../../../domain/entities/Match";
import { IJoinRoomProps } from "../../../useCases/JoinRoom/JoinRoomUseCase";
import { JoinRoomRepository } from "../../JoinRoomRepository";
import { MatchModel } from "./models/MatchModel";

export class JoinRoomMongoRepository implements JoinRoomRepository{
    
    async findMatch(id: string): Promise<IJoinRoomProps> {
        const match = await MatchModel.findById(id);

        return match;
    }

    async join(id: string, match: Match): Promise<Match> {
        const matchJoin = await MatchModel.findByIdAndUpdate({_id: id}, {...match}, {returnDocument: 'after'});

        return matchJoin;
    }

}