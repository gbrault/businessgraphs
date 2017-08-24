/*
* Read/Write firebase "files"
* usage:
* var oIOmodule = new IOmodule(firebaseStructure);
* oIOmodule.writeNewFile.bind(oIOmodule)(fileStructure);
* oIOmodule.writeExistingFile.bind(oIOmodule)(fileStructure);
* oIOmodule.readFile.bind(oIOmodule)(uuid,callback);
* expect aesjs, firebase to be loaded
*/
function IOmodule(firebaseStructure){
	this.firebaseStructure = firebaseStructure; // all variables which allows firebase access .auth = author, .database = database, .storage = storage
}

IOmodule.prototype.UUID = function(){
	return aesjs.utils.hex.fromBytes(crypto.getRandomValues(new Uint8Array(10)));
};


IOmodule.prototype.writeNewFile = function(fileStructure){
	if(this.firebaseStructure.auth.currentUser!==undefined){ // user is logged
		if((fileStructure!==undefined) && 
		   (fileStructure.name!==undefined) &&
		   (fileStructure.type!==undefined) &&
		   (fileStructure.content!==undefined)
		  ){	
			var uuid = this.UUID();	
			fileStructure.id = uuid;
			var lastModified = Date.now();
			fileStructure.lastModified=lastModified;
			fileStructure.userid = this.firebaseStructure.auth.currentUser.uid;
			var content = LZUTF8.encodeBase64(LZUTF8.compress(JSON.stringify(fileStructure.content)));// JSON.stringify(fileStructure.content); //JSON.stringify(fileStructure.content);//new TextEncoder().encode(JSON.stringify(fileStructure.content));
			// var gzip = new Zlib.Gzip(content);
			// var compressed = gzip.compress();
			var size = content.length; // compressed.length;
			fileStructure.size=size;
			try {
				window.firebase.database().ref('users/' + fileStructure.userid +"/files/"+uuid).set(
				       {name:fileStructure.name,
					lastModified:fileStructure.lastModified,
					type:fileStructure.type,
					size:size,
					userid:fileStructure.userid
					}
				);
				window.firebase.database().ref('files/'+uuid).set(
					{name:fileStructure.name,
					content: content, //compressed,
					lastModified:fileStructure.lastModified,
					type:fileStructure.type,
					userid:fileStructure.userid
					}
				);
			} catch(err){
				if(this.feedback) this.feedback({error:true,message:err.message});
				return;
			}
			if(this.feedback) this.feedback(true);
		}
	}
};

IOmodule.prototype.writeExistingFile = function(fileStructure){
	if(this.firebaseStructure.auth.currentUser!==undefined){ // user is logged
		if((fileStructure!==undefined) && 
		   (fileStructure.id!==undefined) &&
		   (fileStructure.name!==undefined) &&
		   (fileStructure.type!==undefined) &&
		   (fileStructure.content!==undefined)
		  ){
			var lastModified = Date.now();
			fileStructure.lastModified=lastModified;
			var updates = {};
			var content = LZUTF8.encodeBase64(LZUTF8.compress(JSON.stringify(fileStructure.content)));
			var size = content.length; // compressed.length;
			fileStructure.size=size;
			updates["/users/"+ this.firebaseStructure.auth.currentUser.uid+"/files/"+fileStructure.id] = 
				{	name:fileStructure.name,
					lastModified:fileStructure.lastModified,
					type:fileStructure.type,
					size:size,
					userid:fileStructure.userid
				};
			updates["/files/"+fileStructure.id] =
				{	name:fileStructure.name,
					content:content, // compressed,
					lastModified:fileStructure.lastModified,
					type:fileStructure.type,
					userid:fileStructure.userid
				}
			window.firebase.database().ref().update(updates).then(function(){
				if(this.feedback) this.feedback(true);
			}.bind(this));
			
		}
	}
};

IOmodule.prototype.readFile = function (uuid,callback){
	if(this.firebaseStructure.auth.currentUser!==undefined){ 
		if(callback!==undefined){
			firebase.database().ref('files/'+uuid).once('value').then( function(uuid,callback,hfile){
				var val =  hfile.val();
				if(val!=null){
					var content = JSON.parse(LZUTF8.decompress(LZUTF8.decodeBase64(val.content)));
					var fileStructure = {id:uuid,name:val.name,lastModified:val.lastModified,content:content,size:val.size,userid:val.userid,type:val.type};
					if(this.feedback) this.feedback(true);
					return callback(fileStructure);
				} else {
					if(this.feedback) this.feedback({error:true,message:"file not existing uid("+uuid+")"});
					return callback(null);
				}
			}.bind(this,uuid,callback));
		}
	}
};

IOmodule.prototype.deleteFile = function (uuid){
	if(this.firebaseStructure.auth.currentUser!==undefined){ 
		firebase.database().ref('users/' + this.firebaseStructure.auth.currentUser.uid+"/files/"+uuid).remove();
		firebase.database().ref('files/'+uuid).remove();
		if(this.feedback) this.feedback(true);
	}
}

IOmodule.prototype.renameFile = function (uuid,name){
	if(this.firebaseStructure.auth.currentUser!==undefined){ 
			var updates = {};
			var lastModified=Date.now();
			updates["/users/"+ this.firebaseStructure.auth.currentUser.uid+"/files/"+uuid+"/name"] = name;
			updates["/users/"+ this.firebaseStructure.auth.currentUser.uid+"/files/"+uuid+"/lastModified"] = lastModified;
			updates["/files/"+uuid+"/name"] =name;
			updates["/files/"+uuid+"/lastModified"] =lastModified;
			window.firebase.database().ref().update(updates).then(function(){
				if(this.feedback) this.feedback(true);
			}.bind(this));
	}
}
