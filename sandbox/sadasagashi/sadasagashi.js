var out, con, start;
var on_exp = false;
var can_size = 500;

var n_trial = 10;
var tr = -3;
var t0;
var sns, rts, crs;
var easy=false;

window.onload = function() {
  out = document.getElementById("out");
  con = out.getContext("2d");
  
  start = document.getElementById("start");
  start_e = document.getElementById("start_easy");  
  
  start.onclick = function(event) {
    clear_canvas();
    easy=false;
    init_exp();
    setTimeout(start_exp, 500);
  }
  start_e.onclick = function(event) {
    clear_canvas();    
    easy=true;
    init_exp();    
    setTimeout(start_exp, 500);
  }

  document.onkeydown = function (event){
    if(!event) event = window.event;

    if (!on_exp) return;
    var resp = 0;
    if (event.keyCode == 70) resp = 1;
    else if (event.keyCode == 74) resp = 0;
    else return;

    rts[tr] = (new Date()).getTime() - t0;
    crs[tr] = sns[tr]==resp ? 1 : 0;
    on_exp = false;
    tr++;
    clear_canvas();
    if (tr == n_trial) setTimeout(finish_exp, 500, tr);
    else setTimeout(run_exp, 500, tr);
  }

}

function init_exp() {
  tr = -3;
  sns = new Array(n_trial);
  crs = new Array(n_trial);
  rts = new Array(n_trial);
  
  for (var i=0; i<n_trial; ++i) {
    sns[i] = i%2;
  }
  sns.sort(function() {return Math.random()-.5})
}

function start_exp() {
  clear_canvas();
  if (tr == 0) {
    run_exp();
    return;
  }
  con.font = "96px 'Meiryo'";
  con.fillStyle = "black";    
  con.fillText(Math.abs(tr).toString(), can_size/2-25, can_size/2-25);
  
  ++tr;
  setTimeout(start_exp, 1000);
}

function finish_exp() {
  y_s=0, y_ns=0, s_s=0, s_ns=0, p_s=0, m_s=0, p_ns=0, m_ns=0, p_g=0;
  for (var i=0; i<n_trial; ++i) {
    if (crs[i]==0) continue;
    if (sns[i]==1) {
      ++y_s; s_s+=rts[i];
    } else if (sns[i]==0) {
      ++y_ns; s_ns+=rts[i];
    }
  }
  p_s=y_s/n_trial*2, p_ns=y_ns/n_trial*2;
  m_s=s_s/y_s, m_ns=s_ns/y_ns;
  p_g=(y_s+y_ns)/n_trial;

  con.font = "18px 'Meiryo'";
  con.fillStyle = "black";        
  
  con.fillText("正答率: "+(p_g*100).toString()+"%", can_size/2-100, can_size/2-25);
  con.fillText("さださがし反応時間: "+(m_s/1000).toString()+"秒", can_size/2-100, can_size/2+0);
  con.fillText("非さださがし反応時間: "+(m_ns/1000).toString()+"秒", can_size/2-100, can_size/2+25);
  con.fillText("さだ指数: "+(Math.max(m_ns-m_s, 0)).toString()+"", can_size/2-100, can_size/2+50);    
}

function clear_canvas() {
  con.fillStyle = "rgb(255, 255, 255)";
  con.clearRect(0, 0, can_size, can_size);
  con.fillRect(0, 0, can_size, can_size);
}

function run_exp() {
  var nx = 24, ny = 24;
  var dx = can_size/(nx+1), dy = can_size/(ny+1);

  cs = Array(nx*ny);
  for (var i = 0; i < nx*ny; ++i) {
    cs[i] = 0x3041+Math.floor(Math.random()*(0x3093-0x3041+1));
  }
  if (easy) for (var i = 0; i < nx*ny; ++i) cs[i]="め";
  else cs = String.fromCharCode.apply(String, cs);
  
  if (sns[tr] == 1) ts = "さだまさし";
  else ts = "さのひなこ";
  
  var csx, csy, dir;
  csx = Math.floor(Math.random()*(nx-4))+2;
  csy = Math.floor(Math.random()*(ny-4))+2;
  switch(Math.floor(Math.random()*4)) {
  case 0: for(var i=0;i<5;++i) cs[nx*csy+(csx-2+i)]=ts[i]; break;
  case 1: for(var i=0;i<5;++i) cs[nx*csy+(csx+2-i)]=ts[i]; break;    
  case 2: for(var i=0;i<5;++i) cs[ny*(csy-2+i)+csx]=ts[i]; break;
  case 3: for(var i=0;i<5;++i) cs[ny*(csy+2-i)+csx]=ts[i]; break;
  }
  
  
  con.fillStyle = "rgb(255, 255, 255)";
  con.clearRect(0, 0, can_size, can_size);
  con.fillRect(0, 0, can_size, can_size);
  con.font = "14px 'Meiryo'";
  con.fillStyle = "black";        
  
  for (var x=0; x<nx; ++x) {
    for (var y=0; y<ny; ++y) {
      var c=cs[y*nx+x];
      con.fillText(c, (x+0.5)*dx, (y+1)*dy);
    }
  }
  on_exp = true;
  t0 = new Date();  
}
