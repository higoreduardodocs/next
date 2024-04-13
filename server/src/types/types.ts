import { z } from 'zod'

// EVENT
export const addEventSchema = z.object({
  title: z.string(),
  description: z.string(),
  grouped: z.boolean().optional(),
})

export const updateEventSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  grouped: z.boolean().optional(),
  status: z.boolean().optional(),
})
