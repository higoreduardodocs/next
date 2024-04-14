'use client'

import { useState } from 'react'

import { SearchResult } from '@/types/person-type'
import { searchPerson } from '@/libs/fetcher'
import Form from './form'
import Reveal from './reveal'

type Props = {
  id: number
}

export default function Search({ id }: Props) {
  const [results, setResults] = useState<SearchResult>()
  const [loading, setLoading] = useState(false)
  const handleSearch = async (cpf: string) => {
    if (!cpf) return
    try {
      setLoading(true)
      const result = await searchPerson(id, cpf)
      if (!result) return alert('Desculpe não encontramos seu CPF')
      setResults(result)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-gray-900 p-5 rounded">
      {!results ? (
        <Form handleSearch={handleSearch} loading={loading} />
      ) : (
        <Reveal results={results} />
      )}
    </section>
  )
}
