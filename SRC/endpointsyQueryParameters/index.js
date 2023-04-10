console.log("hello world");

const URL = 'https://api.thecatapi.com/v1/images/search?limit=10';
const img1 = document.querySelector('#img1');
const img2 = document.querySelector('#img2');
const img3 = document.querySelector('#img3');
const button = document.querySelector('#catUpdate');

button.addEventListener('click',catUpdate);

const anotherFunction = async (urlAPI) => {
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;
}

function catUpdate(){
   anotherFunction(URL);
}

anotherFunction(URL);
