import {db} from "./firebaseApp";
import { onValue, push, ref, update, remove, DatabaseReference } from "firebase/database";
import {hideYourInfoFunction} from "./bio"

export function init(): void{
    console.log('init');
}

// Hämtar databasen med forum och lägger sen i en variabel
let dbRef: DatabaseReference = ref (db, '/Forum/topic1');
//Döljer skrivfältet innan man gått in på forumsidorna
const addMessageToForum: HTMLInputElement = document.querySelector('.addMessageToForum') as HTMLInputElement;
addMessageToForum.style.display ='none';
const yourPlace: HTMLInputElement = document.querySelector('.yourPlace');

//Vid klick på ett utav forum namnen så tas du till rätt forum sida
document.querySelector('.navigation').addEventListener('click', (event) =>{
    addMessageToForum.style.display ='block';

    if((event.target as Element).className === 'playerLookForTeam'){
        dbRef = ref (db, '/Forum/topic2');
        yourPlace.innerHTML = ('Spelare söker lag');
        postWrapper.style.display = 'block';
        hideYourInfoFunction();
    }else if((event.target as Element).className === 'patch'){
        dbRef = ref (db, '/Forum/topic3');
        yourPlace.innerHTML = ('Diskutera den senaste patchen');
        postWrapper.style.display = 'block';
        hideYourInfoFunction();
    }else if((event.target as Element).className === 'teamLookForPlayer'){
        dbRef = ref (db, '/Forum/topic1');
        yourPlace.innerHTML = ('Lag söker spelare');
        postWrapper.style.display = 'block';
        hideYourInfoFunction();
    }else {
        addMessageToForum.style.display = 'none';
        postWrapper.style.display = 'none';
    }
    //Lägger innehållet i databasen i en array för att lättare kunna hantera den
    onValue(dbRef, snapshot=>{
        console.log('snap', snapshot.val(), 'db', dbRef);
        const postData: any = snapshot.val();
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
        public readonly name: string
    ){

    }
}
//Skickar in det nya inlägget i en array
let newPost: Posts [] = [];

//På klick läggs det man skrivit i input in på forumet man står på och lägger till namnet på den som är inloggad
document.querySelector('#sendMessageToForum').addEventListener('click', event=>{
    event.preventDefault();
    const getUser: HTMLInputElement = document.querySelector('#userName') as HTMLInputElement;
    const messageToForum: HTMLInputElement = document.querySelector('#messageToForum') as HTMLInputElement;
    const messageValue: string = messageToForum.value;
    const userValue: string = getUser.value;
    const postToAdd: object = {
        message: messageValue,
        name: userValue
    }
    const newMessageKey: string = push(dbRef).key;
    const createNewPost: any = {};
    createNewPost[newMessageKey] = postToAdd;
    update(dbRef, createNewPost); 
})

const postWrapper: HTMLInputElement = document.querySelector('#postWrapper') as HTMLInputElement;
//Skapar alla element utefter vad som finns i databasen
function createDivs(products): void{
    console.log('in createDivs');
    postWrapper.innerHTML = '';
    for(const key in products){
        console.log('in createDFivs for loop');
        const createWrapperDiv: HTMLDivElement = document.createElement('div');
        postWrapper.append(createWrapperDiv);
        createWrapperDiv.setAttribute("class", "forumPost");

        const createNameDiv: HTMLDivElement = document.createElement('div');
        createWrapperDiv.appendChild(createNameDiv);
        createNameDiv.setAttribute("class", "postName");

        createNameDiv.innerText = products[key].name;
        const createPostDiv: HTMLDivElement = document.createElement('div');
        createWrapperDiv.appendChild(createPostDiv);
        createPostDiv.setAttribute("class", "postMessage");

        createPostDiv.innerText = products[key].message;
        const deleteButton: HTMLButtonElement = document.createElement('button');
        createPostDiv.appendChild(deleteButton);
        deleteButton.setAttribute('class', 'button')
        deleteButton.innerText = 'Ta bort';


        const name: HTMLInputElement = document.querySelector('#userName');
        const postOwner: any = products[key].name
        if(postOwner!=name.value){
            deleteButton.style.display ='none'
        }

        deleteButton.addEventListener('click', ()=>{
            clickOnDeleteButton(products[key]);
        })
    }
};


//plockar bort inlägget om inloggad namnet stämmer överens med namnet på son som skrivit inlägget
function clickOnDeleteButton(key): void{
    console.log('key', key);
    const name: HTMLInputElement = document.querySelector('#userName');
    console.log('this name', key.name, 'this name value', name.value);
    const postOwner: any = key.name;
    console.log(key.name);
    
    if(postOwner==name.value){
        console.log(key.id);
        const getId: any = key.id;
        const msgRef: DatabaseReference = ref(db, `/Forum/${dbRef.key}/${getId}`);
        console.log(dbRef.key);
        remove(msgRef);
    }
}

export {createDivs}
