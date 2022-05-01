import { Match } from "../../domain/entities/Match";

export interface MatchRepository{
    findById(id: string): Promise<Match | null>;
    create(): Promise<null>;
    update(): Promise<Match>;
}