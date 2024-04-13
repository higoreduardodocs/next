import { RequestHandler } from 'express'

import { addGroupSchema, updateGroupSchema } from '../types/types'
import { add, getAll, getOne, remove, update } from '../services/group-service'

export const addGroup: RequestHandler = async (req, res) => {
  const { eventId } = req.params
  const body = addGroupSchema.safeParse(req.body)
  if (!body.success) return res.status(400).json({ error: 'Dados inválidos' })

  const newGroup = await add({ ...body.data, eventId: parseInt(eventId) })
  if (newGroup) return res.status(201).json({ group: newGroup })

  return res.status(500).json({ error: 'Ocorreu um erro' })
}

export const updateGroup: RequestHandler = async (req, res) => {
  const { eventId, id } = req.params
  const body = updateGroupSchema.safeParse(req.body)
  if (!body.success) return res.status(400).json({ error: 'Dados inválidos' })

  const updateGroup = await update(
    { eventId: parseInt(eventId), id: parseInt(id) },
    body.data
  )
  if (updateGroup) return res.status(200).json({ group: updateGroup })

  return res.status(500).json({ error: 'Ocorreu um erro' })
}

export const getAllGroup: RequestHandler = async (req, res) => {
  const { eventId } = req.params
  const groups = await getAll(parseInt(eventId))
  if (groups) return res.status(200).json({ groups })

  return res.status(500).json({ error: 'Ocorreu um erro' })
}

export const getOneGroup: RequestHandler = async (req, res) => {
  const { eventId, id } = req.params
  const group = await getOne({ eventId: parseInt(eventId), id: parseInt(id) })
  if (group) return res.status(200).json({ group })

  return res.status(500).json({ error: 'Ocorreu um erro' })
}

export const removeGroup: RequestHandler = async (req, res) => {
  const { eventId, id } = req.params
  const removeGroup = await remove({
    eventId: parseInt(eventId),
    id: parseInt(id),
  })
  if (removeGroup) return res.sendStatus(204)

  return res.status(500).json({ error: 'Ocorreu um erro' })
}
