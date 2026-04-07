import { describe, it, expect } from 'vitest'
import {
  STORAGE_KEYS,
  COLORS,
  POSITIONS,
  SIZES,
  ANIM_DURATIONS,
  ANIMATION_STYLES,
  VIDEO_SOURCES,
  GIF_PRESETS,
  GIF_MAX_BYTES,
  PARTICIPANTS,
  WATCHING_COUNT,
  DEFAULTS,
} from '../config/constants'

describe('constants', () => {
  it('exports 6 storage keys', () => {
    expect(Object.keys(STORAGE_KEYS)).toHaveLength(6)
    expect(STORAGE_KEYS.ANIMATION).toBe('pref-animation')
  })

  it('has default and mono color themes', () => {
    expect(COLORS.default.sharing).toBe('#0066FF')
    expect(COLORS.default.recording).toBe('#FF4500')
    expect(COLORS.mono.sharing).toBe('#FFFFFF')
  })

  it('defines 4 positions', () => {
    const keys = Object.keys(POSITIONS)
    expect(keys).toHaveLength(4)
    expect(keys).toContain('top-left')
    expect(keys).toContain('bottom-right')
    expect(POSITIONS['top-right'].classes).toContain('top-3')
  })

  it('defines 3 sizes with classes and gifPx', () => {
    expect(Object.keys(SIZES)).toHaveLength(3)
    expect(SIZES.md.gifPx).toBe(32)
    expect(SIZES.sm.classes).toContain('w-3')
  })

  it('defines 4 animation styles', () => {
    expect(ANIMATION_STYLES).toHaveLength(4)
    const values = ANIMATION_STYLES.map((s) => s.value)
    expect(values).toEqual(['pulse', 'ripple', 'ping', 'blink'])
  })

  it('has matching ANIM_DURATIONS for each style', () => {
    ANIMATION_STYLES.forEach((s) => {
      expect(ANIM_DURATIONS).toHaveProperty(s.value)
    })
  })

  it('defines 3 video sources', () => {
    expect(VIDEO_SOURCES).toHaveLength(3)
    expect(VIDEO_SOURCES.map((v) => v.value)).toEqual(['none', 'camera', 'screen'])
  })

  it('defines 4 GIF presets', () => {
    expect(GIF_PRESETS).toHaveLength(4)
    GIF_PRESETS.forEach((g) => {
      expect(g.src).toMatch(/^\/dinos\//)
      expect(g.label).toBeTruthy()
    })
  })

  it('GIF_MAX_BYTES is 512 KB', () => {
    expect(GIF_MAX_BYTES).toBe(512 * 1024)
  })

  it('has 4 participants and WATCHING_COUNT = 3', () => {
    expect(PARTICIPANTS).toHaveLength(4)
    expect(WATCHING_COUNT).toBe(3)
  })

  it('DEFAULTS matches expected shape', () => {
    expect(DEFAULTS).toEqual({
      animationEnabled: true,
      position: 'top-right',
      size: 'md',
      colorTheme: 'default',
      animationStyle: 'pulse',
      customGif: null,
      videoSource: 'none',
    })
  })
})
