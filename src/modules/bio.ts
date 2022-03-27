import {db} from "./firebaseApp";
import { onValue, ref, push, update, remove } from "firebase/database";

class userBio {
    constructor(
        public theUsersBio:string
        ){
        this.displayUserBio();
    }
    //Create DOM elements for users bio info;´:
    private displayUserBio():void{
        
    }
}