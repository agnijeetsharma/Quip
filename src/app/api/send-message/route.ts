import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
// import { authOptions } from "../auth/[...nextauth]/options";
import { Message } from "@/model/User";

export async function POST(request: Request) {
  await dbConnect();
  const { username, content } = await request.json();

  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return Response.json(
        { success: false, message: "Unable to fetch user" },
        { status: 401 }
      );
    }

    if (!user.isAcceptingMessages) {
      return Response.json(
        { success: false, message: "User is not accpeting Messages rifht-now" },
        { status: 403 }
      );
    }
    const newMessages = { content, createdAt: new Date() };

    user.messages.push(newMessages as Message);
    await user.save();
  } catch (error) {
    console.log("Error while sending messages to the User", error);
    return Response.json(
      { success: true, message: "Error while sendings messages to the user" },
      { status: 400 }
    );
  }
}
