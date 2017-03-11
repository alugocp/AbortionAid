// scripts to run on startup

$.get("content.xml",function(xml){
  engine.setupContent($(xml).children(0));
  engine.goToSection("welcome");
  var children=$("#sections").children();
  children.first().css("border-bottom-left-radius","10px");
  children.first().css("border-left-width","0px");
  children.eq(children.length-1).css("border-bottom-right-radius","10px");
  $("#headermargin").height($("#header").innerHeight()+$("#sections").innerHeight());
  $("#des").css("top",$("#header").innerHeight()+$("#sections").innerHeight());
  $("#header").height($("#header").height()+$("#sections").outerHeight());

  engine.min=40;
  $("#sections").children().each(function(){
    engine.min+=$(this).outerWidth();
  });
  setTimeout(function(){
    Lodr.display();
  },500);
});
$(window).resize(function(){
  if($(window).width()<engine.min){
    $("#header").css("overflow-x","scroll");
  }else{
    $("#header").css("overflow-x","auto");
  }
});
