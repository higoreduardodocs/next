import { RequestHandler } from 'express'

import { addEventSchema, updateEventSchema } from '../types/types'
import { add, getAll, getOne, remove, update } from '../services/event-service'

export const addEvent: RequestHandler = async (req, res) => {
  const body = addEventSchema.safeParse(req.body)
  if (!body.success) return res.status(400).json({ error: 'Dados inválidos' })

  const newEvent = await add(body.data)
  if (newEvent) return res.status(201).json({ event: newEvent })

  return res.status(500).json({ error: 'Ocorreu um erro' })
}

export const updateEvent: RequestHandler = async (req, res) => {
  const { id } = req.params
  const body = updateEventSchema.safeParse(req.body)
  if (!body.success) return res.status(400).json({ error: 'Dados inválidos' })

  const updateEvent = await update(parseInt(id), body.data)
  if (updateEvent) return res.status(200).json({ event: updateEvent })

  return res.status(500).json({ error: 'Ocorreu um erro' })
}

export const getAllEvent: RequestHandler = async (req, res) => {
  const events = await getAll()
  if (events) return res.status(200).json({ events })

  return res.status(500).json({ error: 'Ocorreu um erro' })
}

export const getOneEvent: RequestHandler = async (req, res) => {
  const { id } = req.params
  const event = await getOne(parseInt(id))
  if (event) return res.status(200).json({ event })

  return res.status(500).json({ error: 'Ocorreu um erro' })
}

export const removeEvent: RequestHandler = async (req, res) => {
  const { id } = req.params
  const removeEvent = await remove(parseInt(id))
  if (removeEvent) return res.status(204)

  return res.status(500).json({ error: 'Ocorreu um erro' })
}
