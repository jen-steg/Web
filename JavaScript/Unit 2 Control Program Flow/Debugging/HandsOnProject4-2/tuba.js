/*    JavaScript 6th Edition
 *    Chapter 4
 *    Chapter case

 *    Tuba Farm Equipment
 *    Variables and functions
 *    Name: Jennifer Stegina
 *    Date: 7 February 2019
 *    Description: js file for Unit 2 GE 1a (tuba.js)
 */

//global variables
var acresComplete = false;
var cropsComplete = false;
var monthsComplete = false;
var fuelComplete = true;
var messageHeadElement = document.getElementById("messageHead");
var messageElement = document.getElementById("message");
var acresFieldset = document.getElementsByTagName("fieldset")[0];
var cropsFieldset = document.getElementsByTagName("fieldset")[1];
var monthsFieldset = document.getElementsByTagName("fieldset")[2];
var fuelFieldset = document.getElementsByTagName("fieldset")[3];
var monthsBox = document.forms[0].months;
var acresBox = document.forms[0].acres;

//validates entry
function verifyAcres() {
   var validity = true;
   var messageText = "";
   try {
        if(!(acresBox.value > 0)) {
          throw "Please enter a number of acres greater then 0.";
        }
   } 
   catch(message) {
    validity = false;
    messageText = message;
    acresBox.value = ""; //clear if errors
   }
   finally {
    acresComplete = validity;
    messageElement.innerHTML = messageText;
    messageHeadElement.innerHTML = "";  //remove former heading
    testFormCompleteness();
   }     
}

//validates that at least one box is checked
function verifyCrops() {
   try {
      for(var i = 0; i < 7; i++) {
          if(cropsFieldset.getElementsByTagName("input")[i].checked) {
            cropsComplete = true;
            messageElement.innerHTML = ""; // clear previous message of recommendation
            testFormCompleteness();
            i = 8;
          }
      }
      if(i === 7) {
        throw "Please select one crop."; //error message
      }
   }
   catch(message) {
    cropsComplete = false;
    messageElement.innerHTML = ""; // remove former heading
    messageElement.innerHTML = message;  //display error message
   }
}

//validates month entry
function verifyMonths() {
   var validity = true;
   var messageText = "";
   try {
    if(!(monthsBox.value >= 1 && monthsBox.value <= 12)) {
      throw "Please enter a number of months between 1 and 12.";
    }
   }
   catch(message) {
    validity = false;
    messageText = message;
    monthsBox.value = ""; //clears errors
   }
   finally {
    monthsComplete = validity;
    messageElement.innerHTML = messageText;
    messageHeadElement.innerHTML = "";  // remove former heading
    testFormCompleteness();
   }
}

//validates that one is selected
function verifyFuel() {
   testFormCompleteness();
}

//checks for completeness
function testFormCompleteness() {
   if (acresComplete && cropsComplete && monthsComplete && fuelComplete) {
      createRecommendation();
   }
}

//generates tractor based on entries
function createRecommendation() {
   if (acresBox.value <= 5000) { // 5000 acres or less, no crop test needed
      if (monthsBox.value >= 10) { // 10+ months of farming per year
         messageHeadElement.innerHTML = "E3250";
         messageElement.innerHTML = "A workhorse for a small farm or a big backyard. A medium- to heavy-duty tractor that can haul whatever you throw at it year-round.";
      } else { // <= 9 months per year
         messageHeadElement.innerHTML = "E2600";
         messageElement.innerHTML = "Perfect for a small farm, or just a big backyard. A light- to medium-duty tractor that can make short work of most any chore.";             
      }
   } else { // > 5000 acres
      if (monthsBox.value <= 9) { // <= 9 months per year means that crop test is not needed
         messageHeadElement.innerHTML = "W1205";
         messageElement.innerHTML = "Can't be beat for the general tasks of a large farm. Medium- to heavy-duty muscle that's there then you need it.";
      } else { // >= 10 months farming per yr
         if (document.getElementById("wheat").checked || document.getElementById("corn").checked || document.getElementById("soy").checked) {
            messageHeadElement.innerHTML = "W2500";
            messageElement.innerHTML = "Our heavy-duty tractor designed especially for the needs of wheat, corn, and soy farmers. A reliable piece of equipment that you can turn to all year long.";
         } else {
            messageHeadElement.innerHTML = "W2550";
            messageElement.innerHTML = "Our heavy-duty tractor for general use. A reliable piece of equipment that you can turn to all year long.";
         }
      }
   }
   if (document.getElementById("E85").checked) { // add suffix to model name based on fuel choice
      messageHeadElement.innerHTML += "E";
   } else if (document.getElementById("biodiesel").checked) {
      messageHeadElement.innerHTML += "B";
   } else {
      messageHeadElement.innerHTML += "D";  
   }
}

//create event listeners for all input
function createEventListeners() {
   acresBox.value = ""; // clear acres box on load
   monthsBox.value = ""; // clear months box on load

   if (acresBox.addEventListener) {
     acresBox.addEventListener("input", verifyAcres, false); 
   } else if (acresBox.attachEvent)  {
     acresBox.attachEvent("onchange", verifyAcres);
   }
   
   var cropsBox;
   for (var i = 0; i < 7; i++) {
      cropsBox = cropsFieldset.getElementsByTagName("input")[i];
      cropsBox.checked = false;      
      if (cropsBox.addEventListener) {
        cropsBox.addEventListener("click", verifyCrops, false); 
      } else if (cropsBox.attachEvent)  {
        cropsBox.attachEvent("onclick", verifyCrops);
      }
   }
   
   if (monthsBox.addEventListener) {
     monthsBox.addEventListener("input", verifyMonths, false); 
   } else if (monthsBox.attachEvent)  {
     monthsBox.attachEvent("onchange", verifyMonths);
   }

   var fuelBox;
   for (var i = 0; i < 3; i++) {
      fuelBox = fuelFieldset.getElementsByTagName("input")[i];
      fuelBox.checked = false;      
      if (fuelBox.addEventListener) {
        fuelBox.addEventListener("click", verifyFuel, false); 
      } else if (fuelBox.attachEvent)  {
        fuelBox.attachEvent("onclick", verifyFuel);
      }
   }
}

//create event listeners after page loads
if (window.addEventListener) {
   window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {
   window.attachEvent("onload", createEventListeners);
}