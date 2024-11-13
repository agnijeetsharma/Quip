import {z} from 'zod'

export const messageSchema=z.object({
    acceptsMessages:z.boolean()
})