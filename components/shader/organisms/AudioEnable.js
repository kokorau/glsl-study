import Player from '@/plugins/player.js'

export default {
  name: 'AudioAble',
  props: {
    audioPath: {
      type: String,
    },
  },
  data() {
    return {
      player: null,
    }
  },
  mounted() {
    this.player = new Player()
  },
  methods: {
    setAudio() {
      this.player.setAudio(this.audioPath)
    },
  },
}
