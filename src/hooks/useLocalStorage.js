import { useState, useEffect, useCallback } from 'react'
import { validateStoredValue, safeSetItem } from '../utils/validation'

function read(key, defaultVal) {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return defaultVal
    const parsed = JSON.parse(raw)
    return validateStoredValue(key, parsed, defaultVal)
  } catch {
    return defaultVal
  }
}

export default function useLocalStorage(key, defaultVal) {
  const [value, setValue] = useState(() => read(key, defaultVal))

  useEffect(() => {
    safeSetItem(key, value)
  }, [key, value])

  const reset = useCallback(() => setValue(defaultVal), [defaultVal])

  return [value, setValue, reset]
}
