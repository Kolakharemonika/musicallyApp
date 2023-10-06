
export const musicList = [{
    songId: 1,
    songImgUrl: 'hukum-170px.jpg',
    songImgUrlHd: 'hukum.jpg',
    songTitle: 'hukum',
    songLyrics: 'heeriye_lyrics.txt',
    songWriter: 'Anirudh Ravichander',
    audioFile: 'Heeriye-song-mp3.mp3'
}, {
    songId: 2,
    songImgUrl: 'heeriye-170px.jpg',
    songImgUrlHd: 'heeriye.jpg',
    songTitle: 'Heeriye(feet. Arijit singh)',
    songLyrics: 'heeriye_lyrics.txt',
    songWriter: 'Jasleen Royal, Arijit singh',
    audioFile: 'Heeriye-song-mp3.mp3'
}, {
    songId: 3,
    songImgUrl: 'uddjaa-170px.jpg',
    songImgUrlHd: 'uddjaa.jpg',
    songTitle: 'Udd jaa kaale kaava',
    songLyrics: 'heeriye_lyrics.txt',
    songWriter: 'Udit Narayan',
    audioFile: 'Heeriye-song-mp3.mp3'
},
{
    songId: 4,
    songImgUrl: 'hukum-170px.jpg',
    songImgUrlHd: 'hukum.jpg',
    songTitle: 'hukum',
    songLyrics: 'heeriye_lyrics.txt',
    songWriter: 'Anirudh Ravichander',
    audioFile: 'Heeriye-song-mp3.mp3'
}, {
    songId: 5,
    songImgUrl: 'heeriye-170px.jpg',
    songImgUrlHd: 'heeriye.jpg',
    songTitle: 'Heeriye(feet. Arijit singh)',
    songLyrics: 'heeriye_lyrics.txt',
    songWriter: 'Jasleen Royal, Arijit singh',
    audioFile: 'Heeriye-song-mp3.mp3'
}, {
    songId: 6,
    songImgUrl: 'uddjaa-170px.jpg',
    songImgUrlHd: 'uddjaa.jpg',
    songTitle: 'Udd jaa kaale kaava',
    songLyrics: 'heeriye_lyrics.txt',
    songWriter: 'Udit Narayan',
    audioFile: 'Heeriye-song-mp3.mp3'
},
{
    songId: 7,
    songImgUrl: 'hukum-170px.jpg',
    songImgUrlHd: 'hukum.jpg',
    songTitle: 'hukum',
    songLyrics: 'heeriye_lyrics.txt',
    songWriter: 'Anirudh Ravichander',
    audioFile: 'Heeriye-song-mp3.mp3'
}, {
    songId: 8,
    songImgUrl: 'heeriye-170px.jpg',
    songImgUrlHd: 'heeriye.jpg',
    songTitle: 'Heeriye(feet. Arijit singh)',
    songLyrics: 'heeriye_lyrics.txt',
    songWriter: 'Jasleen Royal, Arijit singh',
    audioFile: 'Heeriye-song-mp3.mp3'
}, {
    songId: 9,
    songImgUrl: 'uddjaa-170px.jpg',
    songImgUrlHd: 'uddjaa.jpg',
    songTitle: 'Udd jaa kaale kaava',
    songLyrics: 'heeriye_lyrics.txt',
    songWriter: 'Udit Narayan',
    audioFile: 'Heeriye-song-mp3.mp3'
}]

export const playList = [{
    songId: 'song1',
    songImgUrl: 'heeriye-170px.jpg',
    songImgUrlHd: 'heeriye.jpg',
    songTitle: 'Heeriye(feet. Arijit singh)',
    songLyrics: 'heeriye_lyrics.txt',
    songWriter: 'Jasleen Royal, Arijit singh',
    audioFile: 'Heeriye-song-mp3.mp3'
}, {
    songId: 'song2',
    songImgUrl: 'uddjaa-170px.jpg',
    songImgUrlHd: 'uddjaa.jpg',
    songTitle: 'Udd jaa kaale kaava',
    songLyrics: 'heeriye_lyrics.txt',
    songWriter: 'Udit Narayan',
    audioFile: 'Heeriye-song-mp3.mp3'
},
{
    songId: 'song3',
    songImgUrl: 'hukum-170px.jpg',
    songImgUrlHd: 'hukum.jpg',
    songTitle: 'hukum',
    songLyrics: 'heeriye_lyrics.txt',
    songWriter: 'Anirudh Ravichander',
    audioFile: 'Heeriye-song-mp3.mp3'
}, {
    songId: 'song4',
    songImgUrl: 'heeriye-170px.jpg',
    songImgUrlHd: 'heeriye.jpg',
    songTitle: 'Heeriye(feet. Arijit singh)',
    songLyrics: 'heeriye_lyrics.txt',
    songWriter: 'Jasleen Royal, Arijit singh',
    audioFile: 'Heeriye-song-mp3.mp3'
}]

export const getMusicList = async function () {
    return musicList.slice();
}
export const getPlayList = async function () {
    return playList.slice();
}
export const getLibraryList = async function () {
    //library list
    return playList.slice();
}

export const displaySingleTrendingCardMarkup = async function (trendingSongIndex) {
    const trendingSongsList = musicList.slice();

    if (trendingSongIndex < 0 || trendingSongIndex >= trendingSongsList.length) return;
    let html = `<div class="song_card" id="${trendingSongsList[trendingSongIndex].songId}">
        <img class="song-img" src="assests/images/${trendingSongsList[trendingSongIndex].songImgUrl}" alt="${trendingSongsList[trendingSongIndex].songTitle}">
    <img class="music_gif" src="assests/gif/music_playing.gif" alt="music playing gif">
                           <button class="btn_play_icon_small">
                               <svg class="play_icon" id="play">
                            <use href="assests/icons.svg#play-icon"></use>
                        </svg>
                        <svg class="play_icon d-none" id="pause">
                            <use href="assests/icons.svg#pause-icon"></use>
                        </svg>
                            </button> 
                             <div class="music_info_trending">    <h5 class="song-title">${trendingSongsList[trendingSongIndex].songTitle}</h5>
        <span class="song-writer">${trendingSongsList[trendingSongIndex].songWriter}</span>
     </div>    </div>`;

    return html;
}

export const trendingSongMarkup = async function (numOfShowingCard) {
    const list = musicList.slice();

    if (list.length !== 0 && list.length >= numOfShowingCard) {
        let html = `${list.map((music, index) => {

            if (index >= numOfShowingCard) return;

            return `<div class="song_card" id="${music.songId}">
            <img class="song-img" src="assests/images/${music.songImgUrl}" alt="${music.songTitle}">
            <img class="music_gif" src="assests/gif/music_playing.gif" alt="music playing gif">
             <button class="btn_play_icon_small">
                               <svg class="play_icon" id="play">
                            <use href="assests/icons.svg#play-icon"></use>
                        </svg>
                        <svg class="play_icon d-none" id="pause">
                            <use href="assests/icons.svg#pause-icon"></use>
                        </svg>
            </button> <div class="music_info_trending"> 
            <h5 class="song-title">${((music.songTitle).length >= 14) ? (music.songTitle).slice(0, 14) + '...' : music.songTitle}</h5>
                    <span class="song-writer"> ${music.songWriter}</span>
         </div >   </div > `
        }).join('')} `;

        return html;
    }
}

export const loadGallary = async function (loadingList) {
    if (loadingList && loadingList.length > 0) {
        let html = `${loadingList.map(music => {
            return `<div class="song_card w-14" id="${music.songId}">
            <img class="song-img" src="assests/images/${music.songImgUrl}" alt="${music.songTitle}">
             <img class="music_gif " src="assests/gif/music_playing.gif" alt="music playing gif">
                          <button class="btn_play_icon_small">
                               <svg class="play_icon" id="play">
                            <use href="assests/icons.svg#play-icon"></use>
                        </svg>
                        <svg class="play_icon d-none" id="pause">
                            <use href="assests/icons.svg#pause-icon"></use>
                        </svg>
                            </button>  
                           <div class="music_info_trending"> 
                             <h5 class="song-title">${((music.songTitle).length >= 14) ? (music.songTitle).slice(0, 14) + '...' : music.songTitle}</h5>
                <span class="song-writer">${music.songWriter}</span> </div>
        </div>`
        }).join('')} `;

        return html;
    }
}

export const generateMarkup = async function (slidedisplay) {
    const list = await getPlayList();
    if (list.length !== 0 && list.length >= slidedisplay) {

        let html = `${list.map((trendingSong, index) => {
            if (index >= slidedisplay) return;
            return `<div class="playing_song_card " id="${trendingSong.songId}">
                            <img src="assests/images/${trendingSong.songImgUrlHd}" alt="${trendingSong.songTitle}">
                     <div class="playing_song_info">
                                <span class="song_title">${trendingSong.songTitle}</span>
                                <span class="song_writer">${trendingSong.songWriter}</span>
                     </div>
                   
                     <div class="overlay">
                       <button class="music_btn music_play_btn btn_play_icon">
                                    <svg class="music_btn_svg playing_btn btn_play_pause" id="play">
                                        <use href="assests/icons.svg#play-icon"></use>
                                    </svg>
                                    <svg class="music_btn_svg playing_btn btn_play_pause d-none" id="pause">
                                        <use href="assests/icons.svg#pause-icon"></use>
                                    </svg>
                       </button>
                       </div>
                    </div>`
        }).join('')} `;
        return html;

    }

}

export const dispalyNextSingleCardMarkup = async function (currentSlide) {
    const songsList = await getPlayList();

    const markup = `<div class="playing_song_card" id="${songsList[currentSlide].songId}">
                            <img src="assests/images/${songsList[currentSlide].songImgUrlHd}" alt="${songsList[currentSlide].songTitle}">
                     <div class="playing_song_info">
                                <span class="song_title">${songsList[currentSlide].songTitle}</span>
                                <span class="song_writer">${songsList[currentSlide].songWriter}</span>
                            </div>
                            <audio class="audio_song" src="assests/music/${songsList[currentSlide].audioFile}" type="audio/mpeg">
                    </audio>
                         <div class="overlay"> <button class="music_btn music_play_btn btn_play_icon" id=musicPlay>
                                    <svg class="music_btn_svg playing_btn btn_play_pause" id="play">
                                        <use href="assests/icons.svg#play-icon"></use>
                                    </svg>
                                    <svg class="music_btn_svg playing_btn btn_play_pause d-none" id="pause">
                                        <use href="assests/icons.svg#pause-icon"></use>
                                    </svg>
                                </button> </div> 
                                       </div>`;
    return markup;

}