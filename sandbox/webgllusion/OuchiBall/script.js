var can_size;
var os;
var oc;
var texture;
var obj = new Array();

var FLOOR = -250;

var camera, scene, renderer;
var cameraCube, sceneCube, cubeTarget;

var mesh, zmesh, lightMesh, geometry;

var loader;

var directionalLight, pointLight, pointLight2;

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
    pointLight.position.set(-1000, 1000, 1000);
    scene.add( pointLight );
    pointLight2 = new THREE.PointLight( 0xffffff, 1);
    pointLight2.position.set(0, 0, 1000);
    scene.add( pointLight2 );

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

    texture = new THREE.WebGLRenderTarget(32, 32, {
	magFilter: THREE.NearestFilter,
	minFilter: THREE.NearestFilter,
	wrapS: THREE.ClampToEdgeWrapping,
	wrapT: THREE.ClampToEdgeWrapping
    });
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 50, 10 );

    var cubeMaterial = new Array();
    cubeMaterial[0] = new THREE.MeshPhongMaterial( { color: 0x111111, ambient:0xffffff, specular: 0x444444, map: texture, envMap: null, 
						     combine: THREE.MixOperation} );
    cubeMaterial[1] = new THREE.MeshPhongMaterial( { color: 0x33aa33, ambient:0x222222, specular: 0xaaaaaa, envMap: null, 
						     combine: THREE.MixOperation, reflectivity: 0.75 } );

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

    renderer = new THREE.WebGLRenderer(antialias=true);
    renderer.setSize( 800, 800 );
    renderer.autoClear = false;
    renderer.setClearColorHex(0xffffff, 1);
    document.getElementById("three").appendChild(renderer.domElement);


//    loader = new THREE.BinaryLoader( true );
//    document.body.appendChild( loader.statusDomElement );

    document.addEventListener('mousemove', onDocumentMouseMove, false);

    


    os = new THREE.Scene;
    oc =  new THREE.OrthographicCamera(-16, 16, 16, -16, -1, 1);
    oc.position.set(0, 0, -1);
    var om1 = new THREE.Mesh(new THREE.PlaneGeometry(16, 16), new THREE.MeshBasicMaterial({color: 0xffffff}));
    om1.position.set(-8, -8, 0);
    var om2 = new THREE.Mesh(new THREE.PlaneGeometry(16, 16), new THREE.MeshBasicMaterial({color: 0x000000}));
    om2.position.set(8, -8, 0);
    var om3 = om1.clone();
    om3.position.set(8, 8, 0);
    var om4 = om2.clone();
    om4.position.set(-8, 8, 0);
    os.add(om1);
    os.add(om2);
    os.add(om3);
    os.add(om4);

    renderer.render(os, oc, texture);
    
    tex2 = texture.clone();
    tex2.repeat.set( 20, 60 );
    renderer.render(os, oc, tex2);

    var g = new THREE.SphereGeometry(500, 64, 64);
    var m = new THREE.Mesh(g, cubeMaterial[0]);
    scene.add(m);

    om1 = new THREE.Mesh(new THREE.PlaneGeometry(3000, 3000), new THREE.MeshBasicMaterial({color: 0xffffff, map: tex2, side: THREE.DoubleSide}));
    scene.add(om1);
    obj[0] = m;
    obj[1] = om1;

    can_size = {w: renderer.domElement.width, h: renderer.domElement.height};
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

    var timer = Date.now();


//    camera.position.x += ( mouseX - camera.position.x ) * .05;
//    camera.position.y += ( - mouseY - camera.position.y ) * .05;

/*
    camera.position.x = Math.sin(timer) * 2000;
    camera.position.z = Math.cos(timer) * 2000;
    camera.lookAt( scene.position );
*/

    cameraCube.rotation.copy( camera.rotation );

//    camera.position.x += ( mouseX - camera.position.x ) * .05;
//    camera.position.y += ( - mouseY - camera.position.y ) * .05;

//    camera.lookAt( scene.position );
//    cameraCube.rotation.copy( camera.rotation );
    
//    obj[0].position.z = (timer/2)%1000;
//    obj[1].rotation.z += 0.01;


//    lightMesh.position.x = 1500 * Math.cos( timer );
//    lightMesh.position.z = 1500 * Math.sin( timer );

//    renderer.clear();

//    obj[1].rotation.y += 0.01;
    renderer.render(scene, camera);


//    renderer.render( sceneCube, cameraCube );

//    renderer.render(scene, camera);
}
