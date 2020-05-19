/*
      Name: Jennifer Stegina
      Date:  31 January 2019 
      Description: calcheartrate.js
   */

		function calcHeartRate(){
			
			var age = document.getElementById("age").value;

			var maxHeartRate = 220 - age;
			
			var minTargetHeartRate = maxHeartRate * 0.50;
			
			var min = minTargetHeartRate.toFixed(0);
			
			var maxTargetHeartRate = maxHeartRate * 0.85;
			
			var max = maxTargetHeartRate.toFixed(0);
		
			document.getElementById("answer").value = 
			"Your target heart rate should be between " + min +
			" and " + max;
			
		}
		
		function  createEventListeners(){
			document.getElementById("calculate").addEventListener
			("click", calcHeartRate, false);
		}
		
		window.addEventListener("load", createEventListeners, false);
			
  
   
 