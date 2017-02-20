// scripts to run on startup

$.get("content.xml",function(xml){
  engine.setupContent($(xml).children(0));
  $("#headermargin").height($("#header").innerHeight()+$("#sections").innerHeight());
  engine.goToSection("welcome");
  var children=$("#sections").children();
  children.first().css("border-bottom-left-radius","10px");
  children.first().css("border-left-width","0px");
  children.eq(children.length-1).css("border-bottom-right-radius","10px");
  $("#des").css("top",$("#header").innerHeight()+$("#sections").innerHeight());
});
