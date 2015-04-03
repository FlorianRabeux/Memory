var nbSelect = 0;
var select1, select2;
var nbSucces = 0;
var nbPair = 6;
var bloquer = 1;
var nbTentative=6;
var nbSeconde = 20;
var tableauCarte = [];
var Cartes = [];
var monIntervalle;

window.addEventListener('load',init,false);

Array.prototype.randomize = function() {
    return this.sort(function() {
        return Math.random() - 0.5;
    });
}

function init() {

	//Boutton
	document.getElementById('start').addEventListener('click',start,false);
	document.getElementById('facile').addEventListener('click',Difficulte,false);
	document.getElementById('moyen').addEventListener('click',Difficulte,false);
	document.getElementById('difficile').addEventListener('click',Difficulte,false);

	for(i = 2; i <= 7; i++)
	{
		document.getElementById(i+'p').addEventListener('click',ChoixNbCarte,false);
	}

	var tmpClass;

	for(i = 0, j = 0; i < 54; i++)
	{
		if(j != Math.floor(i / 13))
		{
			j++;
		}
		var y = i % 13;
		tmpClass = "cardX" + j + "Y" + y;
		Cartes.push(tmpClass);
	}
}

function start() {

	document.getElementById("difficulte").innerHTML = "Nb tentative : " + nbTentative;

	document.getElementById("nbpair").innerHTML = "Nb seconde : " + nbSeconde;
	monIntervalle = setInterval(function(){
		nbSeconde--;
		document.getElementById("nbpair").innerHTML = "Nb seconde : " + nbSeconde;
		if(nbSeconde == 0)
		{
			clearInterval(monIntervalle);
			alert("Perdu !!!");
		}
	} , 1000)

	tableauCarte = Cartes.randomize().splice(0, nbPair);
	//console.table(tableauCarte);
	tableauCarte = tableauCarte.concat(tableauCarte).randomize();
	
	var $memory = document.querySelector('#memory');

	for (var i = 1; i <= nbPair*2; i++) {
		var $span = document.createElement('span');
		$span.id = "p"+i;
		$span.classList.add('carte');
		$span.classList.add(tableauCarte[i-1]);
		$span.addEventListener('mousedown',ChangerCarte,false);
		$memory.appendChild($span);
	};

	setTimeout( function() {
	    for (var i = 1; i <= nbPair*2; i++) {
		document.getElementById('p'+i).className="carte back";
	};
	}, 2000 );
}
function ChangerCarte() {
	if(bloquer == 1 && nbTentative != 0)
	{
		if(tableauCarte[getId(this)] != "succes" && this.className== "carte back")
		{
			this.className="carte " + tableauCarte[getId(this)];
			if(nbSelect == 0)
			{
				select1 = this;
				nbSelect++;
			}
			else
			{
				if(nbSelect == 1)
				{
					select2 = this;

					if(select1.className == select2.className)
					{
						nbSucces++;
						nbTentative--;
						if(nbSucces == nbPair)
						{
							clearInterval(monIntervalle);
							setTimeout( function() {
							alert("Gagné !!!");
							}, 100 );
						}
						else
						{
							if(nbTentative == 0)
							{
								alert('Perdu !!!');
							}
						}
						nbSelect = 0;
						tableauCarte[getId(select1)] = "succes";
						tableauCarte[getId(select2)] = "succes";
						select1 = null;
						select2 = null;
					}
					else
					{
						nbTentative--;
						if(nbTentative == 0)
						{
							alert('Perdu !!!');
						}
						document.getElementById("difficulte").innerHTML = "Nb tentative : " + nbTentative;
						nbSelect = 0;
						bloquer = 0;
						setTimeout( function() {
						    select1.className="carte back";
							select2.className="carte back";
							nbSelect = 0;
							select1 = null;
							select2 = null;
							bloquer = 1;
						}, 700 );
					}
				}
			}
			
		}
		else
		{
			if(tableauCarte[chaine - 1] != "succes")
			{	
				if(nbSelect == 1)
				{
					select1.className="carte back";
					select1 = null;
					nbSelect = 0;
				}
				this.className="carte back";
			}
		}
	}
} 

function shuffleArray(tableau) {

	var tab = []

	for(var position=tableau.length-1; position>=1; position--){

		var hasard=Math.floor(Math.random()*(position+1));

		tab.push(tableau[hasard]);

		tableau.splice(hasard, 1);
	}

    return tab;
}

function Difficulte() {
	if(this.id == "facile")
	{
		nbTentative = 15;
		nbSeconde = 30;
		document.getElementById("difficulte").innerHTML = "Difficulté(F) <span class="+"caret"+"></span>"; 
	}
	else if(this.id == "moyen")
	{
		nbTentative = 10;
		nbSeconde = 20;
		document.getElementById("difficulte").innerHTML = "Difficulté(M) <span class="+"caret"+"></span>"; 
	}
	else
	{	
		nbTentative = 7;
		nbSeconde = 12;
		document.getElementById("difficulte").innerHTML = "Difficulté(D) <span class="+"caret"+"></span>"; 
	}
}
function ChoixNbCarte() {
	nbPair = this.id.toString().substr(0, 1);
	document.getElementById("nbpair").innerHTML = "Nombre pair(" + nbPair + ") <span class="+"caret"+"></span>"; 
}
function getId(monObj) {
	var chaine = monObj.id.toString();
	chaine = chaine.substr(1);
	return chaine -1;
}

