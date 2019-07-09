var label= "Assignment 1";
var onStartUpLength = 0;
var LengthofForms = 0;
var total = 0;

function addNewElement() {
document.getElementById('gradeVisual').innerHTML = ""
LengthofForms++;
label = "Grade " + LengthofForms;
label2 = "Weight " + LengthofForms;
var node = '<div class = "gradeElement"><label for="input" class = "GradeHeader"></label><input type="text" id="grade'+LengthofForms+'" name="grade" maxlength="2" size="3"><br></div>';
var percentagenode = '<div class = "weightElement"><label for="input" class = "GradeHeader"></label><input type="text"  id="weight'+LengthofForms+'" name="grade" maxlength="2" size="3"><br></div>';
document.getElementById('formGradeElements').innerHTML += node;
document.getElementById('formWeightElements').innerHTML += percentagenode;
}


function onStartUp() {
	for(i = 0; i < onStartUpLength; i++) {
		addNewElement();
	}
}


function calculategrades() {
	var sum = 0;
	var gradeelements = [];
	var weightelements = [];
	var addedelements = [];
	var percentagecheck = 0;
	var idcounter = 1;
	for(i = 0; i < LengthofForms; i++) {
		var grade = document.getElementById("grade"+idcounter+"").value;
		var weight = document.getElementById("weight"+idcounter+"").value;
		if (grade == '') {
			alert("Please fill in empty values");
			return;
		}
		idcounter++;
		gradeelements.push(parseInt(grade));
		weightelements.push(parseInt(weight));
	}
	for(i = 0; i < LengthofForms; i++) {
		percentagecheck=percentagecheck+weightelements[i];
	}
	if(percentagecheck != 100) {
		alert("Percentage much equal 100");
		return;
	}
	for(i = 0; i < LengthofForms; i++) {
		addedelements.push(gradeelements[i]*weightelements[i]);		
	}
	for (i = 0; i < LengthofForms; i++) {
		sum=sum+addedelements[i];
	}
	//total=(sum/LengthofForms);
	sum=sum/100;
	printGrade(sum);
}

//Print the grade to the user
function printGrade(grade) {
	var gradetitle = ""
	if (grade < 40) {
		gradetitle = "Bitch you failed";
	}
	if (grade >= 40) {
		gradetitle = "You passed";
	}
	if(grade >= 50) {
		gradetitle = "You've acheieved a 2:2";
	}
	if(grade >= 60){
		gradetitle = "You've acheieved a 2:1";
	}
	if(grade >= 70) {
		gradetitle = "You've achieved a 1st!";
	}
	var gradeDisplay = '<div class = "gradeDisplay"><h2>'+gradetitle+'</h2><h1>'+grade+'%</h1></div>';
	document.getElementById('gradeVisual').innerHTML = gradeDisplay;
}

function saveGrade() {
	var idcounter = 1;
	for(i = 0; i < LengthofForms; i++) {
		var grade = document.getElementById("grade"+idcounter+"").value;
		var weight = document.getElementById("weight"+idcounter+"").value;
		localStorage.setItem("grade"+idcounter+"", grade);
		localStorage.setItem("weight"+idcounter+"", weight);
		idcounter++;
	}
}

function clearGrade() {
	localStorage.clear();
}