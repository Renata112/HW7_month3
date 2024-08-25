//PHONE BLOCK
const phoneInput=document.querySelector('#phone_input');
const phoneButton=document.querySelector('#phone_button');
const phoneSpan=document.querySelector('#phone_result');

// const regExp= /\+996 [2579][0-9][0-9]/  //= [2579]\d{2}
const regExp= /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.onclick= () =>{
    if (regExp.test(phoneInput.value)){
        phoneSpan.innerHTML='OK'
        phoneSpan.style.color='green'
    } else {
        phoneSpan.innerHTML='NOT OK'
        phoneSpan.style.color='red'
    }
}

//Tab slider

const tabContentBlocks=document.querySelectorAll('.tab_content_block');
const tabItems=document.querySelectorAll('.tab_content_item');
const tabParent=document.querySelector('.tab_content_items');

let currentIndex=0; //переменная для хранения индекса акт вкладки
let autoSliderInterval; // айди авто переключения

const hideTabContent=()=> {
    tabContentBlocks.forEach((item) => {
        item.style.display = 'none'
    })
    tabItems.forEach(item=>{
        item.classList.remove('tab_content_item_active');
    })
}

const showTabContent=(index=0)=>{
    tabContentBlocks[index].style.display='block'
    tabItems[index].classList.add('tab_content_item_active')
}

// Функция для автоматического переключения вкладок
const startAutoSlide=() => {
    autoSliderInterval = setInterval(()=>{
        currentIndex=(currentIndex+1)%tabContentBlocks.length;
        hideTabContent();
        showTabContent(currentIndex)
    },3000)
};
//функция чтобы не было бага, сбрасывает текущий интервал(ручной от юсера) и обновляет в новый автоматический
const resetAutoSlide=()=>{
    clearInterval(autoSliderInterval);
    startAutoSlide();
}
// const switchTab=()=>{
//     hideTabContent();
//     currentIndex=(currentIndex+1)%tabContentBlocks.length;
//     showTabContent(currentIndex)
// }

hideTabContent();
showTabContent();
startAutoSlide();

tabParent.onclick=(event)=>{
    if (event.target.classList.contains('tab_content_item')){
        tabItems.forEach((item,index)=>{
            if (event.target===item){
                hideTabContent()
                showTabContent(index)
                currentIndex=index
                resetAutoSlide()
            }
        })
    }
}


//CONVERTER
//REWRITTEN IN FETCH
document.addEventListener('DOMContentLoaded',()=>{
    const somInput=document.querySelector('#som');
    const usdInput=document.querySelector('#usd');
    const eurInput=document.querySelector('#eur');

    const getAsyncData=async ()=>{
        try{
            const response=await fetch (`../data/converter.json`)
            const data =await response.json();
            return data;
        } catch(e){
            console.error('Error fetching data from converter.json',e)
        }
    };
    const converter= async (element,usdTarget,eurTarget)=>{
        const data=await getAsyncData();
        element.oninput=()=>{
            if (element.id==='som'){
                usdTarget.value=((element.value/data.usd).toFixed(2));
                eurTarget.value=((element.value/data.eur).toFixed(2));
            } if(element.id==='usd'){
                eurTarget.value=(((element.value*data.usd)/data.eur).toFixed(2));
                somInput.value=((element.value*data.som).toFixed(2));
            } if (element.id==='eur'){
                usdTarget.vale=(((element.value*data.eur)/data.usd).toFixed(2));
                somInput.value=((element.value*data.som).toFixed(2));
            } if (element.id===" "){
                usdTarget.value=" ";
                eurTarget.value=" ";
                somInput.value=" ";
            }
        }
    };
converter(usdInput,somInput,eurInput);
converter(somInput,usdInput,eurInput);
converter(eurInput,usdInput,somInput);
});


//written on request converter
// const somInput=document.querySelector('#som')
// const usdInput=document.querySelector('#usd')
// const eurInput=document.querySelector('#eur')
//
// const converter=(element,usdTarget, eurTarget)=>{
//     element.oninput=()=>{
//         const request=new XMLHttpRequest();
//         request.open("GET",'../data/converter.json');
//         request.setRequestHeader("Content-type","application/json");
//         request.send();
//
//         request.onload=()=>{
//             const data=JSON.parse(request.response);
//             if (element.id==='som'){
//                 usdTarget.value=(element.value/data.usd).toFixed(2);
//                 eurTarget.value=(element.value/data.eur).toFixed(2);
//
//             }
//             if (element.id==='usd'){
//                 somInput.value=(element.value*data.som).toFixed(2);
//                 eurTarget.value=((element.value*data.usd)/data.eur).toFixed(2);
//
//             }
//             if (element.value==='eur'){
//                 somInput.value=(element.value*data.som).toFixed(2);
//                 usdTarget.value=((element.value*data.eur)/data.usd).toFixed(2);
//             }
//             if (element.value===" ") {
//                 usdTarget.value=" ";
//                 eurTarget.value="";
//                 somInput.value=" ";
//
//             }
//
//         }
//     }
// }
// converter(somInput,usdInput, eurInput);
// converter(usdInput,somInput, eurInput);
// converter(eurInput,usdInput, somInput);

// somInput.oninput=()=>{
//     const request=new XMLHttpRequest()
//     request.open('Get','../data/converter.json')
//     request.setRequestHeader('Content-type','application/json');
//     request.send();
//     request.onload=()=>{
//     const data=JSON.parse(request.response);
//     usdInput.value=(somInput.value/data.usd).toFixed(2);
//     }
// }
// usdInput.oninput=()=>{
//     const request=new XMLHttpRequest()
//     request.open('Get','../data/converter.json')
//     request.setRequestHeader('Content-type','application/json');
//     request.send();
//     request.onload=()=>{
//         const data=JSON.parse(request.response);
//         somInput.value=(usdInput.value*data.usd).toFixed(2);
//     }
// }



//DRY - principle ( dont repeat yourself)
//KISS-keep it super simple


//CARD SWITCHER
const cardBlock = document.querySelector('.card');
const btnNext = document.querySelector('#btn-next');
const btnPrev = document.querySelector('#btn-prev');
let cardId = 1
const updateCard = async (id) => {
   const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${cardId}`)
    const data = await response.json();
    cardBlock.innerHTML = `
        <h3>${data.id}</h3>
        <span>${data.title}</span>
    `
};

btnNext.onclick = () => {
    if (cardId++ && cardId >= 201){
        cardId =1
    }
    updateCard()
};
btnPrev.onclick = () => {
   if (cardId-- && cardId <= 0 ){
       cardId= 200
   }
   updateCard()
};
updateCard()


// const switchCard = (direction) => {
//     if (direction === 'next') {
//         cardId = (cardId === 200) ? 1 : cardId + 1;
//     } else if (direction === 'prev') {
//         cardId = (cardId === 1) ? 200 : cardId - 1;
//     }
//     updateCard(cardId);
// };


//
// fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
//     .then(response => response.json())
//     .then(data => {
//         cardBlock.innerHTML = `
//                 <p>${data.title}</p>
//                 <p style="color: ${data.completed ? 'green' : 'red'}">${data.completed}</p>
//                 <span>${data.id}</span>
//             `;
//         localStorage.setItem('currentCardId', id);
//     })
//     .catch(error => console.error('Ошибка при загрузке данных:', error));
//
// const update=(id,text)=>{
//     const currentCardId=parseInt(localStorage.getItem('currentCardId'));
//     if(currentCardId===id){
//         const pElement = cardBlock.querySelector('p');
//         if (pElement) {
//             pElement.innerText = text;
//         } else {
//             console.error("Элемент <p> не найден внутри cardBlock.");
//         }
//         localStorage.setItem('cardText',text);
//     }
// };
//
// update(cardId, "New info for the card");
//Weather

const citySearchInput=document.querySelector('.cityName');
const cityName=document.querySelector('.city');
const cityTemp=document.querySelector('.temp');


//Query params - параметры запроса

const API_KEY=`e417df62e04d3b1b111abeab19cea714`
const API_URL=`https://api.openweathermap.org/data/2.5/weather`

citySearchInput.onclick=(event)=>{
    fetch(`${API_URL}?q=${event.target.value}&appid=${API_KEY}`)
        .then(response=> response.json())
        .then(data=> {
            cityName.innerHTML=data.name ||`City is not defined`
            cityTemp.innerHTML=data.main?.temp? Math.round(data.main?.temp-273) + '&deg;C':`(^//^)`
        })
}

//fetch запрос

const fetchDataPosts  =() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response ) => response.json())
        .then((data) => console.log(data))
}
fetchDataPosts()




//OPTIONAL CHAINING-ОПЦИОНАЛЬНАЯ ЦЕПОЧКА - ?.
// const address={
//     id:123,
//     // location:{
//     //     street:`Ibraimova`,
//     //     number:31
//     //
//     // }
// }
// console.log(address.location?.street); //optional chaining
