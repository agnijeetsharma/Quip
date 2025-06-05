// File: models/User.ts
import mongoose, { Schema, Document } from "mongoose";

/** Message Subdocument Interface */
export interface Message extends Document {
  content: string;
  createdAt: Date;
  questionId: mongoose.Types.ObjectId; // Reference to Question
}

/** Message Schema */
const MessageSchema: Schema<Message> = new Schema({
  content: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  },
});

/** User Interface */
export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessages: boolean;
  messages: Message[];
}

/** User Schema */
const UserSchema: Schema<User> = new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please use a valid email",
    ],
  },
  password: { type: String, required: true },
  verifyCode: { type: String, required: true },
  verifyCodeExpiry: { type: Date, required: true },
  isVerified: { type: Boolean, default: false }, // Fixed typo "deefault"
  isAcceptingMessages: { type: Boolean, required: true,default: false }, // Fixed "requried"
  messages: [MessageSchema],
});

/** User Model */
const UserModel =
  mongoose.models.User as mongoose.Model<User> || mongoose.model<User>("User", UserSchema);

export default UserModel;
