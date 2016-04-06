
  var tip,diff;
  var color ;
  var repCircles;
  var legendStatus = [];
  var tempFilteredData;
  var margin = {top: 50, right: 50, bottom: 55, left: 60},
      width = 750 - margin.left - margin.right,
      height = 450 - margin.top - margin.bottom;
   var x = d3.scale.linear()
      .range([0, width]);

  var y = d3.scale.linear()
      .range([height, 0]);   

  function loadScatterPlot(sMin,sMax){
      hideUserGraph();
      showOverview();
     if(svgScatterPlot!=null){
        tip = null;diff=0;
        color =null;
         repCircles =null;
        legendStatus = [];
        tempFilteredData = null;
         svgScatterPlot.remove();
     }


      var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .ticks(20)
      .tickPadding(2)
      .innerTickSize(17);

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .ticks(10);
    svgScatterPlot = d3.select("#scatterPlot").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      //.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
     // .call(zoom)
      ;
      
   tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
          for(var i=0;i<UserData.length;i++){
          if(d.UserID==UserData[i].UserID){
            selectedUserName = UserData[i].UserName;
            var htmlData = "<label style=\"font-size:12px;\">" + UserData[i].UserName + "</label>"+
            "<label style=\"font-size:11px;\">Reputation:<span style=\"font-size:11px;color:white\">" +d.Reputation + "</span></label>"+
            "<label style=\"font-size:11px;\">Gold:<span style=\"font-size:11px;color:white\">" + UserData[i].Gold + "</span></label>"+
            "<label style=\"font-size:11px;\">Silver:<span style=\"font-size:11px;color:white\">" + UserData[i].Silver + "</span></label>"+
            "<label style=\"font-size:11px;\">Bronze: <span \"font-size:11px;color:white\">" + UserData[i].Bronze + "</span></label>";
            return htmlData;
          }
      }
    })
     clickTip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
          for(var i=0;i<UserData.length;i++){
          if(d.UserID==UserData[i].UserID){
            selectedUserName = UserData[i].UserName;
            var htmlData = "<label style=\"font-size:12px;\">" + UserData[i].UserName + "</label>"+
            "<label style=\"font-size:11px;\">Reputation:<span style=\"font-size:11px;color:white\">" +d.Reputation + "</span></label>"+
            "<label style=\"font-size:11px;\">Gold:<span style=\"font-size:11px;color:white\">" + UserData[i].Gold + "</span></label>"+
            "<label style=\"font-size:11px;\">Silver:<span style=\"font-size:11px;color:white\">" + UserData[i].Silver + "</span></label>"+
            "<label style=\"font-size:11px;\">Bronze: <span \"font-size:11px;color:white\">" + UserData[i].Bronze + "</span></label>";
        
            return htmlData;
          }
      }
    })
    
    svgScatterPlot.call(tip);
    svgScatterPlot.call(clickTip);

     diff = maxRepByTag/10;
    for (var i=0;i<10;i++){
      var lObj = {Id:0, min:0,max:0 ,selected:false};
      lObj.Id = i;
      lObj.min = i*diff;
      lObj.max = (i+1)*diff-1;
      lObj.selected = true;
      legendStatus[i] = lObj;
    }
    
      tempFilteredData = filteredData;
      var min = parseFloat(sMin);
      var max = parseFloat(sMax);
      tempFilteredData = tempFilteredData.filter(function(d){ return d.Score>=min && d.Score<=max;}); 
         
     var fData = filterDataByRep(tempFilteredData);

    fData.sort(function(a,b){
            var d1 = parseInt(a.Days);
            var d2 = parseInt(b.Days);
            return d2-d1;
          }
      );
    var maxDays = fData[0].Days;
      fData.sort(function(a,b){
            return b.Score-a.Score;
          }
      );
    var maxScore = fData[0].Score;
    console.log("Max score "+max+" "+maxScore);
    x.domain([maxDays,0]).nice();
    y.domain([min,max]).nice();

  var colors = ["#1f77b4" ,"#ff7f0e" ,"#2ca02c" ,"#d62728","#9467bd","#8c564b","#e377c2","#7f7f7f","#bcbd22","#17becf","#1f77b4"];
   color = d3.scale.threshold().domain(d3.range(1, maxRepByTag, maxRepByTag/(colors.length-1))).range(colors);

    svgScatterPlot.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", 45)
        .style("text-anchor", "end")
          .style("font-size","14px")
         .style("font-weight","bold")
        .text("Days elapsed since active");

    svgScatterPlot.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(0," + 0 + ")")
        .call(yAxis)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", -50)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .style("font-size","14px")
         .style("font-weight","bold")
        .text("User score");
   createReputationCircles(fData);
    var legend = svgScatterPlot.selectAll(".legend")
        .data(color.domain())
      .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate ("+((i) * 60)+"," + -30 + ")"; });

    legend.append("rect")
        .attr("x", 0)
        .attr("width", 60)
        .attr("height", 15)
        .style("fill", color)
        .style("stroke","black")
        .on("mouseover", function(d,i){
          d3.select(this).style("stroke",color).attr("height",17).style("stroke-linejoin", "round").attr("stroke-width",4);

        })
        .on("mouseout",function(d,i){
          d3.select(this).attr("height",15).attr("stroke-width",1).style("stroke","black");
  })
        
       .on("click",function(d,i){
          
           if(legendStatus[i].selected==false){
             d3.select(this).style("stroke","black");
              legendStatus[i].selected = true;
              d3.select(this).style("fill-opacity",1);
           }
           else if(legendStatus[i].selected==true){
             legendStatus[i].selected = false;
             d3.select(this).style("stroke","none");
             d3.select(this).style("fill-opacity",0.5);
           }
           filterDataByRep();
          
        });

    legend.append("text")
        .attr("x",function(d,i){return (d.length);})
        .attr("y", -5)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { if(d<1000) return Math.ceil(d); else return Math.ceil(d/1000)+"k";});   

  svgScatterPlot.append("text")
                .attr("transform", function(d) { return "translate ("+600+"," + -35 + ")"; })
                .attr("dy", ".35em")
                .style("text-anchor", "end")  
                .text(Math.ceil(maxRepByTag/1000)+"k");
  svgScatterPlot.append("text")
                .attr("transform", function(d) { return "translate ("+-3+"," + -24 + ")"; })
                .attr("dy", ".35em")
                .style("text-anchor", "end")  
                .style("font-size","11px")
                .text("Reputation");

  }
  function createReputationCircles(fData){
   var dottedLineX,dottedLineY,last;
    repCircles = svgScatterPlot.selectAll(".dot")
        .data(fData)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", function(d){return /*d.Score/maxScore*100*/Math.log2(d.Reputation);})
        .attr("cx", function(d) { return x(d.Days); })
        .attr("cy", function(d) { return y(d.Score); })
        .style("fill", function(d) {return color(d.Reputation); })
        .attr('stroke-width', 0)
        .attr("fill-opacity",function(d){return (0.08+d.Reputation/maxRepByTag);})
        .on("mouseover", function(d)
          { 
            d3.select(this).attr('stroke-width', 2);
            d3.select(this).attr('fill-opacity',1);
            var dpX = d3.select(this).attr('cx');
            var dpY = d3.select(this).attr('cy');
                  dottedLineX = svgScatterPlot.append("svg:line")
                      .attr("class", 'd3-dp-line')
                      .attr("x1", dpX)
                      .attr("y1", dpY)
                      .attr("x2", 0)
                      .attr("y2", dpY)
                      .style("stroke-dasharray", ("3, 3"))
                      .style("stroke-opacity", 0.9)
                      .style("stroke", "Red");
                  dottedLineY = svgScatterPlot.append("svg:line")
                      .attr("class", 'd3-dp-line')
                      .attr("x1", dpX)
                      .attr("y1", dpY)
                      .attr("x2", dpX)
                      .attr("y2", height)
                      .style("stroke-dasharray", ("3, 3"))
                      .style("stroke-opacity", 0.9)
                      .style("stroke", "Red");
                      tip.show(d);     
          })
        .on("mouseout",function(d){
     
            d3.select(this).attr('stroke-width', 0);
            d3.select(this).attr("fill-opacity",function(d){return (0.2+d.Reputation/maxRepByTag);});
            dottedLineX.remove();
            dottedLineY.remove();
            tip.hide();
          
        })
        .on("click",function(d){
           if(last!=null){
              last.style("stroke-width",0);
              clickTip.hide();
            }
          last = d3.select(this);
          d3.select(this).style("stroke-width",2);
          clickTip.show(d);     
          plotUserGraph(d);
          plotSpeedometers(d);
        });
  }
  function filterDataByRep(){
     var fData = tempFilteredData.filter(function(d){ 
      var index = Math.floor(d.Reputation/(diff+1));
      return legendStatus[index].selected;
     }); 
    if(repCircles!=null){
      repCircles.remove();
      createReputationCircles(fData);
    }
     return fData;  
  }

  function removeClickTip(){
    if(clickTip!=null)
    clickTip.hide();
  }