import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { IndicatorProvider, useIndicator } from '../context/IndicatorContext'

function wrapper({ children }) {
  return <IndicatorProvider>{children}</IndicatorProvider>
}

describe('IndicatorContext', () => {
  it('throws when used outside of provider', () => {
    expect(() => {
      renderHook(() => useIndicator())
    }).toThrow('useIndicator must be used within <IndicatorProvider>')
  })

  it('provides default session state', () => {
    const { result } = renderHook(() => useIndicator(), { wrapper })
    expect(result.current.isSharing).toBe(false)
    expect(result.current.isRecording).toBe(false)
    expect(result.current.videoSource).toBe('none')
  })

  it('provides default preference values', () => {
    const { result } = renderHook(() => useIndicator(), { wrapper })
    expect(result.current.animationEnabled).toBe(true)
    expect(result.current.position).toBe('top-right')
    expect(result.current.size).toBe('md')
    expect(result.current.colorTheme).toBe('default')
    expect(result.current.animationStyle).toBe('pulse')
    expect(result.current.customGif).toBeNull()
  })

  it('can toggle isSharing', () => {
    const { result } = renderHook(() => useIndicator(), { wrapper })
    act(() => result.current.setIsSharing(true))
    expect(result.current.isSharing).toBe(true)
  })

  it('can toggle isRecording', () => {
    const { result } = renderHook(() => useIndicator(), { wrapper })
    act(() => result.current.setIsRecording(true))
    expect(result.current.isRecording).toBe(true)
  })

  it('can change position', () => {
    const { result } = renderHook(() => useIndicator(), { wrapper })
    act(() => result.current.setPosition('bottom-left'))
    expect(result.current.position).toBe('bottom-left')
  })

  it('can change size', () => {
    const { result } = renderHook(() => useIndicator(), { wrapper })
    act(() => result.current.setSize('lg'))
    expect(result.current.size).toBe('lg')
  })

  it('can change color theme', () => {
    const { result } = renderHook(() => useIndicator(), { wrapper })
    act(() => result.current.setColorTheme('mono'))
    expect(result.current.colorTheme).toBe('mono')
  })

  it('can change animation style', () => {
    const { result } = renderHook(() => useIndicator(), { wrapper })
    act(() => result.current.setAnimationStyle('ripple'))
    expect(result.current.animationStyle).toBe('ripple')
  })

  it('can set custom gif', () => {
    const { result } = renderHook(() => useIndicator(), { wrapper })
    act(() => result.current.setCustomGif('/dinos/DinoSprites_doux.gif'))
    expect(result.current.customGif).toBe('/dinos/DinoSprites_doux.gif')
  })
})
