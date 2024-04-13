import { Prisma } from '@prisma/client'

import { prisma } from '../libs/prisma'
import { encryptMatch } from '../utils/helper'
import {
  getAll as getAllPeople,
  update as updatePerson,
} from './people-service'

type EventCreate = Prisma.Args<typeof prisma.event, 'create'>['data']
export const add = async (data: EventCreate) => {
  try {
    return await prisma.event.create({ data })
  } catch (error) {
    return false
  }
}

type EventUpdate = Prisma.Args<typeof prisma.event, 'update'>['data']
export const update = async (id: number, data: EventUpdate) => {
  try {
    return await prisma.event.update({ where: { id }, data })
  } catch (error) {
    return false
  }
}

export const getAll = async () => {
  try {
    return await prisma.event.findMany()
  } catch (error) {
    return false
  }
}

export const getOne = async (id: number) => {
  try {
    return await prisma.event.findFirst({ where: { id } })
  } catch (error) {
    return false
  }
}

export const remove = async (id: number) => {
  try {
    return await prisma.event.delete({ where: { id } })
  } catch (error) {
    return false
  }
}

export const doMatches = async (id: number): Promise<Boolean> => {
  try {
    const event = await prisma.event.findFirst({
      where: { id },
      select: { grouped: true },
    })
    if (!event) return false
    
    const people = await getAllPeople({ eventId: id })
    if (!people) return false

    let sortedList: { id: number; match: number }[] = []
    let sortable: number[] = []

    let attemps = 0
    let maxAttemps = people.length
    let keepTrying = true

    while (keepTrying && attemps < maxAttemps) {
      keepTrying = false
      attemps++
      sortedList = []
      sortable = people.map((item) => item.id)

      for (let i in people) {
        let sortableFiltered: number[] = sortable

        if (event.grouped) {
          sortableFiltered = sortable.filter((sortableId) => {
            let person = people.find((item) => item.id === sortableId)
            return people[i].eventGroupId !== person?.eventGroupId
          })
        }

        if (
          sortableFiltered.length === 0 ||
          (sortableFiltered.length === 1 &&
            sortableFiltered[0] === people[i].id)
        ) {
          keepTrying = true
        } else {
          let sortedIndex = Math.floor(Math.random() * sortableFiltered.length)
          while (sortableFiltered[sortedIndex] === people[i].id) {
            sortedIndex = Math.floor(Math.random() * sortableFiltered.length)
          }

          sortedList.push({
            id: people[i].id,
            match: sortableFiltered[sortedIndex],
          })
          sortable = sortable.filter(
            (item) => item !== sortableFiltered[sortedIndex]
          )
        }
      }
    }

    // console.log(`ATTEMPS: ${attemps}`)
    // console.log(`MAX ATTEMPS: ${maxAttemps}`)
    // console.log(sortedList)

    if (attemps < maxAttemps) {
      for (let i in sortedList) {
        await updatePerson(
          { id: sortedList[i].id, eventId: id },
          { matched: encryptMatch(sortedList[i].match) }
        )
      }
  
      return true
    }

    return false
  } catch (error) {
    return false
  }
}
