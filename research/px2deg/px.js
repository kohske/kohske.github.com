Event.observe(window, 'load', page_loaded, false);
var vD, sS, sR, vA, vS, vP;

function page_loaded(){
    $A($$(".inputBox")).each(function(x){Event.observe(x,"keyup",calc, false);});
    vD=Number($("vDist").value);
    sS=Number($("sSize").value);
    sR=Number($("sResl").value);
    vA=Number($("vAngle").value);
    vS=Number($("vSize").value);
    vP=Number($("vSizePx").value);
    vA2vS();
    vS2vP();
}
function myRound(x){
    var nd=Number($("numDig").value);
    if(nd<1 || 100 < nd){nd=2;}
    return(Math.round(x*Math.pow(10,nd))/Math.pow(10,nd))
}
function vA2vS(){
    vS=Math.tan(Math.PI*(vA/2)/180)*vD*2;
    $("vSize").value=myRound(vS);
}
function vS2vA(){
    vA=2*Math.atan2(vS/2,vD)*180/Math.PI;
    $("vAngle").value=myRound(vA);
}
function vS2vP(){
    vP=vS*sR/sS;
    $("vSizePx").value=myRound(vP);
}
function vP2vS(){
    vS=vP*sS/sR;
    $("vSize").value=myRound(vS);
}

function calc(x){
    var e=Event.element(x);
    var v=Number(e.value);
    var n=e.id;
    if(!e.value.match("[0-9]") || isNaN(v)){e.style.background="red";return;}
    vD=Number($("vDist").value);
    sS=Number($("sSize").value);
    sR=Number($("sResl").value);
    vA=Number($("vAngle").value);
    vS=Number($("vSize").value);
    vP=Number($("vSizePx").value);
    switch(n){
    case "vDist":
    case "sSize":
    case "sResl":
    case "vAngle":
	vA2vS();
	vS2vP();
	break;
    case "vSize":
	vS2vP();
	vS2vA();
	break;
    case "vSizePx":
	vP2vS();
	vS2vA();
	break;
    }
    $A($$(".inputBox")).each(function(e){e.style.background="none"});    
}
