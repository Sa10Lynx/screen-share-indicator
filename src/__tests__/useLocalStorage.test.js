import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useLocalStorage from '../hooks/useLocalStorage'

describe('useLocalStorage', () => {
  beforeEach(() => localStorage.clear())

  it('returns default value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'))
    expect(result.current[0]).toBe('default')
  })

  it('persists value to localStorage on change', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'))
    act(() => result.current[1]('updated'))
    expect(result.current[0]).toBe('updated')
    expect(JSON.parse(localStorage.getItem('test-key'))).toBe('updated')
  })

  it('reads existing value from localStorage', () => {
    localStorage.setItem('test-key', JSON.stringify('existing'))
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'))
    expect(result.current[0]).toBe('existing')
  })

  it('falls back to default for corrupted JSON', () => {
    localStorage.setItem('test-key', '{broken')
    const { result } = renderHook(() => useLocalStorage('test-key', 'safe'))
    expect(result.current[0]).toBe('safe')
  })

  it('validates stored value against allowed domain', () => {
    // Store an invalid position value
    localStorage.setItem('pref-position', JSON.stringify('invalid-pos'))
    const { result } = renderHook(() => useLocalStorage('pref-position', 'top-right'))
    // Should fall back to default because 'invalid-pos' is not a valid position
    expect(result.current[0]).toBe('top-right')
  })

  it('reset() restores default value', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'original'))
    act(() => result.current[1]('changed'))
    expect(result.current[0]).toBe('changed')
    act(() => result.current[2]()) // reset
    expect(result.current[0]).toBe('original')
  })
})
