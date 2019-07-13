var label= "Assignment 1";
var onStartUpLength = 0;
var LengthofForms = 0;
var total = 0;
var ModuleNameGlobal = '';

function addNewElement() {
document.getElementById('gradeVisual').innerHTML = ""
LengthofForms++;
label = "Grade " + LengthofForms;
label2 = "Weight " + LengthofForms;
var node = '<div class = "gradeElement"><label for="input" class = "GradeHeader"></label><input type="text" id="grade'+LengthofForms+'" name="grade" maxlength="2" size="3"><br></div>';
var percentagenode = '<div class = "weightElement"><label for="input" class = "GradeHeader"></label><input type="text"  id="weight'+LengthofForms+'" name="grade" maxlength="2" size="3"><br></div>';
document.getElementById('formGradeElements').innerHTML += node;
document.getElementById('formWeightElements').innerHTML += percentagenode;

//if(grade != undefined) appendElement(grade, weight);
}

function appendElement(grade, weight) {
	LengthofForms++;
	if(grade != undefined){
	console.log(grade, weight);
	console.log(LengthofForms);
	console.log("grade"+LengthofForms+"");
	console.log("weight"+LengthofForms+"");
	document.getElementById("grade"+LengthofForms+"").value = grade;
	document.getElementById("weight"+LengthofForms+"").value = weight;
}
}

function onStartUp(ModuleName) {
	var counter = 1;
	ModuleNameGlobal = ModuleName;
	if (ModuleName+"numberofItems" in localStorage) {
 	
    var numberOfValues = localStorage.getItem(ModuleName+'numberofItems');
	} else {
  
	}

	for(i = 0; i < numberOfValues; i++) {
	addNewElement();
	}
	LengthofForms = 0;
	for(i = 0; i < numberOfValues; i++) {
	var localgrade = localStorage.getItem(ModuleName+"grade"+counter+"");
	var localweight = localStorage.getItem(ModuleName+"weight"+counter+"");
	appendElement(localgrade, localweight);
	counter++;
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
	var ModuleName = ModuleNameGlobal;
	var idcounter = 1;
	for(i = 0; i < LengthofForms; i++) {
		var grade = document.getElementById("grade"+idcounter+"").value;
		var weight = document.getElementById("weight"+idcounter+"").value;
		localStorage.setItem(ModuleName+"grade"+idcounter+"", grade);
		localStorage.setItem(ModuleName+"weight"+idcounter+"", weight);
		idcounter++;
		console.log("Saving "+ModuleName +"\n Grade "+grade+"\n Weight " +weight);
	}
	localStorage.setItem(ModuleName+"numberofItems", LengthofForms);
}

function clearGrade() {
	localStorage.clear();
	location.reload(); 
}



var countOfModules = 0;
function addNewModule() {
	countOfModules++;
	var modulename = document.getElementById("module_name").value;
	console.log(modulename);
	console.log(countOfModules);

	var node = '<div class = "module" id="Module'+countOfModules+'" onClick=openModuleDetails("'+modulename+'")><div class="moduletitle"><p id = "ModuleP'+countOfModules+'">'+modulename+'</p></div><div class="modulePrecentage"><p>69%</p></div></div>';
	document.getElementById('module_elements').innerHTML += node;
	closepopup();
	saveModules();
}

function appendModule(modulename) {
	countOfModules++;
	var node = '<div class = "module" id="Module'+countOfModules+'" onClick=openModuleDetails("'+modulename+'")><div class="moduletitle"><p id = "ModuleP'+countOfModules+'">'+modulename+'</p></div><div class="modulePrecentage"><p>69%</p></div></div>';
	document.getElementById('module_elements').innerHTML += node;
}


function saveModules() {
	var idcounter = 1;
	for(i = 0; i < countOfModules; i++) {
		var ModName = document.getElementById("ModuleP"+idcounter+"").innerHTML;
		console.log(ModName);
		localStorage.setItem("Module"+idcounter+"",ModName);
		idcounter++;
	}
	localStorage.setItem("ModuleCount",countOfModules);
}

function openModuleDetails(modulename) {
display_module();
console.log("loading " +modulename);
onStartUp(modulename);

}
function openpopup() {
	document.getElementById('myModal').style.display = 'block';
	document.getElementById("module_name").value = "";
}
function closepopup() {
	document.getElementById('myModal').style.display = 'none';
}


function display_module() {
	document.getElementById('below_container').style.display = 'block';
	document.getElementById('module_options').style.display = 'block';
	document.getElementById('overview_module').style.display = 'none';
	document.getElementById('add_new_element_grade').style.display = 'block';
	document.getElementById('header-right').style.display = 'none';
	document.getElementById('back_button').style.display = 'block';
}

function load() {
	
	if ('ModuleCount' in localStorage) {
 	
    var numberOfModule = localStorage.getItem('ModuleCount');
    countOfModules = numberOfModule;
	} else {
  	var numberOfModule = 0;
	}
	var counterr = 1;
	for(i = 0; i < numberOfModule; i++) {
	var Module_Name = localStorage.getItem("Module"+counterr);
	counterr++;
	appendModule(Module_Name);
	}

}

function backToModuleOverview() {
	document.getElementById('below_container').style.display = 'none';
	document.getElementById('module_options').style.display = 'none';
	document.getElementById('overview_module').style.display = 'block';
	document.getElementById('add_new_element_grade').style.display = 'none';
	document.getElementById('header-right').style.display = 'block';
	document.getElementById('back_button').style.display = 'none';
	
}