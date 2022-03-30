import { onValue, ref, push, update, remove } from "firebase/database";
import { db } from "./modules/firebaseapp";
import { User } from "./modules/User";

console.log(db);
const dbRef = ref(db, '/User');
let user: User[] = [];

onValue(dbRef, snapshot => {
    const userData = snapshot.val();
    console.log(userData);

    user = [];
    for (const key in userData) {
        user.push(new User(
            key,
            userData[key].bio,
            userData[key].color,
            userData[key].name,
            userData[key].password,
        ))
    }
//Koden för att skapa en ny User
    function createUser(): any {
        //Hämtar inputElement
        const name: HTMLInputElement = document.querySelector('#newUserName');
        const password: HTMLInputElement = document.querySelector('#newUserPassword');
        const confirmPassword: HTMLInputElement = document.querySelector('#confirmNewUserPassword');
        //Felmeddelande
        const regMessage: HTMLHeadElement = document.querySelector('#regMessage');
        //Variabler som ska jämföras med varandra
        const newUsername = name.value;
        const userNames = Object.values(userData);
        
        let addUser = true;

        for(const userName of userNames){
            //Kollar om newUsername finns i databasen databasen som userName.name. 
            //Om namnet redan finns kan vi inte skapa användare då addUser = false.
            if(newUsername === userName.name){
                addUser = false;
                regMessage.innerText = 'Användaren finns redan';
                break;
            }
        }
        //Om newUsername och userName.name inte är samma skapas en ny användare.
        //Här kollas även om lösenordet matchar varandra.
        if(addUser && password.value == confirmPassword.value){
            const UserToAdd = {
                bio: '',
                color: '',
                name: name.value,
                password: password.value,
            }

            const newKey: string = push(dbRef).key;
            const newUser = {};
            newUser[newKey] = UserToAdd;

            update(dbRef, newUser);
            regMessage.innerText = 'Ny användare skapad, du kan logga in';
        //Felmeddelande ifall lösenorden inte är samma.
        }else if(addUser && password.value != confirmPassword.value){
            regMessage.innerText = 'Password not matching';
        }
    }

    //Knapp som kallar på createUser();
    document.querySelector('#signupButton').addEventListener('click', e => {
        e.preventDefault();
        createUser();
    })
});