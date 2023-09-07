
export const music = {
    songImg: '',
    songTitle: '',
    songWriter: ''
}

export const musicList = [{
    songId: 1,
    songImg: 'hukum-170px.jpg',
    songTitle: 'hukum',
    songWriter: 'Anirudh Ravichander',
    audioFile: 'Heeriye-song-mp3.mp3'
}, {
    songId: 2,
    songImg: 'heeriye-170px.jpg',
    songTitle: 'Heeriye(feet. Arijit singh)',
    songWriter: 'Jasleen Royal, Arijit singh',
    audioFile: 'Heeriye-song-mp3.mp3'
}, {
    songId: 3,
    songImg: 'uddjaa-170px.jpg',
    songTitle: 'Udd jaa kaale kaava',
    songWriter: 'Udit Narayan',
    audioFile: 'Heeriye-song-mp3.mp3'
},
{
    songId: 4,
    songImg: 'hukum-170px.jpg',
    songTitle: 'hukum',
    songWriter: 'Anirudh Ravichander',
    audioFile: 'Heeriye-song-mp3.mp3'
}, {
    songId: 5,
    songImg: 'heeriye-170px.jpg',
    songTitle: 'Heeriye(feet. Arijit singh)',
    songWriter: 'Jasleen Royal, Arijit singh',
    audioFile: 'Heeriye-song-mp3.mp3'
}, {
    songId: 6,
    songImg: 'uddjaa-170px.jpg',
    songTitle: 'Udd jaa kaale kaava',
    songWriter: 'Udit Narayan',
    audioFile: 'Heeriye-song-mp3.mp3'
},
{
    songId: 7,
    songImg: 'hukum-170px.jpg',
    songTitle: 'hukum',
    songWriter: 'Anirudh Ravichander',
    audioFile: 'Heeriye-song-mp3.mp3'
}, {
    songId: 8,
    songImg: 'heeriye-170px.jpg',
    songTitle: 'Heeriye(feet. Arijit singh)',
    songWriter: 'Jasleen Royal, Arijit singh',
    audioFile: 'Heeriye-song-mp3.mp3'
}, {
    songId: 9,
    songImg: 'uddjaa-170px.jpg',
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
            <img class="song-img" src="./assests/images/${music.songImg}" alt="${music.songTitle}">
            <img class="music_gif" src="./assests/gif/music_playing.gif" alt="music playing gif">
            <button class="btn_play_icon_small">
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
            <img class="song-img" src="./assests/images/${music.songImg}" alt="${music.songTitle}">
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
                            <img src="./assests/images/${trendingSong.songImg}" alt="${trendingSong.songTitle}">
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