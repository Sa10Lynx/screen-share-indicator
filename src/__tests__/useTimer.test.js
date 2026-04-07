import { describe, it, expect, vi, afterEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import useTimer from '../hooks/useTimer'

describe('useTimer', () => {
  afterEach(() => vi.restoreAllMocks())

  it('returns 0 when not running', () => {
    const { result } = renderHook(() => useTimer(false))
    expect(result.current).toBe(0)
  })

  it('returns 0 initially when running', () => {
    const { result } = renderHook(() => useTimer(true))
    expect(result.current).toBe(0)
  })

  it('resets to 0 when running changes from true to false', () => {
    const { result, rerender } = renderHook(({ running }) => useTimer(running), {
      initialProps: { running: true },
    })
    expect(result.current).toBe(0)
    rerender({ running: false })
    expect(result.current).toBe(0)
  })
})
