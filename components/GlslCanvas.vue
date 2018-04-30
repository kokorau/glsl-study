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
    created () {
      this.setAudio(this.path);
    },
    mounted () {
      const geometry = new THREE.PlaneGeometry(1, 1);
      const material = new THREE.ShaderMaterial({
        uniforms: this.uniform,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        extensions: {
          derivatives: true,
          drawBuffers: false,
          fragDepth: false,
          shaderTextureLOD: false,
        }
      })
      this.addObject(new THREE.Mesh(geometry, material))

      this.startAudio();
    },
    updated () {},
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
