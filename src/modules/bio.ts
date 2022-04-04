import { db } from "./firebaseapp";
import { ref, remove, update, push } from "firebase/database";
import { User } from "./User";

//På denna sida finns funktionerna export userBio, updateUser och RemoveUser 

//Döljer Div:arna som innehåller all info i DOMen
const bioContainer = document.getElementById('bioContainer');
bioContainer.style.display = "none"

const editDiv = document.getElementById('editDiv')
editDiv.style.display = "none"


//Tar fram infon från firebase och loggar i BioContainern / DOM, via User.ts
function userBio(userName: string, passWord: string, myBio: string, myColor: string, myUserRegDate: string): void {

    const myUserBioDiv: any = document.getElementById('bioInfo')
    const regInfoDiv: any = document.getElementById('regInfo')
    const picBox: any = document.getElementById('picBox')
    const userBox: any = document.getElementById('userBox')
    const userRegDate: any = document.getElementById('userRegDate')
    const userNameDiv: any = document.getElementById('userNameDiv')

    userNameDiv.innerHTML = `Användarnamn: <br>
        ${userName}`
    userRegDate.innerHTML = `Tid för registrering: <br> ${myUserRegDate}`
    myUserBioDiv.innerHTML = 'Information om användare: ' + myBio
    picBox.style.color = myColor
    userBox.style.color = myColor

    //Edit button för att komma till updateUser funktionen
    const editBtn: any = document.getElementById('editBtn');

    editBtn.setAttribute('class', 'editKnappen')
    editBtn.addEventListener('click', e => {
        e.preventDefault
        const bioContainer = document.getElementById('userBox');
        userBox.style.display = "none";
        const picBox = document.getElementById('picBox')
        picBox.style.display = 'none'

        const editDiv = document.getElementById('editDiv')
        editDiv.style.display = 'block'

    })
}
// Slut på UserBio()






// Funktion för att ändra användarens uppgifter:
function updateUser(userName: string, id: string, passWord: string, myBio: string, myColor: string, myUserRegDate: string, theImage: string) {
    console.log(id)

    return changeIt()


    //Editbutton på ändra information sidan
    function changeIt() {
        console.log(id)
        const newNickInput: any = document.getElementById('editUserName');
        const newColorInput: any = document.getElementById('editColor');
        const newPasswordInput: any = document.getElementById('editPassword');
        const newBioInput: any = document.getElementById('bioInformation');
        const newPasswordConfirmInput: any = document.getElementById('confirmChangePassword')
        const selectPicture: any = document.getElementById('selectPicture')
    
        newColorInput.setAttribute('value', myColor);
    
        newColorInput.setAttribute('placeholder', myColor);
        newPasswordInput.setAttribute('value', passWord)
        newPasswordInput.setAttribute('placeholder', passWord)
        newBioInput.setAttribute('value', myBio)
        newBioInput.setAttribute('placeholder', myBio)
        newPasswordConfirmInput.setAttribute('value', passWord)
        newPasswordConfirmInput.setAttribute('placeholder', passWord)
    
        selectPicture.setAttribute('placeholder', this.theImage)
    
        console.log(id)
    
    

        const newNick = newNickInput.value
        const newColor = newColorInput.value
        const newPassword = newPasswordInput.value;
        const newPasswordConfirm = newPasswordConfirmInput.value
        const newBio = newBioInput.value
        const newImage = selectPicture.value

        if (newPassword != newPasswordConfirm) {
            alert('vafan gör du, skriv samma på båda!!!')
        }
        else {

            // const id = this.id
            const updateAllObject = {

                name: this.name,
                color: newColor,
                bio: newBio,
                password: newPassword,
                theTime: this.theTime,
                theImage: newImage
            }

            console.log(updateAllObject)
            const updateAll = {};
            updateAll[id + '/'] = updateAllObject

            const dbRefUpdate = ref(db, '/User/');

            update(dbRefUpdate, updateAll);

        }
    }

}


//Knapp för att radera användaren.    

// // function RemoveUser(){

//     const removeBtn = document.getElementById('deleteUser')
//     removeBtn.addEventListener('click', (id) => {
//         alert ('Detta går inte att göra ogjort! Vänligen skapa en ny användare om du vill fortsätta göra inlägg')
//         const deleteTheUser = ref(db, '/User/' + id);
//         remove(deleteTheUser);
//     })
    
// // }


export { userBio, updateUser, changeIt }