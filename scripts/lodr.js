var Lodr={
  color:null,
  display:function(){
    $(".lodr-startup").css("display","none");
    $(".lodr-content").css("display","block");
    $("body").css("transition","background-color 0.3s ease");
    $("body").css("background-color",Lodr.color);
  },
  start:function(){
    var startup=$(".lodr-startup");
    startup.css("display","block");
    startup.css("position","absolute");
    startup.offset({
      top:($(window).height()-startup.height())/2,
      left:($(window).width()-startup.width())/2
    });
    Lodr.color=$("body").css("background-color");
    $("body").css("background-color",startup.attr("bg"));
    $(".lodr-content").css("display","none");
  }
}
$("body").ready(function(){
  Lodr.start();
});
