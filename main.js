const comments = [];

const inputContainer = document.createElement('div');
const input = document.createElement('input');
input.classList.add('input');
const commentsContainer = document.querySelector('#comments-container');

input.addEventListener('keydown', (e)=>{
    handlerEnter(e, null)
})

commentsContainer.appendChild(inputContainer)
inputContainer.appendChild(input)

function handlerEnter(e, current){
    if( e.key === 'Enter' && e.target.value != ''){
        const newComment = {
            text : e.target.value,
            likes : 0,
            responses : []

        }
        if(current === null){
             comments.unshift(newComment);
        }else{
            current.responses.unshift(newComment)
        }

        e.target.value = '';
        commentsContainer.innerHTML = '';
        commentsContainer.appendChild(inputContainer);

        renderComments(comments, commentsContainer)
    }
}

function renderComments(arr, parent){
    arr.forEach((comment) => {
        const commentContainer = document.createElement('div');
        commentContainer.classList.add('comment-container');

        const responsesContainer = document.createElement('div');
        responsesContainer.classList.add('responses-container')

        const replyButton = document.createElement('button');
        const likeButton = document.createElement('button');
        const textContainer = document.createElement('div')
        textContainer.textContent = comment.text
        const actions = document.createElement('div');
        

        replyButton.textContent = 'reply';
        likeButton.textContent = `${comment.likes > 0 ? `${comment.likes} likes` : 'like'}`
        
        replyButton.addEventListener('click', (e)=>{
            const newInput = inputContainer.cloneNode(true)
            newInput.value = '';
            newInput.focus();
            newInput.addEventListener('keydown', (e)=>{
                 handlerEnter(e,comment)
            })
            commentContainer.insertBefore(newInput, responsesContainer)
        })

        likeButton.addEventListener('click', (e)=>{
            comment.likes++
            likeButton.textContent = `
                ${comment.likes > 0 ? `${comment.likes} likes` : 'like'}
            `
        })

        commentContainer.appendChild(textContainer);
        commentContainer.appendChild(actions);
        actions.appendChild(replyButton);
        actions.appendChild(likeButton);
        commentContainer.appendChild(responsesContainer);

        if(comment.responses.length > 0){
            renderComments(comment.responses, responsesContainer)
        }
        parent.appendChild(commentContainer)
    });


}

