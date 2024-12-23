import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from 'bcrypt';
import { sendVerificationEmail } from "@/helpers/sendVeificationEmail";


export async function Post(request: Request) {
  await dbConnect();
  try {
    const { username, email, password } = await request.json();
    const isVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (isVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: "User already exist with this username",
        },
        { status: 400 }
      );
    }
    const verifiedUserWithEmail = await UserModel.findOne({ email });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    if (verifiedUserWithEmail) {
      if (verifiedUserWithEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "User already exists with this email",
          },
          { status: 400 }
        );
      }
      const hashPassword = await bcrypt.hash(password, 10);
      verifiedUserWithEmail.password = hashPassword
      verifiedUserWithEmail.verifyCode = verifyCode
      verifiedUserWithEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
      verifiedUserWithEmail.save()


    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        username,
        email,
        password: hashPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessages: true,
        messages: [],
      });

      await newUser.save();

    }
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );
    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    }

    return Response.json(
      {
        success: true,
        message: 'User registered successfully. Please verify your account.',
      },
      { status: 201 }
    );
  }
  catch (err) {
    console.error("error registering user", err);
    return Response.json(
      {
        success: false,
        message: "Error generating while registering a user",
      },
      {
        status: 500,
      }
    );
  }
}
