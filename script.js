
'use strict';
import * as model from './Js/model.js';
const showLyricsBtn = document.querySelector('.show_Lyrics_btn');
const navBtns = document.querySelectorAll('.nav_item_click');
const navList = document.querySelector('.nav_list')
const displayLibrary = document.querySelector('.library');
const homeScreen = document.querySelector('.home');

const trendingSongCard = document.querySelector('.trending_songs_cards');
const trendingSongBtnPrev = document.querySelector('.trending_song_btn_prev');
const trendingSongBtnNext = document.querySelector('.trending_song_btn_next');

const slides = document.querySelectorAll('.slidebox');
const songPlayContainer = document.querySelector('.song_play_container');
const slideContainer = document.querySelector('.slide_container');

const previousSongPlayBtn = document.querySelector('.previous_song_btn');
const expandLibraryBtn = document.querySelector('.btn_expand_library');
const nextSongPlayBtn = document.querySelector('.next_song_btn');
const newmusicplaybtn = document.querySelector('.newmusicplaybtn');

// variable declarations
var selectedCard;
var songState = { state: 'ready' };
var currentSlide = 0;
var trendingSongIndex = 5;

//function declarations
(async function load() {
    slideContainer.innerHTML = await model.generateMarkup()
})();

// getTrendingSongsList
async function getTrendingSongsList() {
    trendingSongCard.innerHTML = await model.trendingSongMarkup();
}
getTrendingSongsList();

const trendingSongsList = await model.getMusicList();

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

// document.querySelector('#seek-slider').onchange = function () {
//     document.querySelector('.playing_audio').play();
//     document.querySelector('.playing_audio').currentTime = document.querySelector('#seek-slider').value;
// }

trendingSongCard.addEventListener('click', (e) => {

    if (e.target.closest('.song_card')) {
        const displaySongId = e.target.closest('.song_card').getAttribute('id')
        // console.log(displaySongId, 'displaySongId trendingSongCard');

        if (displaySongId) {
            const selectedSong = trendingSongsList.find(trendingSong => {
                return trendingSong.songId == displaySongId;
            })

            if (selectedCard?.songId == selectedSong.songId) {

            } else {
                selectedCard = selectedSong;
                selectedSongDisplay(displaySongId);
            }
        }

        // if (displaySongId) {
        //     selectedSongDisplay(displaySongId);
        // }
        console.log('just clicked trendingSongCard');

        // if (songState.state == 'play' || songState.state == 'ready') {
        //     document.querySelectorAll('.play_icon').forEach(btn => {
        //         if (btn.getAttribute('id') == 'play') {
        //             btn.classList.remove('d-none');
        //         }
        //         if (btn.getAttribute('id') == 'pause') {
        //             btn.classList.add('d-none');
        //         }
        //     });

        // }
        // const audio = document.querySelector('.playing_audio');
        // console.log(audio.duration, 'trendingSongCard duration');
        // console.log(e.target.querySelector('.playing_audio'));
        newmusicplaybtn.click()



        //clicked on btn then -correct
        if (e.target?.closest('.play_icon')) {
            const playbtnId = e.target?.closest('.play_icon').getAttribute('id')
            // playPauseMusic(playbtnId, 'trendingSongCard');
        } else {
            const id = e.target.closest('.song_card').querySelector('#play')
            if (!id.classList.contains('d-none')) {
                // playPauseMusic('play', 'trendingSongCard');
            } else {
                // playPauseMusic('pause', 'trendingSongCard');
            }
        }


        // if (songState.state == 'play') {
        // }
        // if (songState.state == 'ready') {
        // document.querySelectorAll('.song_card').forEach(song => {
        //     song.querySelectorAll('.play_icon').forEach(btn => {
        //         if (btn.getAttribute('id') == 'play') {
        //             btn.classList.remove('d-none');
        //         }
        //         if (btn.getAttribute('id') == 'pause') {
        //             btn.classList.add('d-none');
        //         }
        //     });
        //     song.querySelector('.music_gif').style.opacity = '0';
        // });
        //     newmusicplaybtn.querySelectorAll('.btn_play_pause').forEach(btn => {
        //         if (btn.getAttribute('id') == 'play') {
        //             btn.classList.remove('d-none');
        //         }
        //         if (btn.getAttribute('id') == 'pause') {
        //             btn.classList.add('d-none');
        //         }
        //     })
        // }
        // if (songState.state == 'pause') {
        //     newmusicplaybtn.querySelectorAll('.btn_play_pause').forEach(btn => {
        //         btn.classList.toggle('d-none');
        //     })
        // }

    }
})

slideContainer.addEventListener('click', (e) => {
    if (e.target.closest('.playing_song_card')) {
        const displaySongId = e.target.closest('.playing_song_card').getAttribute('id');
        if (displaySongId) {
            const selectedSong = trendingSongsList.find(trendingSong => {
                return trendingSong.songId == displaySongId;
            });

            if (selectedCard?.songId == selectedSong.songId) {

            } else {
                selectedCard = selectedSong;
                selectedSongDisplay(displaySongId);
            }
        }
        // console.log('selectedCard', selectedCard.songId);
        // console.log('slideContainer');
        if (e.target.closest('.music_card_current')) {
            console.log('just clicked slideContainer');

            // const audio = document.querySelector('.playing_audio');
            // console.log(audio.duration, 'slideContainer duration');
            // console.log(e.target.querySelector('.playing_audio'));
            newmusicplaybtn.click()



            //clicked on btn then -correct
            if (e.target.closest('.music_card_current').querySelector('#play')) {
                const id = e.target.closest('.music_card_current').querySelector('#play')
                // console.log(id, 'iddd playy');
                if (!id.classList.contains('d-none')) {
                    console.log('pllllllllayinggg playactive');
                    // playPauseMusic('play', 'slideContainer');
                } else {
                    console.log('paussseeeeee pauseactive');
                    // playPauseMusic('pause', 'slideContainer');
                }
            }

            // const id = e.target.closest('.music_card_current').querySelector('#play')
            // console.log(id, 'iddd playy');
            // if (!id.classList.contains('d-none')) {
            //     console.log('pllllllllayinggg playactive');
            //     // playPauseMusic('play', 'slideContainer');
            // } else {
            //     console.log('paussseeeeee pauseactive');
            //     // playPauseMusic('pause', 'slideContainer');
            // }
        }

        // const musicCardNext = document.querySelector('.music_card_next');
        // const musicCardPrev = document.querySelector('.music_card_prev');
        // musicCardNext.addEventListener('click', playNextSong);
        // musicCardPrev.addEventListener('click', playPrevSong)


    }
});

function audioValueUpdate() {
    const audio = document.querySelector('.playing_audio');
    const audioSlider = document.querySelector('#seek-slider');

    audio.addEventListener('timeupdate', () => {
        audioSlider.max = Math.floor(audio.duration);
        audioSlider.value = Math.floor(audio.currentTime);
    });

}

document.querySelector('#seek-slider').onchange = function () {
    document.querySelector('.playing_audio').play();
    document.querySelector('.playing_audio').currentTime = document.querySelector('#seek-slider').value;
}

function playPauseMusic(curPlaying, idd) {
    const audio = document.querySelector('.playing_audio');

    if (songState.state == 'ready' || songState.state == 'play') {
        document.querySelectorAll('.play_icon').forEach(btn => {
            if (btn.getAttribute('id') == 'play') {
                btn.classList.remove('d-none');
            }
            if (btn.getAttribute('id') == 'pause') {
                btn.classList.add('d-none');
            }
        });
    }

    // state change
    if (songState.state == 'ready' || songState.state == 'pause') {
        audio.play();

        songState.state = 'play';
        if (songState.state == 'pause') {
        } else {
            newmusicplaybtn.querySelectorAll('.btn_play_pause').forEach(btn => {
                btn.classList.toggle('d-none');
            })
        }
    } else if (songState.state == 'play') {
        audio.pause();

        songState.state = 'pause';

        newmusicplaybtn.querySelectorAll('.btn_play_pause').forEach(btn => {
            btn.classList.toggle('d-none');
        })

        // const id = e.target.querySelector('#play').classList
        // if (id.contains('d-none')) { //pause active

        // } else { //play active
        //     id.toggle('d-none')
        // }
        // console.log();
    }
    document.querySelectorAll('.song_card').forEach(song => {
        if (song.getAttribute('id') == selectedCard.songId) {
            // console.log('song_cards', selectedCard);
            song.querySelectorAll('.play_icon').forEach(btn => {
                // console.log(btn);
                btn.classList.toggle('d-none');
            });
            if (songState.state == 'pause') {
                song.querySelectorAll('.play_icon').forEach(btn => {
                    btn.classList.toggle('d-none');
                });
                song.querySelector('.music_gif').style.opacity = '0';
            } else {
                song.querySelector('.music_gif').style.opacity = '1';
            }
        } else {
            song.querySelector('.music_gif').style.opacity = '0';
        }
    });
    document.querySelectorAll('.playing_song_card').forEach(song => {
        if (song.getAttribute('id') == selectedCard.songId) {

            song.querySelectorAll('.btn_play_pause').forEach(btn => {
                btn.classList.toggle('d-none');
            });
        } else {
        }
    });
    trendingSongCard.style.marginBottom = '80px';

}

newmusicplaybtn.addEventListener('click', (e) => {
    console.log('just clicked newmusicplaybtn');

    if (e.target.querySelector('#play')) {
        const id = e.target.querySelector('#play').classList;
        if (id.contains('d-none')) { //pause active
            playPauseMusic('pauseactive', 'slideContainer');
        } else { //play active
            playPauseMusic('playactive', 'slideContainer');
        }
    } else {
        playPauseMusic('playactive', 'slideContainer');
    }


    // console.log(id, 'iddd playy');
    // if (!id.classList.contains('d-none')) {
    //     playPauseMusic('play', 'slideContainer');
    // } else {
    //     playPauseMusic('pause', 'slideContainer');
    // }

    // if()
    // audio.play();
    // if (e.target.closest('.btn_play_pause')) {
    //     console.log(e.target.closest('.btn_play_pause').getAttribute('id'), 'newmusicplaybtn target imppp');

    //     const closestBtn = e.target.closest('.btn_play_pause').getAttribute('id');
    //     playPauseMusic(closestBtn, 'newmusicplaybtn');
    // }
})


async function playPrevSong() {
    currentSlide--;
    slides.forEach(slide => {
        slide.style.transform = `translate3d(-${(currentSlide * 8) + (2 * currentSlide)}%, 0, 0)`;
        slide.style.transition = 'width 2s, height 2s, transform 2s';
    });
    // console.log(currentSlide, 'currentSlide');
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

    // console.log(currentSlide, 'currentSlide playNextSong');
    if (currentSlide == trendingSongsList.length - 3) {
        nextSongPlayBtn.classList.add('disabled');
    } else {
        previousSongPlayBtn.classList.remove('disabled');
        slides.forEach(slide => {
            slide.style.transform = `translate3d(-${(currentSlide * 8) + (2 * currentSlide)}%, 0, 0)`; //-34%
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

nextSongPlayBtn.addEventListener('click', playNextSong);

async function showHidwLyrics() {
    const lyricsIframe = document.querySelector('.lyrics_showing_iframe')
    // console.log(lyricsIframe, lyricsIframe.body);
    // lyricsIframe.onload = function (e) {
    //     console.log(lyricsIframe, 'frame');
    //     var body = lyricsIframe.contentWindow.document.querySelector('body');
    //     body.style.color = 'red';
    // }
    const lyricsSec = document.querySelector('.lyrics_sec');
    const trendingSong = document.querySelector('.trending_songs_container');
    const header = document.querySelector('.header');
    const container = document.querySelector('.container');
    var hide = showLyricsBtn.textContent == 'Hide Lyrics';

    if (!hide) {
        trendingSong.classList.toggle('d-none');
        trendingSongCard.style.marginBottom = '-14px';

        lyricsSec.style.transform = 'translateY(-7px)';
        lyricsSec.style.transition = 'all .5s linear';
        songPlayContainer.style.background = 'transparent';
        showLyricsBtn.textContent = 'Hide Lyrics';
        lyricsSec.classList.toggle('hidden');
        setTimeout(() => {
            container.classList.toggle('d-none');
            header.classList.toggle('d-none');
        }, 500);


        const html = `<img class="lyrics_sec_bg_img" src="./assests/images/${selectedCard?.songImgUrlHd}" alt="${selectedCard?.songTitle}">
                <div class="lyrics_sec_img">
                    <img src="./assests/images/${selectedCard?.songImgUrl}" alt="${selectedCard?.songTitle}">
                </div>`

        document.querySelector('.lyrics_bg').innerHTML = html;
        document.querySelector('.show_Lyrics_btn').classList.toggle('hide_Lyrics_btn');
        // document.querySelector('.lyrics_sec_bg_img').style.opacity = '0.7';
    } else {

        trendingSongCard.style.marginBottom = '80px';
        lyricsSec.style.transition = 'all .5s linear';
        lyricsSec.style.transform = 'translateY(500px)';

        songPlayContainer.style.background = 'black';
        showLyricsBtn.textContent = 'Show Lyrics';

        trendingSong.classList.toggle('d-none');
        container.classList.toggle('d-none');
        header.classList.toggle('d-none');
        // document.querySelector('.lyrics_sec_bg_img').style.opacity = '1';
        setTimeout(() => {
            lyricsSec.classList.toggle('hidden');
            document.querySelector('.lyrics_bg').innerHTML = '';
        }, 500);
    }

}

showLyricsBtn.addEventListener('click', showHidwLyrics);
document.querySelector('.expand_btn').addEventListener('click', showHidwLyrics);




//trending song btns prevList nextList

function trendingSongMoveNext() {
    trendingSongIndex++;
    const allSongCard = document.querySelectorAll('.song_card');
    // transform: translate3d(-16%, 0, 0);
    // transition: width 2s, height 2s, transform 2s;
    // transform: translateX(0px);
    // trendingSongCard.style.transform = `translateX(200px)`;
    // trendingSongCard.style.transition = ' width 2s, height 2s, transform 2s';
    // trendingSongCard.style.transitionProprty = 'all';
    // trendingSongCard.style.transitionProprty = 'transform';
    // trendingSongCard.style.transitionDelay = '5s';
    // transition-duration: 5s;
    // console.log(trendingSongsList.length, trendingSongIndex, 'trendingSongIndex');
    // trendingSongCard.style.transform = `translateX(0px)`;
    // trendingSongCard.style.transition = 'all 55s linear';
    // transition : 'all 2.5s linear';
    if (trendingSongsList.length
        > trendingSongIndex) {

        allSongCard.forEach((card, i) => {
            // trendingSongCard.style.transform = `translateX(0px)`;
            if (i == 0) {
                card.remove()
            }
            // card.style.transform = `translateX(0px)`;
            card.style.transition = 'all 55s linear';
            // card.style.transitionProprty = 'transform';
            // card.style.transitionDelay = '100s';
            // card.style.transition = 'width 2s, height 2s, transform 2s';
        })
        const html = `<div class="song_card" id="${trendingSongsList[trendingSongIndex].songId}">
        <img class="song-img" src="./assests/images/${trendingSongsList[trendingSongIndex].songImgUrl}" alt="${trendingSongsList[trendingSongIndex].songTitle}">
    <img class="music_gif" src="./assests/gif/music_playing.gif" alt="music playing gif">
                           <button class="btn_play_icon_small">
                               <svg class="play_icon" id="play">
                            <use href="./assests/icons.svg#play-icon"></use>
                        </svg>
                        <svg class="play_icon d-none" id="pause">
                            <use href="./assests/icons.svg#pause-icon"></use>
                        </svg>
                            </button>    <h5 class="song-title">${trendingSongsList[trendingSongIndex].songTitle}</h5>
        <span class="song-writer">${trendingSongsList[trendingSongIndex].songWriter}</span>
        </div>`

        setTimeout(() => {
            trendingSongCard.style.transform = `translateX(0px)`;
            trendingSongCard.style.transition = 'all 2.5s linear';
            // allSongCard.forEach((card, i) => {
            //     if (i == 0) {
            //         card.remove()
            //     }
            //     // card.style.transition = 'width 2s, height 2s, transform 2s';
            // })
        }, 500)
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
                               <svg class="play_icon" id="play">
                            <use href="./assests/icons.svg#play-icon"></use>
                        </svg>
                        <svg class="play_icon d-none" id="pause">
                            <use href="./assests/icons.svg#pause-icon"></use>
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


//home screen / getTrendingSongsList
homeScreen.addEventListener('click', () => {
    document.querySelector('.trending_songs_container').style.top = '67%';
    trendingSongCard.style.flexFlow = 'row';
    getTrendingSongsList();
});

function selectedSongDisplay(displaySongId) {
    trendingSongCard.style.marginBottom = '80px';
    songPlayContainer.classList.remove("hidden");

    console.log(displaySongId, 'SongId');
    const selectedSong = trendingSongsList.find(trendingSong => {
        return trendingSong.songId == displaySongId;
    })
    selectedCard = selectedSong;

    if (selectedSong) {
        const audioHtml = `<audio class="audio_song playing_audio" src="./assests/music/${selectedSong.audioFile}" type="audio/mpeg">
                    </audio>`;
        document.querySelector('.audio_song_container').innerHTML = audioHtml;

        const lyricsMarkup = `<iframe class="lyrics_showing_iframe" style="border: none;" src="assests/heeriye_lyrics.txt">
        </iframe>`
        // document.querySelector('.lyrics_show').innerHTML = lyricsMarkup;

        const musicInfoHtml = `<div>
                        <img width="50" height="50" src="./assests/images/${selectedSong.songImgUrl}" alt="${selectedSong.songTitle}">
                            </div>
                    <div class="music_info">
                        <span>${selectedSong.songTitle}</span>
                        <span>${selectedSong.songWriter}</span>
                    </div>`;
        document.querySelector('.music_info_sec').innerHTML = musicInfoHtml;

        // audio updated
        audioValueUpdate();
    }

}

// var lyricsIframe = document.getElementById('lyrics_showing_iframe');
// lyricsIframe.onload = function (e) {
//     // console.log(lyricsIframe, 'frame');
//     var body = lyricsIframe.contentWindow.document.querySelector('body');
//     body.style.color = 'red';
// }