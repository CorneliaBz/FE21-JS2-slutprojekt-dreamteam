import {db} from "./firebaseApp";
import { onValue, ref } from "firebase/database";


const dbRef = ref (db, '/Forum/topic1');
console.log(dbRef)

onValue(dbRef, snapshot=>{
    console.log(snapshot);
    console.log(snapshot.val());
    createDivs(snapshot.val());
});

function createDivs(products){
    for(const key in products){
        const createWrapperDiv = document.createElement('div');
        document.body.append(createWrapperDiv);
        createWrapperDiv.style.border ='solid 2px black';
        createWrapperDiv.style.padding = '2rem';
        const createNameDiv = document.createElement('div');
        createWrapperDiv.appendChild(createNameDiv);
        createNameDiv.innerText = products[key].name;
        const createPostDiv = document.createElement('div');
        createWrapperDiv.appendChild(createPostDiv);
        createPostDiv.style.border ='solid 2px black';
        createPostDiv.innerText = products[key].message;
    }
};



export {createDivs}
