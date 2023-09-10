
'use strict';
import * as model from './Js/model.js';
const showLyricsBtn = document.querySelector('.show_Lyrics_btn');
const navBtns = document.querySelectorAll('.nav_item_click');
const navList = document.querySelector('.nav_list')
const displayLibrary = document.querySelector('.library');
const homeScreen = document.querySelector('.home');

const trendingSongsContainer = document.querySelector('.trending_songs_container');
const trendingSubContainer = document.querySelector('.sub_container')
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
const playNextSongBtn = document.querySelector('.play_next_song_btn');
const playPrevSongBtn = document.querySelector('.play_prev_song_btn');

const searchInput = document.querySelector('.search_field');
const searchBtn = document.querySelector('.search_btn');
// 
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

    if (songState.state == 'ready' || songState.state == 'pause') {
        audio.play();
        console.log('songState.state readyyy ---- playing');
        songState.state = 'play';
        newmusicplaybtn.querySelectorAll('.btn_play_pause').forEach(btn => {
            if (btn.getAttribute('id') == 'play') {
                btn.classList.add('d-none');
            }
            if (btn.getAttribute('id') == 'pause') {//pause display
                btn.classList.remove('d-none');
            }
        });

        document.querySelectorAll('.song_card').forEach(song => {
            if (song.getAttribute('id') == selectedCard.songId) {
                song.querySelectorAll('.play_icon').forEach(btn => {
                    if (btn.getAttribute('id') == 'play') {
                        btn.classList.add('d-none');
                    }
                    if (btn.getAttribute('id') == 'pause') {//pause display
                        btn.classList.remove('d-none');
                    }
                });
                song.querySelector('.music_gif').style.opacity = '1';
            } else {
                //pause btn contains d-none
                song.querySelectorAll('.play_icon').forEach(btn => {

                    if (btn.getAttribute('id') == 'play') {
                        btn.classList.remove('d-none');
                    }
                    if (btn.getAttribute('id') == 'pause') {
                        btn.classList.add('d-none');
                    }
                });
                song.querySelector('.music_gif').style.opacity = '0';
            }
        });

        document.querySelectorAll('.playing_song_card').forEach(song => {
            if (song.getAttribute('id') == selectedCard.songId) {
                song.querySelectorAll('.btn_play_pause').forEach(btn => {
                    if (btn.getAttribute('id') == 'play') {
                        btn.classList.add('d-none');
                    }
                    if (btn.getAttribute('id') == 'pause') {
                        btn.classList.remove('d-none');
                    }
                });
            } else {
                song.querySelectorAll('.btn_play_pause').forEach(btn => {

                    if (btn.getAttribute('id') == 'play') {
                        btn.classList.remove('d-none');
                    }
                    if (btn.getAttribute('id') == 'pause') {
                        btn.classList.add('d-none');
                    }
                });
            }
        });
    } else if (songState.state == 'play') {
        console.log('songState.state playyy ---- ');
        document.querySelectorAll('.song_card').forEach(song => {
            if (song.getAttribute('id') == selectedCard.songId) {
                song.querySelectorAll('.play_icon').forEach(btn => {
                    if (btn.getAttribute('id') == 'play') {
                        if (btn.classList.contains('d-none')) {//playing currently
                            //pause the audio
                            audio.pause();
                            songState.state = 'pause';
                            //toggle
                            song.querySelector('.music_gif').style.opacity = '0';

                            btn.classList.remove('d-none');


                            newmusicplaybtn.querySelectorAll('.btn_play_pause').forEach(btn => {
                                if (btn.getAttribute('id') == 'play') {
                                    btn.classList.remove('d-none');
                                }
                                if (btn.getAttribute('id') == 'pause') {//pause display
                                    btn.classList.add('d-none');
                                }
                            })
                            document.querySelectorAll('.playing_song_card').forEach(song => {
                                if (song.getAttribute('id') == selectedCard.songId) {
                                    song.querySelectorAll('.btn_play_pause').forEach(btn => {
                                        if (btn.getAttribute('id') == 'play') {
                                            btn.classList.remove('d-none');
                                        }
                                        if (btn.getAttribute('id') == 'pause') {
                                            btn.classList.add('d-none');
                                        }

                                    });
                                } else {
                                    song.querySelectorAll('.btn_play_pause').forEach(btn => {

                                        if (btn.getAttribute('id') == 'play') {
                                            btn.classList.remove('d-none');
                                        }
                                        if (btn.getAttribute('id') == 'pause') {
                                            btn.classList.add('d-none');
                                        }
                                    });
                                }
                            });

                        } else {
                            // playyy the songg
                            console.log('2222222 audio playy');
                            console.log('songState.state playy ---- playy');
                            audio.play();
                            songState.state = 'play';
                            song.querySelector('.music_gif').style.opacity = '1';
                            if (btn.getAttribute('id') == 'play') {
                                btn.classList.add('d-none');
                            }
                            if (btn.getAttribute('id') == 'pause') {
                                btn.classList.remove('d-none');
                            }
                            newmusicplaybtn.querySelectorAll('.btn_play_pause').forEach(btn => {
                                if (btn.getAttribute('id') == 'play') {
                                    btn.classList.add('d-none');
                                }
                                if (btn.getAttribute('id') == 'pause') {//pause display
                                    btn.classList.remove('d-none');
                                }
                            })

                            document.querySelectorAll('.playing_song_card').forEach(song => {
                                if (song.getAttribute('id') == selectedCard.songId) {
                                    song.querySelectorAll('.btn_play_pause').forEach(btn => {
                                        if (btn.getAttribute('id') == 'play') {
                                            btn.classList.add('d-none');
                                        }
                                        if (btn.getAttribute('id') == 'pause') {
                                            btn.classList.remove('d-none');
                                        }

                                    });
                                } else {
                                    song.querySelectorAll('.btn_play_pause').forEach(btn => {

                                        if (btn.getAttribute('id') == 'play') {
                                            btn.classList.remove('d-none');
                                        }
                                        if (btn.getAttribute('id') == 'pause') {
                                            btn.classList.add('d-none');
                                        }
                                    });
                                }
                            });

                        }
                    } else {
                        if (btn.classList.contains('d-none')) {
                            btn.classList.remove('d-none');
                        } else {
                            btn.classList.add('d-none');
                        }

                    }

                });
            } else {
                //pause btn contains d-none
                song.querySelectorAll('.play_icon').forEach(btn => {

                    if (btn.getAttribute('id') == 'play') {
                        btn.classList.remove('d-none');
                    }
                    if (btn.getAttribute('id') == 'pause') {
                        btn.classList.add('d-none');
                    }
                });
                song.querySelector('.music_gif').style.opacity = '0';
            }
        });

    }


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

})

function findNextSelectedSong(songId, where) {

    console.log(songId, where, 'songId, where');
    var songIndex = trendingSongsList.findIndex(trendingSong => {
        return trendingSong.songId == (songId || selectedCard.songId);
    });
    console.log(songIndex, 'songIndex');

    (where == 'prev') ? songIndex-- : songIndex++;

    if (songIndex < trendingSongsList.length && songIndex >= 0) {
        const selectedSong = trendingSongsList.find((trendingSong, i) => {
            return (i == songIndex);
        })
        selectedCard = selectedSong;
        selectedSongDisplay(selectedSong.songId);

        if (where == 'next') {
            currentSlide = songId - 2;
            playNextSong();
        } else {
            currentSlide = songId + 2;
            playPrevSong()
        }

    } else {
        alert('No songs Availables!')
    }

}

playPrevSongBtn.addEventListener('click', () => {
    if (selectedCard && selectedCard.songId) {
        findNextSelectedSong(selectedCard.songId, 'prev');
    }
});

playNextSongBtn.addEventListener('click', () => {
    if (selectedCard && selectedCard.songId) {
        findNextSelectedSong(selectedCard.songId, 'next');
    }
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
    if (currentSlide >= trendingSongsList.length - 3) {
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
    const header = document.querySelector('.header');
    const container = document.querySelector('.container');
    var hide = showLyricsBtn.textContent == 'Hide Lyrics';

    if (!hide) {
        trendingSongsContainer.classList.toggle('d-none');
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

        trendingSongsContainer.classList.toggle('d-none');
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

async function trendingSongMoveNext() {
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

        // 
        const html = await model.displaySingleTrendingCardMarkup(trendingSongIndex)

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

async function trendingSongMovePrev() {
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

        const html = await model.displaySingleTrendingCardMarkup(trendingSongIndex - 5)
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
    trendingSongsContainer.style.top = '11%';
    trendingSongCard.style.flexFlow = 'wrap';
    document.querySelector('.trending_song_btns').classList.add('d-none');
    trendingSongCard.innerHTML = await model.loadGallary(await model.getMusicList());
}
expandLibraryBtn.addEventListener('click', fetchMusicLibrary);
displayLibrary.addEventListener('click', fetchMusicLibrary);


function homeScreemLoad() {
    const heading = document.querySelector('.heading');
    trendingSongsContainer.style.top = '67%';
    trendingSubContainer.style.height = 'auto';
    trendingSubContainer.style.overflowY = 'hidden';
    heading.textContent = 'Trending Songs';
    trendingSongCard.style.flexFlow = 'row';
    document.querySelector('.trending_song_btns').classList.remove('d-none');
    getTrendingSongsList();
}

//home screen / getTrendingSongsList
homeScreen.addEventListener('click', homeScreemLoad);

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

        const lyricsMarkup = `<iframe class="lyrics_showing_iframe" style="border: none;" src="assests/${selectedSong.songLyrics}">
        </iframe>`
        document.querySelector('.lyrics_show').innerHTML = lyricsMarkup;

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

//search results
async function showSerachResult(searchValue) {
    console.log(searchValue);
    const heading = document.querySelector('.heading');
    trendingSubContainer.style.height = '91vh';
    // trendingSubContainer.style.overflowY = 'scroll';
    document.querySelector('.trending_song_btns').classList.add('d-none');

    trendingSongsContainer.style.top = '11%';
    trendingSongCard.style.flexFlow = 'wrap';
    heading.textContent = 'Search Results';

    var searchResultsList = trendingSongsList.filter(trendingSong => {
        return (trendingSong.songTitle).toLowerCase() == (searchValue).toLowerCase();
    })
    console.log(searchResultsList);

    if (searchResultsList && searchResultsList.length > 0) {
        trendingSongCard.innerHTML = await model.loadGallary(searchResultsList);
    } else {
        trendingSongCard.innerHTML = 'OOPs No search found!';
        setTimeout(() => {
            // homeScreemLoad();
        }, 2000);
    }
}

searchInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && searchInput.value) {
        e.preventDefault();
        showSerachResult(searchInput.value);
        searchInput.value = '';
    }
});

searchBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (searchInput.value) {
        showSerachResult(searchInput.value);
        searchInput.value = '';
    }
});