// three.js objects
var cw, ch;
var renderer, scene, meshes, cube_mesh, camera1, controls1;

// parameter binding
var s_view = 1, s_eye = 1, s_proj = 1, s_bg = true, s_tilt = 3;

// internal parameter
var N = 3;
var vis = [true, false, true];

// init
function init() {

    // parameter binding
    $("#e_tilt").on("input", function(){s_tilt = $(this).val();set_tilt();});
    $("#e_bg").change(function(){s_bg = Number($(this)[0].checked);set_bg();});
    $('input[name="e_eye"]:radio').change(function(){s_eye = Number($(this).val());set_eye();});
    $('input[name="e_view"]:radio').change(function(){s_view = Number($(this).val());set_view();});

    // three.js canvas 
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(800, 800);
    renderer.setClearColor(0x000000, 1);
    $('#three').append(renderer.domElement);
    cw = renderer.domElement.width; ch = renderer.domElement.height;

    // scene construction
    scene = new THREE.Scene();

    var light = new THREE.DirectionalLight(0xcccccc);
    light.position = new THREE.Vector3(0.577, 0.577, -0.577);
    scene.add(light);
    var ambient = new THREE.AmbientLight(0xFFFFFF);
    scene.add(ambient);

    camera1 = new THREE.PerspectiveCamera(45, 1, 0.1, 200);
    camera1.position.z = -10;
    camera1.lookAt(0, 0, 0);
    controls1 = new THREE.OrbitControls( camera1, $("#three")[0]);
    controls1.damping = 0.2;

    // tower
    var geometry = new THREE.CylinderGeometry(0.3, 0.3, 25, 30, 30, true);
    var tex = THREE.ImageUtils.loadTexture( 'texture.jpg' );
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set( 4, 60 );

    var material = new THREE.MeshPhongMaterial({
	color: 0xffffff, ambient: 0xffffff,
	specular: 0xcccccc, shininess:50, metal:true,
	map: tex });
    var posx = [-0.5, 0, 0.5];

    meshes = new Array();
    for (var i=0; i<N; ++i) {
	meshes[i] = new THREE.Mesh(geometry, material);
	meshes[i].position.x = posx[i];
	//	meshes[i].position.y = -2.5;
	meshes[i].rotation.z = Math.PI*s_tilt/180;
	meshes[i].material.side = THREE.DoubleSide;
	scene.add(meshes[i]);
    }

    // background
    var path = "../threejs/textures/cube/skybox/";
    var format = ".jpg";
    var urls = [
	path + 'px' + format, path + 'nx' + format,
	path + 'py' + format, path + 'ny' + format,
	path + 'pz' + format, path + 'nz' + format
    ];

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
    });

    cube_mesh = new THREE.Mesh( new THREE.BoxGeometry( 30, 30, 30 ), material );
    scene.add( cube_mesh );

    // initi parameter binding
    set_bg();
    set_eye();
    set_view();

    // init loop
    render();
}

// rendering loop
function render() {

    requestAnimationFrame(render);

    // camera by mouse
    controls1.update();
    
    if (s_view == 2) { // two towers
	renderer.setViewport( 0, 0, cw, ch);
	renderer.enableScissorTest ( false );
	renderer.render(scene, camera1);
    } else { // original
	renderer.setViewport( 0, 0, cw/2, ch);
	renderer.setScissor( 0, 0, cw/2, ch);
	renderer.enableScissorTest ( true );
	renderer.render(scene, camera1);

	renderer.setViewport( cw/2, 0, cw/2, ch);
	renderer.setScissor( cw/2, 0, cw/2, ch);
	renderer.enableScissorTest ( true );
	renderer.render(scene, camera1);
    }
};

set_eye = function(eye) {
    if (eye !== undefined) s_eye = eye;
    campos = [
	[0, -3, -1.6], // look up
	[0, 0, -3], // horizontal
	[0, 3, -1.6], // look down
	[0, 0, -80] // from far
    ];
    camera1.position.set(campos[s_eye-1][0], campos[s_eye-1][1], campos[s_eye-1][2]);
}

set_view = function() {
    camera1.aspect = s_view == 1?0.5:1;
    camera1.updateProjectionMatrix()
    for (var i=0; i<N; ++i) {
	meshes[i].visible = s_view==2?vis[i]:!vis[i];
    }
}

set_bg = function() {
    cube_mesh.visible = Boolean(s_bg);
    renderer.setClearColor(s_bg?0x000000:0xe0ffff, 1);
}

set_tilt = function() {
    for (var i=0; i<N; ++i) {
	meshes[i].rotation.z = Math.PI*s_tilt/180;
    }
    $("#e_tilt_val").text(s_tilt.toString());
}

$(document).ready(function(){
    init();
    render();
});
