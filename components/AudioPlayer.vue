<template lang="pug">
  .audio-player
    button(@click="startAudio") start
</template>

<script>
export default {
  name: 'AudioPlayer',
  methods: {
    startAudio () {
      console.log('fixme')
    }
  }
}
</script>

<style lang="sass">
.audio-player
  position: fixed
</style>
