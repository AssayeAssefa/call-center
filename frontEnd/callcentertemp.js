let studentJSON = `
[{
    "id": 432,
    "name": "Steve",
    "major": "History"
},{
    "id": 876,
    "name": "Phil",
    "major": "Engineering"
},{
    "id": 927,
    "name": "Albert",
    "major": "Physics"
}]
`

// let studentArr = 
// [{
//     id: 432,
//     name: "Steve",
//     major: "History"
// },{
//     id: 876,
//     name: "Phil",
//     major: "Engineering"
// },{
//     id: 927,
//     name: "Albert",
//     major: "Physics"
// }]

window.onload = function(){
    // console.log(studentJSON);
    let studentArr = JSON.parse(studentJSON);
    for(student of studentArr){
        addRow(student.name, student.major, student.id);
    }
}

let counter = 1000;

//create a function to add a student to the table 
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

    document.getElementById("students").appendChild(row);

}


// add a click event to our button
document.getElementById("studentButton").addEventListener("click", addNew);

// create a function which is associated with our button to add a new student row to the table
function addNew(){
    let name = document.getElementById("name").value;
    let major = document.getElementById("major").value;
    console.log(`You have submitted ${name} with a major of ${major}`);

    if(name&&major){

      if(  checkDuplicate(studentArr, name)){
           
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

function checkDuplicate ( studentNameContainer, newName){

    

    for (x in studentNameContainer  )    {
    
        if (newName == x){
            return false;
        }
     
return true;

 }




}