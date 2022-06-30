import { Match } from "../../domain/entities/Match";

export interface CreateMatchRepository{
    findLastMatchId(): Promise<string>;
    save(match: Match): Promise<Match>;
}