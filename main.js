const form = document.querySelector("#itemform"),
itemInput = document.querySelector("#itemInput"),
itemList = document.querySelector(".item-list"),
feedback = document.querySelector(".feedback"),
addBtn = document.querySelector("#add-item"),
clearBtn = document.querySelector("#clear-list");
 console.log(form,itemInput);

 let todoItems = [];
 //todo:get list
 const getlist = function(todoItems){

    itemList.innerHTML = ""; 
    todoItems.forEach((item,index) => {
        itemList.insertAdjacentHTML(
            "beforeend",
            `


            <div class="item">
            <div class="item-info">
                <h6 class="item-index">${index}</h6>
                <p class="item-name">${item}</p>
            </div>
            <div class="item-icons">
                <i class="far fa-check-circle complete-item"></i>
                <i class="far fa-edit edit-item"></i>
                <i class="far fa-times-circle delete-item"></i>
                
            </div>
        </div>
`

        );
        handleItem(item);
        
    });
 };
 // todo: handle the items
 const handleItem = function (itemName){

const items = itemList.querySelectorAll(".item");
items.forEach((item)=>{

    if(item.querySelector(".item-name").textContent.trim().toLowerCase()===itemName.trim().toLowerCase())
        {
            
        //todo: completed event 
        item.querySelector(".complete-item").addEventListener("click",function(){
let itemIndex = item.querySelector(".item-index");
let itemName = item.querySelector(".item-name");

itemIndex.classList.toggle("completed");
itemName.classList.toggle("completed");

        });
        //todo: edit event 
        item.querySelector(".edit-item").onclick=()=>{
            addBtn.innerHTML= "Edit item";
            itemInput.value= itemName;
            itemList.removeChild(item);
            todoItems=todoItems.filter((item)=>{
                return item!==itemName;
            });
            setLocalStorage(todoItems);
        };

        //todo: deleted event
        item.querySelector(".delete-item").onclick=()=>{
        if(confirm("Are you sure you want to delete item?") )
           { itemList.removeChild(item);
        todoItems= todoItems.filter((item) => item !==itemName);
        setLocalStorage(todoItems);
        sendFeedback("Item deleted","red");
        

 }};
}
});
};

 
 // todo: add items to the list
form.addEventListener("submit", function (e) {
e.preventDefault();
const itemName = itemInput.value;
if(itemName.length===0){
sendFeedback("Please enter a valid value","red");
}
else{
    todoItems.push(itemName);
    addBtn.innerHTML= "Add item";
    setLocalStorage(todoItems);
    getlist(todoItems);
    sendFeedback("item added to the list","green");
}
itemInput.value="";

});
 // todo: save and load to the storage
 const setLocalStorage= function(todoItems){
    localStorage.setItem("todoItems",JSON.stringify(todoItems));
 };
 const getLocalStorage = function (){
    const todoStorage= localStorage.getItem("todoItems");
    if(todoStorage === "undefined" || todoStorage===null){
todoItems = [];
    }else{
        todoItems = JSON.parse(todoStorage);
        getlist(todoItems);
    }
 };
 getLocalStorage();
 // todo: send feedback
 function sendFeedback(text,className){
    feedback.classList.add(`${className}`);
    feedback.innerHTML= text;
setTimeout(()=>{
    feedback.classList.remove(`${className}`);
    feedback.innerHTML= "write value for an item";

},3000);
 }
 // todo: clear all the items
 clearBtn.onclick=()=>{
    if(confirm("Are you sure you want to delete all items?")) {
        todoItems = [];
         localStorage.clear();
    getlist(todoItems);
    sendFeedback("All items have been cleared","red");
    }

 };