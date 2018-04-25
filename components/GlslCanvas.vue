<script>
  import * as THREE from 'three'
  import fragment from './fragment.glsl'
  import vertex from './vertex.glsl'

  export default {
    name: 'BoxSample',
    data () {
      // === scene ===
      const scene = new THREE.Scene();

      // === renderer ===
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);

      // === camera ===
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 512;

      // === model ===
      const geometry = new THREE.PlaneGeometry(512, 512);
      const uniform = {
        t: {value: 1.0},
        resolution: {value: new THREE.Vector2()}
      };
      const material = new THREE.ShaderMaterial({
        uniforms: uniform,
        vertexShader: vertex,
        fragmentShader: fragment
      });
      const mesh = new THREE.Mesh(geometry, material);

      return {
        scene: scene,
        renderer: renderer,
        camera: camera,
        uniform: uniform,
        mesh: mesh,
        canRender: false,
        clock: new THREE.Clock()
      }
    },
    methods: {
      animate () {
        requestAnimationFrame(this.animate);
        this.render()
      },
      render () {
        this.uniform.t.value += this.clock.getDelta();
        this.renderer.render(this.scene, this.camera);
      }
    },
    created () {
      // === sceneにmodel,light, cameraを追加 ===
      this.scene.add(this.camera);
      this.scene.add(this.mesh);
    },
    mounted () {
      this.canRender = true;
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
    },
    beforeDestroy() {
      this.scene = null;
    }
  }
</script>
