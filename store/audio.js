import {db, storage} from '@/plugins/firebase'

const context = new AudioContext()
const source = context.createBufferSource()


export const state = () => { // mutationからのみ変更可能な変数
  source: source
}

export const mutations = { // commitで実行
  setBuffer (state, buffer) {
    state.source.buffer = buffer
    state.source.connect(context.destination)
  },
  playMusic (state, startAt=0) {
    state.source.start(startAt)
  }
}

export const actions = { // dispatchで実行
  setMusic ({commit}, path) {
    const url = storage.ref(path)

    url.getDownloadURL().then(url => {
      fetch(url, {mode: 'cors'}).then(
        response => response.arrayBuffer()
      ).then(audio => {
        context.decodeAudioData(audio, decodeAudioData => {
          commit('setBuffer', decodeAudioData)
        })
      })
    })
  },
  playMusic ({commit}, startAt=0) {
    commit('playMusic', startAt)
  }
}

export const getters = {}
