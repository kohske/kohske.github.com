stim_mode = 1;

obj = new Array();
FLOOR = -250;

mouseX = 0; mouseY = 0;

windowHalfX = window.innerWidth / 2;
windowHalfY = window.innerHeight / 2;

onload = function() {
    init();
    animate();
}

function init() {

    cam1 = new THREE.PerspectiveCamera( 50, 1, 1, 100000 );
    cam1.position.z = 3000;
    cam1.lookAt(new THREE.Vector3(0, 0, 0));
    

    var ambient = new THREE.AmbientLight( 0xcccccc );
    pointLight = new THREE.PointLight( 0xffffff, 2 );
    pointLight.position.set(-1000, 1000, 1000);
    pointLight2 = new THREE.PointLight( 0xffffff, 1);
    pointLight2.position.set(1000, 100, 10000);

    // テクスチャ（ボール用）
    tex_p = {
	magFilter: THREE.NearestFilter,
	minFilter: THREE.NearestFilter,
	wrapS: THREE.ClampToEdgeWrapping,
	wrapT: THREE.ClampToEdgeWrapping
    };
    
    tex1 = new THREE.WebGLRenderTarget(32, 32, tex_p);
    tex1.wrapS = tex1.wrapT = THREE.RepeatWrapping;
    tex1.repeat.set( 50, 10 );

    // テクスチャ（背景用）
    tex2 = new THREE.WebGLRenderTarget(32, 32, tex_p);
    tex2.wrapS = tex2.wrapT = THREE.RepeatWrapping;
    tex2.repeat.set( 15, 60 );

    // テクスチャ（２次元ボード用）
    tex3 = new THREE.WebGLRenderTarget(32, 32, tex_p);
    tex3.wrapS = tex3.wrapT = THREE.RepeatWrapping;
    tex3.repeat.set( 50, 15 );

    // レンダリング
    renderer = new THREE.WebGLRenderer(antialias=true);
    renderer.setSize( 800, 800 );
    renderer.autoClear = false;
    renderer.setClearColorHex(0xffffff, 1);
    document.getElementById("three").appendChild(renderer.domElement);
    can_size = {w: renderer.domElement.width, h: renderer.domElement.height};

    //    document.addEventListener('mousemove', onDocumentMouseMove, false);

    // テクスチャ作成
    tex_ver = {x: [-8, 8, 8 ,-8], 
	       y: [-8, -8, 8, 8],
	       c: [0xffffff, 0x000000, 0xffffff, 0x000000],
	       a: [1, 1, 1, 1]};

    os = new THREE.Scene;
    oc = new THREE.OrthographicCamera(-16, 16, 16, -16, 1, 10000);
    oc.position.set(0, 0, 2000);
    om = new Array();
    for (var i=0; i<4; ++i) {
	om[i] = new THREE.Mesh(new THREE.PlaneGeometry(16, 16), new THREE.MeshBasicMaterial({color: tex_ver.c[i], opacity: tex_ver.a[i]}));
	om[i].position.set(tex_ver.x[i], tex_ver.y[i], 0);
	os.add(om[i]);
    }

    renderer.render(os, oc, tex1);
    renderer.render(os, oc, tex2);
    renderer.render(os, oc, tex3);
    renderer.render(os, oc);

    // 球
    ball = new THREE.Mesh(new THREE.SphereGeometry(500, 64, 64), 
			  new THREE.MeshPhongMaterial( { color: 0xffffff, ambient:0xffffff, specular: 0x444444, map: tex1}));


    // 背景
    bg = new THREE.Mesh(new THREE.PlaneGeometry(3000, 3000), new THREE.MeshBasicMaterial({color: 0xffffff, map: tex2, side: THREE.DoubleSide}));
    
    // 2D用ボード
    board = new THREE.Mesh(new THREE.PlaneGeometry(3000, 3000), new THREE.MeshBasicMaterial({color: 0xffffff, map: tex3, side: THREE.DoubleSide}));
    board.position.set(0, 0, 0);


    // 3次元用シーン
    scene3d = new THREE.Scene();
    scene3d.add(ambient);
    scene3d.add(pointLight);
//    scene3d.add(pointLight2);
    
    scene3d.add(bg);
    scene3d.add(ball);

    // 2次元用シーン
    scene2d = {
	m: new THREE.EffectComposer( 
	    renderer, 
	    new THREE.WebGLRenderTarget( can_size.w, can_size.h, 
					 { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBFormat, stencilBuffer: true })),
	bg: new THREE.Scene(),
	mask: new THREE.Scene(),
	board: new THREE.Scene()
    };

    maskball = new THREE.Mesh(new THREE.SphereGeometry(500, 64, 64), 
			  new THREE.MeshBasicMaterial({color: 0x000000, opacity: 0.0, depthTest: false}));
    maskball.position.set(600, 0, 0);
    maskball2 = maskball.clone();
    maskball2.position.set(-600, 0, 0);

    scene2d.bg.add(bg.clone());
    ball2 = new THREE.Mesh(new THREE.SphereGeometry(500, 64, 64), 
			  new THREE.MeshBasicMaterial( { color: 0xffffff, map: tex1}));
    ball2.position.set(-600, -600, 0);
    ball2b = new THREE.Mesh(new THREE.SphereGeometry(500, 64, 64), 
			    new THREE.MeshBasicMaterial( { color: 0xffffff, map: tex1}));
    ball2b.position.set(600, 600, 0);

//    scene2d.bg.add(ambient);
//    scene2d.bg.add(pointLight);
//    scene2d.bg.add(ball2);
//    scene2d.bg.add(ball2b);
    scene2d.mask.add(maskball);
    scene2d.mask.add(maskball2);
    scene2d.board.add(board);

    scene2d.passes = {bg: new THREE.RenderPass( scene2d.bg, cam1 ),
		      mask: new THREE.MaskPass( scene2d.mask, cam1 ),
//		      maskr: new THREE.RenderPass( scene2d.mask, cam1 ),
		      board: new THREE.RenderPass( scene2d.board, cam1 )}
    scene2d.passes.board.clear = false;
    scene2d.passes.mask.clear = true;
//    scene2d.passes.maskr.clear = false;

    clearMask = new THREE.ClearMaskPass();
    toScreen = new THREE.ShaderPass(THREE.CopyShader);
    toScreen.renderToScreen = true;

    scene2d.m.addPass(scene2d.passes.bg);
    scene2d.m.addPass(scene2d.passes.mask);
    scene2d.m.addPass(scene2d.passes.board);
    scene2d.m.addPass(clearMask);
    scene2d.m.addPass(toScreen);

}

function onDocumentMouseMove(event) {

    mouseX = ( event.clientX - windowHalfX ) * 4;
    mouseY = ( event.clientY - windowHalfY ) * 4;

}

function animate() {
    requestAnimationFrame( animate );
    render();
}

function render() {

    var timer = Date.now();

    renderer.clear();
    if (stim_mode == 0) {
	renderer.render(scene3d, cam1);
    } else {
	scene2d.m.render( 0.01 );
    }
}

function change_stim(i) {stim_mode = i;}
