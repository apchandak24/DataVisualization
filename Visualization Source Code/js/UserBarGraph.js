function plotUserGraph(selUser){
  hideOverview();
  showUserGraph();
      var fltData = d3.nest().key(function(d){ return d.UserID;}).map(completeData,d3.map);
      var userData = fltData.get(selUser.UserID);
      var techNames = ["android","swing","eclipse","spring","hibernate","arrays","multithreading"
                      ,"xml","jsp","string","servlets","maven","java-ee","mysql","spring-mvc","json","regex"
                      ,"tomcat","jpa","jdbc","javascript","arraylist","web-services","sql","generics","netbeans"
                      ,"sockets","user-interface","jar","html"];
      if(svgUserGraph!=null)
        svgUserGraph.remove();

      techNames.sort(function(a,b){
          return (a).localeCompare(b);
        }
    );
      //set up canvas and bar sizes
      var canvasWidth = 550,
          canvasHeight = 330,
          otherMargins = canvasWidth * 0.1,
          leftMargin = 80,
          maxBarWidth = canvasHeight - - otherMargins - leftMargin
          maxChartHeight = canvasHeight-60;

      //set up linear scale for data to fit on chart area 
      var xScale = d3.scale.linear()
                      .range([0, canvasWidth-100]);

      //set up ordinal scale for x variables
      var yScale = d3.scale.ordinal();

      //add canvas to HTML
      svgUserGraph = d3.select("#userGraph").append("svg")
                                  .attr("width",canvasWidth)
                                  .attr("height", canvasHeight);                       

      //set up x axis                            
      var xAxis = d3.svg.axis()
                  .scale(xScale)
                  .orient("bottom")
                  .ticks(10)
                  .tickSize(-maxChartHeight,0)
                 ;

      //set up y axis
      var yAxis = d3.svg.axis()
                  .scale(yScale)
                  .orient("left")
                  .tickSize(0);

              //accessing the properties of each object with the variable name through its key
              var values = function(d) {return +d.Score;};
              var names = function(d) {return d.Tag;}

              // find highest value
              var maxValue = d3.max(userData, values); 
              
              //set y domain by mapping an array of the variables along x axis
              yScale.domain(/*userData.map(names)*/techNames);
              
              //set x domain with max value and use .nice() to ensure the y axis is labelled above the max y value
              xScale.domain([0, maxValue]).nice(); 

        //set bar width with rangeBands ([x axis width], gap between bars, gap before and after bars) as a proportion of bar width  
        yScale.rangeBands([0, maxChartHeight], 0.1, 0.25);
        
        //set up rectangle elements with attributes based on data
        var rects = svgUserGraph.selectAll("rect")
                        .data(userData)
                        .enter()
                        .append("rect");

        //set up attributes of svg rectangle elements based on attributes
        var rectAttributes = rects
                              .attr("x", leftMargin)
                              .attr("y", function (d) {return yScale(d.Tag) +30; })
                              .attr("width", function (d) {return xScale(d.Score)})
                              .attr("height", yScale.rangeBand())
                              .attr("fill", "#1f77b4")
                              .on("mouseover", function(d, i) {
                                
                        
                              })
                              //transition out
                              .on("mouseout", function(d) {
                                })
                              .on("click",function(d,i){
                                tagNameSelected=techNames[i];
                                console.log(tagNameSelected);

                              });

       var yTextPadding = 20;
       
                  svgUserGraph.append("g")
                  .attr("class", "grid")
                  .attr("transform", "translate(" + leftMargin + ", " + (maxChartHeight+30) + ")")
                  .attr("text-anchor", "middle")
                  .attr("font-family", "sans-serif")
                  .attr("font-size", "10px")
                  .style("stroke", "black")
                  .style("fill", "none")
                  .style("stroke-width", 1)
                  .style("shape-rendering", "crispEdges")
                  .call(xAxis)
                  .selectAll("text")
                  .attr("stroke", "none")
                  .attr("fill", "black");
                 

        //append y axis
        svgUserGraph.append("g")
              .attr("transform", "translate(" + leftMargin + ", " + 30 + ")")
              .attr("text-anchor", "middle")
              .attr("font-family", "sans-serif")
              .attr("font-size", "10px")
              .style("stroke", "black")
              .style("fill", "none")
              .style("stroke-width", 1)
              .style("shape-rendering", "crispEdges")
              .call(yAxis)
              .selectAll("text")
                //.attr("dx", "-1.15em")
                .attr("stroke", "none")
                .attr("fill", "black")
                //.call(yScale.rangeBand()); //calls wrap function below

          //x axis title        
          svgUserGraph.append("text")
                .attr("x", canvasWidth-30)
                .attr("y", maxChartHeight+60)
                .attr("text-anchor", "middle")
                .attr("font-family", "sans-serif")
                .attr("font-size", "14px")
                .attr("font-weight", "bold")
                .attr("fill", "black")
                .text("Scores");

          //y axis title
          svgUserGraph.append("text")
                .attr("transform", "rotate(-90)")
                .attr("x", -50)
                .attr("y", leftMargin / 4)
                .attr("text-anchor", "middle")
                .attr("font-family", "sans-serif")
                .attr("font-size", "14px")
                .attr("font-weight", "bold")
                .attr("fill", "black")
                .text("Tags");

  $('#username').text("User:  " + selectedUserName);
  $('#speedTitle').text("Performance breakdown");
  $('#graphTitle').text("Performance in other Topics");

}
