precision mediump float;
uniform float t; // time
uniform vec2  r; // resolution

void main(){
    gl_FragColor = vec4(sin(t), 1.0, 1.0 , 1.0);
}
