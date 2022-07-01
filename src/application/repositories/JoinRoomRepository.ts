import { Match } from "../../domain/entities/Match";
import { IJoinRoomProps } from "../useCases/JoinRoom/JoinRoomUseCase";

export interface JoinRoomRepository{
    findMatch(id: string): Promise<IJoinRoomProps>;
    join(id: string, match: Match): Promise<Match>;
}