import { z } from 'zod'

// AUTH
export const signInSchema = z.object({
  password: z.string(),
})

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

// GROUP
export const addGroupSchema = z.object({
  name: z.string(),
})

export const updateGroupSchema = z.object({
  name: z.string(),
})
