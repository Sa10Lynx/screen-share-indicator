import { POSITIONS, SIZES, ANIMATION_STYLES } from '../config/constants'

// ── GIF magic byte verification ──────────────────────────────────
// GIF87a = [47 49 46 38 37 61], GIF89a = [47 49 46 38 39 61]
const GIF_MAGIC = [0x47, 0x49, 0x46, 0x38] // "GIF8" prefix (shared by 87a & 89a)

export function isValidGifFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = () => {
      const bytes = new Uint8Array(reader.result)
      if (bytes.length < 6) return resolve(false)
      const matchesMagic = GIF_MAGIC.every((b, i) => bytes[i] === b)
      // 5th byte must be '7' (0x37) or '9' (0x39)
      const validVersion = bytes[4] === 0x37 || bytes[4] === 0x39
      // 6th byte must be 'a' (0x61)
      resolve(matchesMagic && validVersion && bytes[5] === 0x61)
    }
    reader.onerror = () => resolve(false)
    reader.readAsArrayBuffer(file.slice(0, 6))
  })
}

// ── Allowed enum values (built once from constants) ──────────────
const VALID_POSITIONS = new Set(Object.keys(POSITIONS))
const VALID_SIZES = new Set(Object.keys(SIZES))
const VALID_ANIM_STYLES = new Set(ANIMATION_STYLES.map((s) => s.value))
const VALID_COLOR_THEMES = new Set(['default', 'mono'])

// ── Validate a localStorage value against its allowed domain ─────
// Returns the parsed value if valid, otherwise the provided default.
const VALIDATORS = {
  'pref-animation': (v) => typeof v === 'boolean',
  'pref-position': (v) => VALID_POSITIONS.has(v),
  'pref-size': (v) => VALID_SIZES.has(v),
  'pref-theme': (v) => VALID_COLOR_THEMES.has(v),
  'pref-anim-style': (v) => VALID_ANIM_STYLES.has(v),
  'pref-custom-gif': (v) =>
    v === null ||
    (typeof v === 'string' && v.startsWith('/dinos/')) ||
    (typeof v === 'string' && v.startsWith('data:image/gif;base64,')),
}

export function validateStoredValue(key, parsed, defaultVal) {
  const check = VALIDATORS[key]
  if (!check) return parsed // unknown key — pass through
  return check(parsed) ? parsed : defaultVal
}

// ── Safe localStorage write with quota guard ─────────────────────
export function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (e) {
    if (e.name === 'QuotaExceededError' || e.code === 22) {
      // Evict only the custom-gif data (largest item) and retry once
      localStorage.removeItem('pref-custom-gif')
      try {
        localStorage.setItem(key, JSON.stringify(value))
        return true
      } catch {
        return false
      }
    }
    return false
  }
}
