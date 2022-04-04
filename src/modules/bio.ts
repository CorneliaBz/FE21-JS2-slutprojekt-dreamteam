import { db } from "./firebaseapp";
import { ref, remove, update, push } from "firebase/database";
import { User } from "./User";

User
export class EditUser {
    constructor(
        public readonly id: string,
        public readonly bio: string,
        public readonly color: string,
        public readonly name: string,
        public readonly password: string,
        public readonly theTime: string,
        public readonly theImage: string

    ) {
        this.userBio();
        this.updateUser()
    }
    //Skriver in  användarinformationen:
    public userBio():any{
        // const userNameDiv = document.getElementById('userNameDiv');

        const myUserBioDiv:any = document.getElementById('bioInfo')
        const regInfoDiv:any = document.getElementById('regInfo')
        const picBox:any = document.getElementById('picBox')
        const userBox:any = document.getElementById('userBox')
        const userRegDate:any = document.getElementById('userRegDate')
        const userNameDiv:any = document.getElementById('userNameDiv')

        const theId = this.id
        console.log(theId)

        const myUser = this.name
        const myUserBio = this.bio
        const myUserColor = this.color
        const yourPassword = this.password
        const myUserRegDate = this.theTime

        userNameDiv.innerHTML = `Användarnamn: <br>
        ${myUser}`
        userRegDate.innerHTML = `Tid för registrering: <br> ${myUserRegDate}`
        myUserBioDiv.innerHTML = 'Information om användare: '+ myUserBio
        picBox.style.color  = myUserColor
        userBox.style.color  = myUserColor

        console.log(this.bio)

        //Edit button bio sidan
        const editBtn:any = document.getElementById('editBtn');

        editBtn.setAttribute('class','editKnappen')
        editBtn.addEventListener('click' , e =>{
            e.preventDefault
            const bioContainer = document.getElementById('userBox');
            userBox.style.display = "none";
            const picBox = document.getElementById('picBox')
            picBox.style.display = 'none'

            const editDiv = document.getElementById('editDiv')            
            editDiv.style.display = 'block'
            this.updateUser();

        })

    }






    //Möjlighet att ändra användarinformation
    public updateUser(){
        const removeBtn = document.getElementById('deleteUser')
        removeBtn.addEventListener('click', () => {
            alert ('Detta går inte att göra ogjort! Vänligen skapa en ny användare om du vill fortsätta göra inlägg')
            const deleteTheUser = ref(db, '/User/' + this.id);
            remove(deleteTheUser);
        })

        const theEditBtn = document.getElementById('editButton');
        const newNickInput: any = document.getElementById('editUserName');
        const newColorInput:any = document.getElementById('editColor');
        const newPasswordInput:any = document.getElementById('editPassword');
        const newBioInput:any = document.getElementById('bioInformation');
        const newPasswordConfirmInput:any = document.getElementById('confirmChangePassword')
        const selectPicture:any = document.getElementById('selectPicture')

        newColorInput.setAttribute('value', this.color);
        newColorInput.setAttribute('placeholder', this.color);
        newPasswordInput.setAttribute('value', this.password)
        newPasswordInput.setAttribute('placeholder', this.password)
        newBioInput.setAttribute('value', this.bio)
        newBioInput.setAttribute('placeholder', this.bio)
        newPasswordConfirmInput.setAttribute('value', this.password)
        newPasswordConfirmInput.setAttribute('placeholder', this.password)

        selectPicture.setAttribute('placeholder', this.theImage)
       
        console.log(this.bio)
        
        const id = this.id

    //Editbutton på ändra information sidan
        theEditBtn.addEventListener('click', e =>{
            e.preventDefault;

            // const newNick = newNickInput.value
            const newColor = newColorInput.value
            const newPassword = newPasswordInput.value;
            const newPasswordConfirm = newPasswordConfirmInput.value
            const newBio = newBioInput.value
            const newImage = selectPicture.value

            if(newPassword != newPasswordConfirm){
                alert ('vafan gör du, skriv samma på båda!!!')
            }
            else{
            
            const id = this.id
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
            updateAll[id+'/']= updateAllObject

            const dbRefUpdate = ref(db, '/User/');

            update(dbRefUpdate, updateAll);
        }
        })
    }
}