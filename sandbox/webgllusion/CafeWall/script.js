var pfunc = function(u, v) {
    var w = 30;
    var h = 29.5;
    u = (2*u-1)*w;
    v = (2*v-1)*h;
    var x = u;
    var y = v;
    var z = -Math.sqrt(u*u+v*v)/Math.sqrt(w*w+h*h) * 3;
    return new THREE.Vector3(x,y,z);
}

var FLOOR = -250;

var camera, scene, renderer;
var cameraCube, sceneCube, cubeTarget;

var mesh, zmesh, lightMesh, geometry;

var loader;

var directionalLight, pointLight;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

onload = function() {
    init();
    animate();
}

function init() {


    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 100000 );
    camera.position.z = 2000;

    cameraCube = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 100000 );

    scene = new THREE.Scene();
    sceneCube = new THREE.Scene();

    // LIGHTS

    var ambient = new THREE.AmbientLight( 0xffffff );
    scene.add( ambient );

    pointLight = new THREE.PointLight( 0xffffff, 2 );
    scene.add( pointLight );

    // light representation

    sphere = new THREE.SphereGeometry( 100, 16, 8 );
    lightMesh = new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color:0xffaa00 } ) );
    lightMesh.position = pointLight.position;
    lightMesh.scale.x = lightMesh.scale.y = lightMesh.scale.z = 0.05;
    scene.add( lightMesh );

    // material samples



    /*
      var urls = [ r + "px.jpg", r + "nx.jpg",
      r + "py.jpg", r + "ny.jpg",
      r + "pz.jpg", r + "nz.jpg" ];
    */
    /*
      var r = "../img/Park2/";
      var urls = [ r + "posx.jpg", r + "negx.jpg",
		 r + "posy.jpg", r + "negy.jpg",
		 r + "posz.jpg", r + "negz.jpg" ];
		 */
    /*
    var r = "../img/pisa/";
    var urls = [ r + "px.png", r + "nx.png",
      r + "py.png", r + "ny.png",
      r + "pz.png", r + "nz.png" ];
    */
    var r = "../img/Bridge2/";
    var urls = [ r + "posx.jpg", r + "negx.jpg",
		 r + "posy.jpg", r + "negy.jpg",
		 r + "posz.jpg", r + "negz.jpg" ];


    var textureCube = THREE.ImageUtils.loadTextureCube( urls, new THREE.CubeRefractionMapping() );

    var cubeMaterial3 = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube, refractionRatio: 0.95, reflectivity:0.75 } );
    var cubeMaterial2 = new THREE.MeshBasicMaterial( { color: 0xaaaaaa, envMap: textureCube, refractionRatio: 0.95, reflectivity:0.75 } );
    var cubeMaterial1 = new THREE.MeshBasicMaterial( { color: 0x444444, envMap: textureCube, refractionRatio: 0.95, reflectivity: 0.75 } );

    // Skybox

    var shader = THREE.ShaderLib[ "cube" ];
    shader.uniforms[ "tCube" ].value = textureCube;

    var material = new THREE.ShaderMaterial( {

	fragmentShader: shader.fragmentShader,
	vertexShader: shader.vertexShader,
	uniforms: shader.uniforms,
	side: THREE.BackSide
    } ),

    mesh = new THREE.Mesh( new THREE.CubeGeometry( 100000, 100000, 100000 ), material );
    sceneCube.add( mesh );

    //

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.autoClear = false;
    document.getElementById("three").appendChild(renderer.domElement);


    loader = new THREE.BinaryLoader( true );
    document.body.appendChild( loader.statusDomElement );

    //    loader.load( '../img/WaltHead_bin.js', function( geometry ) { createScene( geometry, cubeMaterial1, cubeMaterial2, cubeMaterial3 ) } );

    document.addEventListener('mousemove', onDocumentMouseMove, false);

    //
    var offset = 0.5;
    for (var y=-5; y<=5; ++y) {
	for (var x=-15; x <= 15; ++x) {
	    //	    m = new THREE.Mesh(new THREE.CubeGeometry(100, 100, 95), x%2?cubeMaterial3:cubeMaterial1);
	    m = new THREE.Mesh(new THREE.ParametricGeometry(pfunc, 8, 8), x%2?cubeMaterial3:cubeMaterial1);
	    m.position.set((x+(0==y%2?0:offset))*60, y*60, 0);
	    for (i=0; i<m.geometry.faces.length; ++i) {
		m.geometry.faces[i].normal.x += (Math.random()-0.5) * 5;
		m.geometry.faces[i].normal.y += (Math.random()-0.5) * 5;
		m.geometry.faces[i].normal.z += (Math.random()-0.5) * 5;
	    }
	    //	    m.rotation.set((Math.random()-0.5)*Math.PI/18, (Math.random()-0.5)*Math.PI/18, (Math.random()-0.5)*Math.PI/18);
	    scene.add(m);
	}
    }
    for (var y=-5; y<=6; ++y) {
	m = new THREE.Mesh(new THREE.CubeGeometry(2050, 3, 3), cubeMaterial2)
	m.position.set(offset*60/2, y*60-30, 0);
	scene.add(m);
    }
    


    window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

    windowHalfX = window.innerWidth / 2,
    windowHalfY = window.innerHeight / 2,

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    cameraCube.aspect = window.innerWidth / window.innerHeight;
    cameraCube.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function createScene( geometry, m1, m2, m3 ) {

    var s = 30.5, z = - 1000;

    var mesh = new THREE.Mesh( geometry, m1 );
    mesh.position.z = z;
    mesh.scale.x = mesh.scale.y = mesh.scale.z = s;
    scene.add( mesh );

    var mesh = new THREE.Mesh( geometry, m2 );
    mesh.position.x = - 900;
    mesh.position.z = z;
    mesh.scale.x = mesh.scale.y = mesh.scale.z = s;
    scene.add( mesh );

    var mesh = new THREE.Mesh( geometry, m3 );
    mesh.position.x = 900;
    mesh.position.z = z;
    mesh.scale.x = mesh.scale.y = mesh.scale.z = s;
    scene.add( mesh );

    loader.statusDomElement.style.display = "none";

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

    var timer = -0.0002 * Date.now();

    camera.position.x += ( mouseX - camera.position.x ) * .05;
    camera.position.y += ( - mouseY - camera.position.y ) * .05;

    camera.lookAt( scene.position );

    cameraCube.rotation.copy( camera.rotation );

    lightMesh.position.x = 1500 * Math.cos( timer );
    lightMesh.position.z = 1500 * Math.sin( timer );

    renderer.clear();
    renderer.render( sceneCube, cameraCube );
    renderer.render( scene, camera );

}
