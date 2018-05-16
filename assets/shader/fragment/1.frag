uniform float time;

void main(void) {

  gl_FragColor = vec4(1.0, sin(time), 0.4, 1.0);
}
