/**
* This module manage communication between pivot and firebase
*/
function Com(who){
	debugger;
  this.who=who;
	  // Initialize Firebase
  this.config = {
    apiKey: "AIzaSyBZJLQp5xaL0tdFvUsx3I97kfweCAQ2C4w",
    authDomain: "businessgraphs-27585.firebaseapp.com",
    databaseURL: "https://businessgraphs-27585.firebaseio.com",
    storageBucket: "businessgraphs-27585.appspot.com",
    messagingSenderId: "441454731465"
  };
  firebase.initializeApp(this.config);
  this.initFirebase();
  var channel = window.location.search.substr(1).split("=");
  this.channel = channel[1];
  // monitor channel commands
  var command = firebase.database().ref('channels/' + this.channel+'/cmd');
  command.on('value', function(cmd){
	  if(cmd.val()!==null)
		this.exec(cmd.val());
  }.bind(this));
}

Com.prototype.getGlobals = function(){
	// set global parameters
	/*
	pvTitle: Top Players (>={{ratio_thresold}}%MS) ranking for Automation Markets {{size}} $Bn
	pvCurrency: figures currency
	pvDisplayUnit: unit (multiple of currency) to display Bn, Mn, Kn, Un (display)
	pvInternalUnit: unit (multiple of currency) to display Bn, Mn, Kn, Un (internal)
	pvThresholdShare: market share above which we show competitors
	pvLinesColor:  color of boxes lines (hex format)
	pvFillColor: color of boxes fill (hex format)
	pvHeaderTextColor: color of header text (hex format)
	pvColumnsTextColor: color of column text (hex format)
	*/
	var parameters = ['pvTitle','pvCurrency','pvDisplayUnit','pvInternalUnit','pvThresholdShare','pvLinesColor','pvFillColor','pvHeaderTextColor','pvColumnsTextColor'];
	var globals = {};
	for(var i=0;i<parameters.length;i++){
		var elt = document.getElementById(parameters[i]);
		globals[parameters[i]]=elt.value;
	}
	return globals
};
Com.prototype.feedback = function(result) {
	document.body.style.cursor  = 'default';
	firebase.database().ref('channels/'+this.channel+'/cmd/done').set({timestamp:Date.now(),result});
}

Com.prototype.exec = function(cmd) {
	switch(cmd.type){
		case "newpivot":
			if(cmd.done==undefined){
				this.feedback(true);
			}
			break;
		case "save": // actually save new pivot (two files: .dta = pivot input section, .pvt = pivot context + link to .dta (via id))
			// debugger;
			if(cmd.done==undefined){
				document.body.style.cursor  = 'wait';
				var dta_name = cmd.name.substr(0,cmd.name.length-3)+"dta";
				window.fileStructureDTA = {name:dta_name,content:pivotData.input,type:"application/json"};
				this.saveFile(window.fileStructureDTA,function(cmd,result){
					var globals = this.getGlobals();
					var content = {	input:window.fileStructureDTA.id,
									pivotCustom:pivotData.pivotCustom,
									pivotConfig,
									dictionary,
									globals,
								   };
					window.fileStructure={content:content,name:cmd.name,type:cmd.filetype};
					this.saveFile(window.fileStructure,true);
				}.bind(this,cmd));

			}
			break;
		case "saveExisting": // actually save existing pivot (only the .pvt side not the associated .dta)
			if(cmd.done==undefined){
				if(window.fileStructure!==undefined){
					document.body.style.cursor  = 'wait';
					var globals = this.getGlobals();
					var content = {	input:window.fileStructureDTA.id,
									pivotCustom:pivotData.pivotCustom,
									pivotConfig,
									dictionary,
									globals,
									};				
					window.fileStructure.content = content;
					this.saveExistingFile(window.fileStructure,true);
				}
				
			}
			break;
		case "load":
			if(cmd.done==undefined){  // actually loading a pivot resource
				document.body.style.cursor  = 'wait';
				this.loadFile(cmd.fileID);
			}			
			break;
		case "pivot2marimekko":
			if(cmd.done==undefined){
				document.body.style.cursor  = 'wait';
				if(window.pivotData!=undefined){
					var globals = this.getGlobals();
					content = { pivotCustom:window.pivotData.pivotCustom,
								tree:window.pivotData.tree,
								allTotal:window.pivotData.allTotal,
								colTotals:window.pivotData.colTotals,
								rowTotals:window.pivotData.rowTotals,
								pivotConfig,
								globals,
								cols:window.pivotData.getColKeys(),
								rows:window.pivotData.getRowKeys()
								};
					var marimekko = pivot2marimekko(content);
					// save marimekko file
					if(window.fileStructure!==undefined){
						this.saveNewMarimekko(window.fileStructure,marimekko);
					}
				} else {
					this.feedback(false);
				}
			}			
			break;		
		case "pivot2punchcard":
			if(cmd.done==undefined){
				document.body.style.cursor  = 'wait';
				if(window.pivotData!=undefined){
					var globals = this.getGlobals();
					content = { pivotCustom:window.pivotData.pivotCustom,
								tree:window.pivotData.tree,
								allTotal:window.pivotData.allTotal,
								colTotals:window.pivotData.colTotals,
								rowTotals:window.pivotData.rowTotals,
								pivotConfig,
								globals,
								cols:window.pivotData.getColKeys(),
								rows:window.pivotData.getRowKeys()
								};
					var punchcard = pivot2punchcard(content);
					// save marimekko file
					if(window.fileStructure!==undefined){
						this.saveNewPunchCard(window.fileStructure,punchcard);
					}
				} else {
					this.feedback(false);
				}
			}			
			break;
		case "downloadpunchcard":
			if(cmd.done==undefined){
				document.body.style.cursor  = 'wait';
				var svg = document.getElementById('slide_0');
				if(svg!=undefined){
					saveSvg(svg,"punchcard.pcd."+Date.now()+".svg");
					this.feedback(true);
				}				
			}
			break;
		case "loadpunchcard":
			if(cmd.done==undefined){  // actually loading a pivot resource
				document.body.style.cursor  = 'wait';
				this.loadPunchCard(cmd.fileID);
			}
			break;
	}
}
Com.prototype.getPalette = function(callback){
	firebase.database().ref('palette/' + this.auth.currentUser.uid).once('value').then( function(palette){
		if((callback!==undefined)&&(typeof callback === 'function')){
			this.feedback(true);
			return callback(palette.val());
		}
	}.bind(this));
};

Com.prototype.saveNewMarimekko = function(fileStructure,marimekko){
	// filestructure is the pivot file that is existing ie already saved...
		var type="application/json";		
		var name = fileStructure.name.substr(0,fileStructure.name.length-3)+"mmk";
		this.oIOmodule.feedback = this.feedback.bind(this);
		this.oIOmodule.writeNewFile.bind(this.oIOmodule)(
			{name:name,content:marimekko,type:type}
		);
};

Com.prototype.saveNewPunchCard = function(fileStructure,punchcard){
	// filestructure is the pivot file that is existing ie already saved...
		var type="application/json";		
		var name = fileStructure.name.substr(0,fileStructure.name.length-3)+"pcd";
		this.oIOmodule.feedback = this.feedback.bind(this);
		this.oIOmodule.writeNewFile.bind(this.oIOmodule)(
			{name:name,content:punchcard,type:type}
		);
};

Com.prototype.loadPunchCard = function(fileID){		
	this.oIOmodule.readFile.bind(this.oIOmodule)(fileID,function(fileStructure){		
		window.punchcardFileStructure=fileStructure;
		svgPunchCard(window.punchcardFileStructure.content, document.getElementById('svg_container'));
		this.feedback(true);
	}.bind(this));
};

Com.prototype.loadFile = function(fileID){		
	this.oIOmodule.readFile.bind(this.oIOmodule)(fileID,function(fileStructure){		
		window.fileStructure=fileStructure;
		this.oIOmodule.feedback = this.feedback.bind(this);
		// caching dta
		if((window.fileStructureDTA!==undefined)&&(window.fileStructureDTA!==null)){
			if(window.fileStructureDTA.id == fileStructure.content.input){
				justPivot();
			}
		} else {
			this.oIOmodule.readFile.bind(this.oIOmodule)(fileStructure.content.input,function(fileStructure){
				window.fileStructureDTA=fileStructure;
				justPivot();
			}.bind(this));
		}
	}.bind(this));
};

Com.prototype.saveFile = function(fileStructure,feedback){ // actually save as
        if((feedback!==undefined)&&(typeof feedback ==='function')){
			this.oIOmodule.feedback = feedback;
		} else if (typeof feedback === 'boolean'){
			this.oIOmodule.feedback = this.feedback.bind(this);
		}
		this.oIOmodule.writeNewFile.bind(this.oIOmodule)(fileStructure);
};

Com.prototype.saveExistingFile = function(fileStructure,feedback){ // content
	if(feedback) this.oIOmodule.feedback = this.feedback.bind(this);
	this.oIOmodule.writeExistingFile.bind(this.oIOmodule)(fileStructure);
};

Com.prototype.UUID = function(){
	return aesjs.utils.hex.fromBytes(crypto.getRandomValues(new Uint8Array(10)));
};

Com.prototype.initFirebase = function() {
  // Shortcuts to Firebase SDK features.
  this.auth = firebase.auth();
  this.database = firebase.database();
  this.storage = firebase.storage();
  // Initiates Firebase auth and listen to auth state changes.
  this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
  
};

Com.prototype.onAuthStateChanged = function(user) {
	if (user) {
		// logged
		this.oIOmodule = new IOmodule({auth:this.auth,database:this.database,storage:this.storage});
	} else {
		// not logged
	}
};
