import Controls from './components/Controls'
import MockCall from './components/MockCall'
import ErrorBoundary from './components/ErrorBoundary'
import { IndicatorProvider, useIndicator } from './context/IndicatorContext'

function Dashboard() {
  const {
    isSharing,
    isRecording,
    animationEnabled,
    position,
    colorTheme,
    animationStyle,
    sharingGif,
    recordingGif,
  } = useIndicator()

  const gifMode = !!(sharingGif || recordingGif)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-6 sm:p-6 lg:p-8">
      {/* Skip-to-content link — visible on focus for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-blue-600 focus:text-white focus:text-sm focus:font-semibold focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-6 sm:mb-8 lg:mb-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">
            Screen Share Indicator
          </h1>
          <p className="text-sm sm:text-base text-gray-400">
            Prototype — configure the indicator then toggle sharing and recording
          </p>
        </header>

        {/* Main layout — stacks on mobile, side-by-side on lg */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-8">
          <main id="main-content" className="lg:col-span-2 order-1">
            <MockCall />
          </main>
          <aside aria-label="Indicator controls" className="order-2">
            <Controls />
          </aside>
        </div>

        {/* Status bar */}
        <section
          aria-label="Live status"
          aria-live="polite"
          className="mt-6 sm:mt-8 lg:mt-10 bg-slate-800/60 backdrop-blur rounded-xl p-4 sm:p-5 text-white border border-slate-700"
        >
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">Live Status</p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4 text-sm">
            {[
              { label: 'Sharing', value: isSharing ? 'ON' : 'OFF', on: isSharing },
              { label: 'Recording', value: isRecording ? 'ON' : 'OFF', on: isRecording },
              { label: 'Animation', value: animationEnabled ? 'ON' : 'OFF', on: animationEnabled },
              { label: 'Position', value: position, on: true },
              { label: 'Theme', value: colorTheme, on: true },
              { label: 'Anim Style', value: gifMode ? 'GIF' : animationStyle, on: true },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-gray-500 text-[10px] sm:text-xs mb-1">{item.label}</p>
                <p
                  className={`font-semibold capitalize text-xs sm:text-sm ${item.on ? 'text-white' : 'text-gray-600'}`}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <IndicatorProvider>
        <Dashboard />
      </IndicatorProvider>
    </ErrorBoundary>
  )
}
