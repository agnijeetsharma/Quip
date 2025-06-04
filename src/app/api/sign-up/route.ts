import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from 'bcrypt';
import { sendVerificationEmail } from "@/helpers/sendVeificationEmail";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, email, password } = await request.json();

    // Check for existing verified user by username
    const isVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (isVerifiedUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists with this username",
        },
        { status: 400 }
      );
    }

    // Check for existing user by email
    const verifiedUserWithEmail = await UserModel.findOne({ email });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("Generated verification code:", verifyCode);

    if (verifiedUserWithEmail) {
      if (verifiedUserWithEmail.isVerified) {
        return NextResponse.json(
          {
            success: false,
            message: "User already exists with this email",
          },
          { status: 400 }
        );
      }

      // Update existing unverified user's details
      const hashPassword = await bcrypt.hash(password, 10);
      verifiedUserWithEmail.password = hashPassword;
      verifiedUserWithEmail.verifyCode = verifyCode;
      verifiedUserWithEmail.verifyCodeExpiry = new Date(Date.now() + 3600000); // 1 hour from now
      await verifiedUserWithEmail.save();
    } else {
      // Create a new user
      const hashPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour from now

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

    // Send verification email
    const emailResponse = await sendVerificationEmail(email, username, verifyCode);
    if (!emailResponse.success) {
      return NextResponse.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully. Please verify your account.",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error registering user:", err);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while registering the user.",
      },
      { status: 500 }
    );
  }
}
