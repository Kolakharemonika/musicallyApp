
export const music = {
    songImgUrl: '',
    songTitle: '',
    songWriter: ''
}

export const musicList = [{
    songId: 1,
    songImgUrl: 'hukum-170px.jpg',
    songImgUrlHd: 'hukum.jpg',
    songTitle: 'hukum',
    songWriter: 'Anirudh Ravichander',
    audioFile: 'Heeriye-song-mp3.mp3'
}, {
    songId: 2,
    songImgUrl: 'heeriye-170px.jpg',
    songImgUrlHd: 'heeriye.jpg',
    songTitle: 'Heeriye(feet. Arijit singh)',
    songWriter: 'Jasleen Royal, Arijit singh',
    audioFile: 'Heeriye-song-mp3.mp3'
}, {
    songId: 3,
    songImgUrl: 'uddjaa-170px.jpg',
    songImgUrlHd: 'uddjaa.jpg',
    songTitle: 'Udd jaa kaale kaava',
    songWriter: 'Udit Narayan',
    audioFile: 'Heeriye-song-mp3.mp3'
},
{
    songId: 4,
    songImgUrl: 'hukum-170px.jpg',
    songImgUrlHd: 'hukum.jpg',
    songTitle: 'hukum',
    songWriter: 'Anirudh Ravichander',
    audioFile: 'Heeriye-song-mp3.mp3'
}, {
    songId: 5,
    songImgUrl: 'heeriye-170px.jpg',
    songImgUrlHd: 'heeriye.jpg',
    songTitle: 'Heeriye(feet. Arijit singh)',
    songWriter: 'Jasleen Royal, Arijit singh',
    audioFile: 'Heeriye-song-mp3.mp3'
}, {
    songId: 6,
    songImgUrl: 'uddjaa-170px.jpg',
    songImgUrlHd: 'uddjaa.jpg',
    songTitle: 'Udd jaa kaale kaava',
    songWriter: 'Udit Narayan',
    audioFile: 'Heeriye-song-mp3.mp3'
},
{
    songId: 7,
    songImgUrl: 'hukum-170px.jpg',
    songImgUrlHd: 'hukum.jpg',
    songTitle: 'hukum',
    songWriter: 'Anirudh Ravichander',
    audioFile: 'Heeriye-song-mp3.mp3'
}, {
    songId: 8,
    songImgUrl: 'heeriye-170px.jpg',
    songImgUrlHd: 'heeriye.jpg',
    songTitle: 'Heeriye(feet. Arijit singh)',
    songWriter: 'Jasleen Royal, Arijit singh',
    audioFile: 'Heeriye-song-mp3.mp3'
}, {
    songId: 9,
    songImgUrl: 'uddjaa-170px.jpg',
    songImgUrlHd: 'uddjaa.jpg',
    songTitle: 'Udd jaa kaale kaava',
    songWriter: 'Udit Narayan',
    audioFile: 'Heeriye-song-mp3.mp3'
}]


export const getMusicList = async function () {
    return musicList.slice();
}


export const trendingSongMarkup = async function () {
    const list = musicList.slice();
    if (list.length !== 0 && list.length >= 6) {
        let html = `${list.map((music, id) => {
            if (id >= 6) return;
            return `<div class="song_card" id="${music.songId}">
            <img class="song-img" src="./assests/images/${music.songImgUrl}" alt="${music.songTitle}">
            <img class="music_gif" src="./assests/gif/music_playing.gif" alt="music playing gif">
            <button class="btn_play_icon_small" >
              <svg class="play_icon">
                    <use href="./assests/icons.svg#play-icon"></use>
              </svg>
            </button> 
            <h5 class="song-title">${music.songTitle.padEnd(15, '.')}</h5>
            <span class="song-writer">${music.songWriter}</span>
            </div>`
        }).join('')} `;

        return html;
    } else {
        return 'No songs available...'
    }

}

export const loadGallary = async function () {
    const list = musicList.slice();
    if (list.length && list.length > 0) {
        let html = `${list.map(music => {
            return `<div class="song_card w-14" id="${music.songId}">
            <img class="song-img" src="./assests/images/${music.songImgUrl}" alt="${music.songTitle}">
             <img class="music_gif" src="./assests/gif/music_playing.gif" alt="music playing gif">
                            <button class="btn_play_icon_small">
                                <svg class="play_icon">
                                    <use href="./assests/icons.svg#play-icon"></use>
                                </svg>
                            </button>   <h5 class="song-title">${music.songTitle.padEnd(15, '.')}</h5>
                <span class="song-writer">${music.songWriter}</span>
        </div>`
        }).join('')} `;

        return html;
    } else {
        return 'No songs available...'
    }
}

export const generateMarkup = async function () {
    if (musicList.length !== 0 && musicList.length >= 3) {
        let html = `${musicList.map((trendingSong, id) => {
            let classtemp;
            if (id == 0) {
                classtemp = 'music_card_prev';
            }
            if (id == 1) {
                classtemp = 'music_card_current';
            }
            if (id == 2) {
                classtemp = 'music_card_next';
            }
            if (id >= 3) return;
            return `<div class="playing_song_card ${classtemp}" id="${trendingSong.songId}">
                            <img src="./assests/images/${trendingSong.songImgUrlHd}" alt="${trendingSong.songTitle}">
                     <div class="playing_song_info">
                                <span class="song_title">${trendingSong.songTitle}</span>
                                <span class="song_writer">${trendingSong.songWriter}</span>
                     </div>
                     <div class="overlay">
                       <button class="music_btn music_play_btn btn_play_icon">
                                    <svg class="music_btn_svg btn_play_pause" id="play">
                                        <use href="./assests/icons.svg#play-icon"></use>
                                    </svg>
                                    <svg class="music_btn_svg btn_play_pause d-none" id="pause">
                                        <use href="./assests/icons.svg#pause-icon"></use>
                                    </svg>
                       </button>
                       </div>
                    </div>`
        }).join('')} `;
        return html;
    } else {
        return 'No Songs Available';
    }



}

export const dispalyNextSingleCardMarkup = async function (currentSlide) {
    const trendingSongsList = musicList.slice();
    const markup = `<div class="playing_song_card music_card_next" id="${trendingSongsList[currentSlide].songId}">
                            <img src="./assests/images/${trendingSongsList[currentSlide].songImgUrlHd}" alt="${trendingSongsList[currentSlide].songTitle}">
                     <div class="playing_song_info">
                                <span class="song_title">${trendingSongsList[currentSlide].songTitle}</span>
                                <span class="song_writer">${trendingSongsList[currentSlide].songWriter}</span>
                            </div>
                         <div class="overlay"> <button class="music_btn music_play_btn btn_play_icon" id=musicPlay>
                                    <svg class="music_btn_svg btn_play_pause" id="play">
                                        <use href="./assests/icons.svg#play-icon"></use>
                                    </svg>
                                    <svg class="music_btn_svg btn_play_pause d-none" id="pause">
                                        <use href="./assests/icons.svg#pause-icon"></use>
                                    </svg>
                                </button> </div> 
                                       </div>`;
    return markup;
}