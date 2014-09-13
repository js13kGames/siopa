'use strict';

var siopa;
function load(){
	siopa = new Siopa('start');
}

function beginAir(save){
	var suffix = 'Death';
	if(save){
		suffix = 'Life';
	}
	siopa.activateScene('livingRoom');
	setTimeout(function(){
		if(siopa.currentScene ==='porch'){
			siopa.activateScene('outside' + suffix);
		}else if(siopa.currentScene === 'stormShelter'){
			siopa.activateScene('shelter' + suffix);
		}else{
			siopa.activateScene('inside' + suffix);
		}
	}, 1000*60);
}

function beginWater(save){
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
	}, 1000*60);
}

var fireTimer;
var fireSave;
function beginFire(save){
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
			siopa.activateScene('smoke' + suffix);
		}
	}, 1000*60);
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
	}, 1000*60);
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
		document.getElementById('prompt').innerHTML = 'Select another element:'
		siopa.activateScene('selection');
	}
}

if(window.addEventListener){
	window.addEventListener('load', load)
}else if(window.attachEvent){
	window.attachEvent('onload', load);
}
