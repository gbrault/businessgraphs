/* marimekko svg generator from json file*/
/* all units in cm */

function svgMarimekko(marimekko,outputFrame){
	var inch = 2.54;
if (marimekko.graphtype == "marimekko") {
    var scalex = marimekko.scalex;
    var scaley = marimekko.scaley;
    var offsetx = marimekko.offsetx;
    var lwidth = marimekko.lwidth;
    var lheight = marimekko.lheight;
    var color_box_line = marimekko.color_box_line;
    var color_header_fill = marimekko.color_header_fill;
    var color_header_text = marimekko.color_header_text;
    var color_columns_text = marimekko.color_columns_text;
    var colors = marimekko.Colors;
    var displayTitleRows = marimekko.displayTitleRows;
    var displayTitleCols = marimekko.displayTitleCols;
    var pptx = new SVGGenJS(outputFrame);
    pptx.setLayout({
        name: 'A4',
        width: (lwidth / inch),
        height: (lheight / inch)
    });
    var optsTitle = {
        color: '9F9F9F',
        marginPt: 3,
        border: [0, 0, {
            pt: '1',
            color: 'CFCFCF'
        }, 0]
    };
    var slide = pptx.addNewSlide();
    var stemp = marimekko.title.replace(/{{ratio_thresold}}/, marimekko.ratio_threshold);
    var ratio = 1;
    switch (marimekko.display) {
        case "Bn":
            switch (marimekko.internal) {
                case "Bn":
                    ratio = 1;
                    break;
                case "Mn":
                    ratio = 1000;
                    break;
                case "Kn":
                    ratio = 1000000;
                    break;
                case "Un":
                    ratio = 1000000000;
                    break;
            }
            break;
		case "Mn":
            switch (marimekko.internal) {
                case "Bn":
                    ratio = 0.001;
                    break;
                case "Mn":
                    ratio = 1;
                    break;
                case "Kn":
                    ratio = 1000;
                    break;
                case "Un":
                    ratio = 1000000;
                    break;
            }
            break;
		case "Kn":
            switch (marimekko.internal) {
                case "Bn":
                    ratio = 0.000001;
                    break;
                case "Mn":
                    ratio = 0.001;
                    break;
                case "Kn":
                    ratio = 1;
                    break;
                case "Un":
                    ratio = 1000;
                    break;
            }
            break;
    }
    stemp = stemp.replace(/{{size}}/, Math.round((marimekko.size / ratio) * 100) / 100);
    stemp = stemp.replace(/{{currency}}/, marimekko.currency);
    stemp = stemp.replace(/{{display}}/, marimekko.display);
    slide.addTable([
        [{
            text: stemp,
            options: optsTitle
        }]
    ], {
        x: (1 / inch),
        y: (1 / inch),
        w: (20 / inch)
    });

    for (var rows = 0; rows < marimekko.rows.length; rows++) {
        var fs = 12,
            title, wcm, hcm;
        wcm = marimekko.rows[rows].box.Width / scalex;
        hcm = marimekko.rows[rows].box.Height / scaley;
        if ((hcm < 0.3) || (wcm < 0.5)) {
            fs = 4;
        } else if ((hcm < 0.5) || (wcm < 1)) {
            fs = 6;
        } else if ((hcm < 1) || (wcm < 1.5)) {
            fs = 8;
        } else if ((hcm < 1.5) || (wcm < 2)) {
            fs = 10;
        }
        title = displayTitleRows[marimekko.rows[rows].title];
        if (title == undefined) {
            title = marimekko.rows[rows].title;
        }
        if (wcm < 2.5) {
            title = marimekko.shortTitleRows[marimekko.rows[rows].title];
            if (title == undefined) {
                title = displayTitleRows[marimekko.rows[rows].title];
                if (title == undefined) {
                    title = marimekko.rows[rows].title;
                }
                title = title.substr(0, 3);
            }
        }
        title += " " + Math.round((marimekko.rows[rows].size / ratio) * 10) / 10;
        slide.addText(title, {
            shape: pptx.shapes.RECTANGLE,
            x: marimekko.rows[rows].box.Left / scalex / inch,
            y: marimekko.rows[rows].box.Top / scaley / inch,
            w: wcm / inch,
            h: hcm / inch,
            fill: color_header_fill,
            line: color_box_line,
            color: color_header_text,
            align: 'c',
            margin: 0,
            font_size: fs
        });
        for (var cols = 0; cols < marimekko.rows[rows].cols.length; cols++) {
            var fs = 12,
                title, wcm, hcm;
            wcm = marimekko.rows[rows].cols[cols].box.Width / scalex;
            hcm = marimekko.rows[rows].cols[cols].box.Height / scaley;
            if ((hcm < 0.3) || (wcm < 0.5)) {
                fs = 4;
            } else
            if ((hcm < 0.5) || (wcm < 1)) {
                fs = 6;
            } else if ((hcm < 1) || (wcm < 1.5)) {
                fs = 8;
            } else if ((hcm < 1.5) || (wcm < 2)) {
                fs = 10;
            }
            title = marimekko.rows[rows].cols[cols].title;
			if((displayTitleCols!==undefined)&&(displayTitleCols[title]!==undefined))
				title=displayTitleCols[title];
            if (wcm < 2.5) {
				title = marimekko.rows[rows].cols[cols].title;
                title = marimekko.shortTitleCols[title];
                if (title == undefined) {
                    title = marimekko.rows[rows].cols[cols].title.substr(0, 3);
                }
            }
            title += " " + Math.round(marimekko.rows[rows].cols[cols].size) + "%";
            var color = colors[marimekko.rows[rows].cols[cols].title];
            if (color == undefined) {
                color = 'FFFFFF';
            }
            slide.addText(title, {
                shape: pptx.shapes.RECTANGLE,
                x: ((marimekko.rows[rows].cols[cols].box.Left / scalex) - offsetx) / inch,
                y: marimekko.rows[rows].cols[cols].box.Top / scaley / inch,
                w: wcm / inch,
                h: hcm / inch,
                fill: color,
                line: color_box_line,
                color: color_columns_text,
                margin: 0,
                align: 'c',
                font_size: fs
            });
        }
    }
    /* add table for short name correspondance */
    var slide2 = pptx.addNewSlide();
    slide2.addTable([
        [{
            text: "Short Name Correspondence",
            options: optsTitle
        }]
    ], {
        x: (1 / inch),
        y: (1 / inch),
        w: (20 / inch)
    });
    var keys = Object.keys(marimekko.shortTitleCols);
    var rows = [];
    var k = 0;
    for (var i = 0; i < keys.length; i++) {
        rows.push([keys[i], marimekko.shortTitleCols[keys[i]]]);
        if ((rows.length != 0) && (rows.length % 25 == 0)) {
            var tabOpts = {
                x: 2 / inch,
                y: 2.75 / inch,
                w: 5.0 / inch,
                fill: 'F7F7F7',
                font_size: 8,
                color: '6f9fc9',
                rowH: 0.5 / inch,
                valign: 'm'
            };
            tabOpts.x += ((tabOpts.w + 0.5 / inch) * k);
            k++;
            slide2.addTable(rows, tabOpts);
            rows = [];
        }
    }
    if (rows.length != 0) {
        var tabOpts = {
            x: 2 / inch,
            y: 2.75 / inch,
            w: 5.0 / inch,
            fill: 'F7F7F7',
            font_size: 8,
            color: '6f9fc9',
            rowH: 0.5 / inch,
            valign: 'm'
        };
        tabOpts.x += ((tabOpts.w + 0.5 / inch) * k);
        slide2.addTable(rows, tabOpts);
    }
    pptx.save('Marimekko' + '_' + getTimestamp());
}
}

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
        this.layout.width = this.lwidth = o.width*this.dpi.x;
        this.layout.height = this.lheight = o.height*this.dpi.y;
    };
    this.addNewSlide = function() {
		var oslide = new Slide(this);
		this.slides.push(oslide);
		return oslide;
    };
    this.shapes = {
        RECTANGLE: 0
    };
    this.save = function(filename) {
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
}

function Slide(presentation) {
    this.presentation = presentation;
    this.svgbegin = "<svg width=" + presentation.lwidth + " height=" + presentation.lheight + ">";
    this.svgend = "</svg>";
    this.svgContent = [];
    this.addText = function(sText, oShaphe) { // combinanison of text and shape
        this.svgContent.push("<g>");
		 // <text x="20" y="30" fill="#aa0000" font-size="20" textLength="0" font-family="'Leckerli One', cursive">Slide 1</text>
		 //<text x="50%" y="50%" alignment-baseline="middle" text-anchor="middle">TEXT</text>
        switch (oShaphe.shape) {
            case 0: // RECTANGLE
                this.svgContent.push('<rect x="' + oShaphe.x*presentation.dpi.x +
                    '" y="' + oShaphe.y*presentation.dpi.y +
                    '" width="' + oShaphe.w*presentation.dpi.x +
                    '" height="' + oShaphe.h*presentation.dpi.y +
                    '" style="fill:#' + oShaphe.fill + ';stroke:#' + oShaphe.color + '"' +
                    '></rect>'+
                    '<foreignobject class="node" x="' + oShaphe.x*presentation.dpi.x +
                    '" y="' + oShaphe.y*presentation.dpi.y +
                    '" width="' + oShaphe.w*presentation.dpi.x +
                    '" height="' + oShaphe.h*presentation.dpi.y+
	            '>'+
		    '<div>'+sText+'</div>'
		    '</foreignobject>');
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
