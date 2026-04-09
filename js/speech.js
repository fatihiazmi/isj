export async function requestMicPermission() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    // Stop tracks immediately — we just needed permission
    stream.getTracks().forEach(t => t.stop())
    return true
  } catch {
    return false
  }
}

export function startListening(lang = 'ar-SA', timeoutMs = 6000) {
  return new Promise((resolve, reject) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      reject(new Error('not-supported'))
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = lang
    recognition.maxAlternatives = 5
    recognition.interimResults = false
    recognition.continuous = false

    let settled = false

    // Timeout fallback — if recognition hangs
    const timer = setTimeout(() => {
      if (!settled) {
        settled = true
        recognition.abort()
        resolve([]) // Empty results = no match, triggers teacher fallback
      }
    }, timeoutMs)

    recognition.onresult = (event) => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      const results = []
      for (let i = 0; i < event.results[0].length; i++) {
        results.push(event.results[0][i].transcript.trim().toLowerCase())
      }
      resolve(results)
    }

    recognition.onerror = (event) => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      reject(new Error(event.error))
    }

    recognition.onnomatch = () => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      resolve([])
    }

    recognition.onend = () => {
      // If ended without result or error, resolve empty
      if (!settled) {
        settled = true
        clearTimeout(timer)
        resolve([])
      }
    }

    recognition.start()
  })
}

export function checkPronunciation(results, letterWithBaris) {
  if (!results.length) return false
  // Match against: the Arabic letter+baris, the pronunciation, the letter name
  const targets = [
    letterWithBaris.display,
    letterWithBaris.letter,
    letterWithBaris.pronunciation,
    letterWithBaris.name.toLowerCase(),
  ].filter(Boolean)

  return results.some(r =>
    targets.some(t => r.includes(t))
  )
}
