import { RequestHandler } from 'express'

import { addPersonSchema, updatePersonSchema } from '../types/types'
import { add, getAll, getOne, remove, update } from '../services/people-service'

export const addPerson: RequestHandler = async (req, res) => {
  const { eventId, eventGroupId } = req.params
  const body = addPersonSchema.safeParse(req.body)
  if (!body.success) return res.status(400).json({ error: 'Dados inválidos' })

  const newPerson = await add({
    ...body.data,
    eventId: parseInt(eventId),
    eventGroupId: parseInt(eventGroupId),
  })
  if (newPerson) return res.status(201).json({ person: newPerson })

  return res.status(500).json({ error: 'Ocorreu um erro' })
}

export const updatePerson: RequestHandler = async (req, res) => {
  const { eventId, eventGroupId, id } = req.params
  const body = updatePersonSchema.safeParse(req.body)
  if (!body.success) return res.status(400).json({ error: 'Dados inválidos' })

  const updatePerson = await update(
    {
      eventId: parseInt(eventId),
      eventGroupId: parseInt(eventGroupId),
      id: parseInt(id),
    },
    body.data
  )
  if (updatePerson) return res.status(200).json({ person: updatePerson })

  return res.status(500).json({ error: 'Ocorreu um erro' })
}

export const getAllPeople: RequestHandler = async (req, res) => {
  const { eventId, eventGroupId } = req.params
  const people = await getAll({
    eventId: parseInt(eventId),
    eventGroupId: parseInt(eventGroupId),
  })
  if (people) return res.status(200).json({ people })

  return res.status(500).json({ error: 'Ocorreu um erro' })
}

export const getOnePerson: RequestHandler = async (req, res) => {
  const { eventId, eventGroupId, id } = req.params
  const person = await getOne({
    eventId: parseInt(eventId),
    eventGroupId: parseInt(eventGroupId),
    id: parseInt(id),
  })
  if (person) return res.status(200).json({ person })

  return res.status(500).json({ error: 'Ocorreu um erro' })
}

export const removePerson: RequestHandler = async (req, res) => {
  const { eventId, eventGroupId, id } = req.params
  const removePerson = await remove({
    eventId: parseInt(eventId),
    eventGroupId: parseInt(eventGroupId),
    id: parseInt(id),
  })
  if (removePerson) return res.sendStatus(204)

  return res.status(500).json({ error: 'Ocorreu um erro' })
}
