import { memo } from 'react'
import { useIndicator } from '../context/IndicatorContext'
import {
  POSITIONS,
  SIZES,
  ANIMATION_STYLES,
  VIDEO_SOURCES,
  GIF_PRESETS,
  GIF_MAX_BYTES,
  COLORS,
} from '../config/constants'
import { isValidGifFile } from '../utils/validation'

// ── Reusable section wrapper ───────────────────────────────
function Section({ title, children }) {
  return (
    <fieldset className="border-0 p-0 m-0">
      <legend className="text-xs uppercase tracking-widest text-gray-500 mb-2">{title}</legend>
      {children}
    </fieldset>
  )
}

// ── Reusable option button (used for position / size / theme) ─
function OptionBtn({ active, onClick, children, ariaLabel }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      aria-label={ariaLabel}
      className={`min-h-[44px] sm:min-h-0 py-2.5 sm:py-2 rounded-lg text-xs font-semibold transition-all duration-150 ${
        active
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'
          : 'bg-slate-600/70 text-gray-400 hover:bg-slate-500/70 hover:text-white'
      }`}
    >
      {children}
    </button>
  )
}

// Live mini-dot used inside each animation style preview button
function PreviewDot({ animClass, style, color = '#0066FF', animDuration }) {
  return (
    <div className="relative w-4 h-4 flex items-center justify-center">
      {(style === 'ripple' || style === 'ping') && (
        <div
          className={`absolute inset-0 rounded-full ${animClass}-ring`}
          style={{
            border: `2px solid ${color}`,
            animationName: style === 'ping' ? 'ping' : 'ripple',
            animationDuration: animDuration,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'ease-out',
          }}
        />
      )}
      <div
        className={`w-3 h-3 rounded-full border-2 ${style === 'pulse' || style === 'blink' ? animClass : ''}`}
        style={{ backgroundColor: color, borderColor: color, animationDuration: animDuration }}
      />
    </div>
  )
}

function Controls() {
  const {
    isSharing,
    setIsSharing,
    isRecording,
    setIsRecording,
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
    videoSource,
    setVideoSource,
  } = useIndicator()
  return (
    <div
      className="bg-slate-800/60 backdrop-blur border border-slate-700 rounded-xl p-4 sm:p-5 space-y-5 sm:space-y-6 lg:sticky lg:top-8"
      role="form"
      aria-label="Indicator settings"
    >
      <p className="text-white font-semibold text-base">Controls</p>

      {/* ── SHARING / RECORDING ─────────────────────────── */}
      <Section title="Session">
        <div className="space-y-2.5">
          <button
            onClick={() => {
              if (isSharing) setIsRecording(false)
              setIsSharing(!isSharing)
            }}
            aria-label={isSharing ? 'Stop screen sharing' : 'Start screen sharing'}
            className={`w-full min-h-[44px] py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-200 ${
              isSharing
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {isSharing ? '⏹ Stop Sharing' : '▶ Start Sharing'}
          </button>

          <button
            onClick={() => setIsRecording(!isRecording)}
            disabled={!isSharing}
            aria-label={isRecording ? 'Stop recording' : 'Start recording'}
            aria-disabled={!isSharing}
            className={`w-full min-h-[44px] py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-200 ${
              !isSharing
                ? 'bg-slate-600/50 text-gray-600 cursor-not-allowed'
                : isRecording
                  ? 'bg-orange-600 hover:bg-orange-700 text-white'
                  : 'bg-orange-500 hover:bg-orange-600 text-white'
            }`}
          >
            {isRecording ? '⏹ Stop Recording' : '⏺ Start Recording'}
          </button>
        </div>
      </Section>

      {/* ── VIDEO SOURCE ────────────────────────────────── */}
      <Section title="Video Source">
        <div className="grid grid-cols-3 gap-1.5" role="radiogroup" aria-label="Video source">
          {VIDEO_SOURCES.map((opt) => (
            <OptionBtn
              key={opt.value}
              active={videoSource === opt.value}
              onClick={() => setVideoSource(opt.value)}
              ariaLabel={`Video source: ${opt.label}`}
            >
              {opt.label}
            </OptionBtn>
          ))}
        </div>
        {videoSource !== 'none' && (
          <p className="text-gray-500 text-xs mt-2">
            {videoSource === 'camera'
              ? 'Webcam feed shown in Your View'
              : 'Screen capture shown in Your View'}
          </p>
        )}
      </Section>

      {/* ── POSITION ────────────────────────────────────── */}
      <Section title="Position">
        <div className="grid grid-cols-2 gap-1.5" role="radiogroup" aria-label="Indicator position">
          {Object.entries(POSITIONS).map(([value, { label }]) => (
            <OptionBtn
              key={value}
              active={position === value}
              onClick={() => setPosition(value)}
              ariaLabel={`Position: ${label}`}
            >
              {label}
            </OptionBtn>
          ))}
        </div>
      </Section>

      {/* ── SIZE ────────────────────────────────────────── */}
      <Section title="Size">
        <div className="grid grid-cols-3 gap-1.5" role="radiogroup" aria-label="Indicator size">
          {Object.entries(SIZES).map(([value, { label }]) => (
            <OptionBtn
              key={value}
              active={size === value}
              onClick={() => setSize(value)}
              ariaLabel={`Size: ${label}`}
            >
              {label}
            </OptionBtn>
          ))}
        </div>
      </Section>

      {/* ── COLOR THEME ─────────────────────────────────── */}
      <Section title="Color Theme">
        <div className="grid grid-cols-2 gap-1.5" role="radiogroup" aria-label="Color theme">
          <OptionBtn
            active={colorTheme === 'default'}
            onClick={() => setColorTheme('default')}
            ariaLabel="Color theme: Default (blue and red)"
          >
            <span className="flex items-center justify-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>
              Default
            </span>
          </OptionBtn>
          <OptionBtn
            active={colorTheme === 'mono'}
            onClick={() => setColorTheme('mono')}
            ariaLabel="Color theme: Mono (colorblind-friendly)"
          >
            <span className="flex items-center justify-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-white inline-block"></span>
              Mono
            </span>
          </OptionBtn>
        </div>
        {colorTheme === 'mono' && (
          <p className="text-gray-500 text-xs mt-2">
            Colorblind-friendly — shape + speed remain as primary signals
          </p>
        )}
      </Section>

      {/* ── INDICATOR MODE ──────────────────────────────── */}
      <Section title="Indicator Mode">
        <div className="space-y-3">
          {/* Tab-style toggle */}
          <div className="grid grid-cols-2 gap-1.5" role="tablist" aria-label="Indicator mode">
            <OptionBtn
              active={!customGif}
              onClick={() => setCustomGif(null)}
              ariaLabel="Indicator mode: Dot animation"
            >
              ● Dot Animation
            </OptionBtn>
            <OptionBtn
              active={!!customGif}
              onClick={() => {
                if (!customGif) setCustomGif('/dinos/DinoSprites_doux.gif')
              }}
              ariaLabel="Indicator mode: Custom GIF"
            >
              🦕 Custom GIF
            </OptionBtn>
          </div>

          {/* ── Dot animation options (only when GIF not active) ── */}
          {!customGif && (
            <div className="grid grid-cols-2 gap-1.5">
              {ANIMATION_STYLES.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setAnimationStyle(s.value)}
                  aria-pressed={animationStyle === s.value}
                  aria-label={`Animation style: ${s.label}`}
                  className={`flex items-center gap-2.5 px-3 py-3 sm:py-2.5 rounded-lg text-left transition-all duration-150 min-h-[44px] sm:min-h-0 ${
                    animationStyle === s.value
                      ? 'bg-blue-600/25 ring-1 ring-blue-500 text-white'
                      : 'bg-slate-600/40 text-gray-400 hover:bg-slate-500/50 hover:text-white'
                  }`}
                >
                  <PreviewDot
                    style={s.value}
                    animClass={animationEnabled ? s.animClass : ''}
                    animDuration={s.value === 'blink' ? '1s' : '1.5s'}
                  />
                  <div>
                    <p className="text-xs font-semibold leading-tight">{s.label}</p>
                    <p className="text-[10px] text-gray-500 leading-tight">{s.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* ── GIF options (only when GIF mode active) ── */}
          {customGif && (
            <div className="space-y-2">
              <div className="grid grid-cols-4 gap-1.5">
                {GIF_PRESETS.map((dino) => (
                  <button
                    key={dino.label}
                    onClick={() => setCustomGif(dino.src)}
                    aria-label={`Select ${dino.label} GIF`}
                    aria-pressed={customGif === dino.src}
                    className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-150 ${
                      customGif === dino.src
                        ? 'bg-blue-600/25 ring-1 ring-blue-500'
                        : 'bg-slate-600/40 hover:bg-slate-500/50'
                    }`}
                  >
                    <img
                      src={dino.src}
                      alt={dino.label}
                      className="w-8 h-8"
                      style={{ imageRendering: 'pixelated' }}
                    />
                    <span className="text-[10px] text-gray-400">{dino.label}</span>
                  </button>
                ))}
              </div>

              <label className="flex items-center justify-center gap-2 w-full min-h-[44px] py-2.5 sm:py-2 px-4 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-200 bg-slate-600/70 text-gray-400 hover:bg-slate-500/70 hover:text-white">
                📁 Upload GIF
                <input
                  type="file"
                  accept="image/gif"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (!file || file.type !== 'image/gif') return
                    if (file.size > GIF_MAX_BYTES) {
                      alert('GIF must be under 512 KB')
                      return
                    }
                    const valid = await isValidGifFile(file)
                    if (!valid) {
                      alert('Invalid GIF file — magic bytes do not match')
                      return
                    }
                    const reader = new FileReader()
                    reader.onload = () => setCustomGif(reader.result)
                    reader.readAsDataURL(file)
                    e.target.value = ''
                  }}
                />
              </label>
            </div>
          )}
        </div>
      </Section>

      {/* ── ANIMATION TOGGLE ────────────────────────────── */}
      <Section title="Animation">
        <button
          onClick={() => setAnimationEnabled(!animationEnabled)}
          aria-pressed={animationEnabled}
          aria-label={animationEnabled ? 'Disable animation' : 'Enable animation'}
          className={`w-full min-h-[44px] py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-200 ${
            animationEnabled
              ? 'bg-purple-600 hover:bg-purple-700 text-white'
              : 'bg-slate-600/70 text-gray-400 hover:bg-slate-500/70'
          }`}
        >
          {animationEnabled ? '✦ Animation ON' : '— Animation OFF'}
        </button>
      </Section>

      {/* ── INDICATOR PREVIEW ───────────────────────────── */}
      <Section title="Preview">
        <div className="bg-slate-900/60 rounded-lg p-3 space-y-2.5">
          {[
            {
              color: colorTheme === 'mono' ? COLORS.mono.sharing : COLORS.default.sharing,
              hollow: false,
              label: 'Sharing',
              speed: '1.8s',
            },
            {
              color: colorTheme === 'mono' ? COLORS.mono.recording : COLORS.default.recording,
              hollow: true,
              label: 'Recording',
              speed: '0.8s',
            },
          ].map((item) => {
            // Pick the right animation class for pulse/blink (applied directly to dot)
            const dotAnimClass = animationEnabled
              ? animationStyle === 'pulse'
                ? item.hollow
                  ? 'animate-pulse-fast'
                  : 'animate-pulse-slow'
                : animationStyle === 'blink'
                  ? 'animate-blink'
                  : '' // ripple/ping handled via ring element below
              : ''

            // Ring element needed for ripple and ping
            const showRing =
              animationEnabled && (animationStyle === 'ripple' || animationStyle === 'ping')

            return (
              <div key={item.label} className="flex items-center gap-3">
                <div className="relative w-4 h-4 shrink-0 overflow-hidden">
                  {showRing && (
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        borderColor: item.color,
                        borderWidth: 2,
                        borderStyle: 'solid',
                        animationName: animationStyle,
                        animationDuration: item.speed,
                        animationIterationCount: 'infinite',
                        animationTimingFunction: 'ease-out',
                      }}
                    />
                  )}
                  <div
                    className={`w-4 h-4 rounded-full border-2 ${dotAnimClass}`}
                    style={{
                      backgroundColor: item.hollow ? 'transparent' : item.color,
                      borderColor: item.color,
                      boxShadow: `0 0 8px ${item.color}80`,
                      ...(dotAnimClass === 'animate-blink'
                        ? { animationDuration: item.speed }
                        : {}),
                    }}
                  />
                </div>
                <span className="text-gray-400 text-xs capitalize">
                  {item.label} — {animationStyle}
                </span>
              </div>
            )
          })}
        </div>
      </Section>
    </div>
  )
}

export default memo(Controls)
