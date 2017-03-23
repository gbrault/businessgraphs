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

Com.prototype.exec = function(cmd) {
	switch(cmd.type){
		case "save":
			// debugger;
			if(cmd.done==undefined){
				cmd.done=true;
				firebase.database().ref('channels/'+this.channel+'/cmd').set(cmd);
				var content = JSON.stringify({input:pivotData.input,pivotCustom:pivotData.pivotCustom,pivotConfig,dictionary});
				this.saveFile({content:content,lastModified:Date.now(),name:cmd.name,type:cmd.filetype,size:content.length});
			}
			break;
		case "saveExisting":
			if(cmd.done==undefined){
				cmd.done=true;
				firebase.database().ref('channels/'+this.channel+'/cmd').set(cmd);
				var content = JSON.stringify({input:pivotData.input,pivotCustom:pivotData.pivotCustom,pivotConfig,dictionary});
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
	}
}

Com.prototype.loadFile = function(fileID){
	firebase.database().ref('files/'+fileID).once('value').then( function(hfile){
		justPivot(hfile.val());
		// remember file structure (for save)
		window.fileStructure = {id:fileID, lastModified:hfile.val().lastModified, name:hfile.val().name, type:hfile.val().type, size:hfile.val().content.length};
	});
}

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
}
