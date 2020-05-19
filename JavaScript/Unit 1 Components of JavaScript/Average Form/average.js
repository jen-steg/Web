/*
	Name: Jennifer Stegina
	Date: 26 January 2091
	Description: External js file for average problem
*/

function calcAvg(){
	var num1 = document.getElementById("number1").value; //gets the number1 textbox
	var num2 = document.getElementById("number2").value; //gets the number2 textbox
	var num3 = document.getElementById("number3").value; //gets the number3 textbox
	
	var answer = (parseFloat(num1) + parseFloat(num2) + parseFloat(num3)) /3;
	//parseFloat converts the integers to float
	
	if( !isNaN(answer)){
		document.getElementById("result").value = answer.toFixed(2);
		//toFixed(2) rounds the answer to two places
	}
}

function createEventListeners(){
	document.getElementById("number1").addEventListener("change", calcAvg);
	document.getElementById("number2").addEventListener("change", calcAvg);
	document.getElementById("number3").addEventListener("change", calcAvg);
}


window.addEventListener("load", createEventListeners, false);
