/**
 * Copyright 2017 Gilbert Brault All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

// Initializes BusinessGraph.
function BusinessGraph() {
  
  this.checkSetup();

  // Shortcuts to DOM Elements.
  this.userPic = document.getElementById('user-pic');
  this.userName = document.getElementById('user-name');
  this.signInButton = document.getElementById('sign-in');
  this.signOutButton = document.getElementById('sign-out');
  this.signInSnackbar = document.getElementById('must-signin-snackbar');
  
  /* Console menus*/
  this.menu_save_file = document.getElementById('menu_save_file');
  this.menu_save_codemirror_file = document.getElementById('menu_save_codemirror_file');
  this.uploadFile=document.getElementById('uploadFile');
  this.menu_download_file = document.getElementById('menu_download_file');
  
  /* File menus */
  this.menu_show = document.getElementById('menu_show');
  this.menu_load_pivot = document.getElementById('menu_load_pivot');
  this.menu_load_marimekko = document.getElementById('menu_load_marimekko');
  this.menu_load_punchcard = document.getElementById('menu_load_punchcard');
  // this.menu_diff = document.getElementById('menu_diff');
  this.menu_delete = document.getElementById('menu_delete');
  this.menu_load_palette = document.getElementById('menu_load_palette');
  this.menu_make_pivot_from_dta = document.getElementById('menu_make_pivot_from_dta');
  this.menu_rename = document.getElementById('menu_rename');
  this.menu_copy = document.getElementById('menu_copy');
  
  /* Pivot menus */
  this.menu_pivot_new = document.getElementById('menu_pivot_new');
  this.menu_pivot_save = document.getElementById('menu_pivot_save');
  this.menu_pivot_save_existing = document.getElementById('menu_pivot_save_existing');
  this.menu_pivot2marimekko = document.getElementById('menu_pivot2marimekko');
  this.menu_pivot2punchcard = document.getElementById('menu_pivot2punchcard');
  
  /* colors menu (palette) */
  this.menu_save_palette_file = document.getElementById('menu_save_palette_file');
  this.menu_set_palette = document.getElementById('menu_set_palette');
  
  /* marimekko menu */
  this.menu_save_powerpoint = document.getElementById('menu_save_powerpoint');
  
  /* punch card menu */
  this.menu_save_punchcardsvg = document.getElementById('menu_save_punchcardsvg');
  
  // TAB elements
  this.togglepivot = document.getElementById('togglepivot');
  this.togglemarimekko = document.getElementById('togglemarimekko');
  this.togglepunchcard= document.getElementById('togglepunchcard');
  this.togglefiles = document.getElementById('togglefiles');
  this.toggleconsole = document.getElementById('toggleconsole');
  this.togglecolors = document.getElementById('togglecolors');
  
  this.signOutButton.addEventListener('click', this.signOut.bind(this));
  this.signInButton.addEventListener('click', this.signIn.bind(this));
  this.menu_save_file.addEventListener('click', this.menuSaveFile.bind(this));
  this.uploadFile.addEventListener('change', this.readSingleFile.bind(this));
  this.menu_delete.addEventListener('click', this.deleteFiles.bind(this));
  this.menu_show.addEventListener('click', this.showFile.bind(this));  
  // this.menu_diff.addEventListener('click', this.diffFiles.bind(this));
  this.menu_pivot_new.addEventListener('click', this.pivotNew.bind(this));  
  this.menu_pivot_save.addEventListener('click', this.pivotSave.bind(this));
  this.menu_pivot_save_existing.addEventListener('click', this.pivotSaveExisting.bind(this));
  this.menu_load_pivot.addEventListener('click', this.pivotLoad.bind(this));
  this.menu_load_marimekko.addEventListener('click', this.marimekkoLoad.bind(this));
  this.menu_load_punchcard.addEventListener('click', this.punchcardLoad.bind(this));
  this.menu_pivot2marimekko.addEventListener('click', this.pivot2marimekko.bind(this));
  this.menu_pivot2punchcard.addEventListener('click', this.pivot2punchcard.bind(this));
  this.menu_save_codemirror_file.addEventListener('click', this.save_codemirror_file.bind(this));
  this.menu_save_palette_file.addEventListener('click', this.save_palette_file.bind(this));
  this.menu_load_palette.addEventListener('click', this.load_palette_file.bind(this));
  this.menu_set_palette.addEventListener('click', this.set_palette.bind(this));
  this.menu_save_powerpoint.addEventListener('click', this.download_powerpoint.bind(this));
  this.menu_save_punchcardsvg.addEventListener('click', this.download_punchcardsvg.bind(this));
  this.menu_make_pivot_from_dta.addEventListener('click', this.make_pivot_from_dta.bind(this));  
  this.menu_rename.addEventListener('click', this.rename_file.bind(this));
  this.menu_download_file.addEventListener('click', this.download_file.bind(this));
  this.menu_copy.addEventListener('click', this.copy_file.bind(this));

  // TAB listners  
  this.togglefiles.addEventListener('click', this.do_togglefiles.bind(this));
  this.toggleconsole.addEventListener('click', this.do_toggleconsole.bind(this));
  this.togglepivot.addEventListener('click', this.do_togglepivot.bind(this));
  this.togglemarimekko.addEventListener('click', this.do_togglemarimekko.bind(this));
  this.togglepunchcard.addEventListener('click', this.do_togglepunchcard.bind(this));
  this.togglecolors.addEventListener('click', this.do_togglecolors.bind(this));
  
  this.initFirebase();
};

BusinessGraph.prototype.copy_file = function(){
	// get first selected file
	var checkedlabels = document.getElementById('filetable').querySelectorAll('label.is-checked');
	if((checkedlabels!==undefined)&&(checkedlabels.length>0)){
		var id = checkedlabels[0].id;
		if(id!=""){
			window.consoleFileStructure={id:id};	
			document.body.style.cursor  = 'wait';
			this.oIOmodule.readFile.bind(this.oIOmodule)(id, function(fileStructure){
				this.oIOmodule.feedback = function(){
					document.body.style.cursor  = 'default';					
				};	
				this.oIOmodule.writeNewFile.bind(this.oIOmodule)(fileStructure);
			}.bind(this));
		}
	}	
}

BusinessGraph.prototype.download_file = function(){
	if(window.consoleFileStructure!==undefined){
		if(window.oAceEditor!==undefined){
			var content = window.oAceEditor.getSession().getValue();
			window.consoleFileStructure.content = content;
			var blob = new Blob([content], {type:window.consoleFileStructure.type });
			saveAs(blob, window.consoleFileStructure.name);
		}
	}	
}
BusinessGraph.prototype.make_pivot_from_dta = function(){
	var checkedlabels = document.getElementById('filetable').querySelectorAll('label.is-checked');
	if(checkedlabels.length>0){
		var data = null;
		var selectdata = {
			message: 'You must select a data file (ends with .dta)',
			timeout: 3000
		};	
		var tr = checkedlabels[0].parentElement.parentElement;
		var id = checkedlabels[0].id;
		var fullname = tr.children[1].innerText;
		var extension="";
		var i;
		if((i=fullname.indexOf("."))!=0){
			extension = fullname.substr(i);
		}
		var name ="";
		if(i>0){
			name = fullname.substr(0,i);
		}
		if(extension==".dta"){
			// get file name
			var dialog = document.getElementById('filenamedialog');
			dialog.querySelector('.mdl-textfield__input').value = name;
			if (! dialog.showModal) {
			  dialogPolyfill.registerDialog(dialog);
			}
			dialog.showModal();
			if(window.nameDialog_close!==undefined){
				dialog.querySelector('.close').removeEventListener('click',window.nameDialog_close,false);
			}
			window.nameDialog_close = function(dialog,dta_id) {
				if ((dialog.open!==undefined)&&(dialog.open))
					dialog.close();
				var newname = dialog.querySelector('.mdl-textfield__input').value;
				newname +=".pvt";
				var pivot={
						"input": dta_id,
						"pivotConfig": {
						"derivedAttributes": {},
						"hiddenAttributes": [],
						"menuLimit": 500,
						"cols": [],
						"rows": [],
						"vals": [],
						"exclusions": {},
						"inclusions": {},
						"unusedAttrsVertical": 85,
						"autoSortUnusedAttrs": false,
						"inclusionsInfo": {},
						"aggregatorName": "Count",
						"rendererName": "Table"
					},
					"dictionary": {},
					"globals": {
						"pvTitle": "Top Players (>={{ratio_thresold}}%MS) ranking for Automation Markets {{size}} {{currency}}{{display}}",
						"pvCurrency": "$",
						"pvDisplayUnit": "Bn",
						"pvInternalUnit": "Mn",
						"pvThresholdShare": "3",
						"pvLinesColor": "#393939",
						"pvFillColor": "#c0c0c0",
						"pvHeaderTextColor": "#393939",
						"pvColumnsTextColor": "#393939"
					}
				}
				var fileStructure = {name:newname,type:"application/json",content:pivot};
				this.oIOmodule.writeNewFile.bind(this.oIOmodule)(fileStructure);	
			}.bind(this,dialog,id);
			dialog.querySelector('.close').addEventListener('click', window.nameDialog_close);
			if(window.nameDialog_cancel!==undefined){
				dialog.querySelector('.close').removeEventListener('click',window.nameDialog_cancel,false);
			}
			window.nameDialog_cancel = function() {
			  dialog.close();			  
			}
			dialog.querySelector('.cancel').addEventListener('click', window.nameDialog_cancel);
		} else {
			data = selectdata;
		}
	}
	if (data!==null) // Display a message to the user using a Toast.
	{
		this.signInSnackbar.MaterialSnackbar.showSnackbar(data);		
	}	
}

BusinessGraph.prototype.rename_file = function(){
	var checkedlabels = document.getElementById('filetable').querySelectorAll('label.is-checked');
	if(checkedlabels.length>0){
		var tr = checkedlabels[0].parentElement.parentElement;
		var id = checkedlabels[0].id;
		var fullname = tr.children[1].innerText;
		var extension="";
		var i;
		if((i=fullname.indexOf("."))!=0){
			extension = fullname.substr(i);
		}
		var name ="";
		if(i>0){
			name = fullname.substr(0,i);
		}

		// get file name
		var dialog = document.getElementById('filenamedialog');
		dialog.querySelector('.mdl-textfield__input').value = name;
		if (! dialog.showModal) {
		  dialogPolyfill.registerDialog(dialog);
		}
		dialog.showModal();
		if(window.nameDialog_close!==undefined){
			dialog.querySelector('.close').removeEventListener('click',window.nameDialog_close,false);
		}
		window.nameDialog_close = function(dialog,id,name,extension) {
			if ((dialog.open!==undefined)&&(dialog.open))
				dialog.close();
			var name = dialog.querySelector('.mdl-textfield__input').value;
			name +=extension
			this.oIOmodule.renameFile.bind(this.oIOmodule)(id,name);	
		}.bind(this,dialog,id,name,extension);
		dialog.querySelector('.close').addEventListener('click', window.nameDialog_close);
		if(window.nameDialog_cancel!==undefined){
			dialog.querySelector('.close').removeEventListener('click',window.nameDialog_cancel,false);
		}
		window.nameDialog_cancel = function() {
		  dialog.close();
		}
		dialog.querySelector('.cancel').addEventListener('click', window.nameDialog_cancel);	
	}
}
	
BusinessGraph.prototype.save_codemirror_file = function(){  // actually ACE editor... CodeMirror was too low performance...
	if(window.consoleFileStructure!==undefined){
		if(window.oAceEditor!==undefined){
			var content = window.oAceEditor.getSession().getValue();
			window.oAceEditor.setReadOnly(true);
			window.consoleFileStructure.content = JSON.parse(content);
			document.body.style.cursor  = 'wait';		
			this.oIOmodule.feedback = function(){
					document.body.style.cursor  = 'default';	
					window.oAceEditor.setReadOnly(false);
				};	
			this.oIOmodule.writeExistingFile.bind(this.oIOmodule)(window.consoleFileStructure);
		}
	}
}

BusinessGraph.prototype.download_powerpoint = function(){
	if(this.checkSignedInWithMessage()){
		if(window.marimekkoFileStructure!==undefined){
			pptxMarimekko(window.marimekkoFileStructure.content,window.marimekkoFileStructure.name);
		}
	}	
}
BusinessGraph.prototype.download_punchcardsvg = function(){
	if(this.checkSignedInWithMessage()){
		// the punch card svg is in a frame ... harder to gain access to be implemented
	    firebase.database().ref('channels/'+this.channel+'/cmd').set(
		{
			type:"downloadpunchcard",
			timestamp: Date.now(),
		});
	}	
}
BusinessGraph.prototype.set_palette = function(){
	if(this.checkSignedInWithMessage()){
		palette.lastModified = Date.now();
		firebase.database().ref('palette/' + this.auth.currentUser.uid).set(palette);		
	}	
}

BusinessGraph.prototype.toggleTab = function(tab){
	var tablink = document.getElementById(tab);
	tablink.click();
};

BusinessGraph.prototype.activateMenuItems = function(tabCategory){
	var menulis = document.getElementById('ulmenu').querySelectorAll('.mdl-menu__item');
	for(var i=0; i<menulis.length;i++){
		menulis[i].style.display = "none";
	}
	
	menulis = document.getElementById('ulmenu').querySelectorAll('.'+tabCategory);	
	
	for(var i=0; i<menulis.length;i++){
		menulis[i].style.display = "inherit";
	}
};

BusinessGraph.prototype.destroyEditor = function(){
	/*
	if(window.oAceEditor!=undefined){
		window.oAceEditor.destroy();
		document.getElementById('console').innerHTML="";
	}
	*/
};

BusinessGraph.prototype.setEditor = function(){
	/*
	document.getElementById('console').innerHTML ='<div id="aceeditor" style="position:absolute;top:50px;right:0;bottom:0;left:0;"></div>';
	window.oAceEditor = ace.edit("aceeditor");
	window.oAceEditor.setTheme("ace/theme/monokai");
	window.oAceEditor.getSession().setMode("ace/mode/javascript");
	window.oAceEditor.getSession().setValue(vkbeautify.json(JSON.stringify(window.consoleFileStructure.content),4));	
	*/
};

BusinessGraph.prototype.do_togglecolors = function(){
	this.destroyEditor();
	this.activateMenuItems('togglecolors');
};

BusinessGraph.prototype.do_togglemarimekko = function(){
	this.destroyEditor();
	this.activateMenuItems('togglemarimekko');
};

BusinessGraph.prototype.do_togglepunchcard = function(){
	this.destroyEditor();
	var pf = document.getElementById('pivotframe');
	pf.src="blank.html";
	var pp = document.getElementById('punchcardframe');
	if(pp.src.indexOf("svgTemplate")!=-1){
		return;
	}	
	pp.src="svgTemplate.html?comuid="+getChannel();
	this.activateMenuItems('togglepunchcard');
};

BusinessGraph.prototype.do_togglefiles = function(){
	this.destroyEditor();
	this.activateMenuItems('togglefiles');
};

BusinessGraph.prototype.do_toggleconsole = function(){
	this.setEditor();
	this.activateMenuItems('toggleconsole');
};

BusinessGraph.prototype.do_togglepivot = function(){
	this.activateMenuItems('togglepivot');	
	var pp = document.getElementById('punchcardframe');
	pp.src="";
	var pf = document.getElementById('pivotframe');
	if(pf.src.indexOf("pivot")!=-1){
		return;
	}
	pf.src="pivot.html?comuid="+getChannel();
};

BusinessGraph.prototype.deleteFiles = function(){
	var checkedlabels = document.getElementById('filetable').querySelectorAll('label.is-checked');
	for(var i=0; i<checkedlabels.length;i++){
		var id = checkedlabels[i].id;
		this.oIOmodule.deleteFile.bind(this.oIOmodule)(id);
	}
};

BusinessGraph.prototype.diffFiles = function(){
};

BusinessGraph.prototype.pivotSaveExisting = function(){
	document.body.style.cursor  = 'wait';
	firebase.database().ref('channels/'+this.channel+'/cmd').set(
		{	
			type:"saveExisting",
			timestamp: Date.now(),
		});
	this.setHourGlassDialog();
};

BusinessGraph.prototype.pivot2marimekko = function(){
	firebase.database().ref('channels/'+this.channel+'/cmd').set(
		{	
			type:"pivot2marimekko",
			timestamp: Date.now(),
		});
};

BusinessGraph.prototype.pivot2punchcard = function(){
	firebase.database().ref('channels/'+this.channel+'/cmd').set(
		{	
			type:"pivot2punchcard",
			timestamp: Date.now(),
		});
};

BusinessGraph.prototype.save_palette_file = function(){
	// get file name
	var dialog = document.getElementById('filenamedialog');
	if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
	dialog.showModal();
	if(window.nameDialog_close!==undefined){
		dialog.querySelector('.close').removeEventListener('click',window.nameDialog_close,false);
	}
	window.nameDialog_close = function(dialog) {
		if ((dialog.open!==undefined)&&(dialog.open))
			dialog.close();
		var name = dialog.querySelector('.mdl-textfield__input').value;
		name +=".plt" // palette file extension
		var fileStructure = {name:name,content:palette,type:"application/json"};
		this.oIOmodule.writeNewFile.bind(this.oIOmodule)(fileStructure);	
    }.bind(this,dialog);
	dialog.querySelector('.close').addEventListener('click', window.nameDialog_close);
	if(window.nameDialog_cancel!==undefined){
		dialog.querySelector('.close').removeEventListener('click',window.nameDialog_cancel,false);
	}
	window.nameDialog_cancel = function() {
      dialog.close();
    }
	dialog.querySelector('.cancel').addEventListener('click', window.nameDialog_cancel);
}

BusinessGraph.prototype.pivotNew = function(){
	var pp = document.getElementById('punchcardframe');
	pp.src="";
	var pf = document.getElementById('pivotframe');
	pf.src="pivot.html?comuid="+getChannel();	
	firebase.database().ref('channels/'+this.channel+'/cmd').set(
		{
			type:"newpivot",
			timestamp: Date.now()
		}
	);
}

BusinessGraph.prototype.pivotSave = function(){
	// get file name
	var dialog = document.getElementById('filenamedialog');
	if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
	dialog.showModal();
	if(window.nameDialog_close!==undefined){
		dialog.querySelector('.close').removeEventListener('click',window.nameDialog_close,false);
	}
	window.nameDialog_close = function(dialog) {
		document.body.style.cursor  = 'wait';
		if ((dialog.open!==undefined)&&(dialog.open))
			dialog.close();
		var name = dialog.querySelector('.mdl-textfield__input').value;
		name +=".pvt" // pivot file extension
		if(name!=""){
			firebase.database().ref('channels/'+this.channel+'/cmd').set(
				{	
					type:"save",
					timestamp: Date.now(),
					name:name,
					filetype:"application/json"
				}
			);
			this.setHourGlassDialog();
		}		
    }.bind(this,dialog);
	dialog.querySelector('.close').addEventListener('click', window.nameDialog_close);
	if(window.nameDialog_cancel!==undefined){
		dialog.querySelector('.close').removeEventListener('click',window.nameDialog_cancel,false);
	}
    window.nameDialog_cancel = function() {
      document.getElementById('filenamedialog').close();
    }
	dialog.querySelector('.cancel').addEventListener('click', window.nameDialog_cancel);
};

BusinessGraph.prototype.pivotLoad = function(){
	document.body.style.cursor  = 'wait';
	// get first selected file
	var data = null;
	var selectpivot = {
		message: 'You must select a pivot file (ends with .pvt)',
		timeout: 3000
	};			
	var checkedlabels = document.getElementById('filetable').querySelectorAll('label.is-checked');
	if(checkedlabels.length>0){
		var tr = checkedlabels[0].parentElement.parentElement;
		var id = checkedlabels[0].id;
		if((id!="")&&(tr.children[1].innerText.endsWith('.pvt'))){
			firebase.database().ref('channels/'+this.channel+'/cmd').set(
				{
					type:"load",
					timestamp: Date.now(),
					fileID: id
				}
			);
			this.toggleTab('togglepivot');
			this.setHourGlassDialog();
		} else {			
			data = selectpivot;
		}
	} else {		
		data = selectpivot;
	}
	if (data!==null) // Display a message to the user using a Toast.
	{
		this.signInSnackbar.MaterialSnackbar.showSnackbar(data);
		document.body.style.cursor  = 'default';
	}
}

BusinessGraph.prototype.load_palette_file = function(){	
	// get first selected file
	var data = null;
	var selectpivot = {
		message: 'You must select a palette file (ends with .plt)',
		timeout: 3000
	};			
	var checkedlabels = document.getElementById('filetable').querySelectorAll('label.is-checked');
	if(checkedlabels.length>0){
		var tr = checkedlabels[0].parentElement.parentElement;
		var id = checkedlabels[0].id;
		if((id!="")&&(tr.children[1].innerText.endsWith('.plt'))){
			this.oIOmodule.readFile(id,function(fileStructure){
				var palette = fileStructure.content;
				if(palette.hue!==undefined) setHue(palette.hue,true); else setHue(0,true);
				if(palette.distance!==undefined) setDistance(palette.distance,true); else setDistance(0.5,true);
				if(palette.variation!==undefined) setVariation(palette.variation); else setVariation('default');
			});
			this.toggleTab('togglecolors');
		} else {			
			data = selectpivot;
		}
	} else {		
		data = selectpivot;
	}
	if (data!==null) // Display a message to the user using a Toast.
		this.signInSnackbar.MaterialSnackbar.showSnackbar(data);
}

BusinessGraph.prototype.marimekkoLoad = function(){	
	document.body.style.cursor  = 'wait';
	// get first selected file
	var data = null;
	var selectmarimekko = {
		message: 'You must select a marimekko file (ends with .mmk)',
		timeout: 3000
	};			
	var checkedlabels = document.getElementById('filetable').querySelectorAll('label.is-checked');
	if(checkedlabels.length>0){
		var tr = checkedlabels[0].parentElement.parentElement;
		var id = checkedlabels[0].id;
		if((id!="")&&(tr.children[1].innerText.endsWith('.mmk'))){
			// load the marimekko file and render it
			window.marimekkoFileStructure = {id:id};
			this.oIOmodule.readFile.bind(this.oIOmodule)(id,function(fileStructure){
				window.marimekkoFileStructure = fileStructure;
				svgMarimekko(window.marimekkoFileStructure.content, document.getElementById('marimekkoframe'));
				document.body.style.cursor  = 'default';
			});
			this.toggleTab('togglemarimekko');
		} else {			
			data = selectmarimekko;
		}
	} else {		
		data = selectmarimekko;
	}
	if (data!==null) // Display a message to the user using a Toast.
	{
		this.signInSnackbar.MaterialSnackbar.showSnackbar(data);
		document.body.style.cursor  = 'default';
	}
}

BusinessGraph.prototype.punchcardLoad = function(){	
	document.body.style.cursor  = 'wait';
	// get first selected file
	var data = null;
	var selectpunchcard = {
		message: 'You must select a punch card file (ends with .pcd)',
		timeout: 3000
	};			
	var checkedlabels = document.getElementById('filetable').querySelectorAll('label.is-checked');
	if(checkedlabels.length>0){
		var tr = checkedlabels[0].parentElement.parentElement;
		var id = checkedlabels[0].id;
			// load the punch card file and render it
		window.punchcardFileStructure = {id:id};
		if((id!="")&&(tr.children[1].innerText.endsWith('.pcd'))){
			firebase.database().ref('channels/'+this.channel+'/cmd').set(
				{
					type:"loadpunchcard",
					timestamp: Date.now(),
					fileID: id
				}
			);
			this.toggleTab('togglepunchcard');
			this.setHourGlassDialog();			
		} else {			
			data = selectpunchcard;
		}
	} else {		
		data = selectpunchcard
	}
	if (data!==null) // Display a message to the user using a Toast.
	{
		this.signInSnackbar.MaterialSnackbar.showSnackbar(data);
		document.body.style.cursor  = 'default';
	}
}

BusinessGraph.prototype.showFile = function(){
	// get first selected file
	var checkedlabels = document.getElementById('filetable').querySelectorAll('label.is-checked');
	if((checkedlabels!==undefined)&&(checkedlabels.length>0)){
		var id = checkedlabels[0].id;
		if(id!=""){
			window.consoleFileStructure={id:id};	
			document.body.style.cursor  = 'wait';
			this.oIOmodule.readFile.bind(this.oIOmodule)(id, function(fileStructure){
				window.consoleFileStructure=fileStructure;
				document.getElementById('console').innerHTML ='<div id="aceeditor" style="position:absolute;top:50px;right:0;bottom:0;left:0;"></div>';
				window.oAceEditor = ace.edit("aceeditor");
				window.oAceEditor.setTheme("ace/theme/monokai");
				window.oAceEditor.getSession().setMode("ace/mode/javascript");
				window.oAceEditor.getSession().setValue(vkbeautify.json(JSON.stringify(consoleFileStructure.content),4));
				document.body.style.cursor  = 'default';
				this.toggleTab('toggleconsole');
			}.bind(this));
		}
	}
};

BusinessGraph.prototype.UUID = function(){
	return aesjs.utils.hex.fromBytes(crypto.getRandomValues(new Uint8Array(10)));
};

BusinessGraph.prototype.readSingleFile = function (evt) {
    //Retrieve the first (and only!) File from the FileList object
    var f = evt.target.files[0];
	document.getElementById("uploadFileName").value = f.name;
	this.filename=f.name;

    if (f) {
      var r = new FileReader();
      r.onload = function(e) { 
	    var fileStructure={name:f.name,content:e.target.result,lastModified:f.lastModified,type:f.type,size:f.size}
		window.consoleFileStructure=fileStructure;
		document.getElementById('console').innerHTML ='<div id="aceeditor" style="position:absolute;top:50px;right:0;bottom:0;left:0;"></div>';
		window.oAceEditor = ace.edit("aceeditor");
		window.oAceEditor.setTheme("ace/theme/monokai");
		window.oAceEditor.getSession().setMode("ace/mode/javascript");
		window.oAceEditor.getSession().setValue(vkbeautify.json(consoleFileStructure.content,4));
	    /*
		var txt = document.getElementById('txt');
	    var contents = e.target.result;
	   
		txt.innerText=contents;
		 */
		this.filecontent=fileStructure.content;
		this.filelastModified=f.lastModified;
		this.filetype=f.type;
		this.filesize=f.size;
		
      }.bind(this);
      r.readAsText(f);
    } else { 
      alert("Failed to load file");
    }
};

BusinessGraph.prototype.menuSaveFile = function(){
	if((this.checkSignedInWithMessage())&&(this.filename!==undefined)){
		if((this.filetype==undefined)||(this.filetype=="")){
			if((this.filename.endsWith('mmk'))||(this.filename.endsWith('pvt'))||(this.filename.endsWith('plt'))||(this.filename.endsWith('dta'))){
				this.filetype='application/json';
			}
		}
		var content=this.filecontent;
		if(this.filetype=='application/json'){
			content = JSON.parse(content);
		}
		var fileStructure = {name:this.filename,type:this.filetype,content:content};
		this.oIOmodule.writeNewFile.bind(this.oIOmodule)(fileStructure);	
	}
};

// Sets up shortcuts to Firebase features and initiate firebase auth.
BusinessGraph.prototype.initFirebase = function() {
  // Shortcuts to Firebase SDK features.
  this.auth = firebase.auth();
  this.database = firebase.database();
  this.storage = firebase.storage();
  // Initiates Firebase auth and listen to auth state changes.
  this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
};

// Signs-in Friendly Chat.
BusinessGraph.prototype.signIn = function() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  var provider = new firebase.auth.GoogleAuthProvider();
  this.auth.signInWithPopup(provider);
};

// Signs-out of Friendly Chat.
BusinessGraph.prototype.signOut = function() {
  // Sign out of Firebase.
  this.auth.signOut();
};

// Triggers when the auth state change for instance when the user signs-in or signs-out.
BusinessGraph.prototype.onAuthStateChanged = function(user) {
  var mainmenu=document.getElementById('mainmenu');
  if (user) { // User is signed in!
	this.oIOmodule = new IOmodule({auth:this.auth,database:this.database,storage:this.storage});
	mainmenu.setAttribute('style', '');
    // Get profile pic and user's name from the Firebase user object.
    var profilePicUrl = user.photoURL;
    var userName = user.displayName;

    // Set the user's profile pic and name.
    this.userPic.style.backgroundImage = 'url(' + (profilePicUrl || 'images/profile_placeholder.png') + ')';
    this.userName.textContent = userName;

    // Show user's profile and sign-out button.
    this.userName.removeAttribute('hidden');
    this.userPic.removeAttribute('hidden');
    this.signOutButton.removeAttribute('hidden');

    // Hide sign-in button.
    this.signInButton.setAttribute('hidden', 'true');
	
	// monitor files update
	var filelist = firebase.database().ref('users/' + this.auth.currentUser.uid+'/files');
	filelist.on('value', function(files){
		this.displayFiles(files);
	}.bind(this));

  } else { // User is signed out!
    mainmenu.setAttribute('style', 'display:none;');
    // Hide user's profile and sign-out button.
    this.userName.setAttribute('hidden', 'true');
    this.userPic.setAttribute('hidden', 'true');
    this.signOutButton.setAttribute('hidden', 'true');

    // Show sign-in button.
    this.signInButton.removeAttribute('hidden');
  }
};

// Returns true if user is signed-in. Otherwise false and displays a message.
BusinessGraph.prototype.checkSignedInWithMessage = function() {
  // Return true if the user is signed in Firebase
  if (this.auth.currentUser) {
    return true;
  }

  // Display a message to the user using a Toast.
  var data = {
    message: 'You must sign-in first',
    timeout: 2000
  };
  this.signInSnackbar.MaterialSnackbar.showSnackbar(data);
  return false;
};

// Resets the given MaterialTextField.
BusinessGraph.resetMaterialTextfield = function(element) {
  element.value = '';
  element.parentNode.MaterialTextfield.boundUpdateClassesHandler();
};

// display the file list in the UI
BusinessGraph.prototype.displayFiles= function (files){
	var file_list_container = document.getElementById('file_list_container');
	var html = "<input oninput=\"w3.filterText('#filetable','.frow',this.value)\" placeholder=\"... file list filter ...\">";
	html += '<table class="mdl-data-table mdl-shadow--2dp" id="filetable">';
	html += '<thead>';
	html += '<tr>';
	html += '<th>';
    html += '<label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect mdl-data-table__select" for="table-header" id="table-lable-header" >';
    html += '<input type="checkbox" id="table-header" class="mdl-checkbox__input" />';
    html += '</label>';
    html += '</th>';
	html += '<th class="mdl-data-table__cell--non-numeric" style="cursor:pointer" onclick="w3.sortHTML(\'#filetable\', \'.frow\', \'td:nth-child(2)\')" title="Click to Sort">File Name</th>';
	html += '<th class="mdl-data-table__cell--non-numeric" style="cursor:pointer" onclick="w3.sortDate(\'#filetable\', \'.frow\', \'td:nth-child(3)\')" title="Click to Sort">Date</th>';
	html += '<th>Size</th>';
	html += '<th class="mdl-data-table__cell--non-numeric">Type</th>';
	html += '<th class="mdl-data-table__cell--non-numeric">UUID</th>';
	html += '</tr>';
	html += '</thead>';
	html += '<tbody>';
	if(files.val()!=null){
		var filekeys = Object.keys(files.val());
		for(var i=0; i<filekeys.length; i++){
			html += '<tr class="frow">';
			html += '<td>';
			html += '<label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect mdl-data-table__select" for="row['+(i+1)+']" id="'+filekeys[i]+'">';
            html += '<input type="checkbox" id="row['+(i+1)+']" class="mdl-checkbox__input" />'
			html += '</label>';
			html += '</td>';
			html += '<td class="mdl-data-table__cell--non-numeric">';
			html += files.val()[filekeys[i]].name;
			html += '</td>';
			html += '<td class="mdl-data-table__cell--non-numeric">';
			html += (new Date(files.val()[filekeys[i]].lastModified)).toGMTString();
			html += '</td>';
			html += '<td>';
			html += files.val()[filekeys[i]].size;
			html += '</td>';
			html += '<td class="mdl-data-table__cell--non-numeric">';
			html += files.val()[filekeys[i]].type;
			html += '</td>';
			html += '<td class="mdl-data-table__cell--non-numeric">';
			html += filekeys[i];
			html += '</td>';
			html += '</tr>';
		}
		html += '</tbody>';
		html += '</table>';
		file_list_container.innerHTML=html;
		var table = document.getElementById('filetable');
		componentHandler.upgradeElement(table);
		var headerCheckbox = table.querySelector('thead .mdl-data-table__select input');
		componentHandler.upgradeElement(document.getElementById('table-lable-header'));
		var boxes = table.querySelectorAll('tbody .mdl-data-table__select');
		for (var i = 0, length = boxes.length; i < length; i++){
			componentHandler.upgradeElement(boxes[i]);
		}
		var headerCheckHandler = function(event) {
			if (event.target.checked) {
				for (var i = 0, length = boxes.length; i < length; i++) {
					if(boxes[i].parentElement.parentElement.style.display!='none'){
						boxes[i].MaterialCheckbox.check();
						boxes[i].MaterialCheckbox.updateClasses_();
					}
				}
			} else {
				for (var i = 0, length = boxes.length; i < length; i++) {
					if(boxes[i].parentElement.parentElement.style.display!='none'){
						boxes[i].MaterialCheckbox.uncheck();
						boxes[i].MaterialCheckbox.updateClasses_();
					}
				}
			}
		};
		headerCheckbox.addEventListener('change', headerCheckHandler);
	}
};

// A loading image URL.
BusinessGraph.LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif';

// Checks that the Firebase SDK has been correctly setup and configured.
BusinessGraph.prototype.checkSetup = function() {
  if (!window.firebase || !(firebase.app instanceof Function) || !window.config) {
    window.alert('You have not configured and imported the Firebase SDK. ' +
        'Make sure you go through the codelab setup instructions.');
  } else if (config.storageBucket === '') {
    window.alert('Your Cloud Storage bucket has not been enabled. Sorry about that. This is ' +
        'actually a Firebase bug that occurs rarely. ' +
        'Please go and re-generate the Firebase initialisation snippet (step 4 of the codelab) ' +
        'and make sure the storageBucket attribute is not empty. ' +
        'You may also need to visit the Storage tab and paste the name of your bucket which is ' +
        'displayed there.');
  }
};

BusinessGraph.prototype.setCookie = function (cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

BusinessGraph.prototype.getCookie = function (cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};

BusinessGraph.prototype.animateHourGlass = function(hg,context) {
	context.state = ! context.state;
	var hg_e = document.querySelector("#"+hg+"_e");
	var hg_f = document.querySelector("#"+hg+"_f");
	if(context.state){
		hg_e.style="display:none;";
		hg_f.style="display:initial;";
	} else {
		hg_e.style="display:initial;";
		hg_f.style="display:none;";
	}
}

BusinessGraph.prototype.startHourGlass = function(hg,context){
	// context.state must be set to true at start
	// return setInterval(this.animateHourGlass.bind(null,hg,context), 1000);
	return null;
}

BusinessGraph.prototype.stopHourGlass = function(handle){
	clearInterval(handle);
}

BusinessGraph.prototype.setHourGlassDialog  = function(){
	window.dialogHourGlass = document.getElementById('waithourglass');
	if (! window.dialogHourGlass.showModal) {
      		dialogPolyfill.registerDialog(window.dialogHourGlass);
    	}
	window.dialogHourGlass.showModal();
	// window.swaithourglass = {state:true};
	// window.hwaithourglass = this.startHourGlass("waithourglass",window.swaithourglass);
}

window.onload = function() {
  window.BusinessGraph = new BusinessGraph();
  var channel = getChannel();
  
  /* activate file menu */
  
  BusinessGraph.toggleTab('togglefiles');
  
  /* command feedback */
  
  var command = firebase.database().ref('channels/' + channel+'/cmd/done');
  command.on('value', function(val){	
	var done = val.val();
	if(done!==null){
		document.body.style.cursor  = 'default';
		if((typeof done.result === 'object')&&(done.result.message!==undefined)){
			var data = {
				message: done.result.message,
				timeout: 3000
			};
			this.signInSnackbar.MaterialSnackbar.showSnackbar(data);
		}
		if((window.dialogHourGlass!=undefined)&&(window.dialogHourGlass!=null)){
			// clearInterval(window.hwaithourglass);
			window.dialogHourGlass.close();
			delete window.dialogHourGlass;
			// delete window.hwaithourglass;
			// delete window.swaithourglass;			
		}
		// make sure iframe have the right size
		var pf = document.getElementById('pivotframe');
		pf.height = pf.contentWindow.document.body.scrollWidth;
		pf.width = pf.contentWindow.document.body.scrollHeight;			
		var pp = document.getElementById('punchcardframe');
		pp.height = pp.contentWindow.document.body.scrollWidth;
		pp.width = pp.contentWindow.document.body.scrollHeight;			
	}	
  }.bind(window.BusinessGraph));
};

function getChannel(){
  var channel = window.BusinessGraph.getCookie('channel');
  if (channel==""){
	  channel = window.BusinessGraph.UUID();
	  window.BusinessGraph.setCookie('channel',channel,365*10);
  }
  window.BusinessGraph.channel = channel;
  return channel;	
}

