<template lang="pug">
  canvas#stage
</template>

<script>
  import * as THREE from 'three';
  import ShaderPlaneEnable from './ShaderPlaneEnable'
  import StandardPlaneEnable from './StandardCanvasEnable'

  export default {
    name: 'GlslCanvas',
    mixins: [
      StandardPlaneEnable,
      ShaderPlaneEnable
    ],
    data () {
      return {
        camera: null,
        renderer: null,
        plane: null,
        objects: []
      }
    },
    mounted () {
      const stage = document.getElementById('stage')
      this.renderer = new THREE.WebGLRenderer({canvas: stage})

      this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
      this.camera.position.set(0, 0, 1)
      this.camera.lookAt(this.scene.position)

      this.setPlane()

      this.animate()
    },
    methods: {
      animate () {
        requestAnimationFrame(this.animate)
        this.updateTime()

        this.render()
      },
      render () {
        this.renderer.render(this.scene, this.camera)
      },
      resize () {
        const [ width, height ] = [ this.canvas.clientWidth, this.canvas.clientHeight ];
        this.renderer.setSize(width, height);
        this.updateResolution(width, height)
      }
    }
  }
</script>

<style>
#stage {
  width: 300px;
  height: 300px;
}
</style>
