const getUrlAll = "http://localhost:9595/call/all";
const getUrlMin = "http://localhost:9595/call/min";
const getUrlMax = "http://localhost:9595/call/max"; 
const getUrlAvg = "http://localhost:9595/call/avg";
const getUrlMdn = "http://localhost:9595/call/median";
var userCallsArray;




let counter = 1000;



window.onload = function(){
    // console.log(studentJSON);

	
	
	
	
	
	 makeAjaxGet(getUrlAll, displayTableUsers);
	 makeAjaxGet(getUrlMin, displaySingleValue);
	 makeAjaxGet(getUrlMax, displaySingleValue);
	 makeAjaxGet(getUrlAvg, displaySingleValue);
	 makeAjaxGet(getUrlMdn, displaySingleValue);
	
	
	
  
}

//CLICK EVENTS GO HERE
document.getElementById("addNewCallBtn").addEventListener("click", addNewCall);



// DO THE AJAX
function makeAjaxGet(url, callback){
    let xhr = new XMLHttpRequest();
    xhr.open("GET",url,true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState===4 && xhr.status===200){
            callback(this); // passing in the entire xhr object
        }
    }
    xhr.send();
    
}

//DISPLAY ALL RECORDS
function displayTableUsers(xhrObj, val){
    let jsonResponse = xhrObj.response;
   let  userObject = JSON.parse(jsonResponse);
    
   
   console.log("herer");
    console.log(userObject[0]);
    
    
  //  console.log("print objects");
     for(singleUser of userObject){
         addRow(singleUser.user.firstName, singleUser.user.lastName, singleUser.id);
         
         
       //  console.log(singleUser.user.firstName, singleUser.user.lastName, singleUser.id);
         
     }
     
     userCallsArray = [userObject.length];
         
         for(x = 0; x < userObject.length; x++){
        	 
        	// userCallsArray[x] = new  call( allTime,id,notes,resolved, user); 
        	// function user( firstName,id,lastName )
        	 
        	 var userTemp = new user( userObject[x].user.firstName,userObject[x].user.id,userObject[x].user.lastName); 
        	 
        	
        	 
       userCallsArray[x] = new  call( userObject[x].callTime,userObject[x].id,userObject[x].notes,userObject[x].resolved,userTemp);
        	  
       

       console.log( userCallsArray);
       
        	// console.log( userObject[x].user.id);
        //	 console.log("print objects" + userObject[x].user.id);
        	 
     }
         
         console.log(userCallsArray);
     
        
     
  // 
   
}

//DISPLAY SINGLE VALUES HERE
function displaySingleValue(xhrObj){
    let jsonResponse = xhrObj.response;
   let  userObject = JSON.parse(jsonResponse);
    
     
       // Gets last digit of the url request 
    let HRC = xhrObj.responseURL.substring(xhrObj.responseURL.length-3);
    console.log(HRC)

     switch (HRC){
     case "min":  document.getElementById('displayMin').innerHTML = userObject;  break;
     case "max":  document.getElementById('displayMax').innerHTML = userObject;  break;
     case "avg":  document.getElementById('displayAvg').innerHTML = userObject;  break;
     case "ian":  document.getElementById('displayMdn').innerHTML = userObject;  break; //MEDian
     
     
     
     
     }
    
    // console.log(x);
  // 
   
}






// ADD ROW
function addRow(name, major, id){

    let row = document.createElement("tr");
    let cell1 = document.createElement("td");
    let cell2 = document.createElement("td");
    let cell3 = document.createElement("td");

    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);

    if(id===undefined){
        id = counter;
        counter++;
    }

    cell1.innerHTML=id;
    cell2.innerHTML=name;
    cell3.innerHTML=major;

    document.getElementById("calltable").appendChild(row);

}


//CREATE A CALL OBJECT
function call( callTime,id,notes,resolved, user){
	 
			this.callTime =callTime;
			this.id = id;
			this.notes = notes;
			this.resolved = resolved;
			this.user = user;
			
	
}
//CREATE A USER OBJECT
function user( firstName,id,lastName ){
	 
	this.firstName =firstName;
	this.id = id;
	this.lastName = lastName;
	
	

}




// ADD NEW CALL
function addNewCall(){
	 
	 var counter = 19;
	 

	
	//create new call 
      var anewCall = new call( 001,99,"default notes ",false, null);
      
  	   console.log(anewCall);
      
	
	
	//var callObj = new call(0, counter, "Default Text", false);
	
	
	
    let name = document.getElementById("name").value;
    let major = document.getElementById("major").value;
   

    if(name&&major){

      if(studentArr, name){
           
        clearError();
        addRow(name, major);

      } else  { displayErrorDuplicate();

        
       
             } 
      } 
   else {
        displayError();
    }
    
    
    
      
}

function displayError(){
    let errorNode = document.getElementById("error")
    errorNode.innerHTML = "Please input both name and major";
    errorNode.style = "color:red; margin-top: 10px";
}

function displayErrorDuplicate(){
    let errorNode = document.getElementById("error")
    errorNode.innerHTML = "Duplicate detacted enter another name";
    errorNode.style = "color:red; margin-top: 10px";
}


function clearError(){
    let errorNode = document.getElementById("error")
    errorNode.innerHTML = "";
}






