import mongoose,{Schema,Document} from 'mongoose'

export interface Message extends Document{
 content:string,
 createdAt:Date
}
const MessageSchema:Schema<Message>=new Schema({
    content: {type:String,required:true},
    createdAt: {type:Date,required:true,default:Date.now}
})

export interface User extends Document{
    username:string,
    email:string,
    password:string,
    verifyCode:string,
    isVerified:true,
    verifyCodeExpiry:Date,
    isAcceptingMessage:boolean,
    messages:Message[]
}
const UserSchema:Schema<User>= new Schema({
    username: {type:String,required:true,unique:true,trim:true},
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please use a valid email']
      },
    password: {type:String,required:true},
    verifyCode:{type:String,required:[true,"Veify code is requried"]},
    verifyCodeExpiry:{type:Date,required:[true,"Verified expiry code is requried"]},
    isVerified:{type:Boolean,deefault:true},
    isAcceptingMessage:{type:Boolean,requried:true},
    messages:[MessageSchema]
})
const UserModel=(mongoose.models.User as mongoose.Model<User>)||
mongoose.model<User>('User',UserSchema)

export default UserModel