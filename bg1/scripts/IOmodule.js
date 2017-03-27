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
			var content = new TextEncoder().encode(JSON.stringify(fileStructure.content));
			var gzip = new Zlib.Gzip(content);
			var compressed = gzip.compress();
			var size = compressed.length;
			fileStructure.size=compressed.length;
			window.firebase.database().ref('users/' + fileStructure.userid +"/files/"+uuid).set(
				{	name:fileStructure.name,
					lastModified:fileStructure.lastModified,
					type:fileStructure.type,
					size:size,
					userid:fileStructure.userid
				}
			);
			firebase.database().ref('files/'+uuid).set(
				{	name:fileStructure.name,
					content:compressed,
					lastModified:fileStructure.lastModified,
					type:fileStructure.type,
					userid:fileStructure.userid
				}
			);
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
			var content = new TextEncoder().encode(JSON.stringify(fileStructure.content));
			var gzip = new Zlib.Gzip(content);
			var compressed = gzip.compress();
			var size = compressed.length;
			fileStructure.size=compressed.length;
			updates["/users/"+ this.firebaseStructure.auth.currentUser.uid+"/files/"+fileStructure.id] = 
				{	name:fileStructure.name,
					lastModified:fileStructure.lastModified,
					type:fileStructure.type,
					size:size,
					userid:fileStructure.userid
				};
			updates["/files/"+fileStructure.id] =
				{	name:fileStructure.name,
					content:compressed,
					lastModified:fileStructure.lastModified,
					type:fileStructure.type,
					userid:fileStructure.userid
				}
			window.firebase.database().ref().update(updates);
		}
	}
};

IOmodule.prototype.readFile = function (uuid,callback){
	if(this.firebaseStructure.auth.currentUser!==undefined){ 
		if(callback!==undefined){
			firebase.database().ref('files/'+uuid).once('value').then( function(uuid,callback,hfile){
				var val =  hfile.val();
				var gunzip = new Zlib.Gunzip(val.content);
				new TextDecoder();
				var content = JSON.parse(new TextDecoder().decode(gunzip.decompress()));
				var fileStructure = {id:uuid,name:val.name,lastModified:val.lastModified,content:content,size:val.size,userid:val.userid,type:val.type};
				return callback(fileStructure);
			}.bind(this,uuid,callback));
		}
	}
};

IOmodule.prototype.deleteFile = function (uuid){
	if(this.firebaseStructure.auth.currentUser!==undefined){ 
		firebase.database().ref('users/' + this.firebaseStructure.auth.currentUser.uid+"/files/"+uuid).remove();
		firebase.database().ref('files/'+uuid).remove();
	}
}