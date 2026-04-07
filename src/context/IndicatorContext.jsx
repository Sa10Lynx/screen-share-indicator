import { createContext, useContext, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { STORAGE_KEYS, DEFAULTS } from '../config/constants'

const IndicatorContext = createContext(null)

export function IndicatorProvider({ children }) {
  // ── Session state (not persisted) ───────────────────────────
  const [isSharing, setIsSharing] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [videoSource, setVideoSource] = useState(DEFAULTS.videoSource)

  // ── Persisted preferences ───────────────────────────────────
  const [animationEnabled, setAnimationEnabled] = useLocalStorage(
    STORAGE_KEYS.ANIMATION,
    DEFAULTS.animationEnabled,
  )
  const [position, setPosition] = useLocalStorage(STORAGE_KEYS.POSITION, DEFAULTS.position)
  const [size, setSize] = useLocalStorage(STORAGE_KEYS.SIZE, DEFAULTS.size)
  const [colorTheme, setColorTheme] = useLocalStorage(STORAGE_KEYS.THEME, DEFAULTS.colorTheme)
  const [animationStyle, setAnimationStyle] = useLocalStorage(
    STORAGE_KEYS.ANIM_STYLE,
    DEFAULTS.animationStyle,
  )
  const [customGif, setCustomGif] = useLocalStorage(STORAGE_KEYS.CUSTOM_GIF, DEFAULTS.customGif)

  const value = {
    // Session
    isSharing,
    setIsSharing,
    isRecording,
    setIsRecording,
    videoSource,
    setVideoSource,
    // Preferences
    animationEnabled,
    setAnimationEnabled,
    position,
    setPosition,
    size,
    setSize,
    colorTheme,
    setColorTheme,
    animationStyle,
    setAnimationStyle,
    customGif,
    setCustomGif,
  }

  return <IndicatorContext.Provider value={value}>{children}</IndicatorContext.Provider>
}

export function useIndicator() {
  const ctx = useContext(IndicatorContext)
  if (!ctx) throw new Error('useIndicator must be used within <IndicatorProvider>')
  return ctx
}
