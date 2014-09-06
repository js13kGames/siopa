'use strict';

function Siopa(startID){
	this.sceneBox = document.createElement('div');
	this.sceneBox.id = 'sceneBox';
	document.body.appendChild(this.sceneBox);
	
	this.activateScene(startID);
}
Siopa.prototype.activateScene = function(sceneID){
	var siopa = this;
	var scene = document.getElementById(sceneID);
	this.sceneBox.innerHTML = scene.innerHTML;

	var actions = this.sceneBox.getElementsByTagName('action');
	for(var i = 0; i < actions.length; i++){
		actions[i].onclick = function(){
			siopa.activateScene(this.getAttribute('to'));
		}
	}

};

