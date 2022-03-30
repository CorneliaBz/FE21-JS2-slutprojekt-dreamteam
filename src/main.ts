import { onValue, ref, push, update, remove } from "firebase/database";
import { db } from "./modules/firebaseapp";
import { User } from "./modules/User";
// import {UserBio} from "./modules/bio"


const bioContainer = document.getElementById('bioContainer');
// bioContainer.style.display = "none"

console.log(db);
const dbRef = ref(db, '/User');
let user:User[] = [];

onValue(dbRef, snapshot=>{
    const messageData = snapshot.val();
    console.log(messageData); 

    user = [];
    for(const key in messageData){
        user.push(new User(
            key,
            messageData[key].bio,
            messageData[key].color,
            messageData[key].name,
            messageData[key].password,
            messageData[key].theTime
        ))
    }

})

//Skapar användare
document.querySelector('#signupButton').addEventListener('click', e=>{
    e.preventDefault();
    const name: HTMLInputElement = document.querySelector('#newUserName');
    const password: HTMLInputElement = document.querySelector('#newUserPassword');
    const confirmPassword: HTMLInputElement = document.querySelector('#confirmNewUserPassword');
    
    const message: HTMLHeadElement = document.querySelector('#loginMessage');

    console.log(name.value, password.value)
    //if-statement som kollar om lösenorden stämmer överrens
    if(password.value == confirmPassword.value){
        const UserToAdd = {
            bio: '',
            color: '',
            name: name.value,
            password: password.value,
        }

        const newKey:string = push(dbRef).key;
        const newUser = {};
        newUser[newKey] = UserToAdd;

        update(dbRef, newUser);
        message.innerText = 'New user created, you can now sign in';
    }else{
        message.innerText = 'Password not matching';
    };
})
