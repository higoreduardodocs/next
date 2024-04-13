import { Prisma } from '@prisma/client'

import { prisma } from '../libs/prisma'
import { getOne as getOneEvent } from './event-service'
import { getOne as getOneGroup } from './group-service'

type PeopleCreate = Prisma.Args<typeof prisma.eventPeople, 'create'>['data']
export const add = async (data: PeopleCreate) => {
  try {
    if (!data.eventId || !data.eventGroupId) return false

    const event = await getOneEvent(data.eventId)
    if (!event) return false
    const group = await getOneGroup({
      eventId: data.eventId,
      id: data.eventGroupId,
    })
    if (!group) return false

    return await prisma.eventPeople.create({ data })
  } catch (error) {
    return false
  }
}

type PeopleUpdateFilters = {
  id?: number
  eventId: number
  eventGroupId?: number
}
type PeopleUpdate = Prisma.Args<typeof prisma.eventPeople, 'update'>['data']
export const update = async (
  filters: PeopleUpdateFilters,
  data: PeopleUpdate
) => {
  try {
    return await prisma.eventPeople.updateMany({ where: filters, data })
  } catch (error) {
    return false
  }
}

type PeopleGetAllFilters = { eventId: number; eventGroupId?: number }
export const getAll = async (filters: PeopleGetAllFilters) => {
  try {
    return await prisma.eventPeople.findMany({ where: filters })
  } catch (error) {
    return false
  }
}

type PeopleGetOneFilters = {
  id?: number
  eventId: number
  eventGroupId?: number
  cpf?: string
}
export const getOne = async (filters: PeopleGetOneFilters) => {
  try {
    if (!filters.id && !filters.cpf) return false

    return await prisma.eventPeople.findFirst({ where: filters })
  } catch (error) {
    return false
  }
}

type PeopleRemoveFilters = {
  id: number
  eventId?: number
  eventGroupId?: number
}
export const remove = async (filters: PeopleRemoveFilters) => {
  try {
    return await prisma.eventPeople.delete({ where: filters })
  } catch (error) {
    return false
  }
}
