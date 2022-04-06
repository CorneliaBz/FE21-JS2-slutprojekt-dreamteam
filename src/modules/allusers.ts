
import { onValue, ref} from "firebase/database";
import { db } from "./firebaseapp";
import { User } from "./User";


//Funktion för att visa alla användare och deras Bio
export function showAllUsersFunction() {
    const dbRef = ref(db, '/User');
    let user: User[] = [];
    let userData;

    onValue(dbRef, snapshot => {
        userData = snapshot.val();

        const userNames: User[] = Object.values(userData);

        const userContainer: HTMLElement = document.getElementById('anyUserContainer');

        userContainer.innerText = "";

        for (let i = 0; i < userNames.length; i++) {
            let alluserBtn: HTMLButtonElement = document.createElement('button');
            alluserBtn.setAttribute('id', 'btn' + [i]);
            alluserBtn.innerText = userNames[i].name;

            userContainer.appendChild(alluserBtn);

            const specificUersBtn:HTMLElement = document.getElementById('btn'+[i]);


            specificUersBtn.addEventListener('click', ()=>{
                const showNameP:HTMLElement = document.getElementById('showNameP');
                const showImgP: HTMLImageElement = document.querySelector('#showImgP');
                const showBioP:HTMLElement = document.getElementById ('showBioP');
                showNameP.innerHTML = userNames[i].name;
                showImgP.src = userNames[i].img;
                showBioP.innerHTML = userNames[i].bio;
            });
        };
    });
};