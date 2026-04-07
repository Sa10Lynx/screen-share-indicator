// ── localStorage keys ────────────────────────────────────────────
export const STORAGE_KEYS = {
  ANIMATION: 'pref-animation',
  POSITION: 'pref-position',
  SIZE: 'pref-size',
  THEME: 'pref-theme',
  ANIM_STYLE: 'pref-anim-style',
  CUSTOM_GIF: 'pref-custom-gif',
}

// ── Indicator colors per theme ───────────────────────────────────
export const COLORS = {
  default: { sharing: '#0066FF', recording: '#FF4500' },
  mono: { sharing: '#FFFFFF', recording: '#999999' },
}

// ── Position → Tailwind class mapping ────────────────────────────
export const POSITIONS = {
  'top-left': { classes: 'top-3 left-3', label: '↖ Top Left' },
  'top-right': { classes: 'top-3 right-3', label: '↗ Top Right' },
  'bottom-left': { classes: 'bottom-3 left-3', label: '↙ Bottom Left' },
  'bottom-right': { classes: 'bottom-3 right-3', label: '↘ Bottom Right' },
}

// ── Size options ─────────────────────────────────────────────────
export const SIZES = {
  sm: { classes: 'w-3 h-3', gifPx: 24, label: 'S — Small' },
  md: { classes: 'w-4 h-4', gifPx: 32, label: 'M — Med' },
  lg: { classes: 'w-6 h-6', gifPx: 48, label: 'L — Large' },
}

// ── Animation durations (seconds string) per style ───────────────
export const ANIM_DURATIONS = {
  pulse: { sharing: null, recording: null }, // pulse uses Tailwind classes directly
  ripple: { sharing: '1.8s', recording: '1.2s' },
  ping: { sharing: '1.6s', recording: '0.8s' },
  blink: { sharing: '0.9s', recording: '0.5s' },
}

export const ANIMATION_STYLES = [
  { value: 'pulse', label: 'Pulse', desc: 'Soft breathe', animClass: 'animate-pulse-slow' },
  { value: 'ripple', label: 'Ripple', desc: 'Expanding ring', animClass: 'animate-ripple' },
  { value: 'ping', label: 'Ping', desc: 'Sonar burst', animClass: 'animate-ping' },
  { value: 'blink', label: 'Blink', desc: 'Sharp flash', animClass: 'animate-blink' },
]

// ── Video source options ─────────────────────────────────────────
export const VIDEO_SOURCES = [
  { value: 'none', label: '🖥️ Static' },
  { value: 'camera', label: '📷 Camera' },
  { value: 'screen', label: '🖵 Screen' },
]

// ── GIF presets ──────────────────────────────────────────────────
export const GIF_PRESETS = [
  { src: '/dinos/DinoSprites_doux.gif', label: 'Doux' },
  { src: '/dinos/DinoSprites_mort.gif', label: 'Mort' },
  { src: '/dinos/DinoSprites_tard.gif', label: 'Tard' },
  { src: '/dinos/DinoSprites_vita.gif', label: 'Vita' },
]

export const GIF_MAX_BYTES = 512 * 1024 // 512 KB

// ── Mock participants ────────────────────────────────────────────
export const PARTICIPANTS = [
  { name: 'Sarah M.', initials: 'SM', color: 'bg-violet-500' },
  { name: 'John D.', initials: 'JD', color: 'bg-emerald-500' },
  { name: 'Alex K.', initials: 'AK', color: 'bg-amber-500' },
  { name: 'You (Tanush)', initials: 'TK', color: 'bg-blue-500' },
]

export const WATCHING_COUNT = PARTICIPANTS.length - 1

// ── Default preference values ────────────────────────────────────
export const DEFAULTS = {
  animationEnabled: true,
  position: 'top-right',
  size: 'md',
  colorTheme: 'default',
  animationStyle: 'pulse',
  customGif: null,
  videoSource: 'none',
}
