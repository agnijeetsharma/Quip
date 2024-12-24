import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";



export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, code } = await request.json();
    const decodeusername = decodeURIComponent(username);
    const user = await UserModel.findOne({ username: decodeusername });
    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
    const isCodeValid = user.verifyCode === code;
    const verifyCodeExpried = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && verifyCodeExpried) {
      user.isVerified = true;
      await user.save();
      return;
    } else if (!isCodeValid) {
      return Response.json(
        { success: false, message: "Invalid verification code" },
        { status: 400 }
      );
    } else if (!verifyCodeExpried) {
      return Response.json(
        { success: false, message: "Code has been Expired" },
        { status: 400 }
      );
    }
  } catch (err) {
    console.log("there is error during code verification", err);
    return Response.json(
      {
        success: false,
        message: "error during code verification",
      },
      {
        status: 4000,
      }
    );
  }
}
