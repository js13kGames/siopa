'use strict';

var siopa;
function load(){
	siopa = new Siopa('start');
}

function beginAir(){
	siopa.activateScene('livingRoom');
	siopa.states['inside'] = true;
	setTimeout(function(){
		if(siopa.states['inside']){
			siopa.activateScene('insideDeath');
		}else if(siopa.states['outside']){
			siopa.activateScene('outsideDeath');
		}else if(siopa.states['shelter']){
			siopa.activateScene('shelterDeath');
		}
	}, 1000 * 60 * 2);
}

function beginWater(){
	siopa.activateScene('onDeck');
	setTimeout(function(){
		if(siopa.currentScene === 'onDeck' || siopa.currentScene === 'outHatch'){
			siopa.activateScene('onDeckDeath');
		}else{
			siopa.activateScene('belowDeckDeath');
		}
	}, 1000 * 60 * 2);
}

var fireTimer;
function beginFire(){
	siopa.activateScene('inTent');
	fireTimer = setTimeout(function(){
		if(siopa.currentScene === 'driving'){
			siopa.activateScene('jeepDeath');
		}else{
			if(Math.random() < .5){
				siopa.activateScene('branchDeath');
			}else{
				siopa.activateScene('smokeDeath');
			}
		}
	}, 1000 * 60 * 2);
}
function explodeJeep(){
	clearTimeout(fireTimer);
	siopa.activateScene('jeepDeath');
}

function beginEarth(){
	siopa.activateScene('inCubical');
	setTimeout(function(){
		if(siopa.currentScene === 'inCubical' || siopa.currentScene === 'hallway'){
			siopa.activateScene('inOfficeDeath');
		}else{
			siopa.activateScene('outsideOfficeDeath');
		}
	}, 1000 * 60 * 2);
}

if(window.addEventListener){
	window.addEventListener('load', load)
}else if(window.attachEvent){
	window.attachEvent('onload',c);
}
