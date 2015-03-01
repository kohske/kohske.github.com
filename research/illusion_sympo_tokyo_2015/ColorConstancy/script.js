var time0 = jQuery.now();
var time1 = jQuery.now();

var viewing_distance = 2000;
var c;
var reflectionCube = [];
var ef_bg = false;
var e_view = 2;
var shader;
var e_bg;
var obj = new Array();
var oc1, oc2, oc3;
var lights = [];


var camera, scene, renderer, scene0;
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

var s_scene = 0, s_speed, s_camera, s_bg, s_wf, s_lightR, s_lightG, s_lightB, s_obj = true, s_bg = true;

$(document).ready(function(){
    init();
    animate();
});

function init() {

    c = $("#three");

    // parameter binding
    $("#e_lightR").on("input", function(){s_lightR = $(this).val();set_light();});
    $("#e_lightG").on("input", function(){s_lightG = $(this).val();set_light();});
    $("#e_lightB").on("input", function(){s_lightB = $(this).val();set_light();});
    s_lightR = $("#e_lightR").val();
    s_lightG = $("#e_lightG").val();
    s_lightB = $("#e_lightB").val();
    $("#e_obj").change(function(){s_obj = $(this)[0].checked; set_light();});
    $("#e_bg").change(function(){s_bg = $(this)[0].checked;});
    $('input[name="camera"]:radio').change(function(){s_camera = $(this).val();});
    s_camera = $('input[name="camera"]:checked').val();


    camera = new THREE.PerspectiveCamera( 50, width / height, 1, 5000 );
    camera.position.z = viewing_distance;

    cam_control = new THREE.OrbitControls( camera , c[0]);
    cam_control.damping = 0.2;

    scene = new THREE.Scene();
    scene0 = new THREE.Scene();

    //    lights[0] = new THREE.PointLight( 0xffffff, 1, 0 );
    lights[0] = new THREE.PointLight( rgb2hex([s_lightR, s_lightG, s_lightB]), 1, 0 );
    lights[1] = new THREE.PointLight( rgb2hex([s_lightR, s_lightG, s_lightB]), 1, 0 );
    
    //    lights[0].position.set( 0, 200, 0 );
    lights[0].position.set( 0, 0, 2000 );
    lights[1].position.set( 0, 0, -2000 );

    scene.add( lights[0] );
    scene.add( lights[1] );

    ambient = new THREE.AmbientLight( 0x000000 );
    scene.add( ambient );


    // scene
    
    var path = "../threejs/textures/cube/pisa/";
    var format = '.png';
    var urls = [
	path + 'px' + format, path + 'nx' + format,
	path + 'py' + format, path + 'ny' + format,
	path + 'pz' + format, path + 'nz' + format
    ];

    reflectionCube[0] = THREE.ImageUtils.loadTextureCube( urls );
    reflectionCube[0].format = THREE.RGBFormat;

    path = "../threejs/textures/cube/Bridge2/";
    format = '.jpg';
    urls = [
	path + 'posx' + format, path + 'negx' + format,
	path + 'posy' + format, path + 'negy' + format,
	path + 'posz' + format, path + 'negz' + format
    ];
    
    reflectionCube[1] = THREE.ImageUtils.loadTextureCube( urls );
    reflectionCube[1].format = THREE.RGBFormat;

    path = "../threejs/textures/cube/SwedishRoyalCastle/";
    format = '.jpg';
    urls = [
	path + 'px' + format, path + 'nx' + format,
	path + 'py' + format, path + 'ny' + format,
	path + 'pz' + format, path + 'nz' + format
    ];
    reflectionCube[2] = THREE.ImageUtils.loadTextureCube( urls );
    reflectionCube[2].format = THREE.RGBFormat;

    path = "../threejs/textures/cube/MilkyWay/";
    format = '.jpg';
    urls = [
	path + 'dark-s_px' + format, path + 'dark-s_nx' + format,
	path + 'dark-s_py' + format, path + 'dark-s_ny' + format,
	path + 'dark-s_pz' + format, path + 'dark-s_nz' + format
    ];
    reflectionCube[3] = THREE.ImageUtils.loadTextureCube( urls );
    reflectionCube[3].format = THREE.RGBFormat;

    // Skybox

    shader = THREE.ShaderLib[ "cube" ];
    shader.fragmentShader = "uniform vec4 cbase; uniform vec4 lcol; uniform samplerCube tCube;uniform float tFlip;varying vec3 vWorldPosition;void main(){gl_FragColor = cbase + lcol * textureCube( tCube, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );}";
    shader.uniforms[ "tCube" ].value = reflectionCube[0];
    shader.uniforms[ "cbase" ] = {type: "v4", value: new THREE.Vector4(0, 0, 0, 0)};
    shader.uniforms[ "lcol" ] = {type: "v4", value: new THREE.Vector4(s_lightR, s_lightG, s_lightB, 1)};
    
    material = new THREE.ShaderMaterial( {
	fragmentShader: shader.fragmentShader,
	vertexShader: shader.vertexShader,
	uniforms: shader.uniforms,
	depthWrite: false,
	side: THREE.BackSide    }
				       );
    mesh = new THREE.Mesh( new THREE.BoxGeometry( 3000, 3000, 3000 ), material );
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    renderer.autoClear = false;
    c[0].appendChild( renderer.domElement );
    can_size = {w: renderer.domElement.width, h: renderer.domElement.height};

    // common material parameters

    shininess = 51.2, scale = 23;
    var material1 = new THREE.MeshLambertMaterial( {
	//	color: rgb2hex([141/255, 125/255, 100/255]), // illusory gold
	//	color: rgb2hex([45/255, 45/255, 45/255]), // black
	//	color: rgb2hex([200/255, 30/255, 30/255]),
	color: 0x666666,
	ambient: 0xffffff
    } );

    //        ambient = rgb2hex(0.24725,0.1995, 0.0745), diffuse = rgb2hex(0.75164,0.60648,0.22648), specular = rgb2hex(0.628281,0.555802,0.366065), shininess = 51.2, scale = 23;
    
    var material2 = new THREE.MeshLambertMaterial( {
	//	color: rgb2hex([156/255, 151/255, 187/255]), // illusory white
	//	color: rgb2hex([20/255, 60/255, 120/255]), // blue
	//	color: rgb2hex([200/255, 190/255, 20/255]),
	color: 0x4466dd,
	ambient: 0xffffff
    } );

    material1 = new THREE.MeshPhongMaterial( { color: 0x666666, ambient:0xffffff, specular: 0x888888} );
    material2 = new THREE.MeshPhongMaterial( { color: 0x4466dd, ambient:0xffffff, specular: 0x888888} );
    //
    
    loader = new THREE.BinaryLoader( true );

    loader.load( "../threejs/obj/ninja/NinjaLo_bin.js", function( geometry ) { createScene( geometry, scale, material1, material2 ) } );
}


function createScene( geometry, scale, material1, material2 ) {

    geometry.computeTangents();

    mesh1 = new THREE.Mesh( geometry, material1 );
    mesh1.position.x = - scale * 12;
    mesh1.scale.set( scale, scale, scale );
    mesh1.castShadow = true;
    mesh1.receiveShadow = true;
    scene.add( mesh1 );

    mesh2 = new THREE.Mesh( geometry, material2 );
    mesh2.position.x = scale * 12;
    mesh2.scale.set( scale, scale, scale );
    mesh2.castShadow = true;
    mesh2.receiveShadow = true;
    scene.add( mesh2 );

    set_light_col(0.5, 0.5, 0.5);
}


function animate() {
    render();
    setTimeout(arguments.callee, 1000/60);
}

function render() {
    cam_control.update();

    if (flag_special) {
	nw = (jQuery.now() - time_special)/1000;
	r = 0.5 + (0.85-0.5)/2 * nw;
	g = 0.5 + (0.82-0.5)/2 * nw;
	b = 0.5 + (0.65-0.5)/2 * nw;
	set_light_col(r, g, b);
	if (nw > 2) {
	    flag_special = false;
	}
    }
    var nw0 = jQuery.now();
    var nw = (nw0 - time0)/1000;
    var rot_dif = Math.PI*(nw0 - time1)/1000*s_speed*0.1;
    time1 = nw0;
    
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

    mesh.visible = s_bg;
    renderer.render( scene, camera );
}

function rgb2hex( rgb ) {
    return ( rgb[ 0 ] * 255 << 16 ) + ( rgb[ 1 ] * 255 << 8 ) + rgb[ 2 ] * 255;
}


function set_scene(ss) {
    if (ss !== undefined) s_scene = ss;
    mesh.material.uniforms.tCube.value = reflectionCube[ss];
}

function set_light_col(r, g, b) {
    $("#e_lightR").val(r);
    $("#e_lightG").val(g);
    $("#e_lightB").val(b);
    s_lightR = r; s_lightG = g; s_lightB = b;

    set_light();
}
function set_light() {
    for (var i=0; i<lights.length; ++i) {
	if (s_obj) {
	    ambient.color.setHex(rgb2hex([Math.max(0, s_lightR-0.5), Math.max(0, s_lightG-0.5), Math.max(0, s_lightB-0.5)]));
	    lights[i].color.setHex(rgb2hex([s_lightR, s_lightG, s_lightB]));
	} else {
	    ambient.color.setHex(0x000000);
	    lights[i].color.setHex(0x888888);
	}
    }
    //    shader.uniforms[ "cbase" ].value = new THREE.Vector4(s_lightR*0.5+0.1, s_lightG*0.5+0.1, s_lightB*0.5+0.1, 1);
    shader.uniforms[ "cbase" ].value.set(0, 0, 0);
    shader.uniforms[ "cbase" ].needsUpdate = true;
    //    shader.uniforms[ "lcol" ].value = new THREE.Vector4(s_lightR*0.9+0.1, s_lightG*0.9+0.1, s_lightB*0.9+0.1, 1);
    shader.uniforms[ "lcol" ].value.set(Math.max(0.2, s_lightR*3), Math.max(0.2, s_lightG*3), Math.max(0.2, s_lightB*3));
    shader.uniforms[ "lcol" ].needsUpdate = true;
}


var time_special;
var flag_special = false;
function set_special() {
    set_light_col(0.5, 0.5, 0.5);
    setTimeout(function() {
	time_special = jQuery.now();
	flag_special = true;
    }, 1000);
}
