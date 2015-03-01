var time0 = jQuery.now();
var time1 = jQuery.now();

var viewing_distance = 2000;
var c;
var reflectionCube;
var ef_bg = false;
var e_view = 2;
var shader;
var e_bg;
var obj = new Array();
var oc1, oc2, oc3;

var camera, scene, renderer;
var cameraCube, sceneCube;
var cam_control;

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

var s_view, s_speed, s_camera, s_bg, s_wf;

$(document).ready(function(){
    init();
    animate();
});
		  
function init() {

    c = $("#three");

    // parameter binding
    $("#speed").on("input", function(){s_speed = $(this).val();}).trigger("input");
    $("#e_wf").change(function(){s_wf = $(this)[0].checked; change_wireframe();});
    $("#e_bg").change(function(){s_bg = $(this)[0].checked;}).trigger("change");
    $('input[name="camera"]:radio').change(function(){s_camera = $(this).val();});
    s_camera = $('input[name="camera"]:checked').val();
    $('input[name="view"]:radio').change(function(){s_view = Number($(this).val()); change_view();});

    camera = new THREE.PerspectiveCamera( 50, width / height, 1, 5000 );
    camera.position.z = viewing_distance;

    cameraCube = new THREE.PerspectiveCamera( 50, width / height, 1, 100 );

    cam_control = new THREE.OrbitControls( camera , c[0]);
    cam_control.damping = 0.2;

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

    var path = "../threejs/textures/cube/SwedishRoyalCastle/";
    var format = '.jpg';
    var urls = [
	path + 'px' + format, path + 'nx' + format,
	path + 'py' + format, path + 'ny' + format,
	path + 'pz' + format, path + 'nz' + format
    ];

    reflectionCube = THREE.ImageUtils.loadTextureCube( urls );
    reflectionCube.format = THREE.RGBFormat;

    
    var refractionCube = new THREE.Texture( reflectionCube.image, THREE.CubeRefractionMapping );
    refractionCube.format = THREE.RGBFormat;

    
    var cubeMaterial = new Array();
    cubeMaterial[0] = new THREE.MeshPhongMaterial( { color: 0xFF0000, ambient:0x888888, specular: 0xFF0000, envMap: reflectionCube, 
						     combine: THREE.MixOperation, reflectivity: 0.75 } );
    cubeMaterial[1] = new THREE.MeshPhongMaterial( { color: 0x00FF00, ambient:0x888888, specular: 0x00FF00, envMap: reflectionCube, 
						     combine: THREE.MixOperation, reflectivity: 0.75 } );
    cubeMaterial[2] = new THREE.MeshPhongMaterial( { color: 0x0000FF, ambient:0x888888, specular: 0xaaaaaa, envMap: reflectionCube, 
						     combine: THREE.MixOperation, reflectivity: 0.75 } );

    // Skybox

    shader = THREE.ShaderLib[ "cube" ];
    shader.uniforms[ "tCube" ].value = reflectionCube;
    shader.fragmentShader = "uniform samplerCube tCube;uniform float tFlip;varying vec3 vWorldPosition;void main(){gl_FragColor = vec4(0.5, 0.5, 0.5, 0) + vec4(0.7, 0.7, 0.7, 1) * textureCube( tCube, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );}";
    material = new THREE.ShaderMaterial( {
	fragmentShader: shader.fragmentShader,
	vertexShader: shader.vertexShader,
	uniforms: shader.uniforms,
	depthWrite: false,
	side: THREE.BackSide
    } );

    mesh = new THREE.Mesh( new THREE.BoxGeometry( 100, 100, 100 ), material );
    sceneCube.add( mesh );

  renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    renderer.autoClear = false;
    c[0].appendChild( renderer.domElement );
    can_size = {w: renderer.domElement.width, h: renderer.domElement.height};

    loader = new THREE.BinaryLoader( true );
    loader.load( "../threejs/obj/walt/WaltHead_bin.js", function( geometry ) { createScene( geometry, cubeMaterial[0], cubeMaterial[1], cubeMaterial[2] ) } );
}

function createScene( geometry, m1, m2, m3 ) {

    var g0 = geometry.clone();
    var g1 = geometry.clone();
    geometry.faces = geometry.faces.filter(function(i) {
	if (geometry.vertices[i.a].z < 0) return false;
	if (geometry.vertices[i.b].z < 0) return false;
	if (geometry.vertices[i.c].z < 0) return false;
	return true;
    });
    
    g0.faces = g0.faces.filter(function(i) {
	if (geometry.vertices[i.a].z > 0) return false;
	if (geometry.vertices[i.b].z > 0) return false;
	if (geometry.vertices[i.c].z > 0) return false;
	return true;
    });

    g1.faces = g1.faces.filter(function(i) {
	if (geometry.vertices[i.a].y < 0) return false;
	if (geometry.vertices[i.b].y < 0) return false;
	if (geometry.vertices[i.c].y < 0) return false;
	return true;
    });

    var mesh = new THREE.Mesh( geometry, m1 );
    mesh.material.side = THREE.DoubleSide;
    scene.add( mesh );
    obj[0] = mesh;

    var mesh = new THREE.Mesh( g1, m2 );
    mesh.material.side = THREE.DoubleSide;
    scene.add( mesh );
    obj[1] = mesh;

    var mesh = new THREE.Mesh( g0, m3 );
    mesh.material.side = THREE.DoubleSide;
    scene.add( mesh );
    obj[2] = mesh;

    $('input[name="view"]:checked').change();
    $("#e_wf").change();
}

function animate() {
    render();
    setTimeout(arguments.callee, 1000/60);
}

function render() {
    cam_control.update();
    
    var nw0 = jQuery.now();
    var nw = (nw0 - time0)/1000;
    var rot_dif = Math.PI*(nw0 - time1)/1000*s_speed*0.1;
    time1 = nw0;
    
    if (obj[2]) {
	obj[0].rotation.y += rot_dif;
	obj[1].rotation.x += rot_dif;
	obj[2].rotation.y -= rot_dif;
    }

    // 2D view
    if (2 == s_view) {

	if (s_camera == "static") {
	    camera.position.x = camera.position.y = 0.0;
	    camera.position.z = viewing_distance;
	    camera.lookAt( scene.position );	
	} else if (s_camera == "auto") {
	    camera.position.x = Math.sin(nw*Math.PI/50)*viewing_distance;
	    camera.position.z = Math.cos(nw*Math.PI/50)*viewing_distance;
	    camera.position.y = 0.0;
	    camera.lookAt( scene.position );	
	}

	if (s_bg) {
	    cameraCube.rotation.copy( camera.rotation );
	    renderer.render( sceneCube, cameraCube );
	}
	renderer.render( scene, camera );

    } else if (3 == s_view) {
	
	camera.position.x = 150;
	camera.position.y = 0;
	camera.lookAt( scene.position );
	renderer.setViewport( can_size.w/2*0.02, can_size.h*0.02, can_size.w/2*0.96, can_size.h*0.96);
	renderer.setScissor( can_size.w/2*0.02, can_size.h*0.02, can_size.w/2*0.96, can_size.h*0.96);

	if (s_bg) {
	    cameraCube.rotation.copy( camera.rotation );
	    renderer.render( sceneCube, cameraCube );
	}
	renderer.render(scene, camera);

	camera.position.x = -150;
	camera.position.y = 0;
	camera.lookAt( scene.position );

	renderer.setViewport( can_size.w/2*1.02, can_size.h*0.02, can_size.w/2*0.96, can_size.h*0.96);
	renderer.setScissor( can_size.w/2*1.02, can_size.h*0.02, can_size.w/2*0.96, can_size.h*0.96);
	
	if (s_bg) {
	    cameraCube.rotation.copy( camera.rotation );
	    renderer.render( sceneCube, cameraCube );
	}
	renderer.render(scene, camera);
    }
}

change_view = function() {
    if (!obj[2]) return;
    var s = 10;
    if (2 == s_view) {
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

    } else if (3 == s_view) {
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
    }
}

change_wireframe = function() {
    if (!obj[2]) return;
    for (var i=0; i<obj.length; ++i) obj[i].material.wireframe = s_wf;
}

change_bg = function() {
    if (!obj[2]) return;
    ef_bg = document.getElementById("e_bg").checked;
    for (var i=0; i<obj.length; ++i) {
	obj[i].material.reflectivity = ef_bg?0.5:0;
    }
}
