var ot;
// (1)レンダラの初期化
var renderer = new THREE.WebGLRenderer();
renderer.setSize(800, 800);
renderer.setClearColorHex(0x87ceeb, 1);

// (2)シーンの作成
var scene = new THREE.Scene();

// (3)カメラの作成
var camera = new THREE.PerspectiveCamera(20, 1);
var controls1 = new THREE.OrbitControls( camera );
camera.position = new THREE.Vector3(0, -3, 1);
camera.lookAt(new THREE.Vector3(0, 0, 0));

var camera2 = new THREE.PerspectiveCamera(20, 0.5);
var controls2 = new THREE.OrbitControls( camera2 );
camera2.position = new THREE.Vector3(0, -3, 1);
camera2.lookAt(new THREE.Vector3(0, 0, 0));

// (4)ライトの作成
var light = new THREE.DirectionalLight(0xcccccc);
light.position = new THREE.Vector3(0.577, 0.577, 0.577);
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

     
var geometry = new THREE.CylinderGeometry(0.15, 0.2, 1.5, 30, 30, true);
//var geometry = new THREE.SphereGeometry(1, 32, 16);

var tex = THREE.ImageUtils.loadTexture( '../img/renga2.jpg' );
tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
tex.repeat.set( 4, 4 );

var material = new THREE.MeshPhongMaterial({
    color: 0xffffff, ambient: 0xffffff,
    specular: 0xcccccc, shininess:50, metal:true,
    map: tex });
//var N = 2;
var N = 3;
var posx = [-0.25, 0, 0.25];
var vis = [true, false, true];
var meshes = new Array();
for (var i=0; i<N; ++i) {
    meshes[i] = new THREE.Mesh(geometry, material);
    meshes[i].position.x = posx[i];
    meshes[i].position.y = -0.3;
    meshes[i].rotation.z = -Math.PI*3/180;
    meshes[i].material.side = THREE.DoubleSide;
    scene.add(meshes[i]);
}

// (6)レンダリング
var baseTime = +new Date;
function render() {
    var pp = ot.checked;
    for (var i=0; i<N; ++i) {
	meshes[i].visible = pp?vis[i]:!vis[i];
    }
    if (pp) {
	renderer.setViewport( 0, 0, 800, 800);
	renderer.enableScissorTest ( false );
	renderer.render(scene, camera);
    } else {
	renderer.setViewport( 0, 0, 400, 800);
	renderer.setScissor( 0, 0, 400, 800);
	renderer.enableScissorTest ( true );
	renderer.render(scene, camera2);

	renderer.setViewport( 400, 0, 400, 800);
	renderer.setScissor( 400, 0, 400, 800);
	renderer.enableScissorTest ( true );
	renderer.render(scene, camera2);
    }
    //    mesh.rotation.y = 0.3 * (+new Date - baseTime) / 1000;


    try{controls1.update();} catch(e){}
    try{controls2.update();} catch(e){}

    requestAnimationFrame(render);
};
onload = function() {
    ot = document.getElementById("ot");
    document.getElementById('three').appendChild(renderer.domElement);
    render();
}

reset_view = function() {
    camera.position = new THREE.Vector3(0, -3, 1);
    camera2.position = new THREE.Vector3(0, -3, 1);
}
