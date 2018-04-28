<script>
  import * as THREE from 'three';
  import CanvasLoadable from "./CanvasLoadable";
  import AudioLoadable from "./AudioLoadable";
  import UniformAvailable from './UniformAvailable';
  import fragmentShader from './fragment.glsl';
  import vertexShader from './vertex.glsl';

  export default {
    mixins: [
      AudioLoadable,
      CanvasLoadable,
      UniformAvailable
    ],
    name: 'GlslLoadable',
    data () {
      const geometry = new THREE.PlaneGeometry(1, 1);
      const uniform = {};
      const material = new THREE.ShaderMaterial({
        uniforms: uniform,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        extensions: {
          derivatives: true,
          drawBuffers: false,
          fragDepth: false,
          shaderTextureLOD: false,
        }
      })
      const mesh = new THREE.Mesh(geometry, material);

      return {
        uniform: uniform,
        mesh: mesh
      }
    },
    created () {
      this.setAudio(this.path);
      this.scene.add(this.mesh);
    },
    mounted () {
      this.startAudio();
    },
    methods: {
      animate () {
        requestAnimationFrame(this.animate);

        this.render();
      },
      render () {
        this.updateUniform();
        this.renderer.render(this.scene, this.camera);
      }
    }
  }
</script>
