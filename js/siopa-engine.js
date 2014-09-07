'use strict';

function Siopa(startID){
	var siopa = this;

	this.sceneBox = document.createElement('div');
	this.sceneBox.id = 'sceneBox';
	document.body.appendChild(this.sceneBox);

	this.states = {};
	this.currentScene = null;
	
	document.body.addEventListener('click', function(event){
		var element = event.target;

		siopa.clearMenu();

		if(element.tagName.toLowerCase() == 'entity'){
			var actions = element.getElementsByTagName('action');
			var menu = document.createElement('entityMenu');
			for(var i = 0; i < actions.length; i++){
				var action = actions[i];

				var on = action.getAttribute('on');
				if(on && !siopa.states[on]){
					continue;
				}
				var off = action.getAttribute('off');
				if(off && siopa.states[off]){
					continue;
				}

				var item = document.createElement('entityMenuItem');
				item.action = action;
				item.innerHTML = action.innerHTML;
				menu.appendChild(item);
			}
			document.body.appendChild(menu);

			var menuRect = menu.getBoundingClientRect();
			menu.style.left = event.clientX - .5*menuRect.width;
			menu.style.top = event.clientY;

			siopa.menu = menu;
		}

		if(element.tagName.toLowerCase() == 'entitymenuitem'){
			var action = element.action;

			var evalCode = action.getAttribute('eval');
			if(evalCode){
				var result = eval(evalCode);
				if(result === false){
					return;
				}
			}

			var show = action.getAttribute('show');
			var texts = siopa.sceneBox.getElementsByTagName('actionText');
			for(var i = 0; i < texts.length; i++){
				if(texts[i].getAttribute('name') == show){
					texts[i].style.display = 'block';
				}else{
					texts[i].style.display = 'none';
				}
			}

			var turnon = action.getAttribute('turnon');
			if(turnon){
				var ons = turnon.split(' ');
				for(var i = 0; i < ons.length; i++){
					siopa.states[ons[i]] = true;
				}
			}
			var turnoff = action.getAttribute('turnoff');
			if(turnoff){
				var offs = turnoff.split(' ');
				for(var i = 0; i < offs.length; i++){
					siopa.states[offs[i]] = true;
				}
				siopa.states[turnoff] = false;
			}
			siopa.updateRequireBlocks();

			var to = action.getAttribute('goto');
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
	this.updateRequireBlocks();
	this.currentScene = sceneID;
};

Siopa.prototype.updateRequireBlocks = function(){
	var requires = this.sceneBox.getElementsByTagName('require');
	for(var i = 0; i < requires.length; i++){
		var require = requires[0];
		var on = require.getAttribute('on');
		var off = require.getAttribute('off');
		if(on &&!this.states[on]){
			require.style.display = 'none';
		}else if(off && this.states[off]){
			require.style.display = 'none';
		}else{
			require.style.display = 'block';
		}
	}
}

Siopa.prototype.clearMenu = function(){
	if(this.menu){
		document.body.removeChild(this.menu);
		this.menu = null;
	}
};
