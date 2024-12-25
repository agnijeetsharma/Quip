import { authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!session || !user) {
    return Response.json(
      {
        suceess: false,
        message: "User details does not autherized",
      },
      { status: 404 }
    );
  }
  const userId = user?._id;
  const { acceptMessages } = await request.json();
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptingMessages: acceptMessages },
      { new: true }
    );
    if (!updatedUser) {
      return Response.json(
        {
          success: false,
          message: "Enable to find User to updating message acceptance status",
        },
        { status: 400 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "Message acceptance status updated successfully",
        updatedUser,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log("Error in updating message acceptance status", err);
    return Response.json(
      {
        success: false,
        message: "Error in updating message acceptance status",
      },
      { status: 400 }
    );
  }
}

export async function GET() {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!session || !user) {
    return Response.json(
      {
        suceess: false,
        message: "User details does not autherized",
      },
      { status: 404 }
    );
  }
  try {
    const findUser = await UserModel.findById(user._id);
    if (!findUser) {
      return Response.json(
        {
          success: false,
          message: "Unable to fetch user",
        },
        { status: 404 }
      );
    }
    return Response.json(
      {
        success: true,
        isAcceptingMessages: findUser.isAcceptingMessages,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log("Error in getting user details", err);
    return Response.json(
      {
        success: true,
        message: "Error to fetching the message status of User",
      },
      { status: 500 }
    );
  }
}
