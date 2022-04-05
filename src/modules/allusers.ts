
import { onValue, ref, push, update, remove } from "firebase/database";
import { db } from "./firebaseapp";
import { User, createUser } from "./User";



export function showAllUsersFunction(allUsers) {
    const dbRef = ref(db, '/User');
    let user: User[] = [];
    let userData;

    onValue(dbRef, snapshot => {
        userData = snapshot.val();
        console.log(userData);

        const userNames: User[] = Object.values(userData);
        console.log(userNames[0].bio)

        const userContainer: any = document.getElementById('anyUserContainer')

        for (let i=0; i<userNames.length; i++){
            let alluserP: HTMLParagraphElement = document.createElement('p');
            alluserP.innerText = userNames[i].name + 'Bennyyyy';
            userContainer.appendChild(alluserP)}
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
