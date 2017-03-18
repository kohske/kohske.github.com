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

var grp = new THREE.Object3D();

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


    camera = new THREE.PerspectiveCamera( 50, 1, 1, 100000 );
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
	/*
    sphere = new THREE.SphereGeometry( 100, 16, 8 );
    lightMesh = new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color:0xffaa00 } ) );
    lightMesh.position = pointLight.position;
    lightMesh.scale.x = lightMesh.scale.y = lightMesh.scale.z = 0.05;
    scene.add( lightMesh );
*/

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

    var cw_cubeMaterial3 = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube, refractionRatio: 0.95, reflectivity:0.75 } );
    var cw_cubeMaterial2 = new THREE.MeshBasicMaterial( { color: 0xaaaaaa, envMap: textureCube, refractionRatio: 0.95, reflectivity:0.75 } );
    var cw_cubeMaterial1 = new THREE.MeshBasicMaterial( { color: 0x444444, envMap: textureCube, refractionRatio: 0.95, reflectivity: 0.75 } );

    var cubeMaterial2 = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube, refractionRatio: 0.95, reflectivity:0.1 } );
    var cubeMaterial1 = new THREE.MeshBasicMaterial( { color: 0x888888, envMap: textureCube, refractionRatio: 0.95, reflectivity: 0.1 } );

    // Skybox

    shader = THREE.ShaderLib[ "cube" ];
    shader.uniforms[ "tCube" ].value = textureCube;
    shader.uniforms.cm = {type: 'v4', value: new THREE.Vector4(0.8, 0.8, 0.8, 1)};

//    aa = "uniform float cm;\n uniform samplerCube tCube;\n uniform float tFlip;\n varying vec3 vWorldPosition;\n void main() {\n gl_FragColor = vec4(vec3(1.0, 1.0, 1.0)*cm, 1.0)*textureCube( tCube, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );\n }\n";
    aa = "uniform vec4 cm;\n uniform samplerCube tCube;\n uniform float tFlip;\n varying vec3 vWorldPosition;\n void main() {\n gl_FragColor = cm*textureCube( tCube, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );\n }\n";
    material = new THREE.ShaderMaterial( {
	
	fragmentShader: aa, //shader.fragmentShader,
	vertexShader: shader.vertexShader,
	uniforms: shader.uniforms,
	side: THREE.BackSide
    } ),

    mesh = new THREE.Mesh( new THREE.CubeGeometry( 100000, 100000, 100000 ), material );
    sceneCube.add( mesh );

    //

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( 800, 800 );
    renderer.autoClear = false;
    renderer.setClearColorHex(0x000000, 1);
    document.getElementById("three").appendChild(renderer.domElement);


    loader = new THREE.BinaryLoader( true );
    document.body.appendChild( loader.statusDomElement );

    document.addEventListener('mousemove', onDocumentMouseMove, false);

    //
    /*
    var g = new THREE.CubeGeometry(10, 90*10, 10);
    for (var x=-5; x <= 5; ++x) {
	m = new THREE.Mesh(g, cubeMaterial1);
	m.position.set(x*90, 0, 0);
	grp.add(m);
    }
    
    var g = new THREE.CubeGeometry(90*10, 10, 10);
    for (var y=-5; y<=5; ++y) {
	m = new THREE.Mesh(g, cubeMaterial1);
	m.position.set(0, y*90, 0);
	grp.add(m);
    }
    */
    /*
    for (var r=1; r <= 5; ++r) {
	var g = new THREE.TorusGeometry(r*90, 5, 30, 30);
	m = new THREE.Mesh(g, cubeMaterial1);
	grp.add(m);
    }
    */
    var g = new THREE.CylinderGeometry(5, 5, 5*90*2, 30);
    for (var x=-5; x <= 5; ++x) {
	m = new THREE.Mesh(g, cubeMaterial1);
	m.position.set(x*90, 0, 500);
//	grp.add(m);
    }
    for (var y=-5; y<=5; ++y) {
	m = new THREE.Mesh(g, cubeMaterial1);
	m.position.set(0, y*90, 500);
	m.rotation.z = Math.PI/2;
//	grp.add(m);
    }

    var g = new THREE.SphereGeometry(15, 30, 30);
    for (var x=-5; x <= 5; ++x) {
	for (var y=-5; y<=5; ++y) {
	    m = new THREE.Mesh(g, cubeMaterial2);
	    m.position.set(x*90, y*90, 500);
//	    grp.add(m);
	}
    }

//    window.addEventListener( 'resize', onWindowResize, false );

    var offset = 0.5;
    for (var y=-5; y<=5; ++y) {
	for (var x=-15; x <= 15; ++x) {
	    //	    m = new THREE.Mesh(new THREE.CubeGeometry(100, 100, 95), x%2?cubeMaterial3:cubeMaterial1);
	    m = new THREE.Mesh(new THREE.ParametricGeometry(pfunc, 8, 8), x%2?cw_cubeMaterial3:cw_cubeMaterial1);
	    m.position.set((x+(0==y%2?0:offset))*60, y*60, 0);
	    for (i=0; i<m.geometry.faces.length; ++i) {
		m.geometry.faces[i].normal.x += (Math.random()-0.5) * 5;
		m.geometry.faces[i].normal.y += (Math.random()-0.5) * 5;
		m.geometry.faces[i].normal.z += (Math.random()-0.5) * 5;
	    }
	    //	    m.rotation.set((Math.random()-0.5)*Math.PI/18, (Math.random()-0.5)*Math.PI/18, (Math.random()-0.5)*Math.PI/18);
	    grp.add(m);
	}
    }
    for (var y=-5; y<=6; ++y) {
	m = new THREE.Mesh(new THREE.CubeGeometry(2050, 3, 3), cw_cubeMaterial2)
	m.position.set(offset*60/2, y*60-30, 0);
	grp.add(m);
    }
    
    scene.add(grp);

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

/*
    camera.position.x += ( mouseX - camera.position.x ) * .05;
    camera.position.y += ( - mouseY - camera.position.y ) * .05;

    camera.lookAt( scene.position );

    cameraCube.rotation.copy( camera.rotation );
*/
    camera.position.x += ( mouseX - camera.position.x ) * .05;
    camera.position.y += ( - mouseY - camera.position.y ) * .05;

    camera.lookAt( scene.position );
    cameraCube.rotation.copy( camera.rotation );
    
    grp.position.set(camera.position.x/4,camera.position.y/4,camera.position.z/4 );
    grp.lookAt( camera.position);

//    lightMesh.position.x = 1500 * Math.cos( timer );
//    lightMesh.position.z = 1500 * Math.sin( timer );

    renderer.clear();
    renderer.render( sceneCube, cameraCube );
    renderer.render( scene, camera );

}
