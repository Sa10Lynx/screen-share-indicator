import { memo } from 'react'
import { useIndicator } from '../context/IndicatorContext'
import { COLORS, POSITIONS, SIZES, ANIM_DURATIONS } from '../config/constants'

// ── Dot renderer — swaps structure based on animation style ──────
function AnimatedDot({ sizeClass, color, hollow, animStyle, animEnabled, isRecording }) {
  const duration = ANIM_DURATIONS[animStyle]
    ? isRecording
      ? ANIM_DURATIONS[animStyle].recording
      : ANIM_DURATIONS[animStyle].sharing
    : null

  const dotStyle = {
    borderColor: color,
    backgroundColor: hollow ? 'transparent' : color,
  }

  // Pulse and blink animate the dot itself directly
  const pulseClass =
    animEnabled && animStyle === 'pulse'
      ? isRecording
        ? 'animate-pulse-fast'
        : 'animate-pulse-slow'
      : ''

  const blinkClass = animEnabled && animStyle === 'blink' ? 'animate-blink' : ''

  const baseDot = (
    <div
      className={`${sizeClass} rounded-full border-2 ${pulseClass} ${blinkClass}`}
      style={{ ...dotStyle, ...(duration && blinkClass ? { animationDuration: duration } : {}) }}
    />
  )

  // Ripple — stable dot + two expanding rings behind it (staggered for water-drop effect)
  if (animEnabled && animStyle === 'ripple') {
    return (
      <div className="relative">
        {/* First ring */}
        <div
          className="absolute inset-0 rounded-full animate-ripple"
          style={{
            borderColor: color,
            borderWidth: 2,
            borderStyle: 'solid',
            backgroundColor: color + '40',
            animationDuration: duration,
          }}
        />
        {/* Second ring — delayed for cascading ripple */}
        <div
          className="absolute inset-0 rounded-full animate-ripple-delayed"
          style={{
            borderColor: color,
            borderWidth: 2,
            borderStyle: 'solid',
            backgroundColor: color + '30',
            animationDuration: duration,
            animationDelay: `calc(${duration} * 0.4)`,
          }}
        />
        <div className={`relative ${sizeClass} rounded-full border-2`} style={dotStyle} />
      </div>
    )
  }

  // Ping — stable dot + scaling ghost behind it
  if (animEnabled && animStyle === 'ping') {
    return (
      <div className="relative">
        <div
          className="absolute inset-0 rounded-full animate-ping"
          style={{ backgroundColor: color, opacity: 0.7, animationDuration: duration }}
        />
        <div className={`relative ${sizeClass} rounded-full border-2`} style={dotStyle} />
      </div>
    )
  }

  return baseDot
}

// ── Main Indicator ───────────────────────────────────────────────
function Indicator({ participantCount = 0 }) {
  const {
    isSharing,
    isRecording,
    animationEnabled,
    position,
    size,
    colorTheme,
    animationStyle,
    customGif,
  } = useIndicator()

  const isVisible = isSharing
  const isInRecordingMode = isSharing && isRecording

  const colors = COLORS[colorTheme] ?? COLORS.default
  const activeColor = isInRecordingMode ? colors.recording : colors.sharing
  const posClass = POSITIONS[position]?.classes ?? POSITIONS['top-right'].classes
  const sizeClass = SIZES[size]?.classes ?? SIZES.md.classes
  const gifPx = SIZES[size]?.gifPx ?? SIZES.md.gifPx

  const glowStyle =
    isVisible && !customGif
      ? { boxShadow: `0 0 0 3px ${activeColor}30, 0 0 14px ${activeColor}60` }
      : {}

  // Count badge floats on the inner side of the corner
  const countSide = position.includes('right') ? 'right-0' : 'left-0'
  const countEdge = position.includes('bottom') ? 'bottom-full mb-1.5' : 'top-full mt-1.5'

  // Determine accessible status text
  const statusText = !isVisible
    ? undefined
    : isInRecordingMode
      ? 'Screen is being shared and recorded'
      : 'Screen is being shared'

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={statusText}
      className={[
        'absolute',
        posClass,
        'transition-all duration-300 ease-out',
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none',
      ].join(' ')}
    >
      {/* GIF mode — render <img> instead of animated dot */}
      {customGif ? (
        <img
          src={customGif}
          alt={
            isInRecordingMode
              ? 'Recording indicator animation'
              : 'Screen sharing indicator animation'
          }
          draggable={false}
          style={{ width: gifPx, height: gifPx, imageRendering: 'pixelated' }}
          className="select-none drop-shadow-lg"
        />
      ) : (
        /* Dot mode — glow wrapper */
        <div style={glowStyle} className="rounded-full">
          <AnimatedDot
            sizeClass={sizeClass}
            color={activeColor}
            hollow={isInRecordingMode}
            animStyle={animationStyle}
            animEnabled={animationEnabled}
            isRecording={isInRecordingMode}
          />
        </div>
      )}

      {/* Participant count badge */}
      {isSharing && participantCount > 0 && (
        <div
          aria-label={`${participantCount} participants watching`}
          className={[
            'absolute',
            countEdge,
            countSide,
            'bg-black/70 text-white text-[9px] font-semibold',
            'px-1.5 py-0.5 rounded-full whitespace-nowrap border border-white/10',
          ].join(' ')}
        >
          {participantCount} watching
        </div>
      )}
    </div>
  )
}

export default memo(Indicator)
