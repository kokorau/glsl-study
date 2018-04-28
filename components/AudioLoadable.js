import * as THREE from 'three';
import { storage } from '@/plugins/firebase';

const ctx = new AudioContext();

export default {
  name: 'AudioLoadable',
  props: {
    path: { default: 'music/kokorau/mix_03.wav' },
  },
  computed: {
    source() {
      return ctx.createBufferSource();
    },
    gainNode() {
      return ctx.createGain();
    },
  },
  methods: {
    setAudio(path, autoPlay = true) {
      this.$store.dispatch('audio/set', this.path);
    },
    startAudio(startAt = 0) {
      this.$store.dispatch('audio/start', startAt);
    },
    pauseAudio() {
      this.$store.dispatch('audio/pause');
    },
  },
};
