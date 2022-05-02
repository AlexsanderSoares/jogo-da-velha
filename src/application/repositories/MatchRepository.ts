import { Match } from "../../domain/entities/Match";

export interface MatchRepository{
    findById(id: string): Promise<Match | null>;
    findByRoomId(id: string): Promise<Match | null>;
    create(match: Match): Promise<void>;
    update(newMatch: Match): Promise<Match>;
}