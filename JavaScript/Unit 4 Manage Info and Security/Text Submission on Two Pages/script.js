/*JavaScript 6th Edition
      Chapter 9
      Hands-on Project 9-1

      Name: Jennifer Stegina 
      Date: 16 February 2019  

      Filename: scripts.js
*/
"use strict";
function populateInfo() {
		var greeting = location.search;
		greeting = greeting.replace("+", " ");
		greeting = greeting.substring(greeting.lastIndexOf("=") + 1);
		document.getElementById("greetingtext").innerHTML = 
			decodeURIComponent(greeting);
}
if (window.addEventListener) {
	window.addEventListener("load", populateInfo, false);
}
else if (window.attachEvent) {
	window.attachEvent("onload", populateInfo);
}