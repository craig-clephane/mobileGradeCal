var label= "Assignment 1";
var onStartUpLength = 0;
var LengthofForms = 0;
var total = 0;
var ModuleNameGlobal = '';
var countOfModules = 0;

//First function, attached to the body of the html file. 
function load() {
	
	//If ModuleCount is located within localstorage, do the following, ifelse, set the number of modules to zero (ie empty)
	if ('ModuleCount' in localStorage) {
 	
    var numberOfModule = localStorage.getItem('ModuleCount');
    countOfModules = numberOfModule;
	} else {
  	var numberOfModule = 0;
	}
	var counterr = 1;

	//Call the appendModule function with the module name. This is itirated through depending on how many modules are in local storage.
	for(i = 0; i < numberOfModule; i++) {
	var Module_Name = localStorage.getItem("Module"+counterr);
	counterr++;
	appendModule(Module_Name);
	console.log("Found Module : " + Module_Name);
	}

	console.log("Number of Modules in local storage " + countOfModules);

}

//print the module HTML element to the user, with the id of which module, as well as the module name located with the onclick openmodule details function. 
function appendModule(modulename) {

	//If modulename is empty, print to user, else print the module with the respective details. 
	if (modulename == null) {
		console.log("Module "+countOfModules+" name is empty");
	}else {
		var node = '<div class = "module" id="Module'+countOfModules+'" onClick=openModuleDetails("'+modulename+'")><div class="moduletitle"><p id = "ModuleP'+countOfModules+'">'+modulename+'</p></div><div class="modulePrecentage"><p>69%</p></div></div>';
		document.getElementById('module_elements').innerHTML += node;
	}

}

//Function which runs upon selecting a module and calls loadSelectedModule to complete further actions. 
function openModuleDetails(modulename) {

	display_module();
	console.log("loading " +modulename);
	loadSelectedModule(modulename);

}

//Function which runs upon selecting a module, connected to openModuleDetails.
function loadSelectedModule(ModuleName) {

	var counter = 1;
	//Sets the module global name as the same as the module selected.
		ModuleNameGlobal = ModuleName;
	//Checks if module is within local storage, and set sthe local number of values as stated by the local
	//storage.
		if (ModuleName+"numberofItems" in localStorage) {
	    	var numberOfValues = localStorage.getItem(ModuleName+'numberofItems');
	    	console.log(ModuleName + " found, "+ numberOfValues+ " Items");
		} else {
	  		console.log("unable to find the number of items with module "+ModuleName);
		}

	//Presets the number of input elements within the Module based on the variable numberOfValues. (This is to prevent issues)
		for(i = 0; i < numberOfValues; i++) {
			addNewElement()
		}
	
	LengthofForms = 0;

	//Iterate through local storage and append elements such as grade and weight to the respetive input.
		for(i = 0; i < numberOfValues; i++) {
			var localgrade = localStorage.getItem(ModuleName+"grade"+counter+"");
			var localweight = localStorage.getItem(ModuleName+"weight"+counter+"");
			appendElement(localgrade, localweight);
			counter++;
		}
}

//Creates a new module and appends onto the local variable count of modules. 
function addNewModule() {
	countOfModules++;
	var modulename = document.getElementById("module_name").value;
	console.log("Created Module : "+modulename);
	console.log("Number of existing modules "+countOfModules);
	var node = '<div class = "module" id="Module'+countOfModules+'" onClick=openModuleDetails("'+modulename+'")><div class="moduletitle"><p id = "ModuleP'+countOfModules+'">'+modulename+'</p></div><div class="modulePrecentage"><p>69%</p></div></div>';
	document.getElementById('module_elements').innerHTML += node;

	//Close popupup and save the modules
	closepopup();
	saveModules();

}

//Save the module  by checking if the module exists in localstorage, if it does, do nothing... if not, save. 
function saveModules() {
	var idcounter = 1;
	for(i = 0; i < countOfModules; i++) {
		if ("Module"+idcounter+"" in localStorage)
		{
			console.log("Module exists, did not save");
		}else{
			var ModName = document.getElementById("ModuleP"+idcounter+"").innerHTML;
			console.log("Module saved" + ModName);
			localStorage.setItem("Module"+idcounter+"",ModName);
		}
		idcounter++;
	}
	localStorage.setItem("ModuleCount",countOfModules);
}

//Function which is called from loadSelectedModule, this will then set the grade a weight to the inputs.
function appendElement(grade, weight) {

	LengthofForms++;
	if(grade != undefined){
	console.log("Iteration : "+LengthofForms + "\ngrade "+LengthofForms+" : " + grade + "\nweight "+LengthofForms+" : " + weight);
	document.getElementById("grade"+LengthofForms+"").value = grade;
	document.getElementById("weight"+LengthofForms+"").value = weight;
	}

}


//Function which adds a new input tags to the grade and weight elements divs. 
function addNewElement() {

	document.getElementById('gradeVisual').innerHTML = ""
	LengthofForms++;
	var node = '<div class = "gradeElement"><label for="input" class = "GradeHeader"></label><input type="text" id="grade'+LengthofForms+'" name="grade" maxlength="2" size="3"><br></div>';
	var percentagenode = '<div class = "weightElement"><label for="input" class = "GradeHeader"></label><input type="text"  id="weight'+LengthofForms+'" name="grade" maxlength="2" size="3"><br></div>';
	document.getElementById('formGradeElements').innerHTML += node;
	document.getElementById('formWeightElements').innerHTML += percentagenode;

}

//Function which stores the grades and weights to the localstorage with the module name linked to be accessed and identified when reloaded. 
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

function clearContent() {
	localStorage.clear();
	location.reload(); 
}

//Displays popup
function openpopup() {
	document.getElementById('myModal').style.display = 'block';
	document.getElementById("module_name").value = "";
}

//Closes popup
function closepopup() {
	document.getElementById('myModal').style.display = 'none';
}


//Hides and informtion which should not appear on the module pages.
function display_module() {
	document.getElementById('selected_module_elements').style.display = 'inline-block';
	document.getElementById('module_options').style.display = 'block';
	document.getElementById('overview_module').style.display = 'none';
	document.getElementById('add_new_element_grade').style.display = 'inline-block';
	document.getElementById('save_elements').style.display = 'inline-block';
	document.getElementById('calculate_elements').style.display = 'inline-block';
	document.getElementById('header-right').style.display = 'none';
	document.getElementById('back_button').style.display = 'block';
	document.getElementById('remove_elements').style.display = 'none';
	
}


//Hides any informtion which should not appear on the overview page.
function backToModuleOverview() {
	document.getElementById('gradeVisual').innerHTML = ""
	document.getElementById('selected_module_elements').style.display = 'none';
	document.getElementById('module_options').style.display = 'none';
	document.getElementById('overview_module').style.display = 'block';
	document.getElementById('add_new_element_grade').style.display = 'none';
	document.getElementById('save_elements').style.display = 'none';
	document.getElementById('calculate_elements').style.display = 'none';
	document.getElementById('header-right').style.display = 'block';
	document.getElementById('back_button').style.display = 'none';
	document.getElementById('remove_elements').style.display = 'block';

	emptyModules();
}

//Removes the inputs when leaving the module page, this is required or the program will overla infomation.
function emptyModules() {
   LengthofForms = 0;
   var elements = document.getElementsByClassName('weightElement');
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
    elements = document.getElementsByClassName('gradeElement');
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}