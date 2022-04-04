import { db } from "./firebaseapp";
import { ref, remove, update, push } from "firebase/database";
import { EditUser } from "./bio";



export class User {
    constructor(
        public readonly id: string,
        public readonly bio: string,
        public readonly color: string,
        public readonly name: string,
        public readonly password: string,
        public readonly theTime: string

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
                const bioContainer = document.getElementById('bioContainer');
                bioContainer.style.display = "block";
    
            } else if (this.name != name.value && this.password == password.value) {
                loginMessage.innerText = 'Fel användarnamn';
            } else if (this.name === name.value && this.password != password.value) {
                loginMessage.innerText = 'Fel lösenord';
            } else if (this.name != name.value && this.password != password.value) {
                loginMessage.innerText = 'Användaren finns inte';
            }
            
        })
    }

    // //Skriver in  användarinformationen:
    // public userBio():any{
    //     // const userNameDiv = document.getElementById('userNameDiv');

    //     const myUserBioDiv:any = document.getElementById('bioInfo')
    //     const regInfoDiv:any = document.getElementById('regInfo')
    //     const picBox:any = document.getElementById('picBox')
    //     const userBox:any = document.getElementById('userBox')
    //     const userRegDate:any = document.getElementById('userRegDate')
    //     const userNameDiv:any = document.getElementById('userNameDiv')

    //     const theId = this.id
    //     console.log(theId)

    //     const myUser = this.name
    //     const myUserBio = this.bio
    //     const myUserColor = this.color
    //     const yourPassword = this.password
    //     const myUserRegDate = this.theTime

    //     userNameDiv.innerHTML = `Användarnamn: <br>
    //     ${myUser}`
    //     userRegDate.innerHTML = `Tid för registrering: <br> ${myUserRegDate}`
    //     myUserBioDiv.innerHTML = 'Information om användare: '+ myUserBio
    //     picBox.style.color  = myUserColor
    //     userBox.style.color  = myUserColor

    //     console.log(this.bio)

    //     //Edit button bio sidan
    //     const editBtn:any = document.getElementById('editBtn');

    //     editBtn.setAttribute('class','editKnappen')
    //     editBtn.addEventListener('click' , e =>{
    //         e.preventDefault
    //         const bioContainer = document.getElementById('userBox');
    //         userBox.style.display = "none";
    //         const picBox = document.getElementById('picBox')
    //         picBox.style.display = 'none'

    //         const editDiv = document.getElementById('editDiv')            
    //         editDiv.style.display = 'block'
    //         this.updateUser();

    //     })

    // }






    // //Möjlighet att ändra användarinformation
    // public updateUser(){
    //     const removeBtn = document.getElementById('deleteUser')
    //     removeBtn.addEventListener('click', () => {
    //         alert ('Detta går inte att göra ogjort! Vänligen skapa en ny användare om du vill fortsätta göra inlägg')
    //         const deleteTheUser = ref(db, '/User/' + this.id);
    //         remove(deleteTheUser);
    //     })

    //     const theEditBtn = document.getElementById('editButton');
    //     const newNickInput: any = document.getElementById('editUserName');
    //     const newColorInput:any = document.getElementById('editColor');
    //     const newPasswordInput:any = document.getElementById('editPassword');
    //     const newBioInput:any = document.getElementById('bioInformation');
    //     const newPasswordConfirmInput:any = document.getElementById('confirmChangePassword')

    //     newColorInput.setAttribute('value', this.color);
    //     newColorInput.setAttribute('placeholder', this.color);
    //     newPasswordInput.setAttribute('value', this.password)
    //     newPasswordInput.setAttribute('placeholder', this.password)
    //     newBioInput.setAttribute('value', this.bio)
    //     newBioInput.setAttribute('placeholder', this.bio)
    //     newPasswordConfirmInput.setAttribute('value', this.password)
    //     newPasswordConfirmInput.setAttribute('placeholder', this.password)
       
    //     console.log(this.bio)
        
    //     const id = this.id

    // //Editbutton på ändra information sidan
    //     theEditBtn.addEventListener('click', e =>{
    //         e.preventDefault;

    //         // const newNick = newNickInput.value
    //         const newColor = newColorInput.value
    //         const newPassword = newPasswordInput.value;
    //         const newPasswordConfirm = newPasswordConfirmInput.value
    //         const newBio = newBioInput.value
    
    //         if(newPassword != newPasswordConfirm){
    //             alert ('vafan gör du, skriv samma på båda!!!')
    //         }
    //         else{
            
    //         const id = this.id
            
    //         const updateAllObject = {

    //             name: this.name,
    //             color: newColor,
    //             bio: newBio,
    //             password: newPassword,
    //             theTime: this.theTime
    //         }
    
    //         console.log(updateAllObject)
    //         const updateAll = {};
    //         updateAll[id+'/']= updateAllObject

    //         const dbRefUpdate = ref(db, '/User/');

    //         update(dbRefUpdate, updateAll);
    //     }
    //     })
    // }
    
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