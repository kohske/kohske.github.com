var ot1, ot2, e_bg;
var can_size;
// (1)レンダラの初期化
var renderer = new THREE.WebGLRenderer();

// (2)シーンの作成
var scene = new THREE.Scene();

// (3)カメラの作成
var camera = new THREE.PerspectiveCamera(45, 1);
var controls1 = new THREE.OrbitControls( camera );
camera.position = new THREE.Vector3(0, 0, 0);
//camera.lookAt(new THREE.Vector3(0, 0, 0));

var camera2 = new THREE.PerspectiveCamera(45, 0.5);
var controls2 = new THREE.OrbitControls( camera2 );
camera2.position = new THREE.Vector3(0, 0, 0);
//camera2.lookAt(new THREE.Vector3(0, 0, 0));

// (4)ライトの作成
var light = new THREE.DirectionalLight(0xcccccc);
light.position = new THREE.Vector3(0.577, 0.577, -0.577);
scene.add(light);

var ambient = new THREE.AmbientLight(0x333333);
scene.add(ambient);

// (5)表示する物体の作成
/*
  var btex = THREE.ImageUtils.loadTexture( '../img/blue_sky.jpg' );
  btex.wrapS = btex.wrapT = THREE.RepeatWrapping;
  btex.repeat.set( 3, 3 );

  var bmaterial = new THREE.MeshPhongMaterial({
  color: 0xffffff, ambient: 0xffffff,
  specular: 0xffffff,
  map: btex, side: THREE.DoubleSide});

  var sphere = new THREE.Mesh(new THREE.SphereGeometry(10, 100, 100), bmaterial);
  scene.add(sphere);
*/


var geometry = new THREE.CylinderGeometry(0.0, 0.3, 25, 30, 30, true);
//var geometry = new THREE.SphereGeometry(1, 32, 16);

var tex = THREE.ImageUtils.loadTexture( '../img/renga2.jpg' );
tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
tex.repeat.set( 4, 60 );

var material = new THREE.MeshPhongMaterial({
    color: 0xffffff, ambient: 0xffffff,
    specular: 0xcccccc, shininess:50, metal:true,
    map: tex });
//var N = 2;
var N = 3;
var posx = [-0.5, 0, 0.5];
var vis = [true, false, true];
var meshes = new Array();
for (var i=0; i<N; ++i) {
    meshes[i] = new THREE.Mesh(geometry, material);
    meshes[i].position.x = posx[i];
    meshes[i].position.y = -2.5;
    meshes[i].rotation.z = Math.PI*3/180;
    meshes[i].material.side = THREE.DoubleSide;
    scene.add(meshes[i]);
}

// Skybox
var path = "../img/skybox/";
var format = '.jpg';
var urls = [
    path + 'px' + format, path + 'nx' + format,
    path + 'py' + format, path + 'ny' + format,
    path + 'pz' + format, path + 'nz' + format
];
/*
var urls = [
    path + 'posx' + format, path + 'negx' + format,
    path + 'posy' + format, path + 'negy' + format,
    path + 'posz' + format, path + 'negz' + format
];
*/

var reflectionCube = THREE.ImageUtils.loadTextureCube( urls );
reflectionCube.format = THREE.RGBFormat;

var shader = THREE.ShaderLib[ "cube" ];
shader.uniforms[ "tCube" ].value = reflectionCube;



var material = new THREE.ShaderMaterial( {

    fragmentShader: shader.fragmentShader,
    vertexShader: shader.vertexShader,
    uniforms: shader.uniforms,
    depthWrite: false,
    side: THREE.BackSide

} ),

cube_mesh = new THREE.Mesh( new THREE.CubeGeometry( 30, 30, 30 ), material );
scene.add( cube_mesh );


// (6)レンダリング
var baseTime = +new Date;
function render() {
    cube_mesh.visible = e_bg.checked;
    renderer.setClearColorHex(e_bg.checked?0x000000:0xe0ffff, 1);
    
    var pp = ot1.checked?1:0;
    for (var i=0; i<N; ++i) {
	meshes[i].visible = pp?vis[i]:!vis[i];
    }
    if (pp) {
	renderer.setViewport( 0, 0, can_size.w, can_size.h);
	renderer.enableScissorTest ( false );
	renderer.render(scene, camera);
    } else {
	renderer.setViewport( 0, 0, can_size.w/2, can_size.h);
	renderer.setScissor( 0, 0, can_size.w/2, can_size.h);
	renderer.enableScissorTest ( true );
	renderer.render(scene, camera2);

	renderer.setViewport( can_size.w/2, 0, can_size.w/2, can_size.h);
	renderer.setScissor( can_size.w/2, 0, can_size.w/2, can_size.h);
	renderer.enableScissorTest ( true );
	renderer.render(scene, camera2);
    }
    //    mesh.rotation.y = 0.3 * (+new Date - baseTime) / 1000;


    try{controls1.update();} catch(e){}
    try{controls2.update();} catch(e){}

    requestAnimationFrame(render);
};
onload = function() {
    renderer.setSize(600, 600);
    renderer.setClearColorHex(0x000000, 1);
    ot1 = document.getElementById("ot1");
    ot2 = document.getElementById("ot2");
    e_bg = document.getElementById("e_bg");

    document.getElementById('three').appendChild(renderer.domElement);
    can_size = {w: renderer.domElement.width, h: renderer.domElement.height};
    cam_pos(1);
    render();
}

cam_pos = function(i) {
    if (i==4) {
	camera.fov = 75;
	camera2.fov = 75;
    } else {
	camera.fov = 45;
	camera2.fov = 45;
    }
    cam_poss_x = [0.5, 0.5, 0, 0];
    cam_poss_y = [-13, -12, 0, -5];
    cam_poss_z = [-1.5, -3, -2, -55];
    cam_look_x = [0.5, 0.5, 0, 0];
    cam_look_y = [-8, -12, -4, -5];
    cam_look_z = [2, 0, 3, 0];

    camera.position.x = cam_poss_x[i-1];
    camera2.position.x = cam_poss_x[i-1];
    camera.position.y = cam_poss_y[i-1];
    camera2.position.y = cam_poss_y[i-1];
    camera.position.z = cam_poss_z[i-1];
    camera2.position.z = cam_poss_z[i-1];

    var la = new THREE.Vector3(cam_look_x[i-1], cam_look_y[i-1], cam_look_z[i-1]);
    controls1.center = la;
    controls2.center = la;
}
