precision mediump float;
uniform float time;
uniform vec2  mouse;
uniform vec2  resolution;
uniform sampler2D texture;
uniform sampler2D spectrum;
uniform sampler2D samples;
uniform float volume;

void main (void) {
  float b = 1. - abs(volume / 255. - 1.0);
  gl_FragColor = vec4(0.0, 0.5, b, 1.0);
}
