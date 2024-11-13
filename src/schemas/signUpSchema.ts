import {z} from 'zod'

export const usernameValidation=z.string().min(2,"username must be two char").
max(30,"username must be less than 30 char").
regex(/^[a-zA-Z0-9._-]{3,16}$/,'username must not conatain special char')
export const userSignUpSchema=z.object({
         username:usernameValidation,
         email:z.string().email({message:"invalid email"}),
         password:z.string().min(8,{message:"password must be 8 char"})
})

