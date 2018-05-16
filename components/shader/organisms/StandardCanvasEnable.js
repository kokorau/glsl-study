import * as THREE from 'three'

export default {
  data () {
    return {
      scene: null,
    }
  },
  props: {
    ratio: {
      type: Number,
      default: 1,
      required: false
    }
  },
  mounted () {
    this.scene = new THREE.Scene()
  },
  resize () {
    const [ width, height ] = [ this.canvas.clientWidth, this.canvas.clientHeight ];
    this.renderer.setSize(width, height);
    this.targets.forEach(t => t.setSize(width / this.ratio, height / this.ratio));
    // this.uniforms.resolution.value.x = width / this.ratio;
    // this.uniforms.resolution.value.y = height / this.ratio;
  }
}
