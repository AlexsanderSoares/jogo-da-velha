import mongoose from "mongoose";

mongoose.connect('mongodb://localhost/noderest');
mongoose.Promise = global.Promise;

export {mongoose};