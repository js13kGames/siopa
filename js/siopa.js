'use strict';

var siopa;
function load(){
	siopa = new Siopa('start');
}

function beginAir(save){
	var time = 1000*60*1.5;
	if(save){
		time = 1000*45;
	}
	var suffix = 'Death';
	if(save){
		suffix = 'Life';
	}
	siopa.activateScene('livingRoom');
	siopa.states['inside'] = true;
	setTimeout(function(){
		if(siopa.states['inside']){
			siopa.activateScene('inside' + suffix);
		}else if(siopa.states['outside']){
			siopa.activateScene('outside' + suffix);
		}else if(siopa.states['shelter']){
			siopa.activateScene('shelter' + suffix);
		}
	}, time);
}

function beginWater(save){
	var time = 1000*60*1.5;
	if(save){
		time = 1000*45;
	}
	var suffix = 'Death';
	if(save){
		suffix = 'Life';
	}
	siopa.activateScene('onDeck');
	setTimeout(function(){
		if(siopa.currentScene === 'onDeck'){
			siopa.activateScene('onDeck' + suffix);
		}else{
			siopa.activateScene('belowDeck' + suffix);
		}
	}, time);
}

var fireTimer;
var fireSave;
function beginFire(save){
	var time = 1000*60*1.5;
	if(save){
		time = 1000*45;
	}
	var suffix = 'Death';
	if(save){
		suffix = 'Life';
	}
	fireSave = save;
	siopa.activateScene('inTent');
	fireTimer = setTimeout(function(){
		if(siopa.currentScene === 'driving'){
			siopa.activateScene('jeep' + suffix);
		}else{
			if(Math.random() < .5){
				siopa.activateScene('branch' + suffix);
			}else{
				siopa.activateScene('smoke' + suffix);
			}
		}
	}, time);
}
function explodeJeep(){
	clearTimeout(fireTimer);
	if(!fireSave){
		siopa.activateScene('jeepDeath');
	}else{
		siopa.activateScene('jeepLife');
	}
}

function beginEarth(save){
	var time = 1000*60*1.5;
	if(save){
		time = 1000*45;
	}
	var suffix = 'Death';
	if(save){
		suffix = 'Life';
	}
	siopa.activateScene('inCubical');
	setTimeout(function(){
		if(siopa.currentScene === 'inCubical' || siopa.currentScene === 'hallway'){
			siopa.activateScene('inOffice' + suffix);
		}else{
			siopa.activateScene('outsideOffice' + suffix);
		}
	}, time);
}

function complete(element){
	siopa.states[element + 'Complete'] = true;
	siopa.states['completedOne'] = true;
	
	if(siopa.states['airComplete']
			&& siopa.states['waterComplete']
			&& siopa.states['fireComplete']
			&& siopa.states['earthComplete']){
		siopa.activateScene('selectionFinal');
	}else{
		siopa.activateScene('selection');
	}
}

if(window.addEventListener){
	window.addEventListener('load', load)
}else if(window.attachEvent){
	window.attachEvent('onload', load);
}
