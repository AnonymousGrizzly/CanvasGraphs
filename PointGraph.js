let PointCanvas = document.getElementById("PointCanvas");
PointCanvas.width = 700;
PointCanvas.height = 500;
let point_ctx=PointCanvas.getContext("2d");


function drawLine(point_ctx, startX, startY, endX, endY,color, width){
    point_ctx.save();
    point_ctx.strokeStyle = color;
    point_ctx.lineWidth = width;
    point_ctx.beginPath();
    point_ctx.moveTo(startX,startY);
    point_ctx.lineTo(endX,endY);
    point_ctx.stroke();
    point_ctx.restore();
}

function drawArc(ctx, centerX, centerY, radius, startAngle, endAngle, color){
    point_ctx.beginPath();
	point_ctx.arc(centerX, centerY, radius, startAngle, endAngle);
	point_ctx.stroke();
    point_ctx.fillStyle = color;
    point_ctx.fill();
}

let PointChart = function(options){
    this.options = options;
    this.canvas = options.canvas;
    this.point_ctx = this.canvas.getContext("2d");
    this.color = options.color;
    this.draw = function(){
        let maxValue = 0;
        for (let i=0;i<this.options.points_data.length; i++){
            maxValue = Math.max(maxValue,this.options.points_data[i]);
        }
        let canvasActualHeight = this.canvas.height - this.options.padding * 2;
        let canvasActualWidth = this.canvas.width - this.options.padding * 2;
        let gridValue = 0;
        let gridY;
        while(gridValue <= maxValue){
            gridY = canvasActualHeight * (1 - gridValue/maxValue) + this.options.padding;
            drawLine(
                this.point_ctx,           //point_ctx
                10,                       //startX, 
                gridY,                    //startY, 
                this.canvas.width-10,     //endX, 
                gridY,                    //endY,
                this.options.gridColor,   //color
                1                         //width
            );
            this.point_ctx.save();
            this.point_ctx.fillStyle = this.options.gridColor;
            this.point_ctx.textBaseline="bottom"; 
            this.point_ctx.font = "bold 10px Arial";
            this.point_ctx.fillText(gridValue, 10,gridY - 2);
            this.point_ctx.restore();
            gridValue+=this.options.gridScale;
        }
        let numx=0;
        if((this.options.points_data).length<=20){
            for(categ in this.options.points_data){
                let gridX = ((canvasActualWidth+this.options.padding)/(this.options.points_data.length) * numx )+ this.options.padding;
                let dotVal= canvasActualHeight+this.options.padding- Math.round( canvasActualHeight * (this.options.points_data[categ]/maxValue) );
                drawLine(
                    this.point_ctx,
                    gridX,
                    10,
                    gridX,
                    canvasActualHeight+this.options.padding,
                    this.options.gridColor,    //color
                    1
                );
                this.point_ctx.save();
                this.point_ctx.fillStyle = this.options.gridColor;
                this.point_ctx.textBaseline="bottom"; 
                this.point_ctx.font = "bold 14px Arial";
                this.point_ctx.fillText(numx, gridX-4, canvasActualHeight+this.options.padding+25)
                this.point_ctx.restore();
                numx++;
                drawArc(this.point_ctx, gridX, dotVal, 6, 0, Math.PI * 2, this.options.color);
            }
        }
        for(let i=1; i<this.options.points_data.length; i++){
            let dotY1=canvasActualHeight+this.options.padding- Math.round( canvasActualHeight * (this.options.points_data[i-1]/maxValue) );
            let dotY2=canvasActualHeight+this.options.padding- Math.round( canvasActualHeight * (this.options.points_data[i]/maxValue) );
            let dotX2 = ((canvasActualWidth+this.options.padding)/(this.options.points_data.length) * i )+ this.options.padding;
            let dotX1 = ((canvasActualWidth+this.options.padding)/(this.options.points_data.length) * (i-1) )+ this.options.padding;
            drawLine(
                this.point_ctx,
                dotX1,
                dotY1,
                dotX2, 
                dotY2,
                this.options.color,
                3
            );
        }
    }
    this.draw
}
let data4=[];
for(let i=0; i<100; i++){
    data4[i]=Math.floor(Math.random()*100);
}
