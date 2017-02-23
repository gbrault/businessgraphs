/* all units in cm */
var inch = 2.54;
debugger;

var sMarimekko = window.e_jsonm.getDoc().getValue();
var marimekko = JSON.parse(sMarimekko);
var scalex = marimekko.scalex;
var scaley = marimekko.scaley;
var offsetx = marimekko.offsetx;
var lwidth = marimekko.lwidth;
var lheight = marimekko.lheight;
var colors = marimekko.Colors;
var displayTitleRows = marimekko.displayTitleRows;
var pptx = new PptxGenJS();
pptx.setLayout({ name:'A4', width:(lwidth/inch), height:(lheight/inch)});
var optsTitle = { color:'9F9F9F', marginPt:3, border:[0,0,{pt:'1',color:'CFCFCF'},0] };
var slide = pptx.addNewSlide();
var stemp = marimekko.title.replace(/{{ratio_thresold}}/,marimekko.ratio_threshold);
var ratio = 1;
switch(marimekko.display)
    {
  		case "Bn":
    		switch(marimekko.internal)
                {
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
    }
stemp = stemp.replace(/{{size}}/,Math.round((marimekko.size/ratio)*100)/100);
stemp = stemp.replace(/{{currency}}/,marimekko.currency);
stemp = stemp.replace(/{{display}}/,marimekko.display);
slide.addTable( [ [{ text:stemp, options:optsTitle }] ], { x:(1/inch), y:(1/inch), w:(20/inch) } );

for(var rows=0; rows<marimekko.rows.length; rows++){
	var fs=11,title,wcm,hcm;
    wcm = marimekko.rows[rows].box.Width/scalex;
    hcm=marimekko.rows[rows].box.Height/scaley;
    if((hcm<0.5)||(wcm<1)){
     	fs=4;
    } else if((hcm<1)||(wcm<1.5)){
       fs=6;
    } else if((hcm<1.5)||(wcm<2)){
       fs=8;
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
                                             fill:'FFFFFF',
					     line: '5B9BD5',
                                             align:'c',
                                             font_size:fs });
  for(var cols=0; cols<marimekko.rows[rows].cols.length; cols++){
        var fs=11,title,wcm,hcm;
        wcm = marimekko.rows[rows].cols[cols].box.Width/scalex;
        hcm=marimekko.rows[rows].cols[cols].box.Height/scaley;
        if((hcm<0.5)||(wcm<1)){
          	fs=4;
        } else if((hcm<1)||(wcm<1.5)){
          fs=6;
        } else if((hcm<1.5)||(wcm<2)){
          fs=8;
        }
    	title=marimekko.rows[rows].cols[cols].title;
        if(wcm<2.5){
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
							line: '5B9BD5',
                                             		align:'c',
                                             		font_size:fs });    
  }
}

pptx.save('Marimekko'+'_'+getTimestamp());

/* ===   functions  === */
function getTimestamp() {
	var dateNow = new Date();
	var dateMM = dateNow.getMonth() + 1; dateDD = dateNow.getDate(); dateYY = dateNow.getFullYear(), h = dateNow.getHours(); m = dateNow.getMinutes();
	return dateNow.getFullYear() +''+ (dateMM<=9 ? '0' + dateMM : dateMM) +''+ (dateDD<=9 ? '0' + dateDD : dateDD) + (h<=9 ? '0' + h : h) + (m<=9 ? '0' + m : m);
}
