import { onValue, ref} from "firebase/database";
import { db } from "./modules/firebaseapp";
import { User, createUser } from "./modules/User";
import { init } from "./modules/forums";
import { showYourInfoFunction} from "./modules/bio";
import {showAllUsersFunction} from "./modules/allusers"

//Länkar forum.ts till main.ts
init();

//Kallar på funktionen för att ta ta fram alla användares profiler
showAllUsersFunction();

const dbRef = ref(db, '/User');
let user: User[] = [];
let userData;

onValue(dbRef, snapshot => {
    userData = snapshot.val();
    console.log(userData);

    user = [];
    for (const key in userData) {
        user.push(new User(
            key,
            userData[key].bio,
            userData[key].img,
            userData[key].name,
            userData[key].password,
        ))
    }
    //Knapp som kallar på createUser() från ./modules/User;
    document.querySelector('#signupButton').addEventListener('click', e => {
        e.preventDefault();
        createUser(userData);
    })
});

//Knapp för att visa profilsidan
const yourInfoBtn = document.getElementById('yourInfo');
yourInfoBtn.addEventListener('click',  showYourInfoFunction)