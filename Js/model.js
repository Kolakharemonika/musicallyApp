
export const music = {
    songImg: '',
    songTitle: '',
    songWriter: ''
}

export const musicList = [{
    songImg: 'hukum-170px.jpg',
    songTitle: 'hukum',
    songWriter: 'Anirudh Ravichander'
}, {
    songImg: 'heeriye-170px.jpg',
    songTitle: 'Heeriye(feet. Arijit singh)',
    songWriter: 'Jasleen Royal, Arijit singh'
}, {
    songImg: 'uddjaa-170px.jpg',
    songTitle: 'Udd jaa kaale kaava',
    songWriter: 'Udit Narayan'
},
{
    songImg: 'hukum-170px.jpg',
    songTitle: 'hukum',
    songWriter: 'Anirudh Ravichander'
}, {
    songImg: 'heeriye-170px.jpg',
    songTitle: 'Heeriye(feet. Arijit singh)',
    songWriter: 'Jasleen Royal, Arijit singh'
}, {
    songImg: 'uddjaa-170px.jpg',
    songTitle: 'Udd jaa kaale kaava',
    songWriter: 'Udit Narayan'
}]


export const getMusicList = async function () {
    return musicList.slice();
}

export const loadGallary = async function () {

    console.log('jhwfgjwyhgfbmesevfejhsfbjs,nc ');

}

export const trendingSongMarkup = async function () {
    const list = musicList.slice();
    let html = `${musicList.map(music => {

        return `<div class="song_card">
            <img class="song-img" src="./assests/images/${music.songImg}" alt="${music.songTitle}">
                <h5 class="song-title">${music.songTitle.padEnd(15, '.')}</h5>
                <span class="song-writer">${music.songWriter}</span>
        </div>`
    }).join('')} `;

    return html;
}

// export const loadGallary = async function () {
//     console.log(music);
//     let html = `${music.map(recipe => {
//         return ` <button class="btn--recipes " id="${recipe.id}"><div class="recipee flex" >
//                     <div class="recipe-img flex">

//                         <img src="${recipe.imageUrl}" alt="${recipe.title}">
//                     </div>
//                     <span class="flex-row pt-10 recipe-dec">
//                         <span class="heading--3">${recipe.title?.length >= 30 ? (recipe.title.slice(0, 30)).toUpperCase() + '...' : (recipe.title).toUpperCase()}</span>
//                         <span>${recipe.publisher}</span>
//                     </span>
//                 </div>  </button>`
//     }).join('')} `;

//     return html;
// }