import * as THREE from 'three';

export default {
  data() {
    // === scene ===
    const scene = new THREE.Scene();

    // === renderer ===
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // === camera ===
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 1;

    // === light ===
    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 0, 10);

    return {
      scene: scene,
      renderer: renderer,
      camera: camera,
      light: light,
      clock: new THREE.Clock(),
      canRender: false,
    };
  },
  created() {
    // === sceneにmodel,light, cameraを追加 ===
    this.scene.add(this.camera);
    this.scene.add(this.light);
  },
  mounted() {
    this.canRender = true;
  },
  methods: {
    animate() {
      requestAnimationFrame(this.animate);

      this.renderer.render(this.scene, this.camera);
    },
  },
  render(h) {
    if (this.canRender) {
      if (
        process.env.NODE_ENV === 'development' &&
        this.$slots.default &&
        this.$slots.default.length > 1
      ) {
        throw new Error(
          '[vue-no-ssr] You cannot use multiple child components'
        );
      }

      return h('div', {
        class: 'stage',
        attrs: { id: 'stage' },
      });
    }
    return h('div', 'server side');
  },
  updated() {
    const stage = document.getElementById('stage');
    stage.appendChild(this.renderer.domElement);
    this.animate();
  },
};
