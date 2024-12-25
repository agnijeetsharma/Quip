import UserModel from "@/model/User";
import dbConnect from "@/lib/dbConnect";
import { Message } from "@/model/User";
import { User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import mongoose from "mongoose";

export async function GET(request: Request) {
  await dbConnect();
  const session = getServerSession(authOptions);
  const _user: User = session?.user;
  if (!_user || !session) {
    return Response.json(
      {
        success: true,
        messages: "user is authenticated'",
      },
      { status: 401 }
    );
  }
  const userId=new mongoose.Types.ObjectId(_user._id)
  try {
    const user=await userModel.aggregate(
        {$match:{_id:userId}},
        {$unwind:'$messages'},
        {$sort:{message.createdAt:-1}},
        {$group:{_id:'$_id':messages:{$push:'$messages'}}}
    ).exec();

    if(!user||user.length==0){
    return Response.json({success:false,message:"user not found "},{status:404})
    }
    return Response.json(
        { messages: user[0].messages },
        {
          status: 200,
        }
      );
  } catch (error) {
    console.log("")
    return Response.json({success:false,
        message:"Unable to get messages of Usre"}
        ,{status:500})
  }
}
