import { onValue, ref, push, update, remove } from "firebase/database";
import { db } from "./modules/firebaseapp";
import { User, createUser } from "./modules/User";
import { createDivs } from "./modules/forums";
import { userBio, showYourInfoFunction, hideYourInfoFunction} from "./modules/bio";

createDivs();

// userBio()
console.log(db);
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
            userData[key].color,
            userData[key].name,
            userData[key].password,
            userData[key].theTime,
            userData[key].theImage

        ))
    }

    //Knapp som kallar på createUser() från ./modules/User;
    document.querySelector('#signupButton').addEventListener('click', e => {
        e.preventDefault();
        createUser(userData);
    })
});

const yourInfoBtn = document.getElementById('yourInfo');
yourInfoBtn.addEventListener('click',  showYourInfoFunction)
