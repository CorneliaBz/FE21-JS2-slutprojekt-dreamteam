
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
        const showUserBio: any = document.getElementById('showUserBio')

        for (let i=0; i<userNames.length; i++){
            let alluserP: any = document.createElement('p');
            alluserP.setAttribute('id', 'p'+[i])
            const userNameList:any = userNames[i].name
            alluserP.innerText = userNames[i].name;

            const thisUser = document.getElementById('p'+[i]);
            thisUser.setAttribute('href',showUserBio )
            // userNameList.setAttribute('href', showUserBio )
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
