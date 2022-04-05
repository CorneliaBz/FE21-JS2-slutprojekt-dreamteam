import { db } from "./firebaseapp";
import { ref, remove, update, push } from "firebase/database";
import { User } from "./User";

//Döljer Div:arna som innehåller all info i DOMen
const bioContainer = document.getElementById('bioContainer');
bioContainer.style.display = "none"

//Tar fram infon från firebase och loggar i BioContainern / DOM, via User.ts
function userBio(userName: string, myBio: string, thisImg: string): void {

    const myUserBioDiv: any = document.getElementById('bioInfo')
    const userNameDiv: any = document.getElementById('userNameDiv');
    const imgDiv: any = document.getElementById('imgDiv');

//Create Image 
    let myImg = document.createElement('img');
    myImg.src = thisImg;
    myImg.setAttribute('id', 'myImages');
    imgDiv.appendChild(myImg);

    userNameDiv.innerHTML = `Användarnamn: <br>
        ${userName}`
    myUserBioDiv.innerHTML = 'Information om användare: ' + myBio

    //Edit button för att komma till updateUser funktionen
    const editBtn: any = document.getElementById('editBtn');

}
// Slut på UserBio()

//Möjlighet att komma till din egna Bio sida:

function showYourInfoFunction() {
    const bioContainer = document.getElementById('bioContainer');
    bioContainer.style.display = "flex";

}

function hideYourInfoFunction() {
    const bioContainer = document.getElementById('bioContainer');
    bioContainer.style.display = "none";

}


export { userBio, showYourInfoFunction, hideYourInfoFunction }