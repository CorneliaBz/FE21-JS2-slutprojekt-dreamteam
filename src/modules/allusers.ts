
import { onValue, ref, push, update, remove } from "firebase/database";
import { db } from "./firebaseapp";
import { User, createUser } from "./User";










export function showAllUsersFunction(){
const dbRef = ref(db, '/User');
let user: User[] = [];
let userData;

onValue(dbRef, snapshot => {
    userData = snapshot.val();
    console.log(userData);

    const userNames:User[] = Object.values(userData);
    console.log(userNames[0].bio)

    const userContainer:any = document.getElementById('anyUserContainer')
    userContainer.innerHTML= userNames[0].name

    for (let i=0; i<userNames.length; i++){
        userContainer.innerHTML= userNames[i].name
        console.log(userNames[i].name)
    }

})
}
//     user = [];
//     for (const key in userData) {
//         user.push(new User(
//             key,
//             userData[key].bio,
//             userData[key].img,
//             userData[key].name,
//             userData[key].password,
//         ))
//     }

//     //Knapp som kallar på createUser() från ./modules/User;
//     document.querySelector('#signupButton').addEventListener('click', e => {
//         e.preventDefault();
//         createUser(userData);
//     })
// });












// Funktion för att visa allas Bio sida via forumet:
// export class AllUsers {
//     constructor(
//        public readonly allUsers: Object,
//     ) {
//         this.displayAllTheUsers(allUsers);
//     }

//     private displayAllTheUsers(allUsers):void{

//     }}