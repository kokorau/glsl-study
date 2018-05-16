import { storage } from '@/plugins/firebase'

class Player {
  constructor() {
    this.audioBuffer = null
    window.addEventListener('load', () => {
      this.context = new AudioContext()
    })
    this.setAudio()
  }
  setAudio(path) {
    return new Promise(() => {
      const url = storage(path)
        .ref()
        .getDownloadURL()
      const res = fetch(url)
      const buffer = this.context.decodeAudioData(res)
      this.audioBuffer = buffer
      resolve(buffer)
    })
  }
  play() {}
  pause() {}
}

export default Player
