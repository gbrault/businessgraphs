    //- console.log("C", ColorScheme);
	var htmlcolor = '<div class="mdl-grid">';
	htmlcolor += '<input class="mdl-slider mdl-js-slider" type="range" id="hue-slider" min="0" max="360" value="0" tabindex="0" title="set hue">';
	htmlcolor += '<div class="mdl-cell mdl-cell--1-col" id="hue-box"></div>';
	htmlcolor += '<input class="mdl-slider mdl-js-slider" type="range" id="distance-slider" min="0" max="1" value="0.5" step="0.01" title="set distance" >';
	htmlcolor += '</div>';
	htmlcolor += '<div class="mdl-grid">';
	htmlcolor += '<button class="mdl-button mdl-js-button mdl-button--raised" onclick="setVariation('+"'default'"+');">default</button>';
	htmlcolor += '<button class="mdl-button mdl-js-button mdl-button--raised" onclick="setVariation('+"'pastel'"+');">pastel</button>';
	htmlcolor += '<button class="mdl-button mdl-js-button mdl-button--raised" onclick="setVariation('+"'soft'"+');">soft</button>';
	htmlcolor += '<button class="mdl-button mdl-js-button mdl-button--raised" onclick="setVariation('+"'light'"+');">light</button>';
	htmlcolor += '<button class="mdl-button mdl-js-button mdl-button--raised" onclick="setVariation('+"'hard'"+');">hard</button>';
	htmlcolor += '<button class="mdl-button mdl-js-button mdl-button--raised" onclick="setVariation('+"'pale'"+');">pale</button>';
	htmlcolor += '<div class="mdl-cell mdl-cell--1-col" id="colorstyle"></div>';
	htmlcolor += '</div>';
	htmlcolor += '<div class="mdl-grid" id="palette"></div>';
	document.getElementById('colordiv').innerHTML=htmlcolor;
	var palette = {};
    var scheme = null;
	// componentHandler.upgradeElement(document.getElementById("hue-slider"));
    document.getElementById("hue-slider").addEventListener('input',
	function(){ 
			s = document.getElementById("hue-slider");
			setHue( s.value, false);
	});
    document.getElementById("distance-slider").addEventListener('input',
	function(){ 
			s = document.getElementById("distance-slider");
			setDistance( s.value, false);
	});
	  
      /*
      $('#hex').change(function(){
        setHex( $('#hex').val() );
      });
      
      $('#set-hex').click(function(){
        setHex( $('#hex').val() );
      });
	  */
      /*
      $("#").slider({
        min: 0,
        max: 1,
        value: 0.5,
        step: 0.01,
        slide: function(e, ui) {
          // ui.value has the number
          setDistance(ui.value)
        }
      });
      */
      scheme = new ColorScheme;
	  scheme.scheme('tetrade');
	  setVariation('default');
	  setDistance(0.5,false)
      setHue(0,false);
      generateColors();
      
      //$('#add-complement').click(addComplement);

    
    function generateColors() {
      document.getElementById('palette').innerHTML='';
      var colors = scheme.colors();
	  var newDivs="";
	  palette.colors=colors;
      for (var i in colors) {
        var c = colors[i];
        newDivs += '<div class="mdl-cell mdl-cell--1-col" style="background-color: #' + c + ';color:#' + c + '">'+c+'</div>';

      }
	  document.getElementById('palette').innerHTML=newDivs;	
    }
    
    function setHue(hue,controller) {
      scheme.from_hue(hue);
	  palette.hue=hue;
      
      var bg = scheme.colors()[0];
      document.getElementById('hue-box').style.backgroundColor='#' + bg;
      
      // $('#hex').val( bg );
      // $('#hex-box').css('background-color', '#' + bg);
      
      generateColors();
	  if(controller){
		document.getElementById("hue-slider").value=hue;
	  }
    }
    
    function setDistance(distance, controller) {
	  palette.distance=distance;
      scheme.distance(distance);
      generateColors();
	  if(controller){
		document.getElementById("distance-slider").value=distance; 
	  }
    }
    
    function setVariation(variation) {
	  palette.variation=variation;
      scheme.variation(variation);
      generateColors();
	  document.getElementById("colorstyle").innerText= variation;
    }
    
    function setWebSafe(websafe) {
	  palette.websafe=websafe;
      scheme.web_safe(websafe);
      generateColors();
    }
