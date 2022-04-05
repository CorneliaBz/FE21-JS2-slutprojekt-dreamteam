import { db } from "./firebaseapp";
import { ref, remove } from "firebase/database";


//Döljer Div:arna som innehåller all info i DOMen
const bioContainer = document.getElementById('bioContainer');
bioContainer.style.display = "none"

//Tar fram infon från firebase och loggar i BioContainern / DOM, via User.ts
function userBio(userName: string, myBio: string, thisImg: string, id:string): void {

    const myUserBioDiv: any = document.getElementById('bioInfo')
    const userNameDiv: any = document.getElementById('userNameDiv')
    const imgDiv: any = document.getElementById('imgDiv');

    //Create Image 
        let myImg = document.createElement('img');
        myImg.src = thisImg;
        myImg.setAttribute('id', 'myImages');
        imgDiv.appendChild(myImg);
    
    userNameDiv.innerHTML = `Användarnamn: ${userName}`
    myUserBioDiv.innerHTML = 'Information om användare: ' + myBio



//Remove button 

const removeBtn = document.getElementById('deleteButton')

    removeBtn.addEventListener('click', () => {
        alert ('Detta går inte att få ogjort! Vänligen skapa en ny användare om du vill fortsätta göra inlägg')
        const deleteTheUser = ref(db, '/User/' + id);
        remove(deleteTheUser);
        location.reload();
    })


}
// Slut på UserBio()



// Funktion för att visa allas Bio sida via forumet:



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