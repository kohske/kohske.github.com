var reflectionCube
var ef_bg = false;
var e_view = 2;
var shader;
var e_bg;
var geo;
var obj = new Array();
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
var can_size;

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

    var path = "../img/SwedishRoyalCastle/";
    var format = '.jpg';
    var urls = [
	path + 'px' + format, path + 'nx' + format,
	path + 'py' + format, path + 'ny' + format,
	path + 'pz' + format, path + 'nz' + format
    ];

    reflectionCube = THREE.ImageUtils.loadTextureCube( urls );
    reflectionCube.format = THREE.RGBFormat;

    
    var refractionCube = new THREE.Texture( reflectionCube.image, new THREE.CubeRefractionMapping() );
    refractionCube.format = THREE.RGBFormat;

    
    var cubeMaterial = new Array();
    cubeMaterial[0] = new THREE.MeshPhongMaterial( { color: 0xaa3333, ambient:0x111111, specular: 0xaaaaaa, envMap: reflectionCube, 
						     combine: THREE.MixOperation, reflectivity: 0.75 } );
    cubeMaterial[1] = new THREE.MeshPhongMaterial( { color: 0x33aa33, ambient:0x111111, specular: 0xaaaaaa, envMap: reflectionCube, 
						     combine: THREE.MixOperation, reflectivity: 0.75 } );
    cubeMaterial[2] = new THREE.MeshPhongMaterial( { color: 0x3333aa, ambient:0x111111, specular: 0xaaaaaa, envMap: reflectionCube, 
						     combine: THREE.MixOperation, reflectivity: 0.75 } );

    // Skybox

    shader = THREE.ShaderLib[ "cube" ];
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
    can_size = {w: renderer.domElement.width, h: renderer.domElement.height};

    loader = new THREE.BinaryLoader( true );
    //    document.body.appendChild( loader.statusDomElement );

    loader.load( "../img/WaltHead_bin.js", function( geometry ) { createScene( geometry, cubeMaterial[0], cubeMaterial[1], cubeMaterial[2] ) } );

    e_bg = document.getElementById("e_bg");
    e_cam = document.getElementById("e_cam");

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
    
    var mesh = new THREE.Mesh( geometry, m1 );
    mesh.material.side = THREE.DoubleSide;
    scene.add( mesh );
    obj[0] = mesh;

    var mesh = new THREE.Mesh( geometry, m2 );
    mesh.material.side = THREE.DoubleSide;
    scene.add( mesh );
    obj[1] = mesh;

    var mesh = new THREE.Mesh( geometry, m3 );
    mesh.material.side = THREE.DoubleSide;
    scene.add( mesh );
    obj[2] = mesh;

    change_view(2);
    change_bg();

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

    // 2D view
    if (2 == e_view) {
	if (obj[2]) {
	    obj[0].rotation.x = timer;
	    obj[1].rotation.y = timer;
	    obj[2].rotation.y = -timer;
	}

	if (e_cam.checked) {
	    camera.position.x += ( mouseX - camera.position.x ) * .05;
	    camera.position.y += ( - mouseY - camera.position.y ) * .05;
	} else {
	    camera.position.x = camera.position.y = 0.0;    
	}
	camera.lookAt( scene.position );	

	if (ef_bg) {
	    cameraCube.rotation.copy( camera.rotation );
	    renderer.render( sceneCube, cameraCube );
	}
	renderer.render( scene, camera );

    } else if (3 == e_view) {

	if (obj[2]) {
	    obj[0].rotation.x = timer;
	    obj[1].rotation.y = timer;
	    obj[2].rotation.y = -timer;

	}

	
	camera.position.x = 150;
	camera.position.y = 0;
	camera.lookAt( scene.position );
	renderer.setViewport( can_size.w/2*0.02, can_size.h*0.02, can_size.w/2*0.96, can_size.h*0.96);
	renderer.setScissor( can_size.w/2*0.02, can_size.h*0.02, can_size.w/2*0.96, can_size.h*0.96);

	if (ef_bg) {
	    cameraCube.rotation.copy( camera.rotation );
	    renderer.render( sceneCube, cameraCube );
	}
	renderer.render(scene, camera);


	camera.position.x = -150;
	camera.position.y = 0;
	camera.lookAt( scene.position );

	renderer.setViewport( can_size.w/2*1.02, can_size.h*0.02, can_size.w/2*0.96, can_size.h*0.96);
	renderer.setScissor( can_size.w/2*1.02, can_size.h*0.02, can_size.w/2*0.96, can_size.h*0.96);
	
	if (ef_bg) {
	    cameraCube.rotation.copy( camera.rotation );
	    renderer.render( sceneCube, cameraCube );
	}
	renderer.render(scene, camera);
    }
    

}

change_view = function(dim) {
    if (!obj[2]) return;
    e_view = dim;
    var s = 10;
    if (2 == e_view) {
	camera.fov = 50;
	camera.aspect = 1.0;
	camera.updateProjectionMatrix()

	obj[0].position.set(0, 0, 100);
	obj[0].scale.set(s, s, s);

	obj[1].position.set(600, 0, -100);
	obj[1].scale.set(s, s, s);

	obj[2].position.set(-600, 0, -100);
	obj[2].scale.set(s, s, s);

	renderer.enableScissorTest ( false );
	renderer.setViewport( 0, 0, can_size.w, can_size.h);

    } else if (3 == e_view) {
	camera.fov = 50;
	camera.aspect = 0.5;
	camera.updateProjectionMatrix()

	obj[0].position.set(0, -100, 100);
	obj[0].scale.set(s, s, s);

	obj[1].position.set(200, 300, 500);
	obj[1].scale.set(s/2, s/2, s/2);

	obj[2].position.set(-200, 300, 500);
	obj[2].scale.set(s/2, s/2, s/2);

	renderer.enableScissorTest ( true );
	//	    obj[0].material.wireframe = true;
	
    }
}

change_wireframe = function() {
    if (!obj[2]) return;
    var f = document.getElementById("e_wf").checked;
    for (var i=0; i<obj.length; ++i) obj[i].material.wireframe = f;
}

change_bg = function() {
    if (!obj[2]) return;
    ef_bg = document.getElementById("e_bg").checked;
    for (var i=0; i<obj.length; ++i) {
	obj[i].material.reflectivity = ef_bg?0.5:0;
    }
}
