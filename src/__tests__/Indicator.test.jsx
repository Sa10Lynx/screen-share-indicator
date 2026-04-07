import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { IndicatorProvider, useIndicator } from '../context/IndicatorContext'
import Indicator from '../components/Indicator'

function renderWithProvider(ui) {
  return render(<IndicatorProvider>{ui}</IndicatorProvider>)
}

describe('Indicator component', () => {
  beforeEach(() => localStorage.clear())

  it('renders with role="status"', () => {
    renderWithProvider(<Indicator participantCount={3} />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('has pointer-events-none when not sharing (hidden)', () => {
    renderWithProvider(<Indicator participantCount={3} />)
    const el = screen.getByRole('status')
    expect(el.className).toContain('pointer-events-none')
  })

  it('does not show participant badge when not sharing', () => {
    renderWithProvider(<Indicator participantCount={3} />)
    expect(screen.queryByText(/watching/)).not.toBeInTheDocument()
  })
})

// Test with sharing active via a wrapper component
function SharingIndicator({ participantCount = 3 }) {
  return (
    <IndicatorProvider>
      <SharingToggle />
      <Indicator participantCount={participantCount} />
    </IndicatorProvider>
  )
}

function SharingToggle() {
  const { setIsSharing } = useIndicator()
  return (
    <button onClick={() => setIsSharing(true)} data-testid="share-btn">
      Share
    </button>
  )
}

describe('Indicator when sharing', () => {
  beforeEach(() => localStorage.clear())

  it('shows participant badge after sharing starts', async () => {
    const user = userEvent.setup()
    render(<SharingIndicator participantCount={3} />)
    await user.click(screen.getByTestId('share-btn'))
    expect(screen.getByText('3 watching')).toBeInTheDocument()
  })

  it('sets aria-label to sharing status', async () => {
    const user = userEvent.setup()
    render(<SharingIndicator />)
    await user.click(screen.getByTestId('share-btn'))
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Screen is being shared')
  })
})

// Test recording mode
function RecordingIndicator() {
  return (
    <IndicatorProvider>
      <RecordingToggle />
      <Indicator participantCount={3} />
    </IndicatorProvider>
  )
}

function RecordingToggle() {
  const { setIsSharing, setIsRecording } = useIndicator()
  return (
    <button
      onClick={() => {
        setIsSharing(true)
        setIsRecording(true)
      }}
      data-testid="record-btn"
    >
      Record
    </button>
  )
}

describe('Indicator when recording', () => {
  beforeEach(() => localStorage.clear())

  it('sets aria-label to shared and recorded', async () => {
    const user = userEvent.setup()
    render(<RecordingIndicator />)
    await user.click(screen.getByTestId('record-btn'))
    expect(screen.getByRole('status')).toHaveAttribute(
      'aria-label',
      'Screen is being shared and recorded',
    )
  })
})
