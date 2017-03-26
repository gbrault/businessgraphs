/**
* This module manage communication between pivot and firebase
*/
function Com(){
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

Com.prototype.exec = function(cmd) {
	switch(cmd.type){
		case "save":
			// debugger;
			if(cmd.done==undefined){
				cmd.done=true;
				firebase.database().ref('channels/'+this.channel+'/cmd').set(cmd);
				var globals = this.getGlobals();
				var content = JSON.stringify({	input:pivotData.input,
												pivotCustom:pivotData.pivotCustom,
												pivotConfig,
												dictionary,
												globals
												});
				this.saveFile({content:content,lastModified:Date.now(),name:cmd.name,type:cmd.filetype,size:content.length});
			}
			break;
		case "saveExisting":
			if(cmd.done==undefined){
				cmd.done=true;
				firebase.database().ref('channels/'+this.channel+'/cmd').set(cmd);
				var globals = this.getGlobals();
				var content = JSON.stringify({	input:pivotData.input,
												pivotCustom:pivotData.pivotCustom,
												pivotConfig,
												dictionary,
												globals});
				this.saveExistingFile(content);
			}
			break;
		case "load":
			if(cmd.done==undefined){
				cmd.done=true;
				firebase.database().ref('channels/'+this.channel+'/cmd').set(cmd);
				this.loadFile(cmd.fileID);
			}			
			break;
		case "pivot2marimekko":
			if(cmd.done==undefined){
				cmd.done=true;
				var globals = this.getGlobals();
				firebase.database().ref('channels/'+this.channel+'/cmd').set(cmd);
				content = { pivotCustom:pivotData.pivotCustom,
							tree:pivotData.tree,
							allTotal:pivotData.allTotal,
							colTotals:pivotData.colTotals,
							rowTotals:pivotData.rowTotals,
						    pivotConfig,
							globals};
				var marimekko = pivot2marimekko(content);
				// save marimekko file
				if(window.fileStructure!==undefined){
					this.saveNewMarimekko(window.fileStructure,marimekko);
				}
			}			
			break;
	}
}
Com.prototype.getPalette = function(callback){
	firebase.database().ref('palette/' + this.auth.currentUser.uid).once('value').then( function(palette){
		if((callback!==undefined)&&(typeof callback === 'function')){
			return callback(palette.val());
		}
	});
};

Com.prototype.saveNewMarimekko = function(fileStructure,marimekko){
	// filstructure is the pivot file that is existing ie already saved...
		var uuid = this.UUID();		
		var content = JSON.stringify(marimekko);
		var lastmodified = Date.now();
		var type="application/json";
		var name = fileStructure.name.substr(0,fileStructure.name.length-3)+"mmk";
		firebase.database().ref('users/' + this.auth.currentUser.uid+"/files/"+uuid).set(
			{	name:name,
				lastModified:lastmodified,
				type:type,
				size:content.length
			}
		);
		firebase.database().ref('files/'+uuid).set(
			{	name:name,
				content:content,
				lastModified:lastmodified,
				type:type
			}
		);		
};

Com.prototype.loadFile = function(fileID){
	firebase.database().ref('files/'+fileID).once('value').then( function(hfile){
		justPivot(hfile.val());
		// remember file structure (for save)
		window.fileStructure = {id:fileID, lastModified:hfile.val().lastModified, name:hfile.val().name, type:hfile.val().type, size:hfile.val().content.length};
	});
};

Com.prototype.saveFile = function(fileStructure){ // actually save as
		var uuid = this.UUID();		
		firebase.database().ref('users/' + this.auth.currentUser.uid+"/files/"+uuid).set(
			{	name:fileStructure.name,
				lastModified:fileStructure.lastModified,
				type:fileStructure.type,
				size:fileStructure.size
			}
		);
		firebase.database().ref('files/'+uuid).set(
			{	name:fileStructure.name,
				content:fileStructure.content,
				lastModified:fileStructure.lastModified,
				type:fileStructure.type
			}
		);		
};

Com.prototype.saveExistingFile = function(content){
if(window.fileStructure!==undefined){
	var lastModified = Date.now();
	var updates = {};
	updates["/users/"+ this.auth.currentUser.uid+"/files/"+window.fileStructure.id] = 
		{	name:window.fileStructure.name,
			lastModified:lastModified,
			type:window.fileStructure.type,
			size:content.length
		};
	updates["/files/"+window.fileStructure.id] =
		{	name:window.fileStructure.name,
			content:content,
			lastModified:lastModified,
			type:window.fileStructure.type
		}
	firebase.database().ref().update(updates);
}
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
	} else {
		// not logged
	}
};
