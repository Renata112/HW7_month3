const cardsContainer = document.querySelector('.cards_container');
const getPostsAsyncDate = async () => {
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        const data = await response.json()
        data.map(post => {
            const card = document.createElement('div')
            card.classList.add('card')
            card.innerHTML = `
                <span>${post.title}</span>
                <img  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNCPLw1PK_ErNe8iDRNrDIaCy0lONFD__wZQ&s" alt="">
                <p>${post.body}</p>
                <button>купить</button>
            `
            cardsContainer.append(card)
        })

    }catch (e){
        console.error(e);
    }
}
getPostsAsyncDate();

