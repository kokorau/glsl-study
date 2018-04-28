import * as THREE from 'three';

export default {
  name: 'UniformAvailable',
  mounted() {
    if (this.uniform) {
      this.uniform.backBuffer = { type: 't', value: new THREE.Texture() };
      this.uniform.mouse = { type: 'v2', value: new THREE.Vector2() };
      this.uniform.resolution = { type: 'v2', value: new THREE.Vector2() };
      this.uniform.time = { type: 'f', value: 0.0 };
      this.uniform.volume = { type: 'f', value: 0 };

      if (this.source) {
        (this.uniform.spectrum = { type: 't', value: this.source.spectrum }),
          (this.uniform.samples = { type: 't', value: this.source.samples });
      }
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
