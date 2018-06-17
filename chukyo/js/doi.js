var Es=null;
var Ts=null;
Event.observe(window, 'load', page_loaded, false);
function page_loaded(){
    Event.observe('search_filter_txtbox', 'keyup', do_filter, false);
    Es=$$(".pli");
    Ts=$A(Es.collect(function(e){return e.innerHTML.replace(/<.*?>/g," ").toLowerCase();}));
}
function do_filter(){
    var term=$("search_filter_txtbox").value.toLowerCase();
    Ts.each(function(e,i){Es[i].style.display=(e.match(term))?"":"none";});
}
