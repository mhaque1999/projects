const form=document.querySelector('#todoform');
const todoItem=document.querySelector('#todoform input[type="text"]');
const deleteBtn=document.querySelector('#todoform button[type="button"]');
const todoItemList=document.querySelector('ul');
let savedToDos=[];

function startUpList(){
    if(localStorage.getItem('todoitems')==null || localStorage.getItem('todoitems')=='[]'){
        console.log("No items were generated before");
    }
    else{
        let savedItems=JSON.parse(localStorage.getItem('todoitems'));
        for(let item of savedItems){
            let newLi=document.createElement('li');
            newLi.innerText=item.text;
            newLi.setAttribute('class','todo_item');
            if(item.completed==true){newLi.classList.add('completed');}
            todoItemList.append(newLi);
            savedToDos.push(item);
            console.log("added item into savedtoDos list")
        }
    }
}

function checkForDups(txt){
    for (let item of savedToDos){
        if (item.text==txt){
            return true
        }
    }
    return false;
}

form.addEventListener('submit',function(eve){
    eve.preventDefault();
    if(todoItem.value==''){
        console.log('empty input');
        alert("No Item Was Inputted");
    }
    else{
        if(checkForDups(todoItem.value)==true){
            alert("No Duplicate Tasks");
        }
        else{
            console.log('created item');
            const newLi=document.createElement('li');
            newLi.innerText=todoItem.value;
            newLi.setAttribute('class','todo_item');
            todoItemList.append(newLi);
            savedToDos.push({text:newLi.innerHTML,completed:false});
            localStorage.setItem('todoitems',JSON.stringify(savedToDos));
        }
    }
    
})

todoItemList.addEventListener("click",function(event){
    console.log(event.target.classList);
    event.target.classList.toggle("completed");
    savedToDos=JSON.parse(localStorage.getItem('todoitems'));
    for (let item of savedToDos){
        if (item.text==event.target.innerText){
            item.completed=!(item.completed);
        }
    }
    localStorage.setItem('todoitems',JSON.stringify(savedToDos));
})

deleteBtn.addEventListener("click",function(event){
    let idx=0;
    while (idx!= todoItemList.children.length){
        if (todoItemList.children[idx].classList.contains("completed")){
            todoItemList.removeChild(todoItemList.children[idx]);
            savedToDos=JSON.parse(localStorage.getItem('todoitems'));
            savedToDos.splice(idx,1);
            localStorage.setItem('todoitems',JSON.stringify(savedToDos));
        }
        else{
           idx+=1; 
        }

    }
    /*
    for(let todo of todoItemList.children){
        console.log(todo);
        if (todo.classList.contains("completed")){
            todoItemList.removeChild(todo);
            savedToDos=JSON.parse(localStorage.getItem('todoitems'));
            savedToDos.splice(idx,1);
            localStorage.setItem('todoitems',JSON.stringify(savedToDos));
        }
        else{
           idx+=1; 
        }
        
    }*/
})

startUpList();