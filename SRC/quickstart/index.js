console.log("hello world");

const URL = 'https://api.thecatapi.com/v1/images/search';
const img = document.querySelector('img');
const button = document.querySelector('#catUpdate');

button.addEventListener('click',catUpdate);

//primera llamada, usando then
fetch(URL)
    .then( response => response.json())
    .then( data => {
        img.src = data[0].url;
    })

//funcion fetch usando async y await, no es necesaria pero si para el ejemplo    
async function fetchData(urlAPI) {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
}

const anotherFunction = async (urlAPI) => {
    try {
        const data = await fetchData(`${urlAPI}`);
        console.log(data[0].url);
        img.src = data[0].url;
    } catch (error) {
        console.log(error);
    }
}

function catUpdate(){
   anotherFunction(URL);
}
