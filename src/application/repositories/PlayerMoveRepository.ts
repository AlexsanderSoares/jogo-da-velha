import { Match } from "../../domain/entities/Match";

export interface PlayerMoveRepository{
    findMatch(matchId: string): Promise<Match>;
    updateMatchWithPlayerMove(match: Match): Promise<Match>;
}