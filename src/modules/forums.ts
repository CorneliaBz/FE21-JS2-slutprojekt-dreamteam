import {db} from "./firebaseApp";
import { onValue, push, ref, update, remove } from "firebase/database";
import {hideYourInfoFunction, showYourInfoFunction} from "./bio"

// Hämtar databasen med forum och lägger sen i en variabel
let dbRef = ref (db, '/Forum/topic1');
//Döljer skrivfältet innan man gått in på forumsidorna
const addMessageToForum = document.querySelector('#addMessageToForum') as HTMLInputElement;
addMessageToForum.style.display ='none';

//Vid klick på ett utav forum namnen så tas du till rätt forum sida
document.querySelector('.navigation').addEventListener('click', (event) =>{
    addMessageToForum.style.display ='block';
    if((event.target as Element).className === 'playerLookForTeam'){
        dbRef = ref (db, '/Forum/topic2');
        hideYourInfoFunction();
    }else if((event.target as Element).className === 'patch'){
        dbRef = ref (db, '/Forum/topic3');
        hideYourInfoFunction();
    }else if((event.target as Element).className === 'teamLookForPlayer'){
        dbRef = ref (db, '/Forum/topic1');
        hideYourInfoFunction();
    }else if((event.target as Element).className === 'yourInfo'){
        addMessageToForum.style.display = ('none');
        postWrapper.innerHTML = '';
        showYourInfoFunction();
    }
    //Lägger innehållet i databasen i en array för att lättare kunna hantera den
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
    createDivs(newPost);
    });
})

//För att skapa ett inlägg till databasen behövs en class med constructor
class Posts{
    constructor(
        public readonly id: string,
        public readonly message: string,
        public readonly name:string
    ){

    }
}
//Skickar in det nya inlägget i en array
let newPost:Posts[] = [];

//På klick läggs det man skrivit i input in på forumet man står på och lägger till namnet på den som är inloggad
document.querySelector('#sendMessageToForum').addEventListener('click', event=>{
    event.preventDefault();
    const getUser = document.querySelector('#userName') as HTMLInputElement;
    const messageToForum = document.querySelector('#messageToForum') as HTMLInputElement;
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

const postWrapper = document.querySelector('#postWrapper') as HTMLInputElement;
//Skapar alla element utefter vad som finns i databasen
function createDivs(products){
    postWrapper.innerHTML = '';
    for(const key in products){
        const createWrapperDiv = document.createElement('div');
        postWrapper.append(createWrapperDiv);
        createWrapperDiv.setAttribute("class", "forumPost");

        const createNameDiv = document.createElement('div');
        createWrapperDiv.appendChild(createNameDiv);
        createNameDiv.setAttribute("class", "postName");

        createNameDiv.innerText = products[key].name;
        const createPostDiv = document.createElement('div');
        createWrapperDiv.appendChild(createPostDiv);
        createPostDiv.setAttribute("class", "postMessage");

        createPostDiv.innerText = products[key].message;
        const deleteButton = document.createElement('button');
        createPostDiv.appendChild(deleteButton);
        deleteButton.setAttribute('class', 'button')
        deleteButton.innerText = 'Ta bort';


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
    const getUser = document.querySelector('#userName') as HTMLInputElement;
    const messageToForum = document.querySelector('#messageToForum') as HTMLInputElement;
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

//plockar bort inlägget om inloggad namnet stämmer överens med namnet på son som skrivit inlägget
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

export {createDivs}
