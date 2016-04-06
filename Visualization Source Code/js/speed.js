     function plotSpeedometers(d){

    var tempFilteredData=filteredData;

    tempFilteredData.sort(function(a,b){
            var d1 = parseInt(a.Accepted);
            var d2 = parseInt(b.Accepted);
            return d2-d1;
          }
      );
      


  var accData = tempFilteredData.filter(function(d,i){ return i<100});


    tempFilteredData.sort(function(a,b){
            var d1 = parseInt(a.Answers);
            var d2 = parseInt(b.Answers);
            return d2-d1;
          }
      );
  var ansData = tempFilteredData.filter(function(d,i){ return i<100});


    tempFilteredData.sort(function(a,b){
            var d1 = parseInt(a.Votes);
            var d2 = parseInt(b.Votes);
            return d2-d1;
          }
      );

  var voteData = tempFilteredData.filter(function(d,i){ return i<100});

            
                var ans =  function(d) {return +d.Answers;};
                var acc = function(d) {return +d.Accepted;};
                var vote= function(d) {return +d.Votes;};
                var names = function(d) {return d.Tag;};

                // find highest value
              
                var maxans = d3.max(ansData,ans);
                var maxacc = d3.max(accData,acc);
                maxans=maxans+maxacc;
                var maxvote = d3.max(voteData,vote);

                var avgans = d3.mean(ansData,ans);
                var avgacc = d3.mean(accData,acc);
                avgans=(avgans+avgacc)/2;
                var avgvote = d3.mean(voteData,vote);
   
       

     if(svg1!=null){
          svg1.remove();
          svg2.remove();
          svg3.remove();
  }     

  var width=190;
  var height=190;

  svg1 = d3.select("#speedometer")
                  .append("svg:svg")
                  .attr("width", width)
                  .attr("height", height);

      svg2 = d3.select("#speedometer")
                  .append("svg:svg")
                  .attr("width", width)
                  .attr("height", height);            


      svg3 = d3.select("#speedometer")
                  .append("svg:svg")
                  .attr("width", width)
                  .attr("height", height);    
   

          var gauge1 = iopctrl.arcslider()
                  .radius(50)
                  .events(false)
                  .indicator(iopctrl.defaultGaugeIndicator);
          gauge1.axis().orient("out")
                  .normalize(true)
                  .ticks(12)
                  .tickSubdivide(1)
                  .tickSize(10, 8, 10)
                  .tickPadding(5)
                  .scale(d3.scale.linear()
                          .domain([0, maxans])
                          .range([-3*Math.PI/4, 3*Math.PI/4]));

          var gauge2 = iopctrl.arcslider()
                  .radius(50)
                  .events(false)
                  .indicator(iopctrl.defaultGaugeIndicator2);
          gauge2.axis().orient("out")
                  .normalize(true)
                  .ticks(12)
                  .tickSubdivide(1)
                  .tickSize(10, 8, 10)
                  .tickPadding(5)
                  .scale(d3.scale.linear()
                          .domain([0, maxans])
                          .range([-3*Math.PI/4, 3*Math.PI/4]));


          var gauge3 = iopctrl.arcslider()
                  .radius(50)
                  .events(false)
                  .indicator(iopctrl.defaultGaugeIndicator);
          gauge3.axis().orient("out")
                  .normalize(true)
                  .ticks(12)
                  .tickSubdivide(1)
                  .tickSize(10, 8, 10)
                  .tickPadding(5)
                  .scale(d3.scale.linear()
                          .domain([0, maxacc])
                          .range([-3*Math.PI/4, 3*Math.PI/4]));

          var gauge4 = iopctrl.arcslider()
                  .radius(50)
                  .events(false)
                  .indicator(iopctrl.defaultGaugeIndicator2);
          gauge4.axis().orient("out")
                  .normalize(true)
                  .ticks(12)
                  .tickSubdivide(1)
                  .tickSize(10, 8, 10)
                  .tickPadding(5)
                  .scale(d3.scale.linear()
                          .domain([0, maxacc])
                          .range([-3*Math.PI/4, 3*Math.PI/4]));


                  var gauge5 = iopctrl.arcslider()
                  .radius(50)
                  .events(false)
                  .indicator(iopctrl.defaultGaugeIndicator2);
          gauge5.axis().orient("out")
                  .normalize(true)
                  .ticks(12)
                  .tickSubdivide(1)
                  .tickSize(10, 8, 10)
                  .tickPadding(5)
                  .scale(d3.scale.linear()
                          .domain([0, maxvote])
                          .range([-3*Math.PI/4, 3*Math.PI/4]));

                  var gauge6 = iopctrl.arcslider()
                  .radius(50)
                  .events(false)
                  .indicator(iopctrl.defaultGaugeIndicator2);
          gauge6.axis().orient("out")
                  .normalize(true)
                  .ticks(12)
                  .tickSubdivide(1)
                  .tickSize(10, 8, 10)
                  .tickPadding(5)
                  .scale(d3.scale.linear()
                          .domain([0, maxvote])
                          .range([-3*Math.PI/4, 3*Math.PI/4]));

  height=height+130;
  width=width+10;

             svg1.append("text")
                .attr("transform", "translate("+ width/2 + " ," + height/2 + ")")
                .attr("dy", "0.35em")
                .attr("text-anchor", "middle")
                .attr("font-family", "sans-serif")
                .attr("font-size", "12px")
                .attr("fill", "black")
                .text("Total Answers");


                 svg2.append("text")
                .attr("transform", "translate("+ width/2 + " ," + height/2 + ")")
                .attr("dy", "0.35em")
                .attr("text-anchor", "middle")
                .attr("font-family", "sans-serif")
                .attr("font-size", "12px")
                .attr("fill", "black")
                .text("Accepted answers");

                svg3.append("text")
                .attr("transform", "translate("+ width/2 + " ," + height/2 + ")")
                .attr("dy", "0.35em")
                .attr("text-anchor", "middle")
                .attr("font-family", "sans-serif")
                .attr("font-size", "12px")
                .attr("fill", "black")
                .text("Votes");


          
          var segDisplay1 = iopctrl.segdisplay()
                  .width(50)
                  .digitCount(4)
                  .negative(false)
                  .decimals(0);

          svg1.append("g")
                  .attr("class", "segdisplay")
                  .attr("transform", "translate(70, 130)")
                  .call(segDisplay1);

          svg1.append("g")
                  .attr("class", "gauge1")
                  .call(gauge1);

                  

          segDisplay1.value(parseInt(d.Answers)+parseInt(d.Accepted));
          gauge1.value(parseInt(d.Answers)+parseInt(d.Accepted));

          svg1.append("g")
                  .attr("class", "gauge2")
                  .call(gauge2);

            gauge2.value(avgans);

              
          var segDisplay3 = iopctrl.segdisplay()
                  .width(50)
                  .digitCount(4)
                  .negative(false)
                  .decimals(0);

          svg2.append("g")
                  .attr("class", "segdisplay")
                  .attr("transform", "translate(70, 130)")
                  .call(segDisplay3);

          svg2.append("g")
                  .attr("class", "gauge1")
                  .call(gauge3);

          segDisplay3.value(d.Accepted);
          gauge3.value(d.Accepted);

      
          

          


          svg2.append("g")
                  .attr("class", "gauge2")
                  .call(gauge4);

          
          gauge4.value(avgacc);




          var segDisplay5 = iopctrl.segdisplay()
                  .width(50)
                  .digitCount(4)
                  .negative(false)
                  .decimals(0);



          svg3.append("g")
                  .attr("class", "segdisplay")
                  .attr("transform", "translate(70, 130)")
                  .call(segDisplay5);

          svg3.append("g")
                  .attr("class", "gauge1")
                  .call(gauge5);

        
          gauge5.value(d.Votes);
          segDisplay5.value(d.Votes);

          svg3.append("g")
                  .attr("class", "gauge2")
                  .call(gauge6);
          gauge6.value(avgvote);

         svg3.append("rect")
        .attr("transform", "translate(0," + 173 + ")")
        .attr("x", 2)
        .attr("width", 15)
        .attr("height", 15)
        .style("fill", "#ffd677")
        .style("stroke","black");

        svg3.append("text")
        .attr("transform", "translate(17," + 188 + ")")
        .attr("x", 2)
        .attr("width", 15)
        .attr("height", 15)
        .style("font-size","10px")
        .text("Top 100 Average");

         svg3.append("rect")
        .attr("transform", "translate(110," + 173 + ")")
        .attr("x", 0)
        .attr("width", 15)
        .attr("height", 15)
        .style("fill", "#ff5773")
        .style("stroke","black");

        svg3.append("text")
        .attr("transform", "translate(127," + 188 + ")")
        .attr("x", 0)
        .attr("width", 15)
        .attr("height", 15)
        .style("font-size","10px")
        .text("User score");

  }

