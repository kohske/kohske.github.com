var geo;
var obj1, obj2, obj3;
var oc1, oc2, oc3;

var camera, scene, renderer;
var cameraCube, sceneCube;

var mesh, lightMesh, geometry;

var loader;

var directionalLight, pointLight, ambient;

var mouseX = 0;
var mouseY = 0;

var width = 800;
var height = 800;
var windowHalfX = width / 2;
var windowHalfY = height / 2;

document.addEventListener('mousemove', onDocumentMouseMove, false);

onload = function() {
    init();
    animate();
}

function init() {

    camera = new THREE.PerspectiveCamera( 50, width / height, 1, 5000 );
    camera.position.z = 2000;

    cameraCube = new THREE.PerspectiveCamera( 50, width / height, 1, 100 );

    scene = new THREE.Scene();
    sceneCube = new THREE.Scene();

    // LIGHTS
    directionalLight = new THREE.DirectionalLight( 0xffffff, 1);
    directionalLight.position.set(0, 0, 100)
    scene.add(directionalLight);

    ambient = new THREE.AmbientLight( 0xffffff );
    scene.add( ambient );

    pointLight = new THREE.PointLight( 0xffffff, 3 );
    pointLight.position.set( 0, 0, -1000 );
    scene.add( pointLight );

    // light representation

    sphere = new THREE.SphereGeometry( 100, 16, 8 );
    lightMesh = new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xffaa00 } ) );
    lightMesh.position = pointLight.position;
    lightMesh.scale.x = lightMesh.scale.y = lightMesh.scale.z = 0.05;
//    scene.add( lightMesh );

    var path = "../img/SwedishRoyalCastle/";
    var format = '.jpg';
    var urls = [
	path + 'px' + format, path + 'nx' + format,
	path + 'py' + format, path + 'ny' + format,
	path + 'pz' + format, path + 'nz' + format
    ];

    var reflectionCube = THREE.ImageUtils.loadTextureCube( urls );
    reflectionCube.format = THREE.RGBFormat;

    
    var refractionCube = new THREE.Texture( reflectionCube.image, new THREE.CubeRefractionMapping() );
    refractionCube.format = THREE.RGBFormat;

    //var cubeMaterial3 = new THREE.MeshPhongMaterial( { color: 0x000000, specular:0xaa0000, envMap: reflectionCube, combine: THREE.MixOperation, reflectivity: 0.25 } );
    var cubeMaterial3 = new THREE.MeshLambertMaterial( { color: 0xff6600, ambient: 0x993300, envMap: reflectionCube, combine: THREE.MixOperation, reflectivity: 0.3 } );
    var cubeMaterial2 = new THREE.MeshLambertMaterial( { color: 0xffee00, ambient: 0x996600, envMap: refractionCube, refractionRatio: 0.95 } );
    var cubeMaterial1 = new THREE.MeshLambertMaterial( { color: 0xffffff, ambient: 0xaaaaaa, envMap: reflectionCube } )

    // Skybox

    var shader = THREE.ShaderLib[ "cube" ];
    shader.uniforms[ "tCube" ].value = reflectionCube;

    var material = new THREE.ShaderMaterial( {

	fragmentShader: shader.fragmentShader,
	vertexShader: shader.vertexShader,
	uniforms: shader.uniforms,
	depthWrite: false,
	side: THREE.BackSide

    } ),

    mesh = new THREE.Mesh( new THREE.CubeGeometry( 100, 100, 100 ), material );
    sceneCube.add( mesh );

    //

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    renderer.autoClear = false;
    document.getElementById("three").appendChild( renderer.domElement );

    //

    //

    loader = new THREE.BinaryLoader( true );
//    document.body.appendChild( loader.statusDomElement );

    loader.load( "../img/WaltHead_bin.js", function( geometry ) { createScene( geometry, cubeMaterial1, cubeMaterial2, cubeMaterial3 ) } );

    //

//    window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    cameraCube.aspect = window.innerWidth / window.innerHeight;
    cameraCube.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function createScene( geometry, m1, m2, m3 ) {
    
    geometry.faces = geometry.faces.filter(function(i) {
	if (geometry.vertices[i.a].z < 0) return false;
	if (geometry.vertices[i.b].z < 0) return false;
	if (geometry.vertices[i.c].z < 0) return false;
	return true;
    });
    geo = geometry;
    var s = 10;
    
    var mesh = new THREE.Mesh( geometry, m1 );
    mesh.position.z = - 100;
    mesh.scale.x = mesh.scale.y = mesh.scale.z = s;
    mesh.material.side = THREE.DoubleSide;
    scene.add( mesh );
    obj1 = mesh;

    var mesh = new THREE.Mesh( geometry, m2 );
    mesh.position.x = - 600;
    mesh.position.z = - 100;
    mesh.scale.x = mesh.scale.y = mesh.scale.z = s;
    mesh.material.side = THREE.DoubleSide;
    scene.add( mesh );
    obj2 = mesh;

    var mesh = new THREE.Mesh( geometry, m3 );
    mesh.position.x = 600;
    mesh.position.z = - 100;
    mesh.scale.x = mesh.scale.y = mesh.scale.z = s;
    mesh.material.side = THREE.DoubleSide;
    scene.add( mesh );
    obj3 = mesh;

//    loader.statusDomElement.style.display = "none";

}

function onDocumentMouseMove(event) {

    mouseX = ( event.clientX - windowHalfX ) * 4;
    mouseY = ( event.clientY - windowHalfY ) * 4;

}

//

function animate() {

    requestAnimationFrame( animate );

    render();
}

function render() {

    var timer = -0.0003 * Date.now();

//    lightMesh.position.x = 1500 * Math.cos( timer );
//    lightMesh.position.z = 1500 * Math.sin( timer );

    obj1.rotation.x = timer;
    obj2.rotation.y = timer;
    obj3.rotation.y = -timer;

    camera.position.x += ( mouseX - camera.position.x ) * .05;
    camera.position.y += ( - mouseY - camera.position.y ) * .05;

    camera.lookAt( scene.position );
    cameraCube.rotation.copy( camera.rotation );

    renderer.render( sceneCube, cameraCube );
    renderer.render( scene, camera );

}
