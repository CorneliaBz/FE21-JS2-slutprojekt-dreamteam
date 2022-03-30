import { db } from "./firebaseapp";
import { ref, remove, update } from "firebase/database";

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
        // this.userBio();
        // this.updateUser()
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

    
                return alert('welcome to le page');
            } else if (this.name != name.value && this.password == password.value) {
                message.innerText = 'Wrong unsername';
            } else if (this.name === name.value && this.password != password.value) {
                message.innerText = 'Wrong password';
            } else if (this.name != name.value && this.password != password.value) {
                message.innerText = 'User does not exsist';
            }
            
        })
    }
    public userBio():any{
        // const userNameDiv = document.getElementById('userNameDiv');

        const myUserBioDiv:any = document.getElementById('bioInfo')
        const regInfoDiv:any = document.getElementById('regInfo')
        const picBox:any = document.getElementById('picBox')
        const userBox:any = document.getElementById('userBox')
        const editBtnDiv:any = document.getElementById('theEditButton')

        const userNameDiv:any = document.getElementById('userNameDiv')

        const theId = this.id
        console.log(theId)

        const myUser = this.name
        const myUserBio = this.bio
        const myUserColor = this.color
        const yourPassword = this.password

        userNameDiv.innerHTML = 'Användarnamn: '  + myUser
        myUserBioDiv.innerHTML = 'Information om användare: '+ myUserBio
        picBox.style.color  = myUserColor
        userBox.style.color  = myUserColor

        console.log(this.bio)

        regInfoDiv.innerHTML = 'Ditt lösenord är: '+ yourPassword

        const editBtn:any = document.createElement('button');
        editBtnDiv.appendChild(editBtn)

        editBtn.innerHTML= 'Ändra din information';
        editBtn.setAttribute('id', this.id)
        editBtn.setAttribute('class','editKnappen')

        

        editBtn.addEventListener('click' , e =>{
            e.preventDefault
            prompt ('Skriv in din info')
        })

    }
    updateUser(){

    }
}