// setting系
var p_texture = 0;

// カメラ系
var c;
var q = new qtnIV();
var qt = q.identity(q.create());
var then = Date.now();

// マウスムーブイベントに登録する処理
function mouseMove(e){
	var cw = c.width;
	var ch = c.height;
	var wh = 1 / Math.sqrt(cw * cw + ch * ch);
	var x = e.clientX - c.offsetLeft - cw * 0.5;
	var y = e.clientY - c.offsetTop - ch * 0.5;
	var sq = Math.sqrt(x * x + y * y);
	var r = sq * 2.0 * Math.PI * wh;
	if(sq != 1){
		sq = 1 / sq;
		x *= sq;
		y *= sq;
	}
	q.rotate(r, [y, x, 0.0], qt);
}

// 球体の数とか

var origins = new Array();
origins[0] = [0, 0, 0];

onload = function(){
    // canvasエレメントを取得
    c = document.getElementById('canvas');
    c.width = 500;
    c.height =500;
    c.addEventListener('mousemove', mouseMove, true);
    
    // webglコンテキストを取得
    var gl = c.getContext('webgl') || c.getContext('experimental-webgl');
    
    // 頂点シェーダとフラグメントシェーダの生成
    var v_shader = create_shader('vs');
    var f_shader = create_shader('fs');
    
    // プログラムオブジェクトの生成とリンク
    var prg = create_program(v_shader, f_shader);
    
    // attributeLocationを配列に取得
    var attLocation = new Array();
    attLocation[0] = gl.getAttribLocation(prg, 'position');
    attLocation[1] = gl.getAttribLocation(prg, 'color');
    attLocation[2] = gl.getAttribLocation(prg, 'textureCoord');
    attLocation[3] = gl.getAttribLocation(prg, 'normal');
    
    // attributeの要素数を配列に格納
    var attStride = new Array();
    attStride[0] = 3;
    attStride[1] = 4;
    attStride[2] = 2;
    attStride[3] = 3;
    
    // 球体モデル
    var earthData     = sphere(64*2, 64*2, 1.5, [1.0, 1.0, 1.0, 1.0]);
    var ePosition     = create_vbo(earthData.p);
    var eNormal       = create_vbo(earthData.n);
    var eColor        = create_vbo(earthData.c);
    var eTextureCoord = create_vbo(earthData.t);
    var eVBOList      = [ePosition, eColor, eTextureCoord, eNormal];
    //var eVBOList      = [ePosition, eColor, eTextureCoord];
    var eIndex        = create_ibo(earthData.i);

    // uniformLocationを配列に取得
    var uniLocation = new Array();
    uniLocation[0] = gl.getUniformLocation(prg, 'mvpMatrix');
    uniLocation[1] = gl.getUniformLocation(prg, 'texture');
    uniLocation[2] = gl.getUniformLocation(prg, 'invMatrix');
    uniLocation[3] = gl.getUniformLocation(prg, 'lightDirection');    
    uniLocation[4] = gl.getUniformLocation(prg, 'eyeDirection');
    uniLocation[5] = gl.getUniformLocation(prg, 'texstate');

    // VBOとIBOの登録
    set_attribute(eVBOList, attLocation, attStride);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, eIndex);
    
    // 各種行列の生成と初期化
    var m = new matIV();
    var mMatrix   = m.identity(m.create());
    var vMatrix   = m.identity(m.create());
    var pMatrix   = m.identity(m.create());
    var tmpMatrix = m.identity(m.create());
    var mvpMatrix = m.identity(m.create());
    var invMatrix = m.identity(m.create());
    
    // ビュー×プロジェクション座標変換行列
    m.lookAt([0.0, 0.0, 10.0], [0, 0, 0], [0, 1, 0], vMatrix);
    m.perspective(45, c.width / c.height, 0.1, 100, pMatrix);
    m.multiply(pMatrix, vMatrix, tmpMatrix);

    var lightDirection = [-0.5, 0.5, 0.5];
    var eyeDirection = [0.0, 0.0, 20.0];
    
    // 深度テストを有効にする
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LESS);
    
    // 有効にするテクスチャユニットを指定
    gl.activeTexture(gl.TEXTURE0);
    
    // テクスチャ用変数の宣言
    var texture = null;
    
    // テクスチャを生成
    create_texture('tex.png');
    
    // 装飾ステート
    var e_tex = [document.getElementById('tex_tex'),
		 document.getElementById('tex_col'),
		 document.getElementById('tex_non')];
    var p_state = 0;

    // 恒常ループ
    (function(){
	for (var i=0; i<3; ++i) {
	    if(e_tex[i].checked) {p_state = i; break;}
	}

	var delta = Date.now() - then;

	// canvasを初期化
	gl.clearColor(1.0, 0.9, 0.9, 1.0);
	gl.clearDepth(1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	// カウンタを元にラジアンを算出
	var rad = Math.sin(2*delta/1000.0 * Math.PI) * Math.PI/6;
	var state = Math.floor(delta/1000.0/2%2) == 0?0:1;
	
	// テクスチャをバインドする
	gl.bindTexture(gl.TEXTURE_2D, texture);
	
	// uniform変数にテクスチャを登録
	gl.uniform1i(uniLocation[1], 0);

	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

	for (var i=0; i<5; ++i){ 
	    var qMatrix = m.identity(m.create());
	    q.toMatIV(qt, qMatrix);

	    // モデル座標変換行列の生成
	    m.identity(mMatrix);
	    m.multiply(mMatrix, qMatrix, mMatrix);
	    m.translate(mMatrix, origins[0], mMatrix);
	    //	    m.rotate(mMatrix, delta/1000.0 * Math.PI / 3, [0, 1, 0], mMatrix);
	    //m.rotate(mMatrix, rad, [0, 1, 0], mMatrix);


	    if (i == 0) {
		m.rotate(mMatrix, rad, [0, 0, 1], mMatrix);
		m.scale(mMatrix, [1.3, 1.4, 1.3], mMatrix);
	    }

	    var dfac = rad/5.0;
	    if (state == 0) {
		m.rotate(mMatrix, rad, [0, 0, 1], mMatrix);
		if (i == 1) {
		    m.translate(mMatrix, [-1.5, 2.0, 0.0], mMatrix);
		} else if (i == 2) {
		    m.translate(mMatrix, [ 1.5, 2.0, 0.0], mMatrix);
		} else if (i == 3) {
		    m.translate(mMatrix, [-1.5, -2.0, 0.0], mMatrix);
		} else if (i == 4) {
		    m.translate(mMatrix, [ 1.5, -2.0, 0.0], mMatrix);
		}
	    } else if (state == 1) {
		if (i == 1) {
		    m.translate(mMatrix, [-1.5-dfac, 2.0+dfac, 0.0], mMatrix);
		} else if (i == 2) {
		    m.translate(mMatrix, [ 1.5-dfac, 2.0-dfac, 0.0], mMatrix);
		} else if (i == 3) {
		    m.translate(mMatrix, [-1.5+dfac, -2.0+dfac, 0.0], mMatrix);
		} else if (i == 4) {
		    m.translate(mMatrix, [ 1.5+dfac, -2.0-dfac, 0.0], mMatrix);
		}
	    }

	    if (i > 0) {
		m.scale(mMatrix, [0.1, 0.1, 0.1], mMatrix);
	    }

	    m.multiply(tmpMatrix, mMatrix, mvpMatrix);

	    // uniform変数の登録と描画
	    m.inverse(mMatrix, invMatrix);

	    gl.uniformMatrix4fv(uniLocation[0], false, mvpMatrix);	
	    gl.uniformMatrix4fv(uniLocation[2], false, invMatrix);
	    gl.uniform3fv(uniLocation[3], lightDirection);
	    gl.uniform3fv(uniLocation[4], eyeDirection);
	    gl.uniform1i(uniLocation[5], p_state);

	    gl.drawElements(gl.TRIANGLES, earthData.i.length, gl.UNSIGNED_SHORT, 0);

	    
	}
	
	// コンテキストの再描画
	gl.flush();
	
	// ループのために再帰呼び出し
	//setTimeout(arguments.callee, 1000 / 30);
	requestAnimationFrame(arguments.callee);
    })();
    
    // シェーダを生成する関数
    function create_shader(id){
	// シェーダを格納する変数
	var shader;
	
	// HTMLからscriptタグへの参照を取得
	var scriptElement = document.getElementById(id);
	
	// scriptタグが存在しない場合は抜ける
	if(!scriptElement){return;}
	
	// scriptタグのtype属性をチェック
	switch(scriptElement.type){
	    
	    // 頂点シェーダの場合
	case 'x-shader/x-vertex':
	    shader = gl.createShader(gl.VERTEX_SHADER);
	    break;
	    
	    // フラグメントシェーダの場合
	case 'x-shader/x-fragment':
	    shader = gl.createShader(gl.FRAGMENT_SHADER);
	    break;
	default :
	    return;
	}
	
	// 生成されたシェーダにソースを割り当てる
	gl.shaderSource(shader, scriptElement.text);
	
	// シェーダをコンパイルする
	gl.compileShader(shader);
	
	// シェーダが正しくコンパイルされたかチェック
	if(gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
	    
	    // 成功していたらシェーダを返して終了
	    return shader;
	}else{
	    
	    // 失敗していたらエラーログをアラートする
	    alert(gl.getShaderInfoLog(shader));
	}
    }
    
    // プログラムオブジェクトを生成しシェーダをリンクする関数
    function create_program(vs, fs){
	// プログラムオブジェクトの生成
	var program = gl.createProgram();
	
	// プログラムオブジェクトにシェーダを割り当てる
	gl.attachShader(program, vs);
	gl.attachShader(program, fs);
	
	// シェーダをリンク
	gl.linkProgram(program);
	
	// シェーダのリンクが正しく行なわれたかチェック
	if(gl.getProgramParameter(program, gl.LINK_STATUS)){
	    
	    // 成功していたらプログラムオブジェクトを有効にする
	    gl.useProgram(program);
	    
	    // プログラムオブジェクトを返して終了
	    return program;
	}else{
	    
	    // 失敗していたらエラーログをアラートする
	    alert(gl.getProgramInfoLog(program));
	}
    }
    
    // VBOを生成する関数
    function create_vbo(data){
	// バッファオブジェクトの生成
	var vbo = gl.createBuffer();
	
	// バッファをバインドする
	gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
	
	// バッファにデータをセット
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
	
	// バッファのバインドを無効化
	gl.bindBuffer(gl.ARRAY_BUFFER, null);
	
	// 生成した VBO を返して終了
	return vbo;
    }
    
    // VBOをバインドし登録する関数
    function set_attribute(vbo, attL, attS){
	// 引数として受け取った配列を処理する
	for(var i in vbo){
	    
	    // バッファをバインドする
	    gl.bindBuffer(gl.ARRAY_BUFFER, vbo[i]);
	    
	    // attributeLocationを有効にする
	    gl.enableVertexAttribArray(attL[i]);
	    
	    // attributeLocationを通知し登録する
	    gl.vertexAttribPointer(attL[i], attS[i], gl.FLOAT, false, 0, 0);
	}
    }
    
    // IBOを生成する関数
    function create_ibo(data){
	// バッファオブジェクトの生成
	var ibo = gl.createBuffer();
	
	// バッファをバインドする
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
	
	// バッファにデータをセット
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(data), gl.STATIC_DRAW);
	
	// バッファのバインドを無効化
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
	
	// 生成したIBOを返して終了
	return ibo;
    }
    
    // テクスチャを生成する関数
    function create_texture(source){
	// イメージオブジェクトの生成
	var img = new Image();
	
	// データのオンロードをトリガーにする
	img.onload = function(){
	    // テクスチャオブジェクトの生成
	    var tex = gl.createTexture();
	    
	    // テクスチャをバインドする
	    gl.bindTexture(gl.TEXTURE_2D, tex);
	    
	    // テクスチャへイメージを適用
	    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
	    
	    // ミップマップを生成
	    gl.generateMipmap(gl.TEXTURE_2D);
 
	    
	    // テクスチャのバインドを無効化
	    gl.bindTexture(gl.TEXTURE_2D, null);
	    
	    // 生成したテクスチャをグローバル変数に代入
	    texture = tex;
	};
	
	// イメージオブジェクトのソースを指定
	img.src = source;
    }
    
};
