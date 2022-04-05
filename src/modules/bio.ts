import { db } from "./firebaseapp";
import { ref, remove, update, push } from "firebase/database";
import { User } from "./User";


//Döljer Div:arna som innehåller all info i DOMen
const bioContainer = document.getElementById('bioContainer');
bioContainer.style.display = "none"


//Tar fram infon från firebase och loggar i BioContainern / DOM, via User.ts
function userBio(userName: string, passWord: string, myBio: string, myColor: string, myUserRegDate: string): void {

    const myUserBioDiv: any = document.getElementById('bioInfo')
    const regInfoDiv: any = document.getElementById('regInfo')
    const picBox: any = document.getElementById('picBox')
    const userBox: any = document.getElementById('userBox')
    const userRegDate: any = document.getElementById('userRegDate')
    const userNameDiv: any = document.getElementById('userNameDiv')

    userNameDiv.innerHTML = `Användarnamn: <br>
        ${userName}`
    userRegDate.innerHTML = `Tid för registrering: <br> ${myUserRegDate}`
    myUserBioDiv.innerHTML = 'Information om användare: ' + myBio
    picBox.style.color = myColor
    userBox.style.color = myColor

    //Edit button för att komma till updateUser funktionen
    const editBtn: any = document.getElementById('editBtn');

}
// Slut på UserBio()

//Möjlighet att komma till din egna Bio sida:

function showYourInfoFunction(){
                const bioContainer = document.getElementById('bioContainer');
                bioContainer.style.display = "block";

}

function hideYourInfoFunction(){
                const bioContainer = document.getElementById('bioContainer');
                bioContainer.style.display = "none";

}



export { userBio, showYourInfoFunction, hideYourInfoFunction }