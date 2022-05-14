import { Match } from "../../domain/entities/Match";
import { IUpdateMatchProps } from "../useCases/UpdateMatch/UpdateMatchUseCase";

export interface UpdateMatchRepository{
    findMatch(id: string): Promise<IUpdateMatchProps>;
    update(id: string, match: Match): Promise<Match>;
}