const container = document.getElementById('container')
let currentLength = 0
const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:3000/jokes');
xhr.send();
xhr.responseType = "json"
xhr.onload = () => {
        const jokes = xhr.response
        if(jokes.length){
            container.innerHTML = ''
            jokes.forEach(element => {
                container.innerHTML+=getJokeHTML(element)
            });
            currentLength = jokes.length
        }
}

function getJokeHTML(joke){
    return `
    <div class="joke_block" id = "joke_${joke.id}">
                <p class="text">${joke.content}</p>
                <div class="rate">
                    <p class="rate_value">${joke.likes}</p>
                    <button class="like" onclick = "like(${joke.id})">
                        
                        <img src="../img/thumb_up_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg" alt="">
                    </button>
                    <p class="rate_value dislike_value">${joke.unlikes}</p>
                    <div class="dislike">
                        
                        <button class="material-symbols-outlined">
                            thumb_down
                        </button>
                    </div>
                </div>
            </div>
    `
}

function like(id){
    const likeXHR = new XMLHttpRequest()
    likeXHR.open('GET', 'http://localhost:3000/like?id ='+id)
    likeXHR.send()
    likeXHR.responseType = 'json'
    xhr.onload = () =>{
        const joke = xhr.response
        console.log(joke)
        joke.forEach(element = () =>{
            console.log(element.id)
            if(element.id == id){
                document.getElementById("joke_" +id).outerHTML = getJokeHTML(element)
                console.log("success")
            }
        })
      /*  document.getElementById("joke_" +id).outerHTML = getJokeHTML(joke) */
    }
}