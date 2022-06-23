import {mongoose} from "../connection";


const PlayerSchema = new mongoose.Schema({
    name: String,
    socket_id: String,
    disconnected: {
        type: Boolean,
        default: false,
    },
});

const MoveSchema = new mongoose.Schema({
    playerNumber: PlayerSchema,
    line: Number,
    column: Number,
});

const MatchSchema = new mongoose.Schema({
    start: {
        type: Boolean,
    },
    moves: {
        type: [MoveSchema],
        required: false
    },
    board: {
        type: [String],
        required: false,
    },
    winner: {
        type: PlayerSchema,
        required: false
    },
    player_turn: {
        type: PlayerSchema, 
        required: false,
    },
    player1: {
        type: PlayerSchema,
        required: true,
    },
    player2: {
        type: PlayerSchema,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const MatchModel = mongoose.model('Match', MatchSchema);

export {MatchModel};