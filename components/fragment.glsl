precision mediump float;
uniform float time;
uniform vec2  mouse;
uniform vec2  resolution;
uniform sampler2D texture;
uniform sampler2D spectrum;
uniform sampler2D samples;
uniform float volume;

void main (void) {
  gl_FragColor = vec4(100.0/500.0, 0.7, 1.0, 1.0);
}
