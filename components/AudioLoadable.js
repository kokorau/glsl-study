export default minxin = {
  data () {
    return {
      path: 'music/kokorau/mix_03.wav' //FIXME: pathの有効化
    }
  },
  methods: {
    loadAudio() {
      this.$store.dispatch('audio/setMusic', this.path)
    },
    playAudio() {
      this.$store.dispatch('audio/playMusic')
    }
  },
  created () {
    this.loadAudio();
  },
  mounted () {
    this.playAudio();
  }
}
