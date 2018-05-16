<template lang="pug">
  .l-main
    form(@submit="")
      input(type="file")
      input(type="submit")
</template>

<script>
import UploadForm from '@/components/upload/organisms/UploadForm'

export default {
  methods: {},
}
</script>

<style lang="sass">
</style>
