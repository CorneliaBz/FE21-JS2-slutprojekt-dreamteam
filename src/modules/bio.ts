import {db} from "./firebaseApp";
import { onValue, ref, push, update, remove } from "firebase/database";

export class User {
    constructor(
        public readonly id: string,
        public readonly bio: string,
        public readonly color: string,
        public readonly name: string,
        public readonly password: string

    ) {
        this.displayUserName();
    }

    private displayUserName(): void {

        
    }

}

const dbRef = ref (db, '/User')
console.log(dbRef)

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
        ))
    }
    console.log(messageData.id1.name)

        const userNameDiv:any = document.getElementById('userName');
        const myUserBioDiv:any = document.getElementById('bioInfo')
        const regInfoDiv:any = document.getElementById('regInfo')
        const picBox:any = document.getElementById('picBox')
        const userBox:any = document.getElementById('userBox')

        const myUser = messageData.id.name
        const myUserBio = messageData.id.bio
        const myUserColor = messageData.id.color
        const yourPassword = messageData.id.password

        userNameDiv.innerHTML = 'Användarnamn: '+ myUser
        myUserBioDiv.innerHTML = 'Information om användare: '+ myUserBio
        picBox.style.backgroundColor  = myUserColor
        userBox.style.backgroundColor  = myUserColor


        regInfoDiv.innerHTML = 'Ditt lösenord är: '+ yourPassword

        console.log(myUserColor)

        
})

console.log(user)

export {onValue}