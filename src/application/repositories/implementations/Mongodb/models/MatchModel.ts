import {mongoose} from "../connection";

const PlaysSchema = new mongoose.Schema({
    playerNumber: Number,
    line: Number,
    column: Number,
});

const MatchSchema = new mongoose.Schema({
    roomId: {
        type: String,
    },
    plays: {
        type: [PlaysSchema],
        required: false
    },
    winner: {
        type: Number,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const MatchModel = mongoose.model('Match', MatchSchema);

export {MatchModel};