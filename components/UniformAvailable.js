import * as THREE from 'three';

export default {
  name: 'UniformAvailable',
  mounted() {
    this.uniform = {
      backBuffer: { type: 't', value: new THREE.Texture() },
      mouse: { type: 'v2', value: new THREE.Vector2() },
      resolution: { type: 'v2', value: new THREE.Vector2() },
      time: { type: 'f', value: 0.0 },
      volume: { type: 'f', value: 0 }
    }

    if (this.source) {
      this.uniform.spectrum = { type: 't', value: this.source.spectrum }
      this.uniform.samples = { type: 't', value: this.source.samples }
    }

    this.renderer.domElement.addEventListener('mousemove', this.onMouseMove);
  },
  methods: {
    updateUniform() {
      this.uniform.time.value += this.clock.getDelta();
    },
    onMouseMove(e) {
      console.log(e);
      this.uniform.mouse.value.x =
        e.offsetX - this.renderer.domElement.offsetLeft;
      this.uniform.mouse.value.y =
        e.offsetY - this.renderer.domElement.offsetTop;
    },
  },
};
