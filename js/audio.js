let arabicVoice = null

// Try to find an Arabic voice, cache it
function getArabicVoice() {
  if (arabicVoice) return arabicVoice
  const voices = speechSynthesis.getVoices()
  arabicVoice = voices.find(v => v.lang.startsWith('ar')) || null
  return arabicVoice
}

// Preload voices (they load async in some browsers)
if (typeof speechSynthesis !== 'undefined') {
  speechSynthesis.getVoices()
  speechSynthesis.onvoiceschanged = () => getArabicVoice()
}

export function speak(text, lang = 'ar-SA') {
  return new Promise((resolve) => {
    if (typeof speechSynthesis === 'undefined') { resolve(); return }

    // Cancel any ongoing speech
    speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    utterance.rate = 0.7 // Slower for kids
    utterance.pitch = 1.0

    const voice = getArabicVoice()
    if (voice) utterance.voice = voice

    utterance.onend = () => resolve()
    utterance.onerror = () => resolve()

    speechSynthesis.speak(utterance)
  })
}

// Speak the letter/baris combo
export function speakLetter(letterData) {
  if (letterData.isBare) {
    // For bare letter, speak the letter itself
    return speak(letterData.letter)
  }
  // For letter with baris, speak the display (letter + diacritic)
  return speak(letterData.display)
}
