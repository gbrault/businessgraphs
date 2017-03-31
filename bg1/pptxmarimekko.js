/* marimekko powerpoint generator from json file*/
/* all units in cm */
function pptxMarimekko(marimekko,filename){
var inch = 2.54;
if(marimekko.graphtype=="marimekko"){
var scalex = marimekko.scalex;
var scaley = marimekko.scaley;
var offsetx = marimekko.offsetx;
var lwidth = marimekko.lwidth;
var lheight = marimekko.lheight;
var color_box_line=marimekko.color_box_line;
var color_header_fill=marimekko.color_header_fill;
var color_header_text=marimekko.color_header_text;
var color_columns_text=marimekko.color_columns_text;
var colors = marimekko.Colors;
var displayTitleRows = marimekko.displayTitleRows;
var displayTitleCols = marimekko.displayTitleCols;
var pptx = new PptxGenJS();
pptx.setLayout({ name:'A4', width:(lwidth/inch), height:(lheight/inch)});
var optsTitle = { color:'9F9F9F', marginPt:3, border:[0,0,{pt:'1',color:'CFCFCF'},0] };
var slide = pptx.addNewSlide();
var stemp = marimekko.title.replace(/{{ratio_thresold}}/,marimekko.ratio_threshold);
var ratio = 1;
switch(marimekko.display)
    {
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
stemp = stemp.replace(/{{size}}/,Math.round((marimekko.size/ratio)*100)/100);
stemp = stemp.replace(/{{currency}}/,marimekko.currency);
stemp = stemp.replace(/{{display}}/,marimekko.display);
slide.addTable( [ [{ text:stemp, options:optsTitle }] ], { x:(1/inch), y:(1/inch), w:(20/inch) } );

for(var rows=0; rows<marimekko.rows.length; rows++){
	var fs=12,title,wcm,hcm;
    wcm = marimekko.rows[rows].box.Width/scalex;
    hcm=marimekko.rows[rows].box.Height/scaley;
    if((hcm<0.3)||(wcm<0.5)){
     	fs=4;
    } else if((hcm<0.5)||(wcm<1)){
     	fs=6;
    } else if((hcm<1)||(wcm<1.5)){
       fs=8;
    } else if((hcm<1.5)||(wcm<2)){
       fs=10;
    }
    title=displayTitleRows[marimekko.rows[rows].title];
    if(title==undefined){
      title=marimekko.rows[rows].title;
    }
    if(wcm<2.5){
       	title=marimekko.shortTitleRows[marimekko.rows[rows].title];
        if(title==undefined){
          	title=displayTitleRows[marimekko.rows[rows].title];
            if(title==undefined){
      			title=marimekko.rows[rows].title;
    		}
          title=title.substr(0,3);
        }
    }
  title += " "+Math.round((marimekko.rows[rows].size/ratio)*10)/10;
  slide.addText(title, { shape:pptx.shapes.RECTANGLE, 
                                             x:marimekko.rows[rows].box.Left/scalex/inch, 
                                             y:marimekko.rows[rows].box.Top/scaley/inch, 
                                             w:wcm/inch, 
                                             h:hcm/inch,
                                             fill:color_header_fill,
                                             line: color_box_line,
											 color:color_header_text,
                                             align:'c',
                        					 margin:0,
                                             font_size:fs });
  for(var cols=0; cols<marimekko.rows[rows].cols.length; cols++){
        var fs=12,title,wcm,hcm;
        wcm = marimekko.rows[rows].cols[cols].box.Width/scalex;
        hcm=marimekko.rows[rows].cols[cols].box.Height/scaley;
    	if((hcm<0.3)||(wcm<0.5)){
     		fs=4;
    	} else     
        if((hcm<0.5)||(wcm<1)){
          	fs=6;
        } else if((hcm<1)||(wcm<1.5)){
          fs=8;
        } else if((hcm<1.5)||(wcm<2)){
          fs=10;
        }
    	title=marimekko.rows[rows].cols[cols].title;
		if((displayTitleCols!==undefined)&&(displayTitleCols[title]!==undefined))
				title=displayTitleCols[title];
        if(wcm<2.5){
			title = marimekko.rows[rows].cols[cols].title;
          	title=marimekko.shortTitleCols[title];
            if(title==undefined){
              	title=marimekko.rows[rows].cols[cols].title.substr(0,3);
            }
        }
    	title += " "+Math.round(marimekko.rows[rows].cols[cols].size)+"%";
        var color = colors[marimekko.rows[rows].cols[cols].title];
        if (color==undefined){
          	color = 'FFFFFF';
        }
  		slide.addText(title, { shape:pptx.shapes.RECTANGLE, 
                                             		x:((marimekko.rows[rows].cols[cols].box.Left/scalex)-offsetx)/inch, 
                                             		y:marimekko.rows[rows].cols[cols].box.Top/scaley/inch, 
                                             		w:wcm/inch, 
                                             		h:hcm/inch,
                                             		fill:color,
                                             		line: color_box_line,
													color:color_columns_text,
                              						margin:0,
                                             		align:'c',
                                             		font_size:fs });    
  }
}
/* add table for short name correspondance */
var slide2 = pptx.addNewSlide();
slide2.addTable( [ [{ text:"Short Name Correspondence", options:optsTitle }] ], { x:(1/inch), y:(1/inch), w:(20/inch) } );
var keys = Object.keys(marimekko.shortTitleCols);
var rows=[];
var k =0;
for(var i=0; i<keys.length;i++)
{
  rows.push([keys[i],marimekko.shortTitleCols[keys[i]]]);
  if((rows.length!=0)&&(rows.length % 25 == 0)){
    var tabOpts = { x:2/inch, y:2.75/inch, w:5.0/inch, fill:'F7F7F7', font_size:8, color:'6f9fc9', rowH:0.5/inch, valign:'m'};
    tabOpts.x += ((tabOpts.w+0.5/inch) * k);
    k++;
    slide2.addTable( rows, tabOpts );
    rows = [];
  }
}
if(rows.length!=0){
   	var tabOpts = { x:2/inch, y:2.75/inch, w:5.0/inch, fill:'F7F7F7', font_size:8, color:'6f9fc9', rowH:0.5/inch, valign:'m'};
    tabOpts.x += ((tabOpts.w+0.5/inch) * k);
    slide2.addTable( rows, tabOpts );
}
pptx.save(filename+'.'+getTimestamp());
}

/* ===   functions  === */
function getTimestamp() {
	var dateNow = new Date();
	var dateMM = dateNow.getMonth() + 1; dateDD = dateNow.getDate(); dateYY = dateNow.getFullYear(), h = dateNow.getHours(); m = dateNow.getMinutes();
	return dateNow.getFullYear() +''+ (dateMM<=9 ? '0' + dateMM : dateMM) +''+ (dateDD<=9 ? '0' + dateDD : dateDD) + (h<=9 ? '0' + h : h) + (m<=9 ? '0' + m : m);
}
}
