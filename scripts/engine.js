var engine={
  // variable declaration
  header:$("#header"),
  sections:$("#sections"),
  rows:$("#rows"),

  // function declaration
  addSection:function(name,des){
    var section=$("<span>"+name+"</span>");
    section.addClass("sectionheader");
    section.attr("section",engine.sectionName(name));
    section.attr("des",des);
    section.click(function(){
      engine.goToSection($(this).attr("section"));
    });
    section.hover(function(){
      var left=$(this).offset().left+($(this).innerWidth()/2)-115;
      $("#des").css("left",left+"px");
      if(left<0){
        $("#des").css("left","0px");
      }
      var span=$("<div></div>");
      span.html($(this).attr("des"));
      span.css("padding","10px 20px 10px 20px");
      $("#des").html(span);
      $("#des").height(span.innerHeight());
    },function(){
      $("#des").height("0px");
    });
    engine.sections.append(section);
  },

  goToSection:function(section){
    $(".content").hide();
    $(".content[section='"+section+"']").show();
    $(".sectionheader").removeClass("selected");
    $(".sectionheader[section='"+section+"']").addClass("selected");
  },

  sectionName:function(name){
    name=name.toLowerCase();
    for(var a=0;a<name.length-1;a++){
      if(name[a]==" "){
        name=name.substring(0,a)+name.substring(a+1);
        a--;
      }
    }
    return name;
  },

  setupContent:function(xml){
    xml.children().each(function(){
      engine.addSection($(this).attr("name"),$(this).attr("des"));
      engine.setupSectionContent($(this));
    });
  },

  setupSectionContent:function(xml){
    var section=$("<span></span>");
    section.addClass("content");
    section.attr("section",engine.sectionName(xml.attr("name")));
    xml.children().each(function(){
      engine.setupRow($(this),section);
    });
    engine.rows.append(section);
  },

  setupRow:function(xml,section){
    var columns=xml.attr("col");
    var row=$("<div class='row contentrow'></div>");
    if(columns==undefined){
      var col=$("<div class='col-md-12 contentcol'></div>");
      xml.children().each(function(){
        col.append(engine.tagParse($(this)));
      })
      row.append(col);
    }else{
      var width=12/columns;
      xml.children().each(function(){
        if($(this).is("col")){
          var col=$("<div class='col-md-"+width+" contentcol'></div>");
          $(this).children().each(function(){
            col.append(engine.tagParse($(this)));
          });
          row.append(col);
        }else{
          var c=$("<div class='col-md-12 contentcol'></div>");
          c.append(engine.tagParse($(this)));
          var r=$("<div class='row'></div>");
          r.append(c);
          section.append(r);
        }
      });
    }
    section.append(row);
  },

  tagParse:function(xml){
    if(xml.is("subtitle")){
      var subtitle=$("<span class='subtitle'></br></span>");
      subtitle.prepend(xml.html());
      return subtitle;
    }else{
      xml.append($("</br>"));
      return xml;
    }
  }
};
