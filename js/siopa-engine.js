'use strict';

function Siopa(startID){
	var siopa = this;

	this.sceneBox = document.createElement('div');
	this.sceneBox.id = 'sceneBox';
	document.body.appendChild(this.sceneBox);
	
	document.body.addEventListener('click', function(event){
		var element = event.target;

		siopa.clearMenu();

		if(element.tagName.toLowerCase() == 'entity'){
			var actions = element.getElementsByTagName('action');
			var menu = document.createElement('entityMenu');
			for(var i = 0; i < actions.length; i++){
				var action = actions[i];
				var item = document.createElement('entityMenuItem');
				item.action = action;
				item.innerHTML = action.innerHTML;
				menu.appendChild(item);
			}
			document.body.appendChild(menu);

			var entityRect = element.getBoundingClientRect();
			var menuRect = menu.getBoundingClientRect();

			menu.style.left = event.clientX - .5*menuRect.width;
			//menu.style.top = event.clientY - .5*menuRect.height;
			menu.style.top = event.clientY;

			siopa.menu = menu;
		}

		if(element.tagName.toLowerCase() == 'entitymenuitem'){
			var to = element.action.getAttribute('to');
			if(to){
				siopa.activateScene(to);
			}
		}
	});

	document.body.addEventListener('keydown', function(event){
		if(event.keyCode == 27){
			siopa.clearMenu();
		}
	});

	this.activateScene(startID);
}
Siopa.prototype.activateScene = function(sceneID){
	var scene = document.getElementById(sceneID);
	this.sceneBox.innerHTML = scene.innerHTML;
};
Siopa.prototype.clearMenu = function(){
	if(this.menu){
		document.body.removeChild(this.menu);
		this.menu = null;
	}
};
