import { Match } from "../../domain/entities/Match";

export interface StartMatchRepository{
    findMatchByPlayerId(socketId: string): Promise<Match>;
    startMatch(matchId: string): Promise<Match>; 
}