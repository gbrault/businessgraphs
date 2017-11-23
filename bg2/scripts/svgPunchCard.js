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
	var ytop=2;
	
	var raduiscorrection = pptx.layout.height/pptx.layout.width;

	var sxb = sx - xtop;
	var syb = sy - ytop;
	syb = syb - (syb/rows/2);
	
	/* calculate maxRadius and set background grid */
	var lCol = 1;
	var maxRadius=0;
	for(var cRow=0; cRow<rows; cRow++){
		if(r.p[r.q.length-1][r.q[r.q.length-1]].toLowerCase()=="total"){
			for(var cCol=0; cCol<cols; cCol++){
				if(lCol==1){
					slide.addText("",{	shape:pptx.shapes.LINE,
										x1: (((cCol *sxb)/cols) + ((sxb/cols)/2) + xtop),
										y1: ytop,
										x2: (((cCol *sxb)/cols) + ((sxb/cols)/2) + xtop),
										y2: (syb+ytop),
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
		slide.addText("",{	shape:pptx.shapes.LINE,
							x1: xtop,
							y1: (((cRow *syb)/rows) + ((syb/rows)/2) + ytop),
							x2: sxb + xtop,
							y2: (((cRow *syb)/rows) + ((syb/rows)/2) + ytop),
							width:1,
							color:color_header_text
						 }
					);
		}
		contentNextRow(r);
	}
	
	/* punch market disks */
	lCol = 1;
	c = contentFirstCol(punchcard);
	r = contentFirstRow(punchcard);
	
	for(var cRow=0; cRow<rows; cRow++){
		if(r.p[r.q.length-1][r.q[r.q.length-1]].toLowerCase()=="total"){
			for(var cCol=0; cCol<cols; cCol++){
				// if(lCol==1){
				// 	slide.addText(contentColName(c),{ shape:pptx.shapes.RECTANGLE,
				//							  x:((cCol *sxb)/cols)+ xtop,
				//							  y:0.5,
				//							  w:(sxb/cols),
				//							  h:(ytop*0.8),
				//							  fill: color_header_fill,
				//							  color: color_header_text
				//							}
				//				 );					
				//}
				var ptr = contentPointer(punchcard,r,c);
				if(ptr!=undefined){				
						slide.addText("",
							{	
								shape:pptx.shapes.CIRCLE,
								x:  (((cCol *sxb)/cols) + ((sxb/cols)/2) + xtop),  // cm
								y:  (((cRow *syb)/rows) + ((syb/rows)/2) + ytop),	 // cm
								r:  ((Math.sqrt(radius(ptr.value,punchcard)/maxRadius))*(sx/cols)/2)*raduiscorrection,  // cm
								fill: color_header_fill,
								color: color_header_text
							}
						);
				}
				contentNextCol(c);
			}
			lCol = 0;		
			// slide.addText(contentRowName(r),{ shape:pptx.shapes.RECTANGLE,
			// 								  x:0,
			// 								  y:(((cRow *syb)/rows) - ((syb/rows)/2) + ytop),
			// 								  w: xtop,
			// 								  h:(syb/rows)*2*0.98,
			// 								  fill: color_header_fill,
			// 								  color: color_header_text
			//								}
			//					 );
        }								 
		contentNextRow(r);
	}
	
	/* calculate market impact of combined  => punchcard.combined structure*/
	c = contentFirstCol(punchcard);
	r = contentFirstRow(punchcard);
	
	for(var cRow=0; cRow<rows; cRow++){
		if(r.p[r.q.length-1][r.q[r.q.length-1]].toLowerCase()!="total"){			
			for(var cCol=0; cCol<cols; cCol++){
				var cptr=combinedPointer(punchcard,r,c);
				if(cptr==undefined){
					cptr=combinedCreatePointer(punchcard,r,c); cptr.value=0;
				}
				var ptr = contentPointer(punchcard,r,c);
				if(ptr!=undefined){
					cptr.value += ptr.value;
				}
				contentNextCol(c);
			}
		}
		contentNextRow(r);
	}
	
	/* draw combined sectors */
	c = contentFirstCol(punchcard);
	r = contentFirstRow(punchcard);
	
	for(var cRow=0; cRow<rows; cRow++){
		if(r.p[r.q.length-1][r.q[r.q.length-1]].toLowerCase()=="total"){
			for(var cCol=0; cCol<cols; cCol++){
				var cptr=combinedPointer(punchcard,r,c);
				var ptr = contentPointer(punchcard,r,c);
				if(ptr!=undefined){
					// cptr.value = combined market size | ptr.value = total market size
					if((cptr.value!=0)&&(ptr.value!=0)&&(presence(cptr.value/ptr.value)!=0)){
						slide.addText("",{
							shape:pptx.shapes.SECTOR,
							x:(((cCol *sxb)/cols) + ((sxb/cols)/2) + xtop),
							y:(((cRow *syb)/rows) + ((syb/rows)/2) + ytop),
							a0:0,
							a1:presence(cptr.value/ptr.value),
							r:((Math.sqrt(radius(ptr.value,punchcard)/maxRadius))*(sx/cols)/2)*raduiscorrection,
							fill:'339933',
							color:'339933'
						});						
					}
				}
				contentNextCol(c);
			}
		}
		contentNextRow(r);
	}
	
	/* add row maket value */
	c = contentFirstCol(punchcard);
	r = contentFirstRow(punchcard);
	
	for(var cRow=0; cRow<rows; cRow++){
		if(r.p[r.q.length-1][r.q[r.q.length-1]].toLowerCase()=="total"){
			var rowTotal=0;
			for(var cCol=0; cCol<cols; cCol++){
				var ptr = contentPointer(punchcard,r,c);
				if(ptr!=undefined){
					// ptr.value = total market size for this segment
					rowTotal += ptr.value;
					if(cCol==(cols-1)){
						var rowTotal = Math.round(rowTotal/ratio*10)/10;
						slide.addText(contentRowName(r)+'('+rowTotal+')',{ shape:pptx.shapes.RECTANGLE,
									  x:0,
									  y:(((cRow *syb)/rows) - ((syb/rows)/2) + ytop),
									  w: xtop,
									  h:(syb/rows)*2*0.98,
									  fill: color_header_fill,
									  color: color_header_text
									}
						);					
					}
				}
				contentNextCol(c);
			}
		}
		contentNextRow(r);
	}
	
	/* add Col maket value */
	c = contentFirstCol(punchcard);
	r = contentFirstRow(punchcard);
	
	for(var cCol=0; cCol<cols; cCol++){
			var colTotal=0;
			for(var cRow=0; cRow<rows; cRow++){				
				var ptr = contentPointer(punchcard,r,c);
				if((r.p[r.q.length-1][r.q[r.q.length-1]].toLowerCase()=="total")&&(ptr!=undefined)){
					// ptr.value = total market size for this segment
					colTotal += ptr.value;
					if(cRow==(rows-1)){
						var colTotal = Math.round(colTotal/ratio*10)/10;
						slide.addText(contentColName(c)+'('+colTotal+')',{ shape:pptx.shapes.RECTANGLE,
									  x:((cCol *sxb)/cols)+ xtop,
									  y:0.5,
									  w:(sxb/cols),
									  h:(ytop*0.8),
									  fill: color_header_fill,
									  color: color_header_text
									}
						);			
					}
				}
				contentNextRow(r);
			}		
		contentNextCol(c);
	}

	
    /* add table for short name correspondance */
	/*
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
	*/
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
	for(var i=0;i<r.q.length;i++){
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
function combinedCreatePointer(punchcard,r,c){
	if(punchcard.combined==undefined) punchcard.combined={};
	var rpt = punchcard.combined;
	for(var i=0; i<r.q.length-1; i++){  // last row descriptor is company
		if(rpt[r.p[i][r.q[i]]]==undefined) rpt[r.p[i][r.q[i]]]={};
		rpt = rpt[r.p[i][r.q[i]]];
	}
	var cpt = rpt;
	for(var i=0;i<c.q.length;i++){
		if(cpt[c.p[i][c.q[i]]]==undefined) cpt[c.p[i][c.q[i]]]={};
			cpt = cpt[c.p[i][c.q[i]]];	
	}
	cpt['combined']={};
	
	return cpt['combined'];	
}
function combinedPointer(punchcard,r,c){
	if(punchcard.combined==undefined) return undefined;
	var rpt = punchcard.combined;
	for(var i=0; i<r.q.length-1; i++){
		if(rpt[r.p[i][r.q[i]]]==undefined){delete rpt; break;}
		rpt = rpt[r.p[i][r.q[i]]];
	}
	if(rpt==undefined) return undefined;
	var cpt = rpt;
	for(var i=0;i<c.q.length;i++){
		if(cpt[c.p[i][c.q[i]]]==undefined){delete cpt;break;}
		cpt = cpt[c.p[i][c.q[i]]];	
	}
	if(cpt==undefined) return undefined;
	return cpt['combined'];		
}

function presence(a){
	if(a<0.005) return 0;
	if(a<0.02) return 90;
	if(a<0.05) return 180;
	if(a<0.1) return 270;
	return 359.99;
}