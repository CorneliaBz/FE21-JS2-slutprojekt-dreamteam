import { db } from "./firebaseapp";
import { ref, remove, update, push } from "firebase/database";

export class User {
    constructor(
        public readonly id: string,
        public readonly bio: string,
        public readonly color: string,
        public readonly name: string,
        public readonly password: string

    ) {
        this.checkUser();
    }
    //Check if user exsist and password is correct
    public checkUser(): any {
        document.querySelector('#loginButton').addEventListener('click', e => {
            e.preventDefault();
            const name: HTMLInputElement = document.querySelector('#userName');
            const password: HTMLInputElement = document.querySelector('#userPassword');

            const loginMessage: HTMLHeadElement = document.querySelector('#loginMessage');

            console.log(name.value, password.value)
            if (this.name === name.value && this.password === password.value) {
                const forms: HTMLDivElement = document.querySelector('#forms');
                forms.style.display = 'none';
                loginMessage.innerText = 'Välkommen in';
            } else if (this.name != name.value && this.password == password.value) {
                loginMessage.innerText = 'Fel användarnamn';
            } else if (this.name === name.value && this.password != password.value) {
                loginMessage.innerText = 'Fel lösenord';
            } else if (this.name != name.value && this.password != password.value) {
                loginMessage.innerText = 'Användaren finns inte';
            }
        })
    }
    
}

//Koden för att skapa en ny User
export function createUser(userData): any {
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

    const dbRef = ref(db, '/User');
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