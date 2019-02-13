//constants
const getUrlAll = "http://localhost:9595/call/all";
const getUrlMin = "http://localhost:9595/call/min";
const getUrlMax = "http://localhost:9595/call/max"; 
const getUrlAvg = "http://localhost:9595/call/avg";
const getUrlMdn = "http://localhost:9595/call/median";
const postUrl = "http://localhost:9595/call";
var processType;
var selectedWorkId;
var tableSelectedRow;
var currentSelectedUser;





let counter = 1000;



window.onload = function(){
   

     //call ajax methods to populate blocks and table
	 makeAjaxGet(getUrlAll, displayTableUsers);
	 makeAjaxGet(getUrlMin, displaySingleValue);
	 makeAjaxGet(getUrlMax, displaySingleValue);
	 makeAjaxGet(getUrlAvg, displaySingleValue);
	 makeAjaxGet(getUrlMdn, displaySingleValue);
	 //set editor page to be hidden
	 document.getElementById("formContainer").style.display="none"; 
	
	
		 
}

//Grab main table
var tableRef = document.querySelector('.sideblock #userTable');

//Grab side table
var maintableRef = document.querySelector('.container #main  #userTable');
//maintableRef.addEventListener('click', mainTableClickEvent, false);



//click event for main table
function mainTableClicked(x){
	
	
	//console.log(x.children[0].innerHTML);
	
	
	 //hide side table while showing  delete and post new  button while showing button
	document.getElementById("main").style.display="none"; 
	document.getElementById("deleteButton").style.display="block"; 
	document.getElementById("formContainer").style.display="block";
	   

	   
	  /*another global var to store the selected index so that populateProfile knows which 
	   * work number to be updated*/
	   selectedWorkId = x.children[0].innerHTML;
	   var pickedIDmain = x.children[0].innerHTML;
	 //This is needed to signal which ajz method to call right after the action button method is pressed 
	   processType = "update"
	   populateProfile(pickedIDmain, "mainTable");
	 
	 
}

//click event for side table
function tableClickEvents(x){
	
	

    //hide main table and delete button while showing button
   document.getElementById("deleteButton").style.display="none"; 
   document.getElementById("main").style.display="none"; 
   document.getElementById("formContainer").style.display="block";
  
   
   
   //expand event listener area
   var pickedID = x.children[0].innerHTML;
   //This is needed to signal which ajz method to call right after the action button method is pressed 
   processType = "create"
	   
   populateProfile(pickedID, "sideTable");
   
   
   
	
}



// DO THE GET AJAX
function makeAjaxGet(url, callback){
    let xhr = new XMLHttpRequest();
    xhr.open("GET",url,false);
    xhr.onreadystatechange = function(){
        if(xhr.readyState===4 && xhr.status===200){
            callback(this); // passing in the entire xhr object
        }
    }
    xhr.send();
    
}

// AJAX POST
function makeAjaxPost(url, callback, newObject){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.onreadystatechange = function(){
        if(xhr.readyState===4 && xhr.status===201){
            callback(this);
        }
        else{}
    }
    xhr.setRequestHeader("Content-Type","application/json");
    let jsonBook = JSON.stringify(newObject);
    xhr.send(jsonBook);

}
//Ajax update
function updateIssueAjaxPost(url, callback, data){
	 let xhr = new XMLHttpRequest();
	    xhr.open("PUT", url);

	    xhr.onreadystatechange = function(){
	    	 {
	             callback(this);
	        }
	       // else{console.log(xhr.response);}
	    }
	    xhr.setRequestHeader("Content-Type","application/json");
	    let jsonBook = JSON.stringify(data);
	    xhr.send(jsonBook);

}
//Ajax delete
function sendAjaxDelete(url, callback, data){
    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", url);

    xhr.onreadystatechange = function(){
       
            callback(this);
        
    }
    xhr.setRequestHeader("content-type", "application/json");
    let jsonData = JSON.stringify(data);
 
    xhr.send(jsonData);
}



//DISPLAY ALL RECORDS IN  MAIN and side TABLE
function displayTableUsers(xhrObj, val){
   let jsonResponse = xhrObj.response;
   let  userObject = JSON.parse(jsonResponse);
    
  
  
    
     for(singleUser of userObject){
         addRow(singleUser.user.firstName, singleUser.notes, singleUser.id,singleUser.callTime, singleUser.resolved );
      // ADD ROW
       
         
         
      
         
     }
     
     //Set the size of our array
     userCallsArray = [userObject.length];
     
     
  
         // Create new user and call objects and add it to array
         for(x = 0; x < userObject.length; x++){
        	 
       
 
        	 
         var userTemp = new user( userObject[x].user.firstName,userObject[x].user.id,userObject[x].user.lastName); 
        	 
        	
      
          var temp = new  call( userObject[x].callTime,userObject[x].id,userObject[x].notes,userObject[x].resolved,userTemp);
        	  
           userCallsArray[x] = temp;

    
     
        	 
     }
         
    
   
}

//DISPLAY SINGLE VALUES HERE
function displaySingleValue(xhrObj){
    let jsonResponse = xhrObj.response;
   let  userObject = JSON.parse(jsonResponse);
    
     
       // Gets last digit of the url request 
    let HRC = xhrObj.responseURL.substring(xhrObj.responseURL.length-3);
  //  console.log(HRC)

     switch (HRC){
     case "min":   document.getElementById('displayMin').innerHTML = Math.floor(userObject);
                   document.getElementById('displayMinlabel').innerHTML = serachArray(userObject);  
     break;
     
     
     case "max":  document.getElementById('displayMax').innerHTML =  Math.floor(userObject); 
     			  document.getElementById('displayMaxlabel').innerHTML = serachArray(userObject, "min"); 
     break;
     
     
     
     
     
     case "avg":  document.getElementById('displayAvg').innerHTML = Math.floor(userObject);  break;
     
     
     
     case "ian":  document.getElementById('displayMdn').innerHTML = Math.floor(userObject);  break; //MEDian
     
     
     
     
     }
    
   
   
}




// ADD ROW
function addRow(nameF, notes, id, callTime, resolved){
     //create row element for both main and side table and set the attribute 
    let row = document.createElement("tr");
    row.setAttribute("onclick", "mainTableClicked(this)");
    
    let srow = document.createElement("tr");
    srow.setAttribute("onclick", "tableClickEvents(this)");
    
    
    //create data cells (columns) for both tables
    let cell1 = document.createElement("td");
    
    let cell2 = document.createElement("td");
    let cell3 = document.createElement("td");
    let cell4 = document.createElement("td");
    
    let scell1 = document.createElement("td");
    let scell2 = document.createElement("td");
    
    

 

    //change color true/false accordingly
    resolved?cell4.style.color = '#00BA00': cell4.style.color = '#d00';
    


    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.appendChild(cell4);

    
   
   //prevent duplicates from being populated on the side table
    if (id < 26){
    srow.appendChild(scell1);
    srow.appendChild(scell2);
    }
    
    

    if(id===undefined){
        id = counter;
        counter++;
    }
  

    cell1.innerHTML=id;
    cell2.innerHTML=notes + "<br /> <b> - " + nameF;
    cell3.innerHTML=Math.floor(callTime); 
    
    cell4.innerHTML=resolved;
 
    
    
    if (id < 26){
    scell1.innerHTML=id;
    scell2.innerHTML=nameF;
    }
    

   var some = document.getElementById("userTable").appendChild(row);
    
    
    var containerH = document.querySelector('.sideblock #userTable');
    containerH.appendChild(srow);
    

}


//CREATE A CALL OBJECT
function call( callTime,id,notes,resolved, user){
	 
			this.callTime =callTime;
			this.id = id;
			this.notes = notes;
			this.resolved = resolved;
			this.user = user;
			
	
}
//CREATE A NEW USER OBJECT
function user( firstName,id,lastName ){
	 
	this.firstName =firstName;
	this.id = id;
	this.lastName = lastName;
	
	

}




// ADD NEW CALL
function addNewCall(){
	 
	 let name = document.getElementById("name").value;
	    let major = document.getElementById("major").value;
	 

	
	//create new call 
      var anewCall = new call( 3, 9 ,"default notes ",false, null);
      
     // console.log(anewCall);
     
  	  
      var choosenUserName = userCallsArray[6].user;
      
    
  
      
    //create a new user
      var anewUser = new user( choosenUserName.firstName,choosenUserName.id,choosenUserName.lastName );
      
  //  console.log(anewUser);
  	
	
	var callObj = new call(33, 52, "Default Text", false,anewUser );
	
	
  	 
	
	
	//send ajax
	 makeAjaxPost(postUrlCrt, tempCallBack, callObj)
	 
	 


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
    errorNode.innerHTML = "Please input complete data";
    errorNode.style = "color:red; margin-top: 10px";
}

function displayErrorDuplicate(){
    let errorNode = document.getElementById("error")

    errorNode.style = "color:red; margin-top: 10px";
}


function clearError(){
    let errorNode = document.getElementById("error")
    errorNode.innerHTML = "";
}

function tempCallBack(xhrObj){
	
	
	   location.reload();
	
	
	
	
}

function serachArray(value){
	
	
	


	for(x =0; x < userCallsArray.length; x++){
		
		if(userCallsArray[x].callTime == value  ){
			
			return userCallsArray[x].user.firstName + " " +userCallsArray[x].user.lastName ;
		}
		
	
		
	
}
		return ":(";
	
	
}


function populateProfile(id, typeofTable){
	
	//window scroll to specific location on click
	window.scrollTo(0, 200);
	tableSelectedRow = id;

	
for(x =0; x < userCallsArray.length; x++){
	
	  var fName;
	  var lName;
      var idVar;
      var desc;
      var callTime;
      var resolved;
	 
  	 
      if(userCallsArray[x].id  == id  ){
      desc = userCallsArray[x].notes;}
	  
		if(userCallsArray[x].id  == id  ){
			
			//add it to a global var for later use
			currentSelectedUser = userCallsArray[x];
			
			fName = userCallsArray[x].user.firstName;
			lName = userCallsArray[x].user.lastName;
			idVar = userCallsArray[x].user.id;
			callTime = userCallsArray[x].callTime;
			resolved = userCallsArray[x].resolved;
			
			
			
			
			
			
			
		
		}
		
		 document.getElementById("fName").innerHTML = fName;
		 document.getElementById("lName").innerHTML = lName;
		 document.getElementById("idLabel").innerHTML = idVar;
		 document.getElementById("callTime").value = callTime;
	     //set the button label to create
		 document.getElementById("sbmtButton").value = "Post New Issue";
		
		
		 
		 if (typeofTable == "mainTable"){

				
				//document.getElementById("issueDescription").innerHTML = text;
				 document.getElementById("issueDescription").value = desc; 
				 document.getElementById("resolvedStatus").value = resolved;
				  document.getElementById("callTime").value = callTime;
				  document.getElementById("sbmtButton").value = "Post Update";
				  document.getElementById("deleteButton").value = "Delete";
			     
			      // console.log(x);
				
			}
		 
		 else if (typeofTable == "sideTable") {
			 
	//			console.log(userCallsArray[26]);
		 
			 document.getElementById("issueDescription").value = "";
		 
		 document.getElementById("resolvedStatus").value = "true"; }
		 
	
}







		return ":(";
	
	
	
	
}

function formSubmit(){
	
	
	
	 

	 let newJob = {
			 
			 
				
			   "id":findMaxWorkIdNumber(),
			   "notes":document.getElementById("issueDescription").value,
			   "resolved":document.getElementById("resolvedStatus").value,
			   "callTime":document.getElementById("callTime").value,
			   "user":{  
			      "id":currentSelectedUser.user.id,
			      "firstName":currentSelectedUser.user.firstName,
			      "lastName":currentSelectedUser.user.lastName
			   }
			}
	
	
	if ( processType == "create"){
	 submitNewIssueAjaxPost(postUrl,printResponse, newJob);
	}
	
	 if ( processType == "update"){
		//correct the ID here since we do not want a new ID from the create job
		newJob.id = selectedWorkId;
		
	 updateIssueAjaxPost(postUrl, printResponse, newJob);
		
	}
	
	
	
	
}
 function deletionFormSubmit(){
	 
	 
	 
 
	 let deleteJob; 
	 

	 
	  console.log( userCallsArray.length);
	  for (i = 0; i < userCallsArray.length; i++){
		  
		  console.log("printing from delete");
		  console.log( userCallsArray[i].user.id);
		 
		  
		 if  (userCallsArray[i].user.id == selectedWorkId){
			 
			 
			 
			 deleteJob = {
					 
				
					 "id":selectedWorkId,
					   "notes":"something",
					   "resolved":false,
					   "callTime":3,
					   "user":{  
					      "id":userCallsArray[i].user.id,
					      "firstName":"jsjs",
					      "lastName":"skjsn"
					   }
					}
			 
		 }
		  
	
		  
	  }
	 
	 
	 
	sendAjaxDelete(postUrl, printResponse, deleteJob);
	 
	 
	 
	 
 }


function findMaxWorkIdNumber(){
	
	let temp = 0 ;
	for (x = 0; x <  userCallsArray.length;  x++){
		 
		if(temp < userCallsArray[x].id){
			
			 temp = userCallsArray[x].id  ;
			 
				
		}
		
		    
		
	}
	
 
	
	  return ++temp;
	
}


// Submit new object Ajax

function submitNewIssueAjaxPost(url, callback, newBookObject){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.onreadystatechange = function(){
        if(xhr.readyState===4 && xhr.status===201){
            callback(this);
        }
    }
    xhr.setRequestHeader("Content-Type","application/json");
    let jsonBook = JSON.stringify(newBookObject);
    
   // console.log(jsonBook);
    
    xhr.send(jsonBook);

}

function printResponse(){
	
	 console.log(" reach here");
  
    

	   location.reload();
   
}

function goBack(){
	
	
	document.getElementById("main").style.display="block"; 
	   document.getElementById("formContainer").style.display="none";
	
	
}









