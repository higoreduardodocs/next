'use server'

import { Event } from '@/types/event-type'
import { SearchResult } from '@/types/person-type'
import api from './api'

// EVENT
export const getOneEvent = async (id: number): Promise<Event | false> => {
  const json = await api.get(`/events/${id}`)
  return (json.data.event as Event) ?? false
}

export const searchPerson = async (
  eventId: number,
  cpf: string
): Promise<SearchResult | false> => {
  const json = await api.get(`/events/${eventId}/search?cpf=${cpf}`)
  if (json.data.person && json.data.personMatch) {
    return json.data as SearchResult
  }

  return false
}
