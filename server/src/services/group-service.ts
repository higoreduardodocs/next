import { Prisma } from '@prisma/client'

import { prisma } from '../libs/prisma'
import { getOne as getOneEvent } from './event-service'

type GroupCreate = Prisma.Args<typeof prisma.eventGroup, 'create'>['data']
export const add = async (data: GroupCreate) => {
  try {
    if (!data.eventId) return false

    const event = await getOneEvent(data.eventId)
    if (!event) return false

    return await prisma.eventGroup.create({ data })
  } catch (error) {
    return false
  }
}

type GroupUpdateFilters = { id: number; eventId?: number }
type GroupUpdate = Prisma.Args<typeof prisma.eventGroup, 'update'>['data']
export const update = async (
  filters: GroupUpdateFilters,
  data: GroupUpdate
) => {
  try {
    return await prisma.eventGroup.update({ where: filters, data })
  } catch (error) {
    return false
  }
}

export const getAll = async (eventId: number) => {
  try {
    return await prisma.eventGroup.findMany({ where: { eventId } })
  } catch (error) {
    return false
  }
}

type GroupGetOneFilters = { id: number; eventId?: number }
export const getOne = async (filter: GroupGetOneFilters) => {
  try {
    return await prisma.eventGroup.findFirst({ where: filter })
  } catch (error) {
    return false
  }
}

type GroupRemoveFilters = { id: number; eventId?: number }
export const remove = async (filters: GroupRemoveFilters) => {
  try {
    return await prisma.eventGroup.delete({ where: filters })
  } catch (error) {
    return false
  }
}
