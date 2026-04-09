let mediaRecorder = null
let audioChunks = []

export async function startRecording() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
  audioChunks = []
  mediaRecorder = new MediaRecorder(stream)

  mediaRecorder.ondataavailable = (e) => {
    if (e.data.size > 0) audioChunks.push(e.data)
  }

  mediaRecorder.start()
}

export function stopRecording() {
  return new Promise((resolve) => {
    if (!mediaRecorder || mediaRecorder.state === 'inactive') {
      resolve(null)
      return
    }

    mediaRecorder.onstop = () => {
      const blob = new Blob(audioChunks, { type: 'audio/webm' })
      const url = URL.createObjectURL(blob)
      // Stop all tracks to release mic
      mediaRecorder.stream.getTracks().forEach(t => t.stop())
      mediaRecorder = null
      resolve(url)
    }

    mediaRecorder.stop()
  })
}

export function isRecording() {
  return mediaRecorder && mediaRecorder.state === 'recording'
}
