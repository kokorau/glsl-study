<script>
  import * as THREE from 'three'
  import fragmentShader from './fragmant.glsl'
  import vertexShader from './vertex.glsl'

  export default {
    name: 'GlslCnavas',
    data () {
      // === scene ===
      const scene = new THREE.Scene();

      // === renderer ===
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);

      // === camera ===
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 1;

      // === light ===
      const light = new THREE.DirectionalLight(0xffffff);
      light.position.set(0, 0, 10);

      // === model ===
      const geometry = new THREE.PlaneGeometry(1, 1);
      // const material = new THREE.MeshStandardMaterial({color: 0x00ff00});
      const material = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
      })
      const plane = new THREE.Mesh(geometry, material);

      return {
        scene: scene,
        renderer: renderer,
        camera: camera,
        light: light,
        plane: plane,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        canRender: false
      }
    },
    created () {
      // === sceneにmodel,light, cameraを追加 ===
      this.scene.add(this.camera);
      this.scene.add(this.light);
      this.scene.add(this.plane);
    },
    mounted () {
      this.canRender = true;
    },
    methods: {
      animate () {
        requestAnimationFrame(this.animate);

        this.renderer.render(this.scene, this.camera);
      }
    },
    render (h) {
      if (this.canRender) {
        if (process.env.NODE_ENV === 'development' && this.$slots.default && this.$slots.default.length > 1) {
          throw new Error('[vue-no-ssr] You cannot use multiple child components')
        }

        return h('div',
          {
            class: 'stage',
            attrs: { id: 'stage' }
          }
        )
      }
      return h('div', 'server side')
    },
    updated () {
      const stage = document.getElementById('stage')
      stage.appendChild(this.renderer.domElement)
      this.animate()
    }
  }
</script>

<style>
  .canvas {
    width: 100%;
    height: 100%;
  }
</style>
