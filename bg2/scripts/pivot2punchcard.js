function pivot2punchcard(pivotFile){
	/* this function takes a pivot structure as input and outputs a marimekko structure
	* pivot structure includes the following attributes
		input		not needed
		tree		to makes cells
		allTotal	total of rows or columns
		colTotals	total of columns items
		rowTotals	total of rows items
		pivotCustom	gives colors, short and longname for row headers and cell labels
		pivotConfig	gives the definition of rows and columns headers
		dictionary	not needed
		globals     various parameters needs to build the punchcard file
	*/
		// parameters
		var headerratio = 0.1;
		var width = 27.517;
		var height = 19.05;
		var scalex = 70;
		var scaley = 15;
		var factor = 1;
		// first pass is just a matter of puting data from one structure to another...
	var punchcard = {
		"graphtype":"punchcard",
		"scalex":scalex.toString(),
		"scaley":scaley.toString(),
		"offsetx":"0",
		"lwidth":width.toString(),
		"lheight":height.toString(),
		"title":pivotFile.globals.pvTitle,
		"currency":pivotFile.globals.pvCurrency,
		"display":pivotFile.globals.pvDisplayUnit,
		"internal":pivotFile.globals.pvInternalUnit,
		"ratio_threshold":pivotFile.globals.pvThresholdShare,
		"color_box_line":pivotFile.globals.pvLinesColor.substr(1),
		"color_header_fill":pivotFile.globals.pvFillColor.substr(1),
		"color_header_text":pivotFile.globals.pvHeaderTextColor.substr(1),
		"color_columns_text":pivotFile.globals.pvColumnsTextColor.substr(1),
		"displayTitleCols":(function(){
			var titleCols={};
			titleCols.path=pivotFile.pivotConfig.cols;
			var keys = Object.keys(pivotFile.colTotals);
			for(var i=0; i<keys.length;i++){
				var split = keys[i].split("\u0000");
				// build Title Label
				for(var j=0;j<split.length;j++){
					var field = pivotFile.pivotConfig.cols[j];
					if(titleCols[field]==undefined){titleCols[field]=[]};
					var slabel=null;
					if(pivotFile.pivotCustom!==undefined){
						slabel = pivotFile.pivotCustom[field]
						if(slabel!==undefined){
							slabel = slabel[split[j]];
							if(slabel!==undefined){
								slabel = slabel.longname;
							}
						}
					}
					if (slabel==null){
						slabel = split[j];
					}
					if(titleCols[field].indexOf(slabel)==-1)
								titleCols[field].push(slabel);					
				}
				
			}
			return titleCols;
		})(),
		"shortTitleCols":(function(){
			var titleCols={};
			titleCols.path=pivotFile.pivotConfig.cols;
			var keys = Object.keys(pivotFile.colTotals);
			for(var i=0; i<keys.length;i++){
				var split = keys[i].split("\u0000");
				// build Title Label
				for(var j=0;j<split.length;j++){
					var field = pivotFile.pivotConfig.cols[j];
					if(titleCols[field]==undefined){titleCols[field]=[]};
					var slabel = null;
					if((pivotFile.pivotCustom!==undefined)&&(pivotFile.pivotCustom[field]!==undefined)){
						slabel = pivotFile.pivotCustom[field]
						slabel = slabel[split[j]];
						if(slabel!==undefined){
							slabel = slabel.shortname;
						}
					} 
					if ((slabel==undefined)||(slabel==null)){
						slabel = split[j];
					}					
					if(titleCols[field].indexOf(slabel)==-1)
								titleCols[field].push(slabel);
				}
			}
			return titleCols;
		})(),
		"Colors":(function(){
			var Colors={rows:{},cols:{}};
			var keys = Object.keys(pivotFile.colTotals);
			for(var i=0; i<keys.length;i++){
				var split = keys[i].split("\u0000");
				// get the color of the inner element
				var field = pivotFile.pivotConfig.cols[split.length-1];
				if(	(pivotFile.pivotCustom!==undefined)&&
					(pivotFile.pivotCustom[field]!==undefined) &&
					(pivotFile.pivotCustom[field][split[split.length-1]]!==undefined) && 
					(pivotFile.pivotCustom[field][split[split.length-1]].color!==undefined)
				  ){
					Colors.cols[keys[i]]= pivotFile.pivotCustom[field][split[split.length-1]].color.substr(1);
				} else{
					Colors.cols[keys[i]]= "FFFFFF";
				}
			}
			keys = Object.keys(pivotFile.rowTotals);
			for(var i=0; i<keys.length;i++){
				var split = keys[i].split("\u0000");
				// get the color of the inner element
				var field = pivotFile.pivotConfig.rows[split.length-1];
				if(	(pivotFile.pivotCustom!==undefined)&&
					(pivotFile.pivotCustom[field]!==undefined) &&
					(pivotFile.pivotCustom[field][split[split.length-1]]!==undefined) && 
					(pivotFile.pivotCustom[field][split[split.length-1]].color!==undefined)
				  ){
					Colors.rows[keys[i]]= pivotFile.pivotCustom[field][split[split.length-1]].color.substr(1);
				} else{
					Colors.rows[keys[i]]= "FFFFFF";
				}
			}			
			return Colors;
		})(),		
		"displayTitleRows":(function(){
			var titleRows={};
			titleRows.path=pivotFile.pivotConfig.rows;
			var keys = Object.keys(pivotFile.rowTotals);
			for(var i=0; i<keys.length;i++){
				var split = keys[i].split("\u0000");
				for(var j=0;j<split.length;j++){
					var field = pivotFile.pivotConfig.rows[j];
					if(titleRows[field]==undefined){titleRows[field]=[]};
					var slabel = null;
					if((pivotFile.pivotCustom!==undefined)&&(pivotFile.pivotCustom[field]!==undefined)){
						slabel=pivotFile.pivotCustom[field];
						slabel = slabel[split[j]];
						if(slabel!==undefined){
							slabel = slabel.longname;
						}
					} 
					if ((slabel==undefined)||(slabel==null)){
						slabel = split[j];
					}
					if(titleRows[field].indexOf(slabel)==-1)
								titleRows[field].push(slabel);
				}				
			}
			return titleRows;
		})(),
		"shortTitleRows":(function(){
			var titleRows={};
			titleRows.path=pivotFile.pivotConfig.rows;
			var keys = Object.keys(pivotFile.rowTotals);
			for(var i=0; i<keys.length;i++){
				var split = keys[i].split("\u0000");
				// build Title Label
				for(var j=0;j<split.length;j++){
					var field = pivotFile.pivotConfig.rows[j];
					if(titleRows[field]==undefined){titleRows[field]=[]};
					var slabel = null;
					if((pivotFile.pivotCustom!==undefined)&&(pivotFile.pivotCustom[field]!==undefined)){
						slabel=pivotFile.pivotCustom[field];
						slabel = slabel[split[j]];
						if(slabel!==undefined){
							slabel = slabel.shortname;
						}
					} 
					if ((slabel==undefined)||(slabel==null)){
						slabel = split[j];
					}
					if(titleRows[field].indexOf(slabel)==-1)
								titleRows[field].push(slabel);
				}

			}
			return titleRows;
		})(),
		"content":{
			"cols":(function(){
				var cols={};
				var keys = Object.keys(pivotFile.colTotals);
				cols.path = pivotFile.pivotConfig.cols;
				for(var i=0; i<keys.length;i++){
					var split = keys[i].split("\u0000");
					// build Title Label
					for(var j=0;j<split.length;j++){
						var field = pivotFile.pivotConfig.cols[j];
						if(cols[field]==undefined){cols[field]=[]};
						if(cols[field].indexOf(split[j])==-1)
									cols[field].push(split[j]);					
					}
					
				}
				return cols;
		    })(),
			"rows":(function(){
				var rows={};
				var keys = Object.keys(pivotFile.rowTotals);
				rows.path = pivotFile.pivotConfig.rows;
				for(var i=0; i<keys.length;i++){
					var split = keys[i].split("\u0000");
					// build Title Label
					for(var j=0;j<split.length;j++){
						var field = pivotFile.pivotConfig.rows[j];
						if(rows[field]==undefined){rows[field]=[]};
						if(rows[field].indexOf(split[j])==-1)
									rows[field].push(split[j]);					
					}
					
				}
				return rows;
			})(),
			"tree":(function(){
				var tree={};
				var keys = [];
				for(var k=0; k<pivotFile.cols.length; k++){
					var names = pivotFile.cols[k];
					var key ="";
					for(var l=0; l<names.length; l++ ){
						key += names[l]+"\u0000";
					}
					key = key.substr(0,key.length-1);
					keys.push(key);
				}
				var treekeys = Object.keys(pivotFile.tree);
				/*
				{
					"Aerospace & Defense":{
						 "Schneider Electric":{
							  "Sensors":{size:xxx},
							  "Control & Signalling":{size:xxx},
                              "PLC":{size:xxx},
						 },
						 "total":{
							  "Sensors":{size:xxx},
							  "Control & Signalling":{size:xxx},
                              "PLC":{size:xxx},					 
						 }
					},
					"Automotive":{						
						 "Schneider Electric":{
							  "Sensors":{size:xxx},
							  "Control & Signalling":{size:xxx},
                              "PLC":{size:xxx},						 
						 },
						 "total":{
							  "Sensors":{size:xxx},
							  "Control & Signalling":{size:xxx},
                              "PLC":{size:xxx},						 
						 }
					}
				}
				*/				
				for(var i=0;i<treekeys.length;i++){
					var rows = treekeys[i].split('\u0000');
					var p = tree;
					for(var rindex=0; rindex<rows.length; rindex++){
						if(p[rows[rindex]]==undefined){p[rows[rindex]]={}}
						p = p[rows[rindex]];
					}					
					for(var j=0; j<keys.length;j++){
						var q = p;
						var cols = keys[j].split('\u0000');
						if(pivotFile.tree[treekeys[i]]!=undefined){
							if(pivotFile.tree[treekeys[i]][keys[j]]!=undefined){
								for(var cindex=0; cindex<cols.length; cindex++){
									if(q[cols[cindex]]==undefined){q[cols[cindex]]={}}
									q = q[cols[cindex]];
								}
								q.value = pivotFile.tree[treekeys[i]][keys[j]].sum;	
							}
						}
					}
				}				
				return tree;
			})(),
		}
	}
    // Calculate Total Market size by "Products"
	var totals={};
	var rp=[];
	var rq=[];
	for(var path =0; path<punchcard.content.rows.path.length; path++){
		rp.push(punchcard.content.rows[punchcard.content.rows.path[path]]);
		rq.push(0);
	}
	var cp=[];
	var cq=[];
	for(var path =0; path<punchcard.content.cols.path.length; path++){
		cp.push(punchcard.content.cols[punchcard.content.cols.path[path]]);
		cq.push(0);
	}
	
	do{  // tree walking
		var i;		
		// calculate row pointer
		var rpt = punchcard.content.tree;
		for(i=0; i<rq.length; i++){
			rpt = rpt[rp[i][rq[i]]];
			if(rpt==undefined) break;
		}
				
		if(rpt!=undefined){
			//calculate col pointer
			for(var path =0; path<punchcard.content.cols.path.length; path++){
				cq[path]=0;
			}
			
			do{
				var i;
				// calculate col pointer
				var cpt = rpt;
				for(i=0;i<cq.length;i++){
					cpt = cpt[cp[i][cq[i]]];
					if(cpt==undefined) break;
				}
				
				// we have the leaf here!
				
				if(cpt!=undefined){
					if(rp[rq.length-1][rq[rq.length-1]]=="total"){
						if(totals[cp[cq.length-1][cq[cq.length-1]]]==undefined){
							totals[cp[cq.length-1][cq[cq.length-1]]]={value:0};
						}
						totals[cp[cq.length-1][cq[cq.length-1]]].value += cpt.value; 
					}					
				}
				
				// increment col counter
				var ccarry=0;
				for(i=1;i<=cq.length;i++){
					if((ccarry==1)||(i==1)){
						cq[cq.length-i]++;
						if(cq[cq.length-i]>=cp[cq.length-i].length){
							ccarry=1;
							cq[cq.length-i]=0;
						} else {
							ccarry = 0;
						}
					}
				}
			} while(ccarry!=1)			
		}
	
		// increment row counter
		var rcarry = 0;
		for(i=1; i<=rq.length; i++){
			if((rcarry==1)||(i==1)){
				rq[rq.length-i]++;
				if(rq[rq.length-i]>=rp[rq.length-i].length){
					rcarry=1;
					rq[rq.length-i]=0;
				} else {
					rcarry=0;
				}
			}
		}

	}while(rcarry!=1)
	var totalskeys=Object.keys(totals);
	totals.totals={value:0};
	for(var i=0; i<totalskeys.length;i++){
		totals.totals.value += totals[totalskeys[i]].value;
	}
	punchcard.totals=totals;
	punchcard.size = totals.totals.value;
	
	return punchcard;
}
