
import { onValue, ref, push, update, remove } from "firebase/database";
import { db } from "./firebaseapp";
import { User } from "./User";



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

        userContainer.innerText = "";

        for (let i = 0; i < userNames.length; i++) {
            let alluserBtn: any = document.createElement('button');
            alluserBtn.setAttribute('id', 'btn' + [i])
            const userNameList: any = userNames[i].name
            alluserBtn.innerText = userNames[i].name;

            console.log(alluserBtn)
            userContainer.appendChild(alluserBtn)

            const specificUersBtn:any = document.getElementById('btn'+[i])
            console.log(specificUersBtn)
            console.log(typeof specificUersBtn)


            specificUersBtn.addEventListener('click', ()=>{
                const showNameP = document.getElementById('showNameP');
                const showImgP: HTMLImageElement = document.querySelector('#showImgP');
                const showBioP = document.getElementById ('showBioP');
                showNameP.innerHTML = userNames[i].name
                showImgP.src = userNames[i].img
                showBioP.innerHTML = userNames[i].bio

            })
        }
    })

}