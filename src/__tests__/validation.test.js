import { describe, it, expect, beforeEach } from 'vitest'
import { validateStoredValue, safeSetItem } from '../utils/validation'

describe('validateStoredValue', () => {
  const fallback = 'FALLBACK'

  // pref-animation — boolean
  it('accepts boolean for pref-animation', () => {
    expect(validateStoredValue('pref-animation', true, fallback)).toBe(true)
    expect(validateStoredValue('pref-animation', false, fallback)).toBe(false)
  })

  it('rejects non-boolean for pref-animation', () => {
    expect(validateStoredValue('pref-animation', 'yes', fallback)).toBe(fallback)
    expect(validateStoredValue('pref-animation', 1, fallback)).toBe(fallback)
  })

  // pref-position — enum
  it('accepts valid positions', () => {
    expect(validateStoredValue('pref-position', 'top-left', fallback)).toBe('top-left')
    expect(validateStoredValue('pref-position', 'bottom-right', fallback)).toBe('bottom-right')
  })

  it('rejects invalid positions', () => {
    expect(validateStoredValue('pref-position', 'center', fallback)).toBe(fallback)
    expect(validateStoredValue('pref-position', '', fallback)).toBe(fallback)
  })

  // pref-size — enum
  it('accepts valid sizes', () => {
    expect(validateStoredValue('pref-size', 'sm', fallback)).toBe('sm')
    expect(validateStoredValue('pref-size', 'md', fallback)).toBe('md')
    expect(validateStoredValue('pref-size', 'lg', fallback)).toBe('lg')
  })

  it('rejects invalid sizes', () => {
    expect(validateStoredValue('pref-size', 'xl', fallback)).toBe(fallback)
  })

  // pref-theme — enum
  it('accepts valid themes', () => {
    expect(validateStoredValue('pref-theme', 'default', fallback)).toBe('default')
    expect(validateStoredValue('pref-theme', 'mono', fallback)).toBe('mono')
  })

  it('rejects invalid themes', () => {
    expect(validateStoredValue('pref-theme', 'dark', fallback)).toBe(fallback)
  })

  // pref-anim-style — enum
  it('accepts valid animation styles', () => {
    ;['pulse', 'ripple', 'ping', 'blink'].forEach((v) => {
      expect(validateStoredValue('pref-anim-style', v, fallback)).toBe(v)
    })
  })

  it('rejects invalid animation styles', () => {
    expect(validateStoredValue('pref-anim-style', 'bounce', fallback)).toBe(fallback)
  })

  // pref-sharing-gif / pref-recording-gif — null, /dinos/ path, or data URI
  it('accepts null for sharing gif', () => {
    expect(validateStoredValue('pref-sharing-gif', null, fallback)).toBeNull()
  })

  it('accepts null for recording gif', () => {
    expect(validateStoredValue('pref-recording-gif', null, fallback)).toBeNull()
  })

  it('accepts /dinos/ paths for sharing gif', () => {
    expect(validateStoredValue('pref-sharing-gif', '/dinos/test.gif', fallback)).toBe(
      '/dinos/test.gif',
    )
  })

  it('accepts /dinos/ paths for recording gif', () => {
    expect(validateStoredValue('pref-recording-gif', '/dinos/test.gif', fallback)).toBe(
      '/dinos/test.gif',
    )
  })

  it('accepts data:image/gif;base64 URIs', () => {
    const uri = 'data:image/gif;base64,R0lGODlh'
    expect(validateStoredValue('pref-sharing-gif', uri, fallback)).toBe(uri)
    expect(validateStoredValue('pref-recording-gif', uri, fallback)).toBe(uri)
  })

  it('rejects arbitrary strings for gif keys', () => {
    expect(validateStoredValue('pref-sharing-gif', 'http://evil.com/x.gif', fallback)).toBe(
      fallback,
    )
    expect(validateStoredValue('pref-recording-gif', '<script>', fallback)).toBe(fallback)
  })

  // unknown keys — pass through
  it('passes through unknown keys', () => {
    expect(validateStoredValue('unknown-key', 'anything', fallback)).toBe('anything')
  })
})

describe('safeSetItem', () => {
  beforeEach(() => localStorage.clear())

  it('writes to localStorage', () => {
    const result = safeSetItem('test-key', 'hello')
    expect(result).toBe(true)
    expect(localStorage.getItem('test-key')).toBe('"hello"')
  })

  it('writes objects as JSON', () => {
    safeSetItem('obj', { a: 1 })
    expect(JSON.parse(localStorage.getItem('obj'))).toEqual({ a: 1 })
  })
})
