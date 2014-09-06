'use strict';

function Siopa(startID){
	var siopa = this;

	this.sceneBox = document.createElement('div');
	this.sceneBox.id = 'sceneBox';
	document.body.appendChild(this.sceneBox);
	
	document.querySelector('body').addEventListener('click', function(event){
		var element = event.target;
		if(event.target.tagName.toLowerCase() == 'action'){
			var to = element.getAttribute('to');
			if(to){
				siopa.activateScene(to);
			}
			var text = element.getElementsByTagName('actionText')[0];
			siopa.eventBox.innerHTML = text.innerHTML;
		}
	});

	this.activateScene(startID);
}
Siopa.prototype.activateScene = function(sceneID){
	var siopa = this;
	var scene = document.getElementById(sceneID);
	this.sceneBox.innerHTML = scene.innerHTML;

	this.eventBox = document.createElement('div')
	this.eventBox.id = 'eventBox';
	this.sceneBox.appendChild(this.eventBox);
};

