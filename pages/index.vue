<template lang="pug">
  section.container
    audio-player(path="")
    glsl-canvas(ref="canvas")
</template>

<script>
import GlslCanvas from '@/components/GlslCanvas'
import AudioPlayer from "../components/AudioPlayer";

export default {
  components: {
    AudioPlayer,
    GlslCanvas
  },
  methods: {}
}
</script>

<style lang="sass">
.container
  position: relative
</style>
