import * as model from './Js/model.js';
const cardEl = document.querySelectorAll('.card');
const showLyricsBtn = document.querySelector('.show_Lyrics_btn');
const navBtns = document.querySelectorAll('.nav_item_click');
const navList = document.querySelector('.nav_list')
const displayLibrary = document.querySelector('.library');
const homeScreen = document.querySelector('.home');

const trendingSongCard = document.querySelector('.trending_songs_cards');
const trendingSongPlayBtn = document.getElementById('trendingSongPlay');
const trendingSongBtnPrev = document.querySelector('.trending_song_btn_prev');
const trendingSongBtnNext = document.querySelector('.trending_song_btn_next');
const expandLibraryBtn = document.querySelector('.btn_expand_library');

const slides = document.querySelectorAll('.slidebox');
const slideContainer = document.querySelector('.slide_container');

const previousSongPlayBtn = document.querySelector('.previous_song_btn');
const nextSongPlayBtn = document.querySelector('.next_song_btn');

(async function load() {
    slideContainer.innerHTML = await model.generateMarkup()
})();

//working
// (async function getTrendingSongsList() {
//     trendingSongCard.innerHTML = await model.trendingSongMarkup();
// })();
async function getTrendingSongsList() {
    trendingSongCard.innerHTML = await model.trendingSongMarkup();
}
getTrendingSongsList();

const trendingSongsList = await model.getMusicList();



trendingSongCard.addEventListener('click', (e) => {
    console.log(e.target.closest('.song_card'));
    if (e.target.closest('.song_card')) {
        const mk = e.target.closest('.song_card')
        console.log(mk.getAttribute('id'), 'id');
    }
    // console.log(e.target.closest('.song-img'));
    // if (e.target.closest('.song-img')) {

    //     let button = document.createElement("button");
    //     button.classList.add('btn_play_icon_small');
    //     button.setAttribute('id', 'trendingSongPlay');
    //     // let p = document.createElement("svg");
    //     // p.innerHTML=
    //     button.innerHTML = `<svg class="play_icon">
    //             <use href="./assests/icons.svg#play-icon"></use>
    //         </svg>`;

    //     // trendingSongCard.append(button);

    //     // console.log(div.childNodes); // NodeList [ <p> ]
    //     // console.log(e.target.closest('.song-img').classList);

    // }
})

function trending() {
    // const html = ;
    // trendingSongCard.innerHTML = html;
}
trending();




const musicCardNext = document.querySelector('.music_card_next');
const musicCardPrev = document.querySelector('.music_card_prev');
const musicPlayBtn = document.querySelectorAll('.music_play_btn');
const playingSongCardList = document.querySelectorAll('.playing_song_card');
var currentSlide = 0;

// trendingSongPlay
function playPrevSong() {
    currentSlide--;
    slides.forEach(slide => {
        slide.style.transform = `translate3d(-${currentSlide * 11}%, 0, 0)`;
        slide.style.transition = 'width 2s, height 2s, transform 2s';
    });
    console.log(currentSlide);
    if (currentSlide == 0) {
        previousSongPlayBtn.classList.add('disabled');
    } else {
        nextSongPlayBtn.classList.remove('disabled');
    }
    const playingSongCardList1 = document.querySelectorAll('.playing_song_card');
    console.log(playingSongCardList1);

    playingSongCardList1[currentSlide].classList.replace('none', 'music_card_prev')
    playingSongCardList1[currentSlide + 1].classList.replace('music_card_prev', 'music_card_current')
    playingSongCardList1[currentSlide + 2].classList.replace('music_card_current', 'music_card_next')

    setTimeout(() => {
        playingSongCardList1.length >= 3 && slideContainer.removeChild(slideContainer.lastChild)
    }, 1500);
}

musicCardPrev.addEventListener('click', playPrevSong)
previousSongPlayBtn.addEventListener('click', playPrevSong);

function playNextSong() {
    currentSlide++;

    console.log(currentSlide);
    if (currentSlide == trendingSongsList.length - 3) {
        nextSongPlayBtn.classList.add('disabled');
    } else {
        previousSongPlayBtn.classList.remove('disabled');
        slides.forEach(slide => {
            slide.style.transform = `translate3d(-${currentSlide * 11}%, 0, 0)`; //-34%
            slide.style.transition = 'width 2s, height 2s, transform 2s';
        });

        const playingSongCardList1 = document.querySelectorAll('.playing_song_card');

        for (let i = 0; i <= playingSongCardList1.length; i++) {
            if (i == playingSongCardList1.length - 3) {
                playingSongCardList1[i].classList.replace('music_card_prev', 'none')
            }
            if (i == playingSongCardList1.length - 2) {
                playingSongCardList1[i].classList.replace('music_card_current', 'music_card_prev')
            }
            if (i == playingSongCardList1.length - 1) {
                playingSongCardList1[i].classList.replace('music_card_next', 'music_card_current')
            }
        }

        const html = `<div class="playing_song_card music_card_next" id="${trendingSongsList[2 + currentSlide].songId}">
                            <img src="./assests/images/${trendingSongsList[2 + currentSlide].songImg}" alt="${trendingSongsList[2 + currentSlide].songTitle}">
                     <div class="playing_song_info">
                                <span class="song_title">${trendingSongsList[2 + currentSlide].songTitle}</span>
                                <span class="song_writer">${trendingSongsList[2 + currentSlide].songWriter}</span>
                            </div>
                         <div class="overlay"> <button class="music_btn music_play_btn btn_play_icon" id=musicPlay>
                                    <svg class="music_btn_svg btn_play_pause" id="play">
                                        <use href="./assests/icons.svg#play-icon"></use>
                                    </svg>
                                    <svg class="music_btn_svg btn_play_pause d-none" id="pause">
                                        <use href="./assests/icons.svg#pause-icon"></use>
                                    </svg>
                                </button> </div>        </div>`;

        slideContainer.insertAdjacentHTML('beforeend', html);

        // slides.forEach(slide => {
        //     slide.style.transform = `translate3d(-${currentSlide * 11}%, 0, 0)`; //-34%
        //     slide.style.transition = 'width 2s, height 2s, transform 2s';
        // });
        // slideContainer.removeChild(list.firstElementChild);
        // console.log(slideContainer.hasChildNodes(), slideContainer.removeChild(slideContainer.firstChild));
        setTimeout(() => {
            // slideContainer.removeChild(slideContainer.firstElementChild);
        }, 2500)

    }
}
musicCardNext.addEventListener('click', playNextSong);
nextSongPlayBtn.addEventListener('click', playNextSong);

function showHidwLyrics() {
    console.log('showLyricsBtn');
    showLyricsBtn.textContent = showLyricsBtn.textContent == 'Hide Lyrics' ? 'Show Lyrics' : 'Hide Lyrics';
    document.querySelector('.lyrics_sec').classList.toggle('hidden');
    document.querySelector('.show_Lyrics_btn').classList.toggle('hide_Lyrics_btn');
}

showLyricsBtn.addEventListener('click', showHidwLyrics);
document.querySelector('.expand_btn').addEventListener('click', showHidwLyrics);


//activate navbar btns
navList.addEventListener('click', (e) => {
    e.stopPropagation();
    navBtns.forEach(navbtn => {
        navbtn.classList.remove('active');
    })
    e.target.closest('.nav_item_click').classList.add('active');
});

document.querySelector(".dropbtn").addEventListener('click', () => {
    document.querySelector("#profileDropdown").classList.toggle("show");
});


//working
const songPlayContainer = document.querySelector('.song_play_container');


//trending song btns prevList nextList
var trendingSongIndex = 5;
function trendingSongMoveNext() {
    trendingSongIndex++;
    const allSongCard = document.querySelectorAll('.song_card');


    console.log(trendingSongsList.length, trendingSongIndex, 'trendingSongIndex');
    if (trendingSongsList.length
        > trendingSongIndex) {

        allSongCard.forEach((card, i) => {
            if (i == 0) {
                card.remove()
            }
            card.style.transition = 'width 2s, height 2s, transform 2s';
        })
        const html = `  <div class="song_card" id="${trendingSongsList[trendingSongIndex].songId}">
        <img class="song-img" src="./assests/images/${trendingSongsList[trendingSongIndex].songImg}" alt="${trendingSongsList[trendingSongIndex].songTitle}">
    <img class="music_gif" src="./assests/gif/music_playing.gif" alt="music playing gif">
                            <button class="btn_play_icon_small">
                                <svg class="play_icon">
                                    <use href="./assests/icons.svg#play-icon"></use>
                                </svg>
                            </button>    <h5 class="song-title">${trendingSongsList[trendingSongIndex].songTitle}</h5>
        <span class="song-writer">${trendingSongsList[trendingSongIndex].songWriter}</span>
        </div>`

        trendingSongCard.insertAdjacentHTML('beforeend', html)
    }

    // song_card
    // transform: translate3d(-92%, 0, 0);
    // transition: width 2s, height 2s, transform 2s;
    if (trendingSongIndex == 8) {
        trendingSongBtnNext.classList.add('disabled')
    } else {
        trendingSongBtnPrev.classList.remove('disabled')
        trendingSongBtnNext.classList.remove('disabled')
    }
    console.log('trendingSong');
}

function trendingSongMovePrev() {
    trendingSongIndex--;
    const allSongCard = document.querySelectorAll('.song_card');

    if (trendingSongsList.length > trendingSongIndex) {

        allSongCard.forEach((card, i) => {
            if (i == allSongCard.length - 1) {
                card.remove();
            }
            card.style.transition = 'width 2s, height 2s, transform 2s';
            card.style.transitionDelay = '1s';
        })
        const html = `  <div class="song_card" id="${trendingSongsList[trendingSongIndex - 5].songId}">
        <img class="song-img" src="./assests/images/${trendingSongsList[trendingSongIndex - 5].songImg}" alt="${trendingSongsList[trendingSongIndex - 5].songTitle}">
          <img class="music_gif" src="./assests/gif/music_playing.gif" alt="music playing gif">
                            <button class="btn_play_icon_small">
                                <svg class="play_icon">
                                    <use href="./assests/icons.svg#play-icon"></use>
                                </svg>
                            </button>   <h5 class="song-title">${trendingSongsList[trendingSongIndex - 5].songTitle}</h5>
        <span class="song-writer">${trendingSongsList[trendingSongIndex - 5].songWriter}</span>
        </div>`

        trendingSongCard.insertAdjacentHTML('afterbegin', html);
    }

    if (trendingSongIndex == 5) {
        trendingSongBtnPrev.classList.add('disabled');
    } else {
        trendingSongBtnNext.classList.remove('disabled');
        trendingSongBtnPrev.classList.remove('disabled');
    }
}
trendingSongBtnNext.addEventListener('click', trendingSongMoveNext);
trendingSongBtnPrev.addEventListener('click', trendingSongMovePrev);



// library section
async function fetchMusicLibrary() {
    document.querySelector('.trending_songs_container').style.top = '11%';
    trendingSongCard.style.flexFlow = 'wrap';
    document.querySelectorAll('.song_card').width = '14%';
    trendingSongCard.innerHTML = await model.loadGallary();
}
expandLibraryBtn.addEventListener('click', fetchMusicLibrary);
displayLibrary.addEventListener('click', fetchMusicLibrary);


//home screen
homeScreen.addEventListener('click', () => {
    document.querySelector('.trending_songs_container').style.top = '67%';
    trendingSongCard.style.flexFlow = 'row';
    getTrendingSongsList();
})

//Audio play pause

const btnPlayPause = document.querySelectorAll('.btn_play_pause');

function selectedSongDisplay(displaySongId) {

    songPlayContainer.classList.remove("hidden");
    console.log(displaySongId, 'SongId');
    const selectedSong = trendingSongsList.find(trendingSong => {
        return trendingSong.songId == displaySongId;
    })

    if (selectedSong) {
        const audioHtml = ` <audio class="audio_song" src="./assests/music/${selectedSong.audioFile}" type="audio/mpeg">
                    </audio>`
        document.querySelector('.audio_song-container').innerHTML = audioHtml;

        const musicInfoHtml = ` <div>
                        <img width="50" height="50" src="./assests/images/${selectedSong.songImg}" alt="${selectedSong.songTitle}" >
                    </div>
                    <div class="music_info">
                        <span>${selectedSong.songTitle}</span>
                        <span>${selectedSong.songWriter}</span>
                    </div>`;
        document.querySelector('.music_info_sec').innerHTML = musicInfoHtml;
    }
}

slideContainer.addEventListener('click', (e) => {
    // songPlayContainer.classList.remove("hidden");
    if (e.target.closest('.playing_song_card')) {

        const displaySongId = e.target.closest('.playing_song_card').getAttribute('id');

        if (displaySongId) {
            selectedSongDisplay(displaySongId);
        }

    }
})

// musicCardCurrent.addEventListener('click', (e) => {
//     console.log(e.target, 'wdws');
// })



musicPlayBtn.forEach(playingBtn => {

    // margin-bottom: 80px;
    playingBtn.addEventListener('click', (e) => {
        trendingSongCard.style.marginBottom = '80px';
        const audio = document.querySelector('audio');
        const musicCardCurrent = document.querySelector('.music_card_current');


        console.log(musicCardCurrent, 'musicCardCurrent');
        const displaySongId = musicCardCurrent.getAttribute('id');

        if (displaySongId) {
            selectedSongDisplay(displaySongId);
        }

        // audio.duration
        // console.log(audio.duration, 'audio.duration');
        const closestBtn = e.target.closest('.btn_play_pause');
        if (closestBtn && audio) {
            if (closestBtn.getAttribute('id') == 'play') {
                audio.play();
            } else {
                audio.pause();
            }
            btnPlayPause.forEach(btn => {
                btn.classList.toggle('d-none');
            })
        }

    })
});

