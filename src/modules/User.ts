import { db } from "./firebaseapp";
import { ref, remove, update, push } from "firebase/database";

export class User {
    constructor(
        public readonly id: string,
        public readonly bio: string,
        public readonly color: string,
        public readonly name: string,
        public readonly password: string,
        public readonly theTime: string

    ) {
        this.displayUser();
        this.checkUser();
        this.userBio();
        this.updateUser()
    }
    //Display alla egenskaper som användaren har
    private displayUser(): void {
        const div = document.createElement('div');

        const container = document.createElement('section');
        div.append(container);
        container.id = this.id;

        const h4: HTMLHeadElement = document.createElement('h4');
        h4.innerText = this.name;
        container.append(h4);

        const p1: HTMLElement = document.createElement('p');
        p1.innerText = this.color;
        container.append(p1);

        const p2: HTMLElement = document.createElement('p');
        p2.innerText = this.bio;
        container.append(p2);

        const removeBtn: HTMLButtonElement = document.createElement('button');
        removeBtn.innerText = 'X';
        container.append(removeBtn);

        removeBtn.addEventListener('click', () => {
            const name: HTMLInputElement = document.querySelector('#userName');
            console.log('this name', this.name, 'this name value', name.value);

            if (this.name == name.value) {
                const msgRef = ref(db, '/User/' + this.id);
                remove(msgRef);
            }

        })
    }
    
    //Check if user exsist and password is correct
    public checkUser(): any {
        document.querySelector('#loginButton').addEventListener('click', e => {

            e.preventDefault();
            const name: HTMLInputElement = document.querySelector('#userName');
            const password: HTMLInputElement = document.querySelector('#userPassword');

            const message: HTMLHeadElement = document.querySelector('#loginMessage');

            console.log(name.value, password.value)
            if (this.name === name.value && this.password === password.value) {
                const forms: HTMLDivElement = document.querySelector('#forms');
                forms.style.display = 'none';
                const bioContainer = document.getElementById('bioContainer');
                bioContainer.style.display = "block";

                this.userBio();                

                // const userNameDiv = document.getElementById('userNameDiv');
                // userNameDiv.innerHTML = name.value + 'checkUser'

    
                // return alert('welcome to le page');
            } else if (this.name != name.value && this.password == password.value) {
                message.innerText = 'Wrong unsername';
            } else if (this.name === name.value && this.password != password.value) {
                message.innerText = 'Wrong password';
            } else if (this.name != name.value && this.password != password.value) {
                message.innerText = 'User does not exsist';
            }
            
        })
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

        // regInfoDiv.innerHTML = 'Ditt lösenord är: '+ yourPassword
        // 'Ditt lösenord är: '+ yourPassword
        //Edit button bio sidan
        const editBtn:any = document.getElementById('editBtn');
        // editBtnDiv.appendChild(editBtn)

        // editBtn.innerHTML= 'Ändra din information';
        // editBtn.setAttribute('id', this.id)
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


        // newNickInput.setAttribute('value', this.name);
        // newNickInput.setAttribute('value', this.name);
        newColorInput.setAttribute('value', this.color);
        newColorInput.setAttribute('placeholder', this.color);
        newPasswordInput.setAttribute('value', this.password)
        newPasswordInput.setAttribute('placeholder', this.password)
        newBioInput.setAttribute('value', this.bio)
        newBioInput.setAttribute('placeholder', this.bio)
        newPasswordConfirmInput.setAttribute('value', this.password)
        newPasswordConfirmInput.setAttribute('placeholder', this.password)
       
        // console.log(newBioInput)

        console.log(this.bio)
        
        // const newNick = newNickInput.value
        // const newColor = newColorInput.value
        // const newPassword = newPasswordInput.value;
        // const newPasswordConfirm = newPasswordConfirmInput.value
        // const newBio = newBioInput.value

        // alert ('updated ffs')
        
                    
        // console.log(newBio)

        const id = this.id
        
        // const updateAllObject = {

        //     name: newNick,
        //     color: 'greeeen',
        //     bio: 'newBio',
        //     password: newPassword,
        //     theTime: 'Ny tiddd'

        // }

        // console.log(updateAllObject)



    //Editbutton på ändra information sidan
        theEditBtn.addEventListener('click', e =>{
            e.preventDefault;

            // const newNick = newNickInput.value
            const newColor = newColorInput.value
            const newPassword = newPasswordInput.value;
            const newPasswordConfirm = newPasswordConfirmInput.value
            const newBio = newBioInput.value
    
            if(newPassword != newPasswordConfirm){
                alert ('vafan gör du, skriv samma på båda!!!')
            }
            else{
            // alert ('updated ffs')
            
                        

            const id = this.id
            
            const updateAllObject = {

                name: this.name,
                color: newColor,
                bio: newBio,
                password: newPassword,
                theTime: this.theTime
    
            }
    
            console.log(updateAllObject)
            const updateAll = {};
            updateAll[id+'/']= updateAllObject

            const nameToUpdate  = {}
            nameToUpdate[id+'/name'] = newNick


            const dbRefUpdate = ref(db, '/User/');

            update(dbRefUpdate, updateAll);

            console.log(dbRefUpdate)
            console.log(updateAll)

    
        }

        })
    }
}

// const msgRef = ref(db, '/User/' + this.id);
// remove(msgRef);


// const myUserInput: any = document.getElementById('whosYourDaddy');
// const myName = myUserInput.value

// const thisDate = new Date();
// const time = thisDate.getHours();
// const thisTime = thisDate + ""

// const taskToAdd = {
//     userName: myName,
//     task: test,
//     theTime: thisTime
// }
