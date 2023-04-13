const randomMichisEP = 'https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_7Fql1l1YUN0lb5Rj0kMA1gYuiEX5rPKUkgcCUznHdG4Dy6jYq6VJKkwgdfKQm3Gx';
const favouriteMichisEP = 'https://api.thecatapi.com/v1/favourites';
const deleteMichisEP = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;

const spanError = document.querySelector('#error');
const img1 = document.querySelector('#img1');
const img2 = document.querySelector('#img2');
const btn1 = document.querySelector('#saveMichi1');
const btn2 = document.querySelector('#saveMichi2');

const loadRandomMichis = async () => {    
    const resR = await fetch(randomMichisEP);
    const dataR = await resR.json();
    console.log('Load Random');
    console.log(dataR);
    
    if (resR.status !== 200) {
        spanError.innerHTML = "Hubo un error " + resR.status;
    }else {        
        img1.src = dataR[0].url;
        img1.id = dataR[0].id;
        img2.src = dataR[1].url;
        img2.id = dataR[1].id;

        btn1.onclick = ()=> saveFavouriteMichi(dataR[0].id);
        btn2.onclick = ()=> saveFavouriteMichi(dataR[1].id);
    }    
}

const loadFavouriteMichis = async () => {
    const resF = await fetch(favouriteMichisEP,
        {
            headers: { 
                'x-api-key': 'live_7Fql1l1YUN0lb5Rj0kMA1gYuiEX5rPKUkgcCUznHdG4Dy6jYq6VJKkwgdfKQm3Gx'}
        });
    const dataf = await resF.json();
    
    if (resF.status != 200) {
        spanError.innerHTML = "Hubo un error " + resF.status;
    }else {        
        //console.log('Load Favorites');
        //console.log(dataf);
        const section = document.querySelector('#favoriteMichis');
        section.innerHTML = '';
        const favTitleEl = document.createElement('h2');
        const favTitleText = document.createTextNode('Michis favoritos');
        favTitleEl.appendChild(favTitleText);
        section.appendChild(favTitleEl);

        dataf.forEach(michi =>{            
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btnQuitar = document.createElement('button');
            const btnText = document.createTextNode('Quitar de favoritos');
            btnQuitar.appendChild(btnText);
            btnQuitar.onclick = () => deleteFavouriteMichi(michi.id)
            img.src = michi.image.url;
            img.id = michi.image.id;
            img.width = "150";
            article.appendChild(img);
            article.appendChild(btnQuitar);
            section.appendChild(article);
        })
    }    
}

const saveFavouriteMichi = async (id) => {
    const resSF = await fetch(
        favouriteMichisEP, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'live_7Fql1l1YUN0lb5Rj0kMA1gYuiEX5rPKUkgcCUznHdG4Dy6jYq6VJKkwgdfKQm3Gx'
                } ,
                body: JSON.stringify({
                    'image_id':id
                })
            }
        );
    

    if (resSF.status != 200) {
        spanError.innerHTML = "Hubo un error " + resSF.status;
    }else {   
        const dataSF = await resSF.json();     
        console.log('Saved Michi:' + id);
        console.log(resSF);
        loadFavouriteMichis();
    }  
}

const deleteFavouriteMichi = async (id) => {
    const resDF = await fetch(deleteMichisEP(id), 
            {
                method: 'DELETE',
                headers: {
                    'x-api-key': 'live_7Fql1l1YUN0lb5Rj0kMA1gYuiEX5rPKUkgcCUznHdG4Dy6jYq6VJKkwgdfKQm3Gx'
                }
            }
        );
    if (resDF.status != 200) {
        spanError.innerHTML = "Hubo un error " + resDF.status;
    }else {        
        console.log('Michi Deleted:' + id);
        console.log(resDF);
        loadFavouriteMichis();
    }  
}

loadRandomMichis();
loadFavouriteMichis();
