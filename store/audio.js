import { storage } from '@/plugins/firebase';
const ctx = new AudioContext();

const state = () => ({
  source: ctx.createBufferSource(),
  gainNode: ctx.createGain(),
});
const getters = {};
const mutations = {
  setSource(state, buffer) {
    state.source.buffer = ctx.decodeAudioData(buffer);
    state.source.connect(ctx.destination);
    state.source.loop = true;
  },
};
const actions = {
  async set({ commit, state }, path) {
    const url = await storage.ref(path).getDownloadURL();
    const res = await fetch(url);
    const buf = await res.arrayBuffer();

    commit('setSource', buf);
  },
  start({ commit, state }, startAt) {
    console.log('start Audio');
    state.source.start(startAt);
  },
  pause({ commit }) {
    if (ctx.state === 'running') {
      ctx.suspend();
    } else if (ctx.state === 'suspended') {
      ctx.resume();
    }
  },
};

export { state, getters, actions, mutations };
