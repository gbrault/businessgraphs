/* punchcard svg generator from json file*/
/* all units in cm */

function svgPunchCard(punchcard,outputFrame){
	var inch = 2.54;
if (punchcard.graphtype == "punchcard") {
    var scalex = punchcard.scalex;
    var scaley = punchcard.scaley;
    var offsetx = punchcard.offsetx;
    var lwidth = punchcard.lwidth;
    var lheight = punchcard.lheight;
    var color_box_line = punchcard.color_box_line;
    var color_header_fill = punchcard.color_header_fill;
    var color_header_text = punchcard.color_header_text;
    var color_columns_text = punchcard.color_columns_text;
    var colors = punchcard.Colors;
    var displayTitleRows = punchcard.displayTitleRows;
    var displayTitleCols = punchcard.displayTitleCols;
    var pptx = new SVGGenJS(outputFrame);
    pptx.setLayout({
        name: 'A4',
		width: 27.517,
		height: 19.05
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
    var stemp = punchcard.title.replace(/{{ratio_thresold}}/, punchcard.ratio_threshold);
    var ratio = 1;
    switch (punchcard.display) {
        case "Bn":
            switch (punchcard.internal) {
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
            switch (punchcard.internal) {
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
            switch (punchcard.internal) {
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
    stemp = stemp.replace(/{{size}}/, Math.round((punchcard.size / ratio) * 100) / 100);
    stemp = stemp.replace(/{{currency}}/, punchcard.currency);
    stemp = stemp.replace(/{{display}}/, punchcard.display);
     /*
    slide.addTable([
        [{
            text: stemp,
            options: optsTitle
        }]
    ], {
        x: 1,
        y: 1,
        w: 20
    });
    */
	
	var sx = 27.517;
	var sy = 19.05;
    slide.addText(stemp,
    			    {
						shape:pptx.shapes.TEXT,
    			    	x:0,  // cm
    			    	y:0,  // cm
						w:20, // cm
						h:1   // cm
    			    }
    			 );
    
	var c = contentFirstCol(punchcard);
	var r = contentFirstRow(punchcard);
	var cols = contentColCount(c);
	var rows = contentRowCount(r);
	var companies = contentRowCountLast(r);
	var xtop=2;
	var ytop=2.5;

	var sxb = sx - xtop;
	var syb = sy - ytop;
	var lCol = 1;
	var maxRadius=0;
	for(var cRow=0; cRow<rows; cRow++){
		if(r.p[r.q.length-1][r.q[r.q.length-1]]=="total"){
			for(var cCol=0; cCol<cols; cCol++){
				if(lCol==1){
					slide.addText("",{	shape:pptx.shapes.LINE,
										x1: (((cCol *sxb)/cols) + ((sxb/cols)/2) + xtop),
										y1: ytop*0.8,
										x2: (((cCol *sxb)/cols) + ((sxb/cols)/2) + xtop),
										y2: (syb+ytop) * 0.8,
										width:1,
										color:color_header_text
									 }
								);
				}
				var ptr = contentPointer(punchcard,r,c);
				if(ptr!=undefined){	
					if(maxRadius<radius(ptr.value,punchcard)){
						maxRadius=radius(ptr.value,punchcard);
					}
				}
				contentNextCol(c);
			}
		    lCol = 0;	
		}
		contentNextRow(r);
	}
	
	lCol = 1;
	c = contentFirstCol(punchcard);
	r = contentFirstRow(punchcard);
	
	for(var cRow=0; cRow<rows; cRow++){
		if(r.p[r.q.length-1][r.q[r.q.length-1]]=="total"){
			for(var cCol=0; cCol<cols; cCol++){
				if(lCol==1){
					slide.addText(contentColName(c),{ shape:pptx.shapes.RECTANGLE,
											  x:((cCol *sxb)/cols)+ xtop,
											  y:0.5,
											  w:(sxb/cols),
											  h:(ytop)*0.6,
											  fill: color_header_fill,
											  color: color_header_text
											}
								 );					
				}
				var ptr = contentPointer(punchcard,r,c);
				if(ptr!=undefined){				
						slide.addText("",
							{	
								shape:pptx.shapes.CIRCLE,
								x:  (((cCol *sxb)/cols) + ((sxb/cols)/2) + xtop),  // cm
								y:  (((cRow *syb)/rows) + ((syb/rows)/2) + ytop)*0.8,	 // cm
								r:  ((Math.sqrt(radius(ptr.value,punchcard)/maxRadius))*(sx/cols)/4),  // cm
								fill: color_header_fill,
								color: color_header_text
							}
						);
				}
				contentNextCol(c);
			}
			lCol = 0;		
		slide.addText(contentRowName(r),{ shape:pptx.shapes.RECTANGLE,
											  x:0,
											  y:(((cRow *syb)/rows) + ytop*0.8)*0.8,
											  w: xtop,
											  h:(syb/rows)*2,
											  fill: color_header_fill,
											  color: color_header_text
											}
								 );
        }								 
		contentNextRow(r);
	}
	
	/*
    for (var rows = 0; rows < punchcard.rows.length; rows++) {
        var fs = 12,
            title, wcm, hcm;
        wcm = punchcard.rows[rows].box.Width / scalex;
        hcm = punchcard.rows[rows].box.Height / scaley;
        if ((hcm < 0.3) || (wcm < 0.5)) {
            fs = 4;
        } else if ((hcm < 0.5) || (wcm < 1)) {
            fs = 6;
        } else if ((hcm < 1) || (wcm < 1.5)) {
            fs = 8;
        } else if ((hcm < 1.5) || (wcm < 2)) {
            fs = 10;
        }
        title = displayTitleRows[punchcard.rows[rows].title];
        if (title == undefined) {
            title = punchcard.rows[rows].title;
        }
        if (wcm < 2.5) {
            title = punchcard.shortTitleRows[punchcard.rows[rows].title];
            if (title == undefined) {
                title = displayTitleRows[punchcard.rows[rows].title];
                if (title == undefined) {
                    title = punchcard.rows[rows].title;
                }
                title = title.substr(0, 3);
            }
        }
        title += " " + Math.round((punchcard.rows[rows].size / ratio) * 10) / 10;
        slide.addText(title, {
            shape: pptx.shapes.RECTANGLE,
            x: punchcard.rows[rows].box.Left / scalex / inch,
            y: punchcard.rows[rows].box.Top / scaley / inch,
            w: wcm / inch,
            h: hcm / inch,
            fill: color_header_fill,
            line: color_box_line,
            color: color_header_text,
            align: 'c',
            margin: 0,
            font_size: fs
        });
        for (var cols = 0; cols < punchcard.rows[rows].cols.length; cols++) {
            var fs = 12,
                title, wcm, hcm;
            wcm = punchcard.rows[rows].cols[cols].box.Width / scalex;
            hcm = punchcard.rows[rows].cols[cols].box.Height / scaley;
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
            title = punchcard.rows[rows].cols[cols].title;
			if((displayTitleCols!==undefined)&&(displayTitleCols[title]!==undefined))
				title=displayTitleCols[title];
            if (wcm < 2.5) {
				title = punchcard.rows[rows].cols[cols].title;
                title = punchcard.shortTitleCols[title];
                if (title == undefined) {
                    title = punchcard.rows[rows].cols[cols].title.substr(0, 3);
                }
            }
            title += " " + Math.round(punchcard.rows[rows].cols[cols].size) + "%";
            var color = colors[punchcard.rows[rows].cols[cols].title];
            if (color == undefined) {
                color = 'FFFFFF';
            }
            slide.addText(title, {
                shape: pptx.shapes.RECTANGLE,
                x: ((punchcard.rows[rows].cols[cols].box.Left / scalex) - offsetx) / inch,
                y: punchcard.rows[rows].cols[cols].box.Top / scaley / inch,
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
	*/
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
    var keys = Object.keys(punchcard.shortTitleCols);
    var rows = [];
    var k = 0;
    for (var i = 0; i < keys.length; i++) {
        rows.push([keys[i], punchcard.shortTitleCols[keys[i]]]);
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
    pptx.save('punchcard' + '_' + getTimestamp());
}
}

/* ===   functions  === */
function radius(a,punchcard){
	return a/(punchcard.totals.totals.value);
}

/* pivot table access functions */
function contentFirstCol(punchcard){  
    p = [];
	q = [];
	for(var path =0; path<punchcard.content.cols.path.length; path++){
		p.push(punchcard.content.cols[punchcard.content.cols.path[path]]);
		q.push(0);
	}
	for(var i=0; i<p.length; i++){
		p[i].sort();
	}

	return {p,q};
}
function contentNextCol(c){
	var ccarry=0;
	for(var i=1;i<=c.q.length;i++){
		if((ccarry==1)||(i==1)){
			c.q[c.q.length-i]++;
			if(c.q[c.q.length-i]>=c.p[c.q.length-i].length){
				ccarry=1;
				c.q[c.q.length-i]=0;
			} else {
				ccarry = 0;
			}
		}
	}	
}
function contentColCount(c){
	var n = 1;
	for(var i=0;i<c.q.length;i++){  
		n *= c.p[i].length;
	}
	return n;
}
function contentColName(c){
	var txt = "";
	for(var i=0;i<c.q.length;i++){
		txt += c.p[i][c.q[i]];
		if(i<c.q.length-1){
			txt += " ";
		}
	}
	return txt;
}
function contentFirstRow(punchcard,rp,rq){  
	p = [];
	q = [];
	for(var path =0; path<punchcard.content.rows.path.length; path++){
		p.push(punchcard.content.rows[punchcard.content.rows.path[path]]);
		q.push(0);
	}
	for(var i=0; i<p.length; i++){
		p[i].sort();
	}
	return {p,q};
}
function contentNextRow(r){
	// increment row counter
	var rcarry = 0;
	for(var i=1; i<=r.q.length; i++){
		if((rcarry==1)||(i==1)){
			r.q[r.q.length-i]++;
			if(r.q[r.q.length-i]>=r.p[r.q.length-i].length){
				rcarry=1;
				r.q[r.q.length-i]=0;
			} else {
				rcarry=0;
			}
		}
	}
	return rcarry;
}
function contentRowCount(r){
	var n = 1;
	for(var i=0;i<r.q.length-1;i++){  // last descriptor is not part of the deal
		n *= r.p[i].length;
	}
	return n;	
}
function contentRowCountLast(r){
	return r.p[r.q.length-1].length; // how many companies including total
}
function contentRowName(r){
	var txt = "";
	for(var i=0;i<r.q.length-1;i++){
		txt += r.p[i][r.q[i]];
		if(i<r.q.length-1){
			txt += " ";
		}
	}
	return txt;
}
function contentPointer(punchcard,r,c){
	return contentColPt(c,contentRowPt(punchcard,r));
}
function contentColPt(c,rpt){
	var cpt = rpt;
	if(cpt!=undefined){
		for(var i=0;i<c.q.length;i++){
			cpt = cpt[c.p[i][c.q[i]]];
			if(cpt==undefined) break;
		}	
	}
	return cpt;
}
function contentRowPt(punchcard,r){
	var rpt = punchcard.content.tree;
	for(var i=0; i<r.q.length; i++){
		rpt = rpt[r.p[i][r.q[i]]];
		if(rpt==undefined) break;
	}
	return rpt; 	
}
function totalsFirst(punchcard){
    p = [];
	q = [];
	for(var path =0; path<punchcard.content.cols.path.length; path++){
		p.push(punchcard.content.cols[punchcard.content.cols.path[path]]);
		q.push(0);
	}
	return {p,q}	
}
function totalsNext(t){
	var ccarry=0;
	for(var i=1;i<=c.q.length;i++){
		if((ccarry==1)||(i==1)){
			c.q[c.q.length-i]++;
			if(c.q[c.q.length-i]>=c.p[c.q.length-i].length){
				ccarry=1;
				c.q[c.q.length-i]=0;
			} else {
				ccarry = 0;
			}
		}
	}		
}
function totalsPointer(punchcard,t){
	var tpt = punchcard.totals;
	if(tpt!=undefined){
		for(var i=0;i<t.q.length;i++){
			cpt = cpt[t.p[i][t.q[i]]];
			if(cpt==undefined) break;
		}	
	}
	return tpt;	
}