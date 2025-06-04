import UserModel from "@/model/User";
import dbConnect from "@/lib/dbConnect";
// import { User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import mongoose from "mongoose";

export async function GET() {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const _user  = session?.user; 

  if (!_user || !session) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "User is not authenticated",
      }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  const userId = new mongoose.Types.ObjectId(_user._id); 

  try {
    const user = await UserModel.aggregate([
      { $match: { _id: userId } }, 
      { $unwind: "$messages" }, 
      { $sort: { "messages.createdAt": -1 } }, 
      {
        $group: {
          _id: "$_id",
          messages: { $push: "$messages" }, 
        },
      },
    ]).exec();
   if(user.length === 0) {
      return new Response(
        JSON.stringify({ success: true, message: "No Messages found" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    if (!user ) {
      return new Response(
        JSON.stringify({ success: false, message: "No Messages found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        messages: user[0].messages, 
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching messages:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Unable to get messages for the user",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
