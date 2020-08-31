let topKey = 0;

//create element
function createToDO(key,title,owner,date,strikethru){
    let newItem = document.createElement("li");
    let newSpan = document.createElement("span");
    newSpan.innerText = `${title} - ${owner} - ${date}`;
    let newButton = document.createElement("button");
    newButton.innerText = "remove";
    newItem.dataset['key']=key;
    newItem.append(newSpan);
    newItem.append(newButton);
    document.querySelector("#toDo-entries").append(newItem);
    if (strikethru === "true"){newSpan.classList.add("strikethru");}
}

//switches the strikethru portion of the object and returns new JSON
function switchStrikeThru(jsonString){
    let obj = JSON.parse(jsonString);
    if (obj.strikethru = false){obj.strikethru = true;}
    else{obj.strikethru = false;}
    return(JSON.stringify(obj));
}

//function needed to load to-do list items from memory
let lisElem = document.querySelector("body")
window.addEventListener('load',(event)=>{
    let i;
    for (i = 0; i<localStorage.length; i++){
        let obj = localStorage.getItem(localStorage.key(i));
        obj = JSON.parse(obj);
        createToDO(localStorage.key(i),obj.title,obj.owner,obj.date,obj.strikethru);
    }
    topKey = i;
})


//need to add & remove event listeners to the submit button
let formElem = document.querySelector("form");
formElem.addEventListener("submit",function(event){
    event.preventDefault();

    let newTitle = document.querySelector("input[name=\"title\"]").value;
    let newOwner = document.querySelector("input[name=\"owner\"]").value;
    let newDate = document.querySelector("input[name=\"need-date\"]").value;
    newTitle.value = "";
    newOwner.value = "";
    
    createToDO(topKey,newTitle,newOwner,newDate);

    let todoObj = {
        title: newTitle,
        owner: newOwner,
        date: newDate,
        strikethru:false
    }
    localStorage.setItem(topKey,JSON.stringify(todoObj));
    topKey += 1;
})


//event delegation for when an object is clicked
lisElem.addEventListener("click",function(event){
    let key = event.target.parentElement.dataset["key"];
    if (event.target.tagName === "BUTTON"){
        localStorage.removeItem(key);
        event.target.parentElement.remove();
    }
    else if(event.target.tagName === "SPAN"){
        if (event.target.classList.contains("strikethru")){
            event.target.classList.remove("strikethru");
            
        }else{
        event.target.classList.add("strikethru");
        }
        newJSON = localStorage.getItem(key);
        localStorage.setItem(key,switchStrikeThru(newJSON));
    }
})

