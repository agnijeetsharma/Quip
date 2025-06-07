import nodemailer from "nodemailer";
import { ApiResponse } from "@/types/ApiResponse";
import { verificationEmailTemplate } from "../../emails/VerificationEmail";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const htmlContent = verificationEmailTemplate(username, verifyCode);

    await transporter.sendMail({
      from: `"Agnijeet Sharma" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Hey ${username}, confirm your Quip account`,
      html: htmlContent,
    });

    return { success: true, message: "Verification email sent successfully." };
  } catch (error) {
    console.error("Verification email error", error);
    return { success: false, message: "Failed to send verification email." };
  }
}
