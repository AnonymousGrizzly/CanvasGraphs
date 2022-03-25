let BarCanvas = document.getElementById("BarCanvas");
BarCanvas.width = 700;
BarCanvas.height = 500;
  
let bar_ctx = BarCanvas.getContext("2d");

function drawLine(bar_ctx, startX, startY, endX, endY,color){
    bar_ctx.save();
    bar_ctx.strokeStyle = color;
    bar_ctx.beginPath();
    bar_ctx.moveTo(startX,startY);
    bar_ctx.lineTo(endX,endY);
    bar_ctx.stroke();
    bar_ctx.restore();
}

function drawBar(bar_ctx, upperLeftCornerX, upperLeftCornerY, width, height,color){
    bar_ctx.save();
    bar_ctx.fillStyle=color;
    bar_ctx.fillRect(upperLeftCornerX,upperLeftCornerY,width,height);
    bar_ctx.restore();
}


let Barchart = function(options){
    this.options = options;
    this.canvas = options.canvas;
    this.bar_ctx = this.canvas.getContext("2d");
    this.colors = options.colors;
 
    this.draw = function(){
        let maxValue = 0;
        for (var categ in this.options.bar_data){
            maxValue = Math.max(maxValue,this.options.bar_data[categ]);
        }
        let canvasActualHeight = this.canvas.height - this.options.padding * 2;
        let canvasActualWidth = this.canvas.width - this.options.padding * 2;

        //drawing the grid lines
        let gridValue = 0;
        while (gridValue <= maxValue){
            let gridY = canvasActualHeight * (1 - gridValue/maxValue) + this.options.padding;
            drawLine(
                this.bar_ctx,             //bar_ctx
                10,                       //startX, 
                gridY,                    //startY, 
                this.canvas.width-10,     //endX, 
                gridY,                    //endY,
                this.options.gridColor    //color
            );
            
            //writing grid markers
            this.bar_ctx.save();
            this.bar_ctx.fillStyle = this.options.gridColor;
            this.bar_ctx.textBaseline="bottom"; 
            this.bar_ctx.font = "bold 10px Arial";
            this.bar_ctx.fillText(gridValue, 10,gridY - 2);
            this.bar_ctx.restore();
            gridValue+=this.options.gridScale;
        }      
 
        //drawing the bars
        let barIndex = 0;
        let numberOfBars = Object.keys(this.options.bar_data).length;
        let barSize = (canvasActualWidth)/numberOfBars;

        for (categ in this.options.bar_data){
            let val = this.options.bar_data[categ];
            let barHeight = Math.round( canvasActualHeight * val/maxValue);
            drawBar(
                this.bar_ctx,                                           //bar_ctx, 
                this.options.padding + barIndex * barSize,              //upperLeftCornerX, 
                this.canvas.height - barHeight - this.options.padding,  //upperLeftCornerY, 
                barSize-10,                                                //width, 
                barHeight,                                              //height,
                this.colors[barIndex%this.colors.length]                //color
            );
            barIndex++;
        }
      
        //drawing graph name
        this.bar_ctx.save();
        this.bar_ctx.textBaseline="bottom";
        this.bar_ctx.textAlign="center";
        this.bar_ctx.fillStyle = "#000000";
        this.bar_ctx.font = "bold 14px Arial";
        this.bar_ctx.fillText(this.options.seriesName, this.canvas.width/2,this.canvas.height);
        this.bar_ctx.restore();  
    }
    //draw legend for  bars
    this.drawLegend = function(){
        barIndex = 0;
        let legend = document.querySelector("span[for='BarCanvas']");
        let ul = document.createElement("ul");
        ul.style.display= "block";
        legend.append(ul);
        for (categ in this.options.bar_data){
            let li = document.createElement("li");
            li.style.listStyle = "none";
            li.style.display = "block";
            li.style.borderLeft = "20px solid "+this.colors[barIndex%this.colors.length];
            li.style.padding = "5px";
            li.textContent = categ;
            ul.append(li);
            barIndex++;
        }
    }
}
function redraw(name){
    bar_ctx.clearRect(0,0, BarCanvas.width, BarCanvas.height);
    if(name==="AoTBargraph"){
        AoTBarchart.draw();
    }else if(name==="Data2Barchart"){
        Data2Barchart.draw();
    }
}
