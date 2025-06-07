import mongoose, { Schema, Document } from "mongoose";
import { User } from "./User";

export interface Question extends Document {
  question: string;
  username?: string; 
  userId: mongoose.Types.ObjectId | User;
  createdAt: Date;
}


const QuestionSchema: Schema<Question> = new mongoose.Schema({
  question: { type: String, required: true },
  username: { type: String, required: false }, 
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Question =
  (mongoose.models.Question as mongoose.Model<Question>) ||
  mongoose.model<Question>("Question", QuestionSchema);
