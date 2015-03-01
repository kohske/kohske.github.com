var c, cw, ch, wh;
var q = new qtnIV();
var qt = q.identity(q.create());
var qMatrix = null;
var texture = null;

var ball_p = null;

// 球体の数とか

var time0 = jQuery.now();

$(document).ready(function(){

    // canvas
    c = $("#canvas");
    c[0].width = 800;
    c[0].height =800;
    cw = c[0].width;
    ch = c[0].height;
    wh = 1 / Math.sqrt(cw * cw + ch * ch);
    c.on("mousemove", mouseMove);
    
    // webgl context
    gl = c[0].getContext('webgl') || c[0].getContext('experimental-webgl');
    
    // shaders
    var v_shader = create_shader('vs');
    var f_shader = create_shader('fs');
    
    // program object
    var prg = create_program(v_shader, f_shader);
    
    // attributeLocation array
    var attLocation = new Array();
    attLocation[0] = gl.getAttribLocation(prg, 'position');
    attLocation[1] = gl.getAttribLocation(prg, 'color');
    attLocation[2] = gl.getAttribLocation(prg, 'textureCoord');
    attLocation[3] = gl.getAttribLocation(prg, 'normal');
    
    // num of attribute
    var attStride = new Array();
    attStride[0] = 3;
    attStride[1] = 4;
    attStride[2] = 2;
    attStride[3] = 3;
    
    // sphere model (used for large and small balls)
    var earthData     = sphere(64, 64, 1, [1.0, 1.0, 1.0, 1.0]);
    var ePosition     = create_vbo(earthData.p);
    var eNormal       = create_vbo(earthData.n);
    var eColor        = create_vbo(earthData.c);
    var eTextureCoord = create_vbo(earthData.t);
    var eVBOList      = [ePosition, eColor, eTextureCoord, eNormal];
    var eIndex        = create_ibo(earthData.i);

    // uniformLocation array
    var uniLocation = new Array();
    uniLocation[0] = gl.getUniformLocation(prg, 'mvpMatrix');
    uniLocation[1] = gl.getUniformLocation(prg, 'texture');
    uniLocation[2] = gl.getUniformLocation(prg, 'invMatrix');
    uniLocation[3] = gl.getUniformLocation(prg, 'lightDirection');    
    uniLocation[4] = gl.getUniformLocation(prg, 'eyeDirection');
    uniLocation[5] = gl.getUniformLocation(prg, 'texstate');
    uniLocation[6] = gl.getUniformLocation(prg, 'sColor');

    // bind VBO and IBO
    set_attribute(eVBOList, attLocation, attStride);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, eIndex);
    
    // init matrix
    var m = new matIV();
    var mMatrix   = m.identity(m.create());
    var vMatrix   = m.identity(m.create());
    var pMatrix   = m.identity(m.create());
    var tmpMatrix = m.identity(m.create());
    var mvpMatrix = m.identity(m.create());
    var invMatrix = m.identity(m.create());

    // view & projection matrix
    m.lookAt([0, 0, 10], [0.0, 0.0, 0.0], [0, 1, 0], vMatrix);
    m.perspective(45, c[0].width / c[0].height, 1, 20, pMatrix);
    m.multiply(pMatrix, vMatrix, tmpMatrix);

    var lightDirection = [1.0, 1.0, 1.0];
    var eyeDirection = [0.0, 0.0, 1.0];
    
    // depth test
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LESS);
    
    // texture
    gl.activeTexture(gl.TEXTURE0);
    create_texture('texture.jpg');
    
    // set up parameter & event handler
    $("#balls").change(function(){ball_p = $(this)[0].checked;}).trigger("change");
    $("#ball_col").change(function(){ball_col = hexToRgb($(this).val());}).trigger("change");
    $('input[name="tex"]:radio').change(function(){surface = Number($(this).val());});
    surface = Number($('input[name="tex"]:checked').val());

    // main loop
    var loop = function(){
	var nw = jQuery.now() - time0;

	// clean canvas
	gl.clearColor(1.0, 1.0, 1.0, 1.0);
	gl.clearDepth(1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	// rotation angle
	var rad = Math.sin(2*nw/1000.0 * Math.PI) * Math.PI/6;
	var state = Math.floor(nw/1000.0/2%2) == 0?0:1;
	
	// texture
	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	
	// uniform
	gl.uniform1i(uniLocation[1], 0);
	gl.uniform1i(uniLocation[5], surface);

	for (var i=0; i<5; ++i){ 
	    qMatrix = m.identity(m.create());
	    q.toMatIV(qt, qMatrix);

	    // model matrix
	    m.identity(mMatrix);
	    m.multiply(mMatrix, qMatrix, mMatrix);
	    m.translate(mMatrix, [0, 0, 0], mMatrix);

	    if (i == 0) { // large ball
		m.rotate(mMatrix, rad, [0, 0, 1], mMatrix);
		m.scale(mMatrix, [1.3, 1.4, 1.3], mMatrix);
	    } else { // small balls
		if (!ball_p) break;
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
	    }

	    if (i > 0) {
		m.scale(mMatrix, [0.1, 0.1, 0.1], mMatrix);
	    }

	    m.multiply(tmpMatrix, mMatrix, mvpMatrix);

	    // uniform
	    m.inverse(mMatrix, invMatrix);
	    gl.uniformMatrix4fv(uniLocation[0], false, mvpMatrix);	
	    gl.uniformMatrix4fv(uniLocation[2], false, invMatrix);
	    gl.uniform3fv(uniLocation[3], lightDirection);
	    gl.uniform3fv(uniLocation[4], eyeDirection);
	    gl.uniform4fv(uniLocation[6], ball_col);
	    gl.drawElements(gl.TRIANGLES, earthData.i.length, gl.UNSIGNED_SHORT, 0);
	}
	

	// redraw
	gl.flush();
	
	// loop again
	setTimeout(arguments.callee, 1000 / 60);
	gl.flush();
	
    };

    // ready for start
    (function(){
	if (texture == null)
	    setTimeout(arguments.callee, 1000 / 30);
	else
	    setTimeout(loop, 1000 / 30);
    })();
});
    

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



function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return [parseInt(result[1], 16)/255.0, parseInt(result[2], 16)/255.0, parseInt(result[3], 16)/255.0, 1.0];
}

function mouseMove(e){
    cw = c[0].width;
    ch = c[0].height;
    var x = e.clientX - c[0].offsetLeft - cw * 0.5;
    var y = e.clientY - c[0].offsetTop - ch * 0.5;
    var sq = Math.sqrt(x * x + y * y);
    var r = sq * 2.0 * Math.PI * wh;
    if(sq != 1){
	sq = 1 / sq;
	x *= sq;
	y *= sq;
    }
    q.rotate(r, [-y, -x, 0.0], qt);
}

// reset camera position
function zero_vp() {
    q.identity(qt);
}
