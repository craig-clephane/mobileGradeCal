
var countOfModules = 0;
function addNewModule() {
	countOfModules++;
	var modulename = document.getElementById("module_name").value;
	console.log(modulename);
	var node = '<div class = "module" id="grade'+countOfModules+'" onClick=openModuleDetails("'+modulename+'")><div class="moduletitle"><p>'+modulename+'</p></div><div class="modulePrecentage"><p>69%</p></div></div>';
	document.getElementById('module_elements').innerHTML += node;
	closepopup();

}
function openModuleDetails(modulename) {
console.log("opened"+modulename);
display_module();
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

}

