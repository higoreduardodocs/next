import { useState, useEffect } from 'react'

export default function useLocalStorage<T>(item: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const itemValue = localStorage.getItem(item)
    if (itemValue) setValue(JSON.parse(itemValue))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const updateValue = (newValue: T) => {
    setValue(newValue)
    localStorage.setItem(item, JSON.stringify(newValue))
  }

  return { value, updateValue }
}
