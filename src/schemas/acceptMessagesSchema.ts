import {z} from 'zod'

export const AcceptMessagesSchema=z.object({
    content:z.string()
    .min(10,{message:'Message must be 10 character'})
    .max(20,{message:'Message must be less then 20 char'})
})