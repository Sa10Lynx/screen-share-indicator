import { useEffect, useRef, useCallback } from 'react'

/**
 * Manages a camera or screen-share MediaStream.
 *
 * @param {'none'|'camera'|'screen'} source - desired stream type
 * @returns {{ attach: (el: HTMLVideoElement|null) => void }}
 *   `attach` — ref callback to bind a <video> element to the stream.
 */
export default function useMediaStream(source) {
  const streamRef = useRef(null)
  const elementsRef = useRef(new Set())

  // Bind/unbind a <video> element to the active stream
  const attach = useCallback((el) => {
    if (!el) return
    elementsRef.current.add(el)
    if (streamRef.current) el.srcObject = streamRef.current
  }, [])

  useEffect(() => {
    // Stop any previous stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop())
      streamRef.current = null
    }
    elementsRef.current.forEach((el) => {
      el.srcObject = null
    })

    if (source === 'none') return

    let cancelled = false

    const acquire = async () => {
      try {
        const stream =
          source === 'camera'
            ? await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            : await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false })

        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop())
          return
        }

        streamRef.current = stream
        elementsRef.current.forEach((el) => {
          el.srcObject = stream
        })

        // Handle native "Stop sharing" button
        stream.getVideoTracks()[0]?.addEventListener('ended', () => {
          streamRef.current = null
          elementsRef.current.forEach((el) => {
            el.srcObject = null
          })
        })
      } catch {
        // User denied permission — silent fallback
      }
    }

    acquire()

    return () => {
      cancelled = true
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop())
        streamRef.current = null
      }
    }
  }, [source])

  return { attach }
}
