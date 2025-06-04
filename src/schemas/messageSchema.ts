import {z} from 'zod'

export const messageSchema=z.object({
    content:z.string()
    .min(10,{message:'Message must be 10 character'})
    .max(200,{message:'Message must be less then 20 char'})
})