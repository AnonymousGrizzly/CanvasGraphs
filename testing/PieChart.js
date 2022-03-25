let PieCanvas = document.getElementById("PieCanvas");
PieCanvas.width = 500;
PieCanvas.height = 500;

let ctx = PieCanvas.getContext("2d");

function drawLine(ctx, startX, startY, endX, endY){
    ctx.beginPath();
	ctx.moveTo(startX,startY);
	ctx.lineTo(endX,endY);
	ctx.stroke();
}

function drawPieSlice(ctx,centerX, centerY, radius, startAngle, endAngle, color ){
    ctx.fillStyle = color;
	ctx.beginPath();
	ctx.moveTo(centerX,centerY);
	ctx.arc(centerX, centerY, radius, startAngle, endAngle);
	ctx.closePath();
	ctx.fill();
}
function drawArc(ctx, centerX, centerY, radius, startAngle, endAngle){
    ctx.beginPath();
	ctx.arc(centerX, centerY, radius, startAngle, endAngle);
	ctx.stroke();
}

let Piechart = function(options){
    this.options = options;
	this.canvas = options.canvas;
	this.ctx = ctx;
	this.colors = options.colors;

	this.draw = function(){
		let total_value = 0;
		let color_index = 0;
		for (let categ in this.options.data){
			let val = this.options.data[categ];
			total_value += val;
		}
		let start_angle = 0;
		for (categ in this.options.data){
			val = this.options.data[categ];
			let slice_angle = 2 * Math.PI * val / total_value;
			drawPieSlice(
				this.ctx,                                           //ctx,
				this.canvas.width/2,                                //centerX, 
				this.canvas.height/2,                               //centerY, 
				Math.min(this.canvas.width/2,this.canvas.height/2), //radius, 
				start_angle,                                        //startAngle,
				start_angle+slice_angle,                            //endAngle, 
				this.colors[color_index%this.colors.length]         //color
			);
			start_angle += slice_angle;
			color_index++; 
		}
        drawArc(ctx, this.canvas.width/2,this.canvas.height/2,Math.min(this.canvas.width/2,this.canvas.height/2), 0, Math.PI*2);
        
        //write label
        start_angle = 0;
		for (categ in this.options.data){
			val = this.options.data[categ];
			slice_angle = 2 * Math.PI * val / total_value;
			let pieRadius = Math.min(this.canvas.width/2,this.canvas.height/2);
			let labelX = this.canvas.width/2 + (pieRadius / 2) * Math.cos(start_angle + slice_angle/2);
			let labelY = this.canvas.height/2 + (pieRadius / 2) * Math.sin(start_angle + slice_angle/2);
			let labelText = Math.round(100 * val / total_value);
            this.ctx.fillStyle = "black";
			this.ctx.font = "bold 20px Arial";
			this.ctx.fillText(labelText+"%", labelX,labelY);
			start_angle += slice_angle;
		}
	}

    if (this.options.legend){
        color_index = 0;
        var legendHTML = "";
        for (categ in this.options.data){
            legendHTML += "<div><span style='display:inline-block;width:20px;background-color:"+this.colors[color_index++]+";'>&nbsp;</span> "+categ+"</div>";
        }
        this.options.legend.innerHTML = legendHTML;
    }

    this.drawLegend= function(){
		let color_index=0;
		let legend = document.querySelector("span[for='PieCanvas']");
        let ul = document.createElement("ul");
        ul.style.display= "block";
		legend.append(ul);
		for(let categ in this.options.data){
			let li = document.createElement("li");
			li.style.listStyle = "none";
            li.style.display = "block";
			li.style.borderLeft="20px solid "+this.colors[color_index%this.colors.length];
			color_index++;
			li.style.padding = "5px";
            li.textContent = categ+" ["+this.options.data[categ]+"]";
			ul.append(li);
		}
	}
}

let TypeOfFile = {
    "txt": 10,
	"docx": 14,
	"pdf": 2,
	"javascript": 12,
    "c++" :6,
    "pptx": 1,
    "msv": 3
};
let myPiechart = new Piechart({
		canvas:PieCanvas,
		data:TypeOfFile,
		colors:["#a55ca5", "#15bfa5", "#d64b53", "#fcdc6a", "#1db954", "#e44f26", "#61afef"]
});
myPiechart.draw();
myPiechart.drawLegend();