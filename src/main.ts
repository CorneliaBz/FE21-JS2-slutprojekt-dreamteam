import { onValue, ref, push, update, remove } from "firebase/database";
import { db } from "./modules/firebaseapp";
import { User, createUser } from "./modules/User";
import { createDivs } from "./modules/forums";
import { userBio, updateUser, changeIt } from "./modules/bio";

// createDivs();

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

    //Knapp som kallar på createUser();
    document.querySelector('#signupButton').addEventListener('click', e => {
        e.preventDefault();
        createUser(userData);
    })
});
const theEditBtn = document.getElementById('editButton');
theEditBtn.addEventListener('click', changeIt)  
