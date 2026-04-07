import { useSyncExternalStore } from 'react'

/**
 * Counts elapsed seconds while `running` is true.
 * Resets to 0 when `running` becomes false.
 */
export default function useTimer(running) {
  const store = getTimerStore(running)
  return useSyncExternalStore(store.subscribe, store.getSnapshot)
}

// Tiny external store — avoids all setState-in-effect issues
function createTimerStore() {
  let elapsed = 0
  let intervalId = null
  const listeners = new Set()

  function emit() {
    listeners.forEach((fn) => fn())
  }

  return {
    start() {
      if (intervalId) return
      elapsed = 0
      emit()
      intervalId = setInterval(() => {
        elapsed += 1
        emit()
      }, 1000)
    },
    stop() {
      if (intervalId) {
        clearInterval(intervalId)
        intervalId = null
      }
      elapsed = 0
      emit()
    },
    subscribe(cb) {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    getSnapshot() {
      return elapsed
    },
  }
}

// Singleton — one timer per app is fine for this prototype
const timerStore = createTimerStore()

function getTimerStore(running) {
  // Trigger start/stop as a side effect of the running flag changing.
  // useSyncExternalStore re-subscribes when the subscribe function
  // identity changes, so we bind running into the subscribe closure.
  return {
    subscribe(cb) {
      if (running) timerStore.start()
      else timerStore.stop()
      return timerStore.subscribe(cb)
    },
    getSnapshot: timerStore.getSnapshot,
  }
}
