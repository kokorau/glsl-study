uniform float time;
uniform vec2 resolution;

void main(void) {
  vec2 position = (gl_FragCoord.xy / resolution.xy);
  vec2 center = vec2(0.5, 0.5);
  float d = distance(position, center);
  gl_FragColor = vec4(vec3(smoothstep(d - 0.01, d, 0.4)) * sin(time), 1.0);
}