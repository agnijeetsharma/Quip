import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";


export async function sendVerificationEmail(
  email: string,
  username:string,
  verifiyCode:string):Promise<ApiResponse>{
    try{
   await resend.emails.send({
    from:"sharmaagnijeet@gmail.com",
    to:email,
    subject:"Verify your account",
    react:VerificationEmail({username,otp:verifiyCode}),
   })
   return { success: true, message: 'Verification email sent successfully.' };
    }
    catch(verificationError){
        console.log("verification error occuring",verificationError)
        return { success: false, message: 'Failed to send verification email.' };
    }
  }
