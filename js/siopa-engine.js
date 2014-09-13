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

				if(!siopa.isActionActive(action)){
					continue;
				}

				var item = document.createElement('entityMenuItem');
				item.action = action;
				item.innerHTML = action.innerHTML;
				menu.appendChild(item);
			}
			document.body.appendChild(menu);

			var menuRect = menu.getBoundingClientRect();
			menu.style.left = Math.floor(event.clientX - .5*menuRect.width) + 'px';
			menu.style.top = Math.floor(event.clientY) + 'px';

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
					siopa.states[offs[i]] = false;
				}
			}
			siopa.updateActionColors();

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
	this.updateActionColors();
	this.currentScene = sceneID;
	if(this.menu){
		document.body.removeChild(this.menu);
	}
};

Siopa.prototype.isActionActive = function(action){
	var on = action.getAttribute('on');
	if(on && !this.states[on]){
		return false;
	}
	var off = action.getAttribute('off');
	if(off && this.states[off]){
		return false;
	}
	return true;
}

Siopa.prototype.updateActionColors = function(){
	var entities = this.sceneBox.getElementsByTagName('entity');
	for(var i = 0; i < entities.length; i++){
		var entity = entities[i];
		var actions = entity.getElementsByTagName('action');
		var active = false;
		for(var j = 0; j < actions.length; j++){
			var action = actions[j];
			if(this.isActionActive(action)){
				active = true;
				break;
			}
		}
		if(active){
			entity.className = '';
		}else{
			entity.className = 'inactive';
		}
	}
}

Siopa.prototype.clearMenu = function(){
	if(this.menu){
		// Band-aid. This seems to crash on scene end sometimes.
		try{
			document.body.removeChild(this.menu);
		}catch(err){}
		this.menu = null;
	}
};
