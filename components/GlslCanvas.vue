<template lang="pug">
  canvas#stage
</template>

<script>
  import * as THREE from 'three'

  export default {
    name: 'GlslCanvas',
    props: {
      fragmentPath: {type: String, default: 'default.glsl'},
      vertexPath: {type: String, default: 'default.glsl'},
      ratio: {type: Number, default: 1}
    },
    data () {
      return {
        renderer: null,
        scene: null,
        camera: null,
        objects: [],
        uniforms: {},
        clock: new THREE.Clock()
      }
    },
    created () {
    },
    mounted () {
      this.scene = new THREE.Scene()

      this.setCanvas()

      this.camera = new THREE.PerspectiveCamera(66, window.innerWidth / window.innerHeight, 0.1, 1000)
      this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
      this.camera.position.set(0, 0, 1)
      this.camera.lookAt(this.scene.position)

      this.scene.add(this.camera)

      const mesh = this.getPlane()
      this.objects.push(mesh)
      this.scene.add(mesh)

      this.resize()
      window.addEventListener('resize', this.resize)
      this.animate()
    },
    methods: {
      getStage () {
        return document.getElementById('stage')
      },
      setCanvas () {
        const stage = this.getStage()
        this.renderer = new THREE.WebGLRenderer({canvas: stage})
        this.renderer.setSize(stage.clientWidth, stage.clientHeight)
      },
      animate () {
        requestAnimationFrame(this.animate)

        this.uniforms.time.value += this.clock.getDelta()

        this.renderer.render(this.scene, this.camera)
      },
      getPlane () {
        const geometry = new THREE.PlaneGeometry(2, 2)
        this.uniforms = {
          resolution: {type: 'v2', value: new THREE.Vector2()},
          time: {type: 'f', value: 0.0}
        }

        const material = new THREE.ShaderMaterial({
          uniforms: this.uniforms,
          fragmentShader: `
          uniform float time;
          uniform vec2 resolution;

          void main(void) {
            vec2 position = (gl_FragCoord.xy / resolution.xy);
            vec2 center = vec2(0.5, 0.5);
            float d = distance(position, center);
            gl_FragColor = vec4(vec3(smoothstep(d - 0.01, d, 0.4)) * sin(time), 1.0);
          }
          `
        })

        return new THREE.Mesh(geometry, material)
      },
      resize () {
        const stage = this.getStage()
        const [width, height] = [stage.clientWidth, stage.clientHeight]

        this.renderer.setSize(width, height)
        this.camera.aspect = width / height
        this.camera.updateProjectionMatrix()

        this.uniforms.resolution.value.x = width / this.ratio
        this.uniforms.resolution.value.y = height / this.ratio
      }
    }
  }
</script>

<style>
  #stage {
    max-width: 500px;
    max-height: 500px;
  }
</style>
