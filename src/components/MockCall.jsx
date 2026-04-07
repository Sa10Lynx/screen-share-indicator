import { memo } from 'react'
import Indicator from './Indicator'
import { useIndicator } from '../context/IndicatorContext'
import { PARTICIPANTS, WATCHING_COUNT } from '../config/constants'
import useTimer from '../hooks/useTimer'
import useMediaStream from '../hooks/useMediaStream'

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0')
  const s = (seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

function MockCall() {
  const { isSharing, isRecording, videoSource } = useIndicator()
  const elapsed = useTimer(isSharing)
  const { attach } = useMediaStream(videoSource)

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* ── YOUR VIEW ─────────────────────────────────────── */}
      <div>
        <p className="text-white text-xs font-semibold uppercase tracking-widest mb-2 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-400" aria-hidden="true"></span>
          Your View
        </p>

        <div className="rounded-xl overflow-hidden border border-slate-700 bg-[#111827]">
          {/* Title bar */}
          <div className="flex items-center justify-between px-4 py-2 bg-[#0d1117] border-b border-slate-800">
            <div className="flex items-center gap-3">
              {/* macOS-style dots (decorative) */}
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
              </div>
              <span className="text-gray-500 text-xs">Weekly Sync — Screen Share</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              {isRecording && (
                <span
                  className="flex items-center gap-1.5 text-red-400"
                  role="status"
                  aria-live="polite"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"
                    aria-hidden="true"
                  ></span>
                  REC
                </span>
              )}
              <span
                aria-live="off"
                aria-label={`Elapsed time: ${formatTime(elapsed)}`}
                className={`${isSharing ? 'text-gray-300' : 'text-gray-600'}`}
              >
                {formatTime(elapsed)}
              </span>
            </div>
          </div>

          {/* Content row */}
          <div className="flex" style={{ minHeight: '160px', height: 'clamp(160px, 30vw, 200px)' }}>
            {/* Main screen area */}
            <div className="relative flex-1 bg-[#0d1117] flex items-center justify-center border-r border-slate-800 overflow-hidden">
              {videoSource !== 'none' ? (
                <video
                  ref={attach}
                  autoPlay
                  playsInline
                  muted
                  aria-label="Your camera or screen share feed"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : isSharing ? (
                <div className="text-center select-none">
                  <div className="text-4xl mb-2">🖥️</div>
                  <p className="text-gray-300 text-sm">Your screen is live</p>
                  <p className="text-gray-600 text-xs mt-1">
                    {PARTICIPANTS.length - 1} participant{PARTICIPANTS.length - 1 !== 1 ? 's' : ''}{' '}
                    watching
                  </p>
                </div>
              ) : (
                <div className="text-center select-none opacity-30">
                  <div className="text-4xl mb-2">🖥️</div>
                  <p className="text-gray-500 text-xs">No screen share active</p>
                </div>
              )}
              {/* Indicator lives here — handles its own show/hide via transition */}
              <Indicator participantCount={WATCHING_COUNT} />
            </div>

            {/* Participants sidebar — hidden on narrow screens */}
            <div
              className="hidden sm:flex w-20 md:w-24 flex-col gap-2 p-2 overflow-y-auto bg-[#0d1117]"
              role="list"
              aria-label="Call participants"
            >
              {PARTICIPANTS.map((p) => (
                <div key={p.name} className="flex flex-col items-center gap-1" role="listitem">
                  <div
                    className={`w-9 h-9 rounded-lg ${p.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}
                  >
                    {p.initials}
                  </div>
                  <span className="text-gray-500 text-xs truncate w-full text-center leading-tight">
                    {p.name.split(' ')[0]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Toolbar */}
          <nav
            className="flex items-center justify-center px-4 py-2.5 bg-[#0d1117] border-t border-slate-800"
            aria-label="Call toolbar"
          >
            <div className="flex items-center gap-4 sm:gap-6">
              <div
                className="flex flex-col items-center gap-0.5 text-[10px] text-gray-600"
                aria-hidden="true"
              >
                <span className="text-sm">🎤</span>
                <span>Mute</span>
              </div>
              <div
                className="flex flex-col items-center gap-0.5 text-[10px] text-gray-600"
                aria-hidden="true"
              >
                <span className="text-sm">📷</span>
                <span>Video</span>
              </div>
              <button
                aria-label={isSharing ? 'Screen sharing active' : 'Share screen'}
                className={`flex flex-col items-center gap-0.5 text-[10px] transition-colors ${
                  isSharing ? 'text-blue-400' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                <span className="text-sm">🖥️</span>
                <span>Share</span>
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* ── PARTICIPANT VIEW ───────────────────────────────────────── */}
      <div>
        <p className="text-white text-xs font-semibold uppercase tracking-widest mb-2 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-400" aria-hidden="true"></span>
          What Participants See
        </p>

        <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-[#0d1117] aspect-[16/10] sm:aspect-video flex items-center justify-center">
          {videoSource !== 'none' ? (
            <video
              ref={attach}
              autoPlay
              playsInline
              muted
              aria-label="Participant view of shared content"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : isSharing ? (
            <div className="text-center select-none">
              <div className="text-5xl mb-3">🖥️</div>
              <p className="text-gray-300 text-sm font-medium">Tanush&apos;s Screen</p>
              <p className="text-gray-600 text-xs mt-1">Shared content appears here</p>
            </div>
          ) : (
            <div className="text-center select-none opacity-30">
              <div className="text-5xl mb-3">👥</div>
              <p className="text-gray-500 text-sm">Waiting for screen share...</p>
            </div>
          )}
          <Indicator participantCount={WATCHING_COUNT} />
        </div>
      </div>

      {/* ── LEGEND ────────────────────────────────────────── */}
      <div
        className="grid grid-cols-2 gap-3 text-xs text-gray-500"
        role="list"
        aria-label="Indicator legend"
      >
        <div className="flex items-center gap-2" role="listitem">
          <span
            className="w-3 h-3 rounded-full bg-[#0066FF] shrink-0"
            aria-hidden="true"
            style={{ boxShadow: '0 0 6px rgba(0,102,255,0.6)' }}
          ></span>
          Sharing — blue dot, slow pulse
        </div>
        <div className="flex items-center gap-2" role="listitem">
          <span
            className="w-3 h-3 rounded-full border-2 border-[#FF4500] shrink-0"
            aria-hidden="true"
            style={{ boxShadow: '0 0 6px rgba(255,69,0,0.6)' }}
          ></span>
          Recording — red ring, fast pulse
        </div>
      </div>
    </div>
  )
}

export default memo(MockCall)
