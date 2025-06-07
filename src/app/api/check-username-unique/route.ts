import dbConnect from "@/lib/dbConnect";
import { z } from "zod";
import UserModel from "@/model/User";
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  await dbConnect();
  try {
    const { searchParams } = new URL(request.url);
    
    const queryParam = {
      username: searchParams.get("username") || "",
    };

    // Validation with Zod
    const result = UsernameQuerySchema.safeParse(queryParam);
      console.log(result)
    if (!result.success) {
      const usernameErrors = result.error.errors.map(err => err.message) || [];
      
      return new Response(
        JSON.stringify({
          error: usernameErrors,
          message: usernameErrors.length
            ? usernameErrors.join(", ")
            : "Invalid Query Parameter",
        }),
        { status: 400 }
      );
    }
   
    const { username } = result.data;

   
    const existingUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUsername) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Username already taken",
        }),
        { status: 400 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Username is available",
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Username validation error:", err);
    return new Response(
      JSON.stringify({
        success: false,
        message: "The Username validation failed",
      }),
      { status: 400 }
    );
  }
}
