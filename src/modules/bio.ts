import { db } from "./firebaseapp";
import { DatabaseReference, ref, remove } from "firebase/database";


//Döljer Div:arna som innehåller all info i DOMen
const bioContainer: HTMLElement = document.getElementById('bioContainer');
bioContainer.style.display = "none";

//Tar fram infon från firebase och loggar i BioContainern / DOM, via User.ts
function userBio(userName: string, myBio: string, thisImg: string, id: string): void {

    const myUserBioDiv: HTMLElement = document.getElementById('bioInfo');
    const userNameDiv: HTMLElement = document.getElementById('userNameDiv');
    const imgDiv: HTMLElement = document.getElementById('imgDiv');

    //Create Image 
        let myImg: HTMLImageElement = document.createElement('img');
        myImg.src = thisImg;
        myImg.setAttribute('id', 'myImages');
        imgDiv.appendChild(myImg);
    
    userNameDiv.innerHTML = `Användarnamn: ${userName}`;
    myUserBioDiv.innerHTML = 'Information om användare: ' + myBio;

//Remove button 
const removeBtn: HTMLElement = document.getElementById('deleteButton');
    removeBtn.addEventListener('click', () => {
        alert ('Detta går inte att få ogjort! Vänligen skapa en ny användare om du vill fortsätta göra inlägg');
        const deleteTheUser: DatabaseReference = ref(db, '/User/' + id);
        remove(deleteTheUser);
        location.reload();
    });
};
// Slut på UserBio()


//funktion för att visa Infosidan
function showYourInfoFunction(): void {
    const bioContainer: HTMLElement = document.getElementById('bioContainer');
    bioContainer.style.display = "flex";
}

//Funktion för att dölja infosidan
function hideYourInfoFunction(): void {
    const bioContainer: HTMLElement = document.getElementById('bioContainer');
    bioContainer.style.display = "none";
}

export { userBio, showYourInfoFunction, hideYourInfoFunction }