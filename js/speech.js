export function startListening(lang = 'ar-SA') {
  return new Promise((resolve, reject) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      reject(new Error('Speech API not supported'))
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = lang
    recognition.maxAlternatives = 3

    recognition.onresult = (event) => {
      const results = []
      for (let i = 0; i < event.results[0].length; i++) {
        results.push(event.results[0][i].transcript.toLowerCase())
      }
      resolve(results)
    }

    recognition.onerror = (event) => reject(event.error)
    recognition.onnomatch = () => resolve([])
    recognition.start()
  })
}

export function checkPronunciation(results, letter) {
  return results.some(r =>
    r.includes(letter.letter) ||
    r.includes(letter.transliteration) ||
    r.includes(letter.name.toLowerCase())
  )
}
