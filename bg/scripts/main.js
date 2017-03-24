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
  this.menu_save_file = document.getElementById('menu_save_file');
  this.uploadFile=document.getElementById('uploadFile');
  this.menu_show = document.getElementById('menu_show');
  this.menu_load_pivot = document.getElementById('menu_load_pivot');
  this.menu_load_marimekko = document.getElementById('menu_load_marimekko');
  // this.menu_diff = document.getElementById('menu_diff');
  this.menu_delete = document.getElementById('menu_delete');
  this.menu_pivot_save = document.getElementById('menu_pivot_save');
  this.menu_pivot_save_existing = document.getElementById('menu_pivot_save_existing');
  this.menu_pivot2marimekko = document.getElementById('menu_pivot2marimekko');
  
  // TAB elements
  this.togglepivot = document.getElementById('togglepivot');
  this.togglemarimekko = document.getElementById('togglemarimekko');
  this.togglefiles = document.getElementById('togglefiles');
  this.toggleconsole = document.getElementById('toggleconsole');
  
  this.signOutButton.addEventListener('click', this.signOut.bind(this));
  this.signInButton.addEventListener('click', this.signIn.bind(this));
  this.menu_save_file.addEventListener('click', this.menuSaveFile.bind(this));
  this.uploadFile.addEventListener('change', this.readSingleFile.bind(this));
  this.menu_delete.addEventListener('click', this.deleteFiles.bind(this));
  this.menu_show.addEventListener('click', this.showFile.bind(this));  
  // this.menu_diff.addEventListener('click', this.diffFiles.bind(this));  
  this.menu_pivot_save.addEventListener('click', this.pivotSave.bind(this));
  this.menu_pivot_save_existing.addEventListener('click', this.pivotSaveExisting.bind(this));
  this.menu_load_pivot.addEventListener('click', this.pivotLoad.bind(this));
  this.menu_load_marimekko.addEventListener('click', this.marimekkoLoad.bind(this));
  this.menu_pivot2marimekko.addEventListener('click', this.pivot2marimekko.bind(this));

  // TAB listners  
  this.togglefiles.addEventListener('click', this.do_togglefiles.bind(this));
  this.toggleconsole.addEventListener('click', this.do_toggleconsole.bind(this));
  this.togglepivot.addEventListener('click', this.do_togglepivot.bind(this));
  this.togglemarimekko.addEventListener('click', this.do_togglemarimekko.bind(this));
  
  this.initFirebase();
};

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

BusinessGraph.prototype.do_togglemarimekko = function(){
	this.activateMenuItems('togglemarimekko');
};

BusinessGraph.prototype.do_togglefiles = function(){
	this.activateMenuItems('togglefiles');
};

BusinessGraph.prototype.do_toggleconsole = function(){
	this.activateMenuItems('toggleconsole');
};

BusinessGraph.prototype.do_togglepivot = function(){
	this.activateMenuItems('togglepivot');
	var pf = document.getElementById('pivotframe');
	pf.height = pf.contentWindow.document.body.scrollWidth;
	pf.width = pf.contentWindow.document.body.scrollHeight;
};

BusinessGraph.prototype.deleteFiles = function(){
};

BusinessGraph.prototype.diffFiles = function(){
};

BusinessGraph.prototype.pivotSaveExisting = function(){
	firebase.database().ref('channels/'+this.channel+'/cmd').set(
		{	
			type:"saveExisting",
			timestamp: Date.now(),
		});
};

BusinessGraph.prototype.pivot2marimekko = function(){
	firebase.database().ref('channels/'+this.channel+'/cmd').set(
		{	
			type:"pivot2marimekko",
			timestamp: Date.now(),
		});
};

BusinessGraph.prototype.pivotSave = function(){
	// get file name
	var dialog = document.getElementById('filenamedialog');
	if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
	dialog.showModal();
	dialog.querySelector('.close').addEventListener('click', function(dialog) {
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
		}		
    }.bind(this,dialog));
	dialog.querySelector('.cancel').addEventListener('click', function() {
      dialog.close();
    });
};

BusinessGraph.prototype.pivotLoad = function(){	
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
			firebase.database().ref('files/'+id).once('value').then( function(hfile){
				svgMarimekko(JSON.parse(hfile.val().content), document.getElementById('marimekkoframe'));
			});
			this.toggleTab('togglemarimekko');
		} else {			
			data = selectmarimekko;
		}
	} else {		
		data = selectmarimekko;
	}
	if (data!==null) // Display a message to the user using a Toast.
		this.signInSnackbar.MaterialSnackbar.showSnackbar(data);
}

BusinessGraph.prototype.showFile = function(){
	// get first selected file
	var checkedlabels = document.getElementById('filetable').querySelectorAll('label.is-checked');
	var id = checkedlabels[0].id;
	if(id!=""){
		firebase.database().ref('files/'+id).once('value').then( function(hfile){
			if(window.oCodeMirror!==undefined){
				window.oCodeMirror.toTextArea();
				delete window.oCodeMirror;
			}
			var content = hfile.val().content;
			if(hfile.val().type=="application/json"){
				content = vkbeautify.json(content, 4 );
				if(content.length<200000){
					document.getElementById('txt').innerHTML = "<textarea class='codemirror'></textarea>"				
					window.oCodeMirror = CodeMirror.fromTextArea(document.getElementById('txt').querySelector('.codemirror'), {
							mode: "javascript",
							lineNumbers: true,
							lineWrapping: true,
							matchBrackets: true,
							foldGutter: true,
							gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
							extraKeys: {"Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); }},
							continueComments: "Enter",	
					});
					oCodeMirror.getDoc().setValue(content);	
				} else {
					document.getElementById('txt').innerText = content;		
				}
			} else {				
				document.getElementById('txt').innerText = content;				
			}
			this.toggleTab('toggleconsole');
			if(window.oCodeMirror!=undefined){
				oCodeMirror.setCursor(1,1);
			}
		}.bind(this));
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
		var txt = document.getElementById('txt');
	    var contents = e.target.result;
		txt.innerText=contents;
		this.filecontent=contents;
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
			if(this.filename.endsWith('mmk')){
				this.filetype='application/json';
			}
		}
		var uuid = this.UUID();		
		firebase.database().ref('users/' + this.auth.currentUser.uid+"/files/"+uuid).set(
			{	name:this.filename,
				lastModified:this.filelastModified,
				type:this.filetype,
				size:this.filesize
			}
		);
		firebase.database().ref('files/'+uuid).set(
			{	name:this.filename,
				content:this.filecontent,
				lastModified:this.filelastModified,
				type:this.filetype
			}
		);			
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
	var html = '<table class="mdl-data-table mdl-shadow--2dp" id="filetable">';
	html += '<thead>';
	html += '<tr>';
	html += '<th>';
    html += '<label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect mdl-data-table__select" for="table-header" id="table-lable-header" >';
    html += '<input type="checkbox" id="table-header" class="mdl-checkbox__input" />';
    html += '</label>';
    html += '</th>';
	html += '<th class="mdl-data-table__cell--non-numeric">File Name</th>';
	html += '<th class="mdl-data-table__cell--non-numeric">Date</th>';
	html += '<th>Size</th>';
	html += '<th class="mdl-data-table__cell--non-numeric">Type</th>';
	html += '<th class="mdl-data-table__cell--non-numeric">UUID</th>';
	html += '</tr>';
	html += '</thead>';
	html += '<tbody>';
	if(files.val()!=null){
		var filekeys = Object.keys(files.val());
		for(var i=0; i<filekeys.length; i++){
			html += '<tr>';
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
					boxes[i].MaterialCheckbox.check();
					boxes[i].MaterialCheckbox.updateClasses_();
				}
			} else {
				for (var i = 0, length = boxes.length; i < length; i++) {
					boxes[i].MaterialCheckbox.uncheck();
					boxes[i].MaterialCheckbox.updateClasses_();
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

window.onload = function() {
  window.BusinessGraph = new BusinessGraph();
  var channel = window.BusinessGraph.getCookie('channel');
  if (channel==""){
	  channel = window.BusinessGraph.UUID();
	  window.BusinessGraph.setCookie('channel',channel,365*10);
  }
  window.BusinessGraph.channel = channel;
  document.getElementById('pivotframe').src="pivot.html?comuid="+channel;
  window.BusinessGraph.toggleTab('togglepivot');
};
