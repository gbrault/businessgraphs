/* ===   functions  === */
function getTimestamp() {
    var dateNow = new Date();
    var dateMM = dateNow.getMonth() + 1;
    dateDD = dateNow.getDate();
    dateYY = dateNow.getFullYear(), h = dateNow.getHours();
    m = dateNow.getMinutes();
    return dateNow.getFullYear() + '' + (dateMM <= 9 ? '0' + dateMM : dateMM) + '' + (dateDD <= 9 ? '0' + dateDD : dateDD) + (h <= 9 ? '0' + h : h) + (m <= 9 ? '0' + m : m);
}

function SVGGenJS(outputFrame) {
	this.outputFrame = outputFrame;
	this.dpi={};
	getDpi(this.dpi);
    this.inch = 2.54;
    this.lwidth = 27.517;
    this.lheight = 19.05;
    this.layout = {
        name: 'A4',
        width: (this.lwidth / this.inch),
        height: (this.lheight / this.inch)
    };
    this.slides = [];
	this.htmlbegin = "<!DOCTYPE html>" +
        "<html>"+
		"<header>"+
		"<style>"+
		"body {font-size:11px}"+
		"</style>";
    this.htmlend = "</html>";
    this.setLayout = function(o) {
        this.layout.name = o.name;
        this.layout.width =  o.width*this.dpi.x/this.inch;
        this.layout.height =  o.height*this.dpi.y/this.inch;
    };
    this.addNewSlide = function() {
		var oslide = new Slide(this);
		this.slides.push(oslide);
		return oslide;
    };
    this.shapes = {
        RECTANGLE: 0,
		CIRCLE:1,
		SECTOR:2,
		TEXT:3,
		LINE:4,
		SECTOR:5
    };
    this.save = function(filename) {
        var temp ="";
        for (var i = 0; i < this.slides.length; i++) {
            temp += this.slides[i].save();
            temp += "<br>\n";
        }
		this.outputFrame.innerHTML = temp;
		this.outputFrame.height = window.innerHeight;
		this.outputFrame.width = window.innerWidth;	
    };
	this.save1 = function(filename) {
        var temp = this.htmlbegin + "\n";
        for (var i = 0; i < this.slides.length; i++) {
            temp += this.slides[i].save();
            temp += "<br>\n";
        }
        temp += this.htmlend + "\n";
		// image/svg+xml?
		this.outputFrame.src = "data:text/html;charset=utf-8," + temp;  // escape?
		this.outputFrame.height = window.innerHeight;
		this.outputFrame.width = window.innerWidth;	
		/*
        var blob = new Blob([temp], {type: "text/plain;charset=utf-8"});
		var d = new Date();
		var n = d.toString();	
		saveAs(blob, "htmlsvg_"+n+".html");
		*/
    };
	this.xs = function (m){
		return (m * this.dpi.x) / this.inch;
	};
	this.ys = function (m){
		return (m * this.dpi.y) / this.inch;
	};
	
}


function Slide(presentation) {
    this.presentation = presentation;
    this.svgbegin = "<svg id=\"slide_"+
					presentation.slides.length+
					"\"width=" + presentation.layout.width + 
					" height=" + presentation.layout.height + ">"+
					'<style>*{font-size:8pt;}</style>';
    this.svgend = "</svg>";
    this.svgContent = [];
    this.addText = function(sText, oShaphe) { // combinanison of text and shape
        this.svgContent.push("<g>");
		 // <text x="20" y="30" fill="#aa0000" font-size="20" textLength="0" font-family="'Leckerli One', cursive">Slide 1</text>
		 //<text x="50%" y="50%" alignment-baseline="middle" text-anchor="middle">TEXT</text>
        switch (oShaphe.shape) {
            case 0: // RECTANGLE
				{
					var txt="";
					if(sText.length!=0){
						txt = '<foreignobject class="node" x="' + presentation.xs(oShaphe.x) +
						'" y="' + presentation.ys(oShaphe.y) +
						'" width="' + presentation.xs(oShaphe.w) +
						'" height="' + presentation.ys(oShaphe.h)+
						'" >'+						
						'<div xmlns="http://www.w3.org/1999/xhtml" style="text-align: center;display: flex;justify-content: center;align-items: center;height: inherit;">'+sText+'</div>'+						
						'</foreignobject>';						
					}
					this.svgContent.push('<rect x="' + presentation.xs(oShaphe.x) +
						'" y="' + presentation.ys(oShaphe.y) +
						'" width="' + presentation.xs(oShaphe.w) +
						'" height="' + presentation.ys(oShaphe.h) +
						'" style="fill:#' + oShaphe.fill + ';stroke:#' + oShaphe.color + '"' +
						'></rect>'+txt);
				}					
                break;
            case 1: // CIRCLE
				{
					var txt="";
					if(sText.length!=0){
						txt = '<foreignobject class="node" x="' + presentation.xs(oShaphe.x) +
						'" y="' + presentation.ys(oShaphe.y) +
						'" width="' + presentation.xs(oShaphe.r) +
						'" height="' + presentation.ys(oShaphe.r)+
						'">'+					
						'<div xmlns="http://www.w3.org/1999/xhtml" style="text-align: center;display: flex;justify-content: center;align-items: center;height: inherit;">'+sText+'</div>'+
						'</foreignobject>';
					}
					this.svgContent.push('<circle cx="' + presentation.xs(oShaphe.x) +
						'" cy="' + presentation.ys(oShaphe.y) +
						'" r="' + presentation.xs(oShaphe.r) +
						'" style="fill:#' + oShaphe.fill + ';stroke:#' + oShaphe.color + '"' +
						'></circle>'+txt);
				}
                break;
			case 3: // TEXT
				txt = '<foreignobject class="node" x="' + presentation.xs(oShaphe.x) +
						'" y="' + presentation.ys(oShaphe.y) +
						'" width="' + presentation.xs(oShaphe.w) +
						'" height="' + presentation.ys(oShaphe.h)+
						'">'+						
						'<div xmlns="http://www.w3.org/1999/xhtml" style="text-align: left;display: flex;height: inherit;">'+sText+'</div>'+						
						'</foreignobject>';
				this.svgContent.push(txt);
				break;
            case 4: // LINE
				{
					var txt="";
					if(sText.length!=0){
						txt = '<foreignobject class="node" x="' + presentation.xs(oShaphe.x) +
						'" y="' + presentation.ys(oShaphe.y) +   
						'" width="' + presentation.xs(oShaphe.r) +
						'" height="' + presentation.ys(oShaphe.r)+
						'>'+
						'<div xmlns="http://www.w3.org/1999/xhtml" style="text-align: center;display: flex;justify-content: center;align-items: center;height: inherit;">'+sText+'</div>'+						
						'</foreignobject>';
					}
					this.svgContent.push('<line x1="' + presentation.xs(oShaphe.x1) +
						'" y1="' + presentation.ys(oShaphe.y1) +
						'" x2="' + presentation.xs(oShaphe.x2) +
						'" y2="' + presentation.ys(oShaphe.y2) +
						'" style="width:#' + oShaphe.width + ';stroke:#' + oShaphe.color + '"' +
						'></circle>'+txt);
				}
                break;
			case 5: // SECTOR
				{
					var oPath = angularSectorString(presentation.xs(oShaphe.x),  // startX, startY, startAngle, endAngle, radius
											presentation.ys(oShaphe.y),
											oShaphe.a0,
											oShaphe.a1,
											presentation.xs(oShaphe.r));
					this.svgContent.push(	'<path d="' + oPath +'" '+   
											' style="fill:#' + oShaphe.fill + ';stroke:#' + oShaphe.color + '"' +
											'/>'
										);					
				}
			    break;
		}
	    /*
		this.svgContent.push(	'<text x="'+(oShaphe.x*presentation.dpi.x+(oShaphe.w*presentation.dpi.x)/2
                                -getTextLength(sText,oShaphe.font_size)/2)+
				'" y="'+(oShaphe.y*presentation.dpi.y+(oShaphe.h*presentation.dpi.y)/2)+
                                '" font-size="'+oShaphe.font_size+
                                '">'+sText+
								'</text>');
	   */
        this.svgContent.push("</g>");
    };
	this.save = function() {
        var temp = this.svgbegin + "\n";
        for (var i = 0; i < this.svgContent.length; i++) {
            temp += this.svgContent[i] + "\n";
        }
        temp += this.svgend + "\n";
		return temp;
    };
	this.addTable = function(rows,tabOpts){
		if(rows.length==0) return;
		this.svgContent.push('<foreignObject x="'+tabOpts.x*presentation.dpi.x+'" y="'+tabOpts.y*presentation.dpi.y+'" width="'+tabOpts.w*presentation.dpi.x+'">');
		/*if((rows.length==1)&&(rows[0].length==1)){
			// just text
			if(rows[0][0].text!==undefined){
				this.svgContent.push('<p>'+rows[0][0].text+'</p>');
			} else {
				this.svgContent.push('<p>'+rows[0][0]+'</p>');
			}
		} else { */
			// this is a true table
			if (tabOpts.font_size==undefined){
				this.svgContent.push('<table>');
			} else{
				this.svgContent.push('<table style="font-size:'+tabOpts.font_size+'px">');
			}
			
			for(var i=0; i<rows.length;i++){
				this.svgContent.push('<tr>');
					if(Array.isArray(rows[i])){
						for(var j=0; j< rows[i].length; j++){
							if(rows[i][j].text!==undefined){
								this.svgContent.push('<td>'+rows[i][j].text+'</td>');
							} else {
								this.svgContent.push('<td>'+rows[i][j]+'</td>');
							}									
						}						
					} else {
						if(rows[i].text!==undefined){
							this.svgContent.push('<td>'+rows[i].text+'</td>');
						} else {
							this.svgContent.push('<td>'+rows[i]+'</td>');
						}					
					}
				this.svgContent.push('</tr>');
			}
			this.svgContent.push('</table>');
		/* } */
		this.svgContent.push("</foreignObject>");
	};
}
function getDpi(oDpi){
	var dpi = document.getElementById('dpi');
	if(dpi==null){
		var div = document.createElement("div");
		div.innerHTML='<div id="dpi" style="height: 1in;left: -100%;position: absolute;top: -100%;width: 1in;"></div>';
		document.body.appendChild(div);
		dpi = document.getElementById('dpi');
	}
	oDpi.y = dpi.offsetHeight;
	oDpi.x = dpi.offsetWidth;
}
function getTextLength(sText,fs){
	var svgtext = document.getElementById('svgtext');
	if(svgtext==null){
		var div = document.createElement("div");
		div.innerHTML='<svg id="mySvg" x="-1000" y="-1000"><text id="svgtext" x=100 y=100>Testing</text></svg>';
		document.body.appendChild(div);
		svgtext = document.getElementById('svgtext');
	}
	svgtext.textContent=sText;
	svgtext.setAttribute('font-size',fs);
	return svgtext.getComputedTextLength();
}

var angularSectorString = function(startX, startY, startAngle, endAngle, radius){
	return annularSector(startX,startY,startAngle, endAngle,0,radius);
}
function deg2rad(deg) {
	return deg * Math.PI / 180;
}

function annularSector(centerX, centerY, startAngle, endAngle, innerRadius, outerRadius) {
	startAngle = deg2rad(startAngle + 180);
	endAngle = deg2rad(endAngle + 180);
	
	var p = [
			[centerX + innerRadius * Math.cos(startAngle),	centerY + innerRadius * Math.sin(startAngle)]
		, [centerX + outerRadius * Math.cos(startAngle),	centerY + outerRadius * Math.sin(startAngle)]
		, [centerX + outerRadius * Math.cos(endAngle),		centerY + outerRadius * Math.sin(endAngle)]
		, [centerX + innerRadius * Math.cos(endAngle),		centerY + innerRadius * Math.sin(endAngle)]
		];
	
	var angleDiff = endAngle - startAngle
		, largeArc = (angleDiff % (Math.PI * 2)) > Math.PI ? 1 : 0;
	
	var commands = [];
	
	commands.push("M" + p[0].join());
	commands.push("L" + p[1].join());
	commands.push("A" + [outerRadius, outerRadius].join() + " 0 " + largeArc + " 1 " + p[2].join());
	commands.push("L" + p[3].join());
	commands.push("A" + [innerRadius, innerRadius].join() + " 0 " + largeArc + " 0 " + p[0].join());
	commands.push("z");
	
	return commands.join(" ");
}
function saveSvg(svgEl, name) {
    svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    var svgData = svgEl.outerHTML;
    var preface = '<?xml version="1.0" standalone="no"?>\r\n';
    var svgBlob = new Blob([preface, svgData], {type:"image/svg+xml;charset=utf-8"});
    var svgUrl = URL.createObjectURL(svgBlob);
    var downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = name;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}
