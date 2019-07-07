var label= "Assignment 1";
var onStartUpLength = 3;
var LengthofForms = 0;


function addNewElement() {
LengthofForms++;
label = "Assignment " + LengthofForms;
var node = '<div class = "gradeElement"><label for="input" class = "GradeHeader">'+label+'</label><input type="text" name="grade" maxlength="2" size="3"><br></div>';
document.getElementById('formGradeElements').innerHTML += node;
}


function onStartUp() {
	for(i = 0; i < onStartUpLength; i++) {
		addNewElement();
	}
}

function calculategrades() {
	var forms = document.getElementById('formGradeElements');
	var sum = 0;
	var gradeelements = [];
	for(i = 0; i < LengthofForms; i++) {
		var formValue = forms.elements[i];
		if (formValue.value == '') {
			alert("Please fill in empty values");
			break;
		}
		gradeelements.push(parseInt(formValue.value));
	}
	for(i = 0; i < LengthofForms; i++) {
		sum=+sum+gradeelements[i];
	}
	console.log(sum);
}