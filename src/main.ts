import {db} from "./modules/firebaseApp";
import { onValue, ref, push, update, remove } from "firebase/database";
// import { UserBio } from "./modules/bio";

const dbRef = ref(db, '/user');
onValue(dbRef, snapshot => {
    const todoData = snapshot.val();


    tasks = []; //empty the array before we add new objects to it
    for (const key in todoData) {
        tasks.push(new Task(
            key,
            todoData[key].task,
            todoData[key].userName,
            todoData[key].theTime
        ));
    }


    function only25(): void {
        const taskArray = Object.values(todoData);
        const first0 = Object.keys(todoData)[0];
        console.log(taskArray)
        for (let i = 0; i < taskArray.length; i++) {

        } if (taskArray.length > 25) {
            const test = ref(db, '/user/' + first0);
            remove(test);

        } else {
            console.log(taskArray.length);
        }
    }
    only25()





class UserBio {
    constructor(
        public id:string,
        public bio:string,
        public name:string,
        // public dateAndPosts: string,
        // public theImage:string
        ){
        this.displayUserBio();   
    }

    //Create DOM elements for users bio info;´:
    private displayUserBio():void{
        
        const container:HTMLElement = document.getElementById('bioContainer');
        const userNameDiv:HTMLElement = document.getElementById('userName');

        container.id = this.id;

        const h4:HTMLHeadingElement = document.createElement('h4');
        userName.appendChild(h4)
        h4.innerHTML = `Ditt användarnamn: ${this.name}`
        
    }
    
}


