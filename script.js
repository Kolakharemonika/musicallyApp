
'use strict';
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

const newmusicplaybtn = document.querySelector('.newmusicplaybtn');
var selectedCard;
var songState = { state: 'ready' };
// songState.state = 'play'
console.log(songState.state, 'songState.state');

(async function load() {
    slideContainer.innerHTML = await model.generateMarkup()
})();



function playPauseMusic(closestBtn, idd) {
    // console.log(idd, 'iddddd');
    const audio = document.querySelector('audio');
    trendingSongCard.style.marginBottom = '80px';

    if (idd == 'newmusicplaybtn') {
        if (closestBtn.getAttribute('id') && audio) {
            if (closestBtn.getAttribute('id') == 'play') {
                audio.play();
                console.log('song playing');
                closestBtn.nextElementSibling.classList.toggle('d-none');

            } else {
                audio.pause();
                console.log('song pause');
                closestBtn.previousElementSibling.classList.toggle('d-none');
            }
            closestBtn.classList.toggle('d-none');

            const impp = document.querySelector('.music_card_current').querySelectorAll('.btn_play_pause');
            console.log(impp, '111111111111111');

            impp.forEach(btn => {
                btn.classList.toggle('d-none');
            });
        }
    }
    if (idd == 'mk') {
        if (closestBtn && audio) {
            if (closestBtn == 'play') {
                audio.play();
                console.log('song playing');
                // closestBtn.classList.toggle('d-none');

            } else {
                audio.pause();
                console.log('song pause');
                // closestBtn.classList.toggle('d-none');
            }
            // closestBtn.classList.toggle('d-none');
        }
        const impp1 = newmusicplaybtn.querySelectorAll('.btn_play_pause')
        impp1.forEach(btn => {
            btn.classList.toggle('d-none');
        });
    }


}
newmusicplaybtn.addEventListener('click', (e) => {
    console.log(e.target.closest('.btn_play_pause').getAttribute('id'), 'newmusicplaybtn target imppp');
    if (e.target.closest('.btn_play_pause')) {

        const closestBtn = e.target.closest('.btn_play_pause');
        playPauseMusic(closestBtn, 'newmusicplaybtn');
    }

})
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
    // console.log(e.target.closest('.song_card'));
    // console.log(e.target.closest('.btn_play_pause'), 'trendingSongCard e.target.closest playpause');
    if (e.target.closest('.song_card')) {
        const displaySongId = e.target.closest('.song_card').getAttribute('id')


        console.log('imppppp new start', e.target.closest('.song_card'));
        // const md = e.target.closest('.song_card').querySelector('.btn_play_icon_small')
        // console.log(e.target.closest('.song_card').querySelector('.btn_play_icon_small').closest(''), 'mddddd imp');

        const selectedSong = trendingSongsList.find(trendingSong => {
            return trendingSong.songId == displaySongId;
        })
        selectedCard = selectedSong;
        console.log(selectedCard, 'trendingSongCard selectedCard', selectedSong);
        if (displaySongId) {
            selectedSongDisplay(displaySongId);
        }
    }

})


const musicPlayBtn = document.querySelectorAll('.music_play_btn');
const playingSongCardList = document.querySelectorAll('.playing_song_card');
var currentSlide = 0;

// trendingSongPlay
async function playPrevSong() {
    currentSlide--;
    slides.forEach(slide => {
        slide.style.transform = `translate3d(-${currentSlide * 11}%, 0, 0)`;
        slide.style.transition = 'width 2s, height 2s, transform 2s';
    });
    console.log(currentSlide, 'currentSlide');
    if (currentSlide == 0) {
        previousSongPlayBtn.classList.add('disabled');
    } else {
        nextSongPlayBtn.classList.remove('disabled');
    }
    const playingSongCardList1 = document.querySelectorAll('.playing_song_card');

    playingSongCardList1[currentSlide].classList?.replace('none', 'music_card_prev')
    playingSongCardList1[currentSlide + 1].classList?.replace('music_card_prev', 'music_card_current')
    playingSongCardList1[currentSlide + 2].classList?.replace('music_card_current', 'music_card_next')

    setTimeout(() => {
        playingSongCardList1.length >= 3 && slideContainer.removeChild(slideContainer.lastChild)
    }, 1500);
}

previousSongPlayBtn.addEventListener('click', playPrevSong);

async function playNextSong() {
    currentSlide++;

    console.log(currentSlide, 'currentSlide playNextSong');
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

        const markup = await model.dispalyNextSingleCardMarkup(2 + currentSlide)
        slideContainer.insertAdjacentHTML('beforeend', markup);

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

// slideContainer
nextSongPlayBtn.addEventListener('click', playNextSong);


//hide Show library
function showHidwLyrics() {
    const lyricsSec = document.querySelector('.lyrics_sec');
    const trendingSong = document.querySelector('.trending_songs_container');
    const header = document.querySelector('.header');
    const container = document.querySelector('.container');
    var hide = showLyricsBtn.textContent == 'Hide Lyrics';
    if (!hide) {
        lyricsSec.style.transform = 'translateY(-7px)';
        lyricsSec.style.transition = 'width 2s ease 0s, height 2s ease 0s, transform 2s ease 0s';

        songPlayContainer.style.background = 'transparent';
        trendingSongCard.style.marginBottom = '-14px';
        showLyricsBtn.textContent = 'Hide Lyrics';
        lyricsSec.classList.toggle('hidden');
        setTimeout(() => {
            trendingSong.classList.toggle('d-none');
            container.classList.toggle('d-none');
            header.classList.toggle('d-none');
        }, 500);
        console.log('selectedCard lyrics selectedCard', selectedCard);
        const html = `<img class="lyrics_sec_bg_img" src="./assests/images/${selectedCard?.songImgUrlHd}" alt="${selectedCard?.songTitle}">
                <div class="lyrics_sec_img">
                    <img src="./assests/images/${selectedCard?.songImgUrl}" alt="${selectedCard?.songTitle}">
                </div>`

        document.querySelector('.lyrics_bg').innerHTML = html;
        document.querySelector('.show_Lyrics_btn').classList.toggle('hide_Lyrics_btn');

    } else {
        lyricsSec.style.transition = 'width 2s, height 2s, transform 2s';
        lyricsSec.style.transform = 'translateY(500px)';

        songPlayContainer.style.background = 'black';
        trendingSongCard.style.marginBottom = '80px';
        showLyricsBtn.textContent = 'Show Lyrics';

        trendingSong.classList.toggle('d-none');
        container.classList.toggle('d-none');
        header.classList.toggle('d-none');

        setTimeout(() => {
            lyricsSec.classList.toggle('hidden');
            document.querySelector('.lyrics_bg').innerHTML = '';
        }, 2000);
    }

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

//dropdown display
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


    // console.log(trendingSongsList.length, trendingSongIndex, 'trendingSongIndex');
    if (trendingSongsList.length
        > trendingSongIndex) {

        allSongCard.forEach((card, i) => {
            if (i == 0) {
                card.remove()
            }
            card.style.transition = 'width 2s, height 2s, transform 2s';
        })
        const html = `  <div class="song_card" id="${trendingSongsList[trendingSongIndex].songId}">
        <img class="song-img" src="./assests/images/${trendingSongsList[trendingSongIndex].songImgUrl}" alt="${trendingSongsList[trendingSongIndex].songTitle}">
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
    // console.log('trendingSong');
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
        <img class="song-img" src="./assests/images/${trendingSongsList[trendingSongIndex - 5].songImgUrl}" alt="${trendingSongsList[trendingSongIndex - 5].songTitle}">
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


btnPlayPause.forEach(btn => {
    // console.log(btn);
    // btn.addEventListener('click', (e) => {
    //     const audio = document.querySelector('audio');
    //     const closestBtn = e.target.closest('.btn_play_pause');
    //     if (closestBtn && audio) {
    //         if (closestBtn.getAttribute('id') == 'play') {
    //             audio.play();
    //             closestBtn.nextElementSibling.classList.toggle('d-none');
    //         } else {
    //             audio.pause();
    //             closestBtn.previousElementSibling.classList.toggle('d-none');
    //         }
    //         closestBtn.classList.toggle('d-none');

    //     }
    // })
})

function selectedSongDisplay(displaySongId) {
    trendingSongCard.style.marginBottom = '80px';
    songPlayContainer.classList.remove("hidden");
    console.log(displaySongId, 'SongId');
    const selectedSong = trendingSongsList.find(trendingSong => {
        return trendingSong.songId == displaySongId;
    })
    selectedCard = selectedSong;
    console.log(selectedCard, 'selectedSongDisplay selectedCard');

    if (selectedSong) {
        // const audioHtml = ` <audio class="audio_song" src="./assests/music/${selectedSong.audioFile}" type="audio/mpeg">
        //             </audio>`
        // document.querySelector('.audio_song-container').innerHTML = audioHtml;

        const musicInfoHtml = ` <div>
                        <img width="50" height="50" src="./assests/images/${selectedSong.songImgUrl}" alt="${selectedSong.songTitle}" >
                    </div>
                    <div class="music_info">
                        <span>${selectedSong.songTitle}</span>
                        <span>${selectedSong.songWriter}</span>
                    </div>`;
        document.querySelector('.music_info_sec').innerHTML = musicInfoHtml;
    }
}
const mk = document.querySelectorAll('.btn_play_icon');
// mk.forEach(btn => {
//     btn.addEventListener('click', (e) => {
//         console.log(e.target.closest('.btn_play_pause').getAttribute('id'), ' e.target mkkkkk imppp');
//         if (e.target.closest('.btn_play_pause')){
//             const closestBtn = e.target.closest('.btn_play_pause').getAttribute('id')
//             // closestBtn.getAttribute('id')
//             playPauseMusic(closestBtn, 'mk');
//         }


//     })
// })
slideContainer.addEventListener('click', (e) => {
    // songPlayContainer.classList.remove("hidden");
    if (e.target.closest('.playing_song_card')) {
        console.log('slideContainer');
        if (e.target.closest('.music_card_current')) {

            const impp = e.target.closest('.music_card_current').querySelectorAll('.btn_play_pause')
            console.log(impp, '111111111111111');

            impp.forEach(btn => {
                // console.log(btn, 'btn');
                btn.classList.toggle('d-none');
            });
            playPauseMusic('play', 'mk');
            // const impp1 = newmusicplaybtn.querySelectorAll('.btn_play_pause')
            // impp1.forEach(btn => {
            //     // console.log(btn, 'btn');
            //     btn.classList.toggle('d-none');
            // });
        }

        const musicCardNext = document.querySelector('.music_card_next');
        const musicCardPrev = document.querySelector('.music_card_prev');
        musicCardNext.addEventListener('click', playNextSong);
        musicCardPrev.addEventListener('click', playPrevSong)

        const displaySongId = e.target.closest('.playing_song_card')?.getAttribute('id');

        if (displaySongId) {
            const selectedSong = trendingSongsList.find(trendingSong => {
                return trendingSong.songId == displaySongId;
            });

            selectedCard = selectedSong;
            selectedSongDisplay(displaySongId);
        }

    }
})


// musicPlayBtn.forEach(playingBtn => {


//     playingBtn.addEventListener('click', (e) => {
//         trendingSongCard.style.marginBottom = '80px';
//         const audio = document.querySelector('audio');

//         const allSongCard = document.querySelectorAll('.song_card');

//         const musicCardCurrent = document.querySelector('.music_card_current');
//         let displaySongId = musicCardCurrent.getAttribute('id');
//         // console.log(displaySongId, 'displaySongId', selectedCard.songId, 'selected');
//         displaySongId = selectedCard?.songId ? selectedCard?.songId : displaySongId;
//         if (displaySongId) {
//             selectedSongDisplay(displaySongId);
//         }
//         // const selectedTrendingCrad = allSongCard.find(trendingSong => {
//         //     return trendingSong.songId == displaySongId;
//         // })
//         // console.log(selectedTrendingCrad, 'selectedTrendingCrad');
//         // audio.duration
//         // console.log(audio.duration, 'audio.duration');
//         const closestBtn = e.target.closest('.btn_play_pause');
//         if (closestBtn && audio) {
//             if (closestBtn.getAttribute('id') == 'play') {
//                 audio.play();
//                 closestBtn.nextElementSibling.classList.toggle('d-none');


//             } else {
//                 audio.pause();
//                 closestBtn.previousElementSibling.classList.toggle('d-none');
//             }
//             closestBtn.classList.toggle('d-none');
//             // console.log(closestBtn.nextSibling);
//             // console.log(closestBtn.previousSibling);
//             // console.log(closestBtn.previousElementSibling);
//             // console.log(closestBtn.nextElementSibling, 'nextElementSibling');

//         }

//     })
// });

