import {db} from "./firebaseApp";
import { onValue, push, ref, update, remove } from "firebase/database";

let dbRef = ref (db, '/Forum/topic1');

document.querySelector('.navigation').addEventListener('click', (event) =>{
    if((event.target as Element).className === 'numberTwo'){
        dbRef = ref (db, '/Forum/topic2');
    }else if((event.target as Element).className === 'numberThree'){
        dbRef = ref (db, '/Forum/topic3');
    }else if((event.target as Element).className === 'numberOne'){
        dbRef = ref (db, '/Forum/topic1');
    }
    onValue(dbRef, snapshot=>{
        console.log('snap', snapshot.val(), 'db', dbRef);
        
        const postData = snapshot.val();
    
        newPost = [];
        for(const key in postData){
            newPost.unshift(new Posts(
                key,
                postData[key].message,
                postData[key].name
            ))
        }
        
    console.log(newPost);
    createDivs(newPost);
    });
})

class Posts{
    constructor(
        public readonly id: string,
        public readonly message: string,
        public readonly name:string
    ){

    }
}

let newPost:Posts[] = [];

function clickOnDeleteButton(key){
    console.log('key', key);
    const name:HTMLInputElement = document.querySelector('#userName');
    console.log('this name', key.name, 'this name value', name.value);
    const postOwner = key.name;
    console.log(key.name);
    
    if(postOwner==name.value){
        console.log(key.id);
        const getId = key.id;
        const msgRef = ref(db, `/Forum/${dbRef.key}/${getId}`);
        console.log(dbRef.key);
        remove(msgRef);
    }
}

const postWrapper = document.querySelector('#postWrapper');
function createDivs(products){
    postWrapper.innerHTML = '';
    for(const key in products){
        const createWrapperDiv = document.createElement('div');
        postWrapper.append(createWrapperDiv);
        createWrapperDiv.style.border ='solid 2px black';
        createWrapperDiv.style.padding = '2rem';
        const createNameDiv = document.createElement('div');
        createWrapperDiv.appendChild(createNameDiv);
        createNameDiv.innerText = products[key].name;
        const createPostDiv = document.createElement('div');
        createWrapperDiv.appendChild(createPostDiv);
        createPostDiv.style.border ='solid 2px black';
        createPostDiv.innerText = products[key].message;
        const deleteButton = document.createElement('button');
        createPostDiv.appendChild(deleteButton);
        deleteButton.setAttribute('class', 'button')
        deleteButton.innerText = 'Ta bort';
        deleteButton.style.margin = '1rem';

        const name:HTMLInputElement = document.querySelector('#userName');
        const postOwner = products[key].name
        if(postOwner!=name.value){
            deleteButton.style.display ='none'
        }

        deleteButton.addEventListener('click', ()=>{
            clickOnDeleteButton(products[key]);
        })
    }
};

document.querySelector('#sendMessageToForum').addEventListener('click', event=>{
    event.preventDefault();
    const getUser = document.querySelector('#userName');
    const messageToForum = document.querySelector('#messageToForum');
    const messageValue = messageToForum.value;
    const userValue = getUser.value;
    const postToAdd = {
        message: messageValue,
        name: userValue
    }
    const newMessageKey:string = push(dbRef).key;
    const createNewPost = {};
    createNewPost[newMessageKey] = postToAdd;
    update(dbRef, createNewPost); 
})


export {createDivs}
