import {db} from "./firebaseApp";
import { onValue, push, ref, update } from "firebase/database";


const dbRef = ref (db, '/Forum/topic1');
console.log(dbRef)

class Posts{
    constructor(
        public readonly id: string,
        public readonly message: string,
        public readonly name:string
    ){

    }
}

let newPost:Posts[] = [];

onValue(dbRef, snapshot=>{
    console.log(snapshot.val());
    createDivs(snapshot.val());
    const postData = snapshot.val();

    newPost = [];
    for(const key in postData){
        newPost.push(new Posts(
            key,
            postData[key].message,
            postData[key].name
        ))
    }


});


const postWrapper = document.querySelector('#postWrapper');
function createDivs(products){
    
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
        deleteButton.innerText = 'Ta bort';
        deleteButton.style.margin = '1rem';
    }
};

document.querySelector('#sendMessageToForum').addEventListener('click', event=>{
    event.preventDefault();
    console.log('knapp fungerar')

    postWrapper.innerHTML = '';
    // const getUser = document.querySelector('#userName');
    const messageToForum = document.querySelector('#messageToForum');
    const messageValue = messageToForum.value;
    const userValue = 'getUser.value';

    console.log(userValue, messageValue);
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
