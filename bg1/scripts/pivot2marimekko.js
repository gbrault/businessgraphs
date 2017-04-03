function pivot2marimekko(pivotFile){
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
		globals     various parameters needs to build the marimekko file
	*/
		// parameters
		var headerratio = 0.1;
		var width = 27.517;
		var height = 19.05;
		var scalex = 70;
		var scaley = 15;
		var factor = 1;
		// first pass is just a matter of puting data from one structure to another...
	var marimekko = {
		"graphtype":"marimekko",
		"scalex":scalex.toString(),
		"scaley":scaley.toString(),
		"offsetx":"0",
		"lwidth":width.toString(),
		"lheight":height.toString(),
		"title":pivotFile.globals.pvTitle,
		"size":pivotFile.allTotal.sum,
		"currency":pivotFile.globals.pvCurrency,
		"display":pivotFile.globals.pvDisplayUnit,
		"internal":pivotFile.globals.pvInternalUnit,
		"ratio_threshold":pivotFile.globals.pvThresholdShare,
		"color_box_line":pivotFile.globals.pvLinesColor.substr(1),
		"color_header_fill":pivotFile.globals.pvFillColor.substr(1),
		"color_header_text":pivotFile.globals.pvHeaderTextColor.substr(1),
		"color_columns_text":pivotFile.globals.pvColumnsTextColor.substr(1),
		"displayTitleCols":(function(){
			var titleRows={};
			var keys = Object.keys(pivotFile.rowTotals);
			for(var i=0; i<keys.length;i++){
				var split = keys[i].split("\u0000");
				// build Title Label
				var label=""
				for(var j=0;j<split.length;j++){
					var field = pivotFile.pivotConfig.rows[j];
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
					label += slabel;
				}
				titleRows[keys[i]]=label;
			}
			return titleRows;
		})(),
		"shortTitleCols":(function(){
			var titleRows={};
			var keys = Object.keys(pivotFile.rowTotals);
			for(var i=0; i<keys.length;i++){
				var split = keys[i].split("\u0000");
				// build Title Label
				var label=""
				for(var j=0;j<split.length;j++){
					var field = pivotFile.pivotConfig.rows[j];
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
					label += slabel;
				}
				titleRows[keys[i]]=label;
			}
			return titleRows;
		})(),
		"Colors":(function(){
			var Colors={};
			var keys = Object.keys(pivotFile.rowTotals);
			for(var i=0; i<keys.length;i++){
				var split = keys[i].split("\u0000");
				// get the color of the inner element
				var field = pivotFile.pivotConfig.rows[split.length-1];
				if(	(pivotFile.pivotCustom!==undefined)&&
					(pivotFile.pivotCustom[field]!==undefined) &&
					(pivotFile.pivotCustom[field][split[split.length-1]]!==undefined) && 
					(pivotFile.pivotCustom[field][split[split.length-1]].color!==undefined)
				  ){
					Colors[keys[i]]= pivotFile.pivotCustom[field][split[split.length-1]].color.substr(1);
				} else{
					Colors[keys[i]]= "FFFFFF";
				}
			}
			return Colors;
		})(),
		"displayTitleRows":(function(){
			var titleCols={};
			var keys = Object.keys(pivotFile.colTotals);
			for(var i=0; i<keys.length;i++){
				var split = keys[i].split("\u0000");
				// build Title Label
				var label=""
				for(var j=0;j<split.length;j++){
					var field = pivotFile.pivotConfig.cols[j];
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
					label += slabel;
				}
				titleCols[keys[i]]=label;
			}
			return titleCols;
		})(),
		"shortTitleRows":(function(){
			var titleCols={};
			var keys = Object.keys(pivotFile.colTotals);
			for(var i=0; i<keys.length;i++){
				var split = keys[i].split("\u0000");
				// build Title Label
				var label=""
				for(var j=0;j<split.length;j++){
					var field = pivotFile.pivotConfig.cols[j];
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
					label += slabel;
				}
				titleCols[keys[i]]=label;
			}
			return titleCols;
		})(),
		"rows":(function(){
			var rows = [];
			var keys = []; // = Object.keys(pivotFile.colTotals);
			for(var k=0; k<pivotFile.cols.length; k++){
				var names = pivotFile.cols[k];
				var key ="";
				for(var l=0; l<names.length; l++ ){
					key += names[l]+"\u0000";
				}
				key = key.substr(0,key.length-1);
				keys.push(key);
			}
			for(var i=0;i<keys.length;i++){
				rows.push({ 
						"title":keys[i],
						"size":pivotFile.colTotals[keys[i]].sum,
						"box":{"Top":0,"Left":0,"Width":(width*factor*scalex)*headerratio,"Height":(height*factor*(1-headerratio)*scaley*pivotFile.colTotals[keys[i]].sum)/pivotFile.allTotal.sum},
						"cols":(function(){
							var cols = [];
							var treekeys = Object.keys(pivotFile.tree);
							for(var j=0; j<treekeys.length;j++){
								if(pivotFile.tree[treekeys[j]][keys[i]]!==undefined){
									cols.push({
										"title":treekeys[j],
										"size":100*pivotFile.tree[treekeys[j]][keys[i]].sum/pivotFile.colTotals[keys[i]].sum,
										"box":{	
												"Top":0,
												"Left":0,
												"Width":(width*factor*scalex*(1-headerratio)*pivotFile.tree[treekeys[j]][keys[i]].sum)/pivotFile.colTotals[keys[i]].sum,
												"Height":(height*factor*scaley*(1-headerratio)*pivotFile.colTotals[keys[i]].sum)/pivotFile.allTotal.sum
											  }
									});
								}
							}
							return cols;
						})()
				});
			}
			return (rows);
		})(),
	}
	// now we need to reorder the boxes (all are in the upper left corner...)
	// we have to get rid of cells which are below MS threshold and add the residue to Other
	// Other is in the far right
	// start with vertical axis
	var h = height*factor*scaley*headerratio;
	// order is the input order, rows are the cols of the pivot table
	// now, do the horizontal axis
	for(i=0; i<marimekko.rows.length;i++){
		var row = marimekko.rows[i];
		row.box.Top = h;
		// filter all col under threshold and put them in Other as Other as well.
		var cols = [];
		var Other = {"title":"Other","size":0,"box":{}};
		var share=0
		var totalWidth=row.box.Width;
		for(var j=0; j<row.cols.length;j++){
			var col = row.cols[j];
			col.box.Top = h;
			if ((col.title.toLowerCase()!="other")&&(col.title.toLowerCase()!="others")&&(col.size>=(pivotFile.globals.pvThresholdShare))){
				cols.push(col);
				share += col.size;
				totalWidth += col.box.Width;
			}
		}
		
		Other.size = 100-share;
		Other.box.Top=h;
		Other.box.Height = row.box.Height;
		Other.box.Width =  (width*factor*scalex)-totalWidth;
		// reorder cols according to size, biggest left
		cols.sort(function(a,b){return (b.size-a.size)});
		var w=row.box.Width;
		// tune the x axis now
		for(j=0; j<cols.length;j++){
			cols[j].box.Left = w;
			w += cols[j].box.Width;
		}
		Other.box.Left = w;
		cols.push(Other);
		row.cols = cols;
		h += row.box.Height;
	}	
	return marimekko;
}
