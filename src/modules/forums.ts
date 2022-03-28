const body = document.querySelector('body')
function createDivs(){
    const createWrapperDiv = document.createElement('div');
    body.appendChild(createWrapperDiv);
    createWrapperDiv.style.border ='solid 2px black';
    createWrapperDiv.style.padding = '2rem';
    function createPost(){
        const createPostDiv = document.createElement('div');
        createWrapperDiv.appendChild(createPostDiv);
        createPostDiv.style.border ='solid 2px black';
        createPostDiv.innerText = 'Ett nytt Test'
    }
    createPost();
    createPost();
}



export {createDivs}
