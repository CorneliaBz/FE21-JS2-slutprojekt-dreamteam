import { db } from "./firebaseapp";
import { ref, remove, update } from "firebase/database";

export class User {
    constructor(
        public readonly id: string,
        public readonly bio: string,
        public readonly color: string,
        public readonly name: string,
        public readonly password: string

    ) {
        this.checkUser();
    }
    //Check if user exsist and password is correct
    public checkUser(): any {
        document.querySelector('#loginButton').addEventListener('click', e => {
            e.preventDefault();
            const name: HTMLInputElement = document.querySelector('#userName');
            const password: HTMLInputElement = document.querySelector('#userPassword');

            const loginMessage: HTMLHeadElement = document.querySelector('#loginMessage');

            console.log(name.value, password.value)
            if (this.name === name.value && this.password === password.value) {
                const forms: HTMLDivElement = document.querySelector('#forms');
                forms.style.display = 'none';
                loginMessage.innerText = 'Välkommen in';
            } else if (this.name != name.value && this.password == password.value) {
                loginMessage.innerText = 'Fel användarnamn';
            } else if (this.name === name.value && this.password != password.value) {
                loginMessage.innerText = 'Fel lösenord';
            } else if (this.name != name.value && this.password != password.value) {
                loginMessage.innerText = 'Användaren finns inte';
            }
        })
    }
}