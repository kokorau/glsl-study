<template lang="pug">
  #sample
    glsl-canvas(:fragmentPath="$route.params.id")
</template>

<script>
import GlslCanvas from '@/components/shader/organisms/GlslCanvas'

export default {
  components: {
    GlslCanvas,
  },
}
</script>

<style>
</style>
