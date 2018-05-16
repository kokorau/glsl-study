// enable shaderPlane with uniforms
import * as THREE from 'three'

export default {
  props: {
    fragmentPath: {
      type: String,
      default: 'default'
    },
    vertexPath: {
      type: String,
      default: 'default'
    }
  },
  data () {
    return {
      uniforms: null,
      objects: [],
      clock: new THREE.Clock()
    }
  },
  methods: {
    setPlane () {
      const geometry = new THREE.PlaneGeometry(1, 1)

      this.setUniforms()
      const material = new THREE.ShaderMaterial({
        fragmentShader: this.getFragmentShader(),
        vertexShader: this.getVertexShader(),
        uniforms: this.uniforms
      })

      const plane = new THREE.Mesh(geometry, material)
      this.scene.add(plane)
      this.objects.push(plane)
    },
    getFragmentShader () {
      return require(`@/assets/shader/fragment/${this.fragmentPath}.frag`)
    },
    getVertexShader () {
      return require(`@/assets/shader/vertex/${this.vertexPath}.vert`)
      },
    setUniforms () {
      this.uniforms = {
        time: {type: 'f', value: 0.0},
        resolution: {type: 'v2', value: new THREE.Vector2()}
      }
    },
    updateResolution (width=this.canvas.clientWidth, height=this.canvas.clientHeight) {
      this.uniforms.resolution.value.x = width / this.ratio
      this.uniforms.resolution.value.y = height / this.ratio
    },
    updateTime () {
      this.uniforms.time.value += this.clock.getDelta()
    }
  }
}
