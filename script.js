
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
const nextSongPlayBtn = document.querySelector('.next_song_btn');
const expandTrendingListBtn = document.querySelector('.btn_expand_library');
const newmusicplaybtn = document.querySelector('.newmusicplaybtn');
const playNextSongBtn = document.querySelector('.play_next_song_btn');
const playPrevSongBtn = document.querySelector('.play_prev_song_btn');

const searchInput = document.querySelector('.search_field');
const searchBtn = document.querySelector('.search_btn');

// variable declarations
var selectedCard;
var currentPage = 1;
var currentSlide = 0;
const slidedisplay = model.numOfSlideDisplay;
var songState = { state: 'ready' };
var activeList = 'playList';

//function declarations
(async function load() {
    slideContainer.innerHTML = await model.generateMarkup(slidedisplay)
})();

const trendingSongsList = await model.getMusicList();
const playSongsList = await model.getPlayList();
const librarySongsList = await model.getLibraryList();

function enableDisableBtn() {
    if (currentPage == 1) {
        trendingSongBtnPrev.classList.add('disabled');
        trendingSongBtnNext.classList.remove('disabled');
    } else if ((currentPage * model.numOfShowingCard) >= trendingSongsList.length) {
        trendingSongBtnNext.classList.add('disabled');
        trendingSongBtnPrev.classList.remove('disabled');
    } else {
        trendingSongBtnNext.classList.remove('disabled');
        trendingSongBtnPrev.classList.remove('disabled');
    }
}

// getTrendingSongsList
async function getTrendingSongsList(currentPage) {
    enableDisableBtn();
    trendingSongCard.innerHTML = await model.trendingSongMarkup(currentPage);
}
getTrendingSongsList(currentPage);

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
    // console.log(selectedCard, 'selectedCard');
    if (e.target.closest('.song_card')) {
        const displaySongId = e.target.closest('.song_card').getAttribute('id');

        console.log(displaySongId, 'displaySongId');
        if (displaySongId) {
            var selectedSong;
            if (activeList == 'libraryList') {
                selectedSong = librarySongsList.find(trendingSong => {
                    return trendingSong.songId == displaySongId;
                });
            } else {
                activeList = 'trendingSongs'
                selectedSong = trendingSongsList.find(trendingSong => {
                    return trendingSong.songId == displaySongId;
                });
            }
            console.log(selectedCard, 'selectedCard');
            if (songState.state == 'ready') {
                selectedCard = selectedSong;
                selectedSongDisplay(displaySongId);
            } else {
                if (selectedCard?.songId != selectedSong.songId) {
                    selectedCard = selectedSong;
                    selectedSongDisplay(displaySongId);
                }
            }
        }
        newmusicplaybtn.click();

        // if (trendingSongCard.lastElementChild) {
        //     const lastElId = trendingSongCard.lastElementChild.getAttribute('id')
        //     if (displaySongId === lastElId) {
        //         trendingSongMoveNext();
        //     }
        // }
        // if (trendingSongCard.lastElementChild) {
        //     const firstElId = trendingSongCard.firstElementChild.getAttribute('id')
        //     if (displaySongId === firstElId) {
        //         trendingSongMovePrev();
        //     }
        // }

    }
})

slideContainer.addEventListener('click', (e) => {
    if (e.target.closest('.playing_song_card')) {
        // console.log(selectedCard, 'selectedCard');
        const displaySongId = e.target.closest('.playing_song_card').getAttribute('id');
        if (displaySongId) {
            const selectedSong = playSongsList.find(song => {
                return song.songId == displaySongId;
            });

            activeList = 'playList';

            if (songState.state == 'ready') {
                selectedCard = selectedSong;
                selectedSongDisplay(displaySongId);
            } else {
                if (selectedCard?.songId != selectedSong.songId) {
                    selectedCard = selectedSong;
                    selectedSongDisplay(displaySongId);
                }
            }
            newmusicplaybtn.click()
        }

        if (slideContainer.lastElementChild) {
            const lastElId = slideContainer.lastElementChild.getAttribute('id')
            if (displaySongId === lastElId) {
                playNextSong();
            }
        }
        if (slideContainer.lastElementChild) {
            const firstElId = slideContainer.firstElementChild.getAttribute('id')
            if (displaySongId === firstElId) {
                playPrevSong();
            }
        }
    }
});

function playPauseMusic() {
    const audio = document.querySelector('.playing_audio');

    if (songState.state == 'ready' || songState.state == 'pause') {
        // audio.play();
        songState.state = 'play';

        newmusicplaybtn.querySelectorAll('.btn_play_pause').forEach(btn => {
            btn.classList.toggle('d-none');
        });

        document.querySelectorAll('.song_card').forEach(song => {
            if (song.getAttribute('id') == selectedCard.songId) {
                song.querySelectorAll('.play_icon').forEach(btn => {
                    btn.classList.toggle('d-none');
                });
                song.querySelector('.music_gif').style.opacity = '1';
            } else {
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
                    btn.classList.toggle('d-none');
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
        audio.pause()
        // document.querySelectorAll('.song_card').forEach(song => {
        //     if (song.getAttribute('id') == selectedCard.songId) {
        //         song.querySelectorAll('.play_icon').forEach(btn => {
        //             if (btn.getAttribute('id') == 'play') {
        //                 if (btn.classList.contains('d-none')) {//playing currently
        //                     //pause the audio
        //                     audio.pause();
        //                     songState.state = 'pause';
        //                     //toggle
        //                     song.querySelector('.music_gif').style.opacity = '0';
        //                     btn.classList.remove('d-none');

        newmusicplaybtn.querySelectorAll('.btn_play_pause').forEach(btn => {
            btn.classList.toggle('d-none');
        })
        //                     document.querySelectorAll('.playing_song_card').forEach(song => {
        //                         song.querySelectorAll('.btn_play_pause').forEach(btn => {
        //                             if (btn.getAttribute('id') == 'play') {
        //                                 btn.classList.remove('d-none');
        //                             }
        //                             if (btn.getAttribute('id') == 'pause') {
        //                                 btn.classList.add('d-none');
        //                             }
        //                         });
        //                     });

        //                 } else {
        //                     audio.play();
        //                     songState.state = 'play';
        //                     song.querySelector('.music_gif').style.opacity = '1';
        //                     if (btn.getAttribute('id') == 'play') {
        //                         btn.classList.add('d-none');
        //                     }
        //                     if (btn.getAttribute('id') == 'pause') {
        //                         btn.classList.remove('d-none');
        //                     }
        //                     newmusicplaybtn.querySelectorAll('.btn_play_pause').forEach(btn => {
        //                         //we cannot toggle imp
        //                         if (btn.getAttribute('id') == 'play') {
        //                             btn.classList.add('d-none');
        //                         }
        //                         if (btn.getAttribute('id') == 'pause') {//pause display
        //                             btn.classList.remove('d-none');
        //                         }
        //                     })

        //                     document.querySelectorAll('.playing_song_card').forEach(song => {
        //                         if (song.getAttribute('id') == selectedCard.songId) {
        //                             song.querySelectorAll('.btn_play_pause').forEach(btn => {
        //                                 if (btn.getAttribute('id') == 'play') {
        //                                     btn.classList.add('d-none');
        //                                 }
        //                                 if (btn.getAttribute('id') == 'pause') {
        //                                     btn.classList.remove('d-none');
        //                                 }

        //                             });
        //                         } else {
        //                             song.querySelectorAll('.btn_play_pause').forEach(btn => {

        //                                 if (btn.getAttribute('id') == 'play') {
        //                                     btn.classList.remove('d-none');
        //                                 }
        //                                 if (btn.getAttribute('id') == 'pause') {
        //                                     btn.classList.add('d-none');
        //                                 }
        //                             });
        //                         }
        //                     });

        //                 }
        //             } else {
        //                 if (btn.classList.contains('d-none')) {
        //                     btn.classList.remove('d-none');
        //                 } else {
        //                     btn.classList.add('d-none');
        //                 }

        //             }

        //         });
        //     } else {
        //         //pause btn contains d-none
        //         song.querySelectorAll('.play_icon').forEach(btn => {

        //             if (btn.getAttribute('id') == 'play') {
        //                 btn.classList.remove('d-none');
        //             }
        //             if (btn.getAttribute('id') == 'pause') {
        //                 btn.classList.add('d-none');
        //             }
        //         });
        //         song.querySelector('.music_gif').style.opacity = '0';
        //     }
        // });

    }


}

newmusicplaybtn.addEventListener('click', playPauseMusic)

async function findNextSelectedSong(songId, where) {
    var songIndex
    if (activeList == 'playList') {
        songIndex = playSongsList.findIndex(playsong => {
            return playsong.songId == (songId || selectedCard.songId);
        });

        (where == 'prev') ? songIndex-- : songIndex++;

        if (songIndex < playSongsList.length && songIndex >= 0) {
            const selectedSong = playSongsList.find((trendingSong, i) => {
                return (i == songIndex);
            })

            selectedCard = selectedSong;
            selectedSongDisplay(selectedSong.songId);

            newmusicplaybtn.click();
        } else {
            alert('No songs Availables!')
        }

    } else if (activeList == 'trendingSongs') {
        songIndex = trendingSongsList.findIndex(trendingSong => {
            return trendingSong.songId == (songId || selectedCard.songId);
        });

        (where == 'prev') ? songIndex-- : songIndex++;
        if (songIndex < trendingSongsList.length && songIndex >= 0) {
            const selectedSong = trendingSongsList.find((trendingSong, i) => {
                return (i == songIndex);
            })
            console.log(trendingSongsList.length, selectedCard, selectedSong);

            selectedCard = selectedSong;
            selectedSongDisplay(selectedSong.songId);
            // newmusicplaybtn.click();

            if (where == 'next') {
                // trendingSongMoveNext();
            }
            // && songId >= 6
            if (where == 'prev') {
            }
            newmusicplaybtn.click();
        } else {
            alert('No songs Availables!')
        }
    } else {
        songIndex = librarySongsList.findIndex(trendingSong => {
            return trendingSong.songId == (songId || selectedCard.songId);
        });

        (where == 'prev') ? songIndex-- : songIndex++;
        if (songIndex < librarySongsList.length && songIndex >= 0) {
            const selectedSong = librarySongsList.find((trendingSong, i) => {
                return (i == songIndex);
            })

            selectedCard = selectedSong;
            selectedSongDisplay(selectedSong.songId);
            // newmusicplaybtn.click();

            if (where == 'next') {
                // trendingSongMoveNext();
            }
            // && songId >= 6
            if (where == 'prev') {
            }
            newmusicplaybtn.click();
        } else {
            alert('No songs Availables!')
        }
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
    console.log(currentSlide, 'currentSlide');
    if (currentSlide == 0) {
        previousSongPlayBtn.classList.add('disabled');
    }
    nextSongPlayBtn.classList.remove('disabled');

    //remove last slide
    slideContainer.removeChild(slideContainer.lastElementChild)

    //add new slide
    const markup = await model.dispalyNextSingleCardMarkup(currentSlide)
    slideContainer.insertAdjacentHTML('afterbegin', markup);

    slides.forEach(slide => {
        slide.style.transform = `translate3d(-10%, 0, 0)`; //-34%
        slide.style.transition = 'none';
    });

    setTimeout(() => {
        slides.forEach(slide => {
            slide.style.transform = `translate3d(-0%, 0, 0)`; //-34%
            slide.style.transition = 'width 2s, height 2s, transform 2s';
        });
    }, 0);
}

previousSongPlayBtn.addEventListener('click', playPrevSong);

async function playNextSong() {
    currentSlide++;
    console.log(currentSlide, 'currentSlide');
    if (currentSlide == (playSongsList.length - slidedisplay)) {
        nextSongPlayBtn.classList.add('disabled');
    }
    previousSongPlayBtn.classList.remove('disabled');

    //remove first slide
    slideContainer.removeChild(slideContainer.firstElementChild)

    //add new slide
    const markup = await model.dispalyNextSingleCardMarkup(currentSlide + (slidedisplay - 1))
    slideContainer.insertAdjacentHTML('beforeend', markup);

    slides.forEach(slide => {
        slide.style.transform = `translate3d(10%, 0, 0)`;
        slide.style.transition = 'none';
    });

    setTimeout(() => {
        slides.forEach(slide => {
            slide.style.transform = `translate3d(-0%, 0, 0)`;
            slide.style.transition = 'width 2s, height 2s, transform 2s';
        });
    }, 0);
}

nextSongPlayBtn.addEventListener('click', playNextSong);



function syncLyric(lyrics, time) {
    const scores = [];
    lyrics.forEach(lyric => {

        var score = time - (lyric.time.toFixed(2));
        score = score.toFixed(2)

        if (score >= 0) scores.push(score);
    });

    if (scores.length == 0) return null;


    const closest = Math.min(...scores);

    return scores.indexOf(`${closest}`);
}

function parseLyric(lrc) {
    const lines = lrc.split("\n");
    const output = [];
    lines.forEach(line => {
        if (line.split("\r")[0].split(']')[0] != '') {

            const [time, text] = [line.split("\r")[0].split(']')[0].replace('[', ''), line.split("\r")[0].split(']')[1]];

            output.push({
                time: parseTime(time),
                text: text.trim()
            });
        }

    });

    function parseTime(time) {
        const minsec = time.split(":");

        const min = parseInt(minsec[0]) * 60;
        const sec = parseFloat(minsec[1]);

        return min + sec;
    }

    return output;
}

//update range value to audio player
document.querySelector('#seek-slider').onchange = function (e) {
    document.querySelector('.playing_audio').currentTime = e.target.value;
}

async function lyricsShow() {
    const frame = document.querySelector(".lyrics_show");
    const audio = document.querySelector('.playing_audio');
    const audioSlider = document.querySelector('#seek-slider');

    const res = await fetch("./assests/heeriye_lyrics.lrc");
    const lrc = await res.text();

    const lyrics = parseLyric(lrc);
    const lines = lrc.split("\n");

    const output = [];
    lines.forEach(line => {
        output.push(line.split("\r")[0].split(']')[1]);
    });
    frame.innerHTML = `<pre>${output.join('\n')}</pre>`;

    // console.log(output, 'output');
    const mk = frame.innerHTML.split('\n');

    audio.addEventListener('timeupdate', () => {

        audioSlider.max = Math.floor(audio.duration)
        audioSlider.value = Math.floor(audio.currentTime)

        const time = (audio.currentTime).toFixed(2);

        const index = syncLyric(lyrics, time);

        frame.innerHTML = `<pre>${output.join('\n')}</pre>`;

        if (index == null || index < 0) return;

        frame.innerHTML = `<pre>${frame.innerHTML.replace(mk[index],
            `<span style="color:white;"><em>${mk[index]}</em></span>`)}</pre>`;
    });
}

async function showHidwLyrics() {

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
    } else {

        trendingSongCard.style.marginBottom = '80px';
        lyricsSec.style.transition = 'all .5s linear';
        lyricsSec.style.transform = 'translateY(500px)';

        songPlayContainer.style.background = 'black';
        showLyricsBtn.textContent = 'Show Lyrics';

        trendingSongsContainer.classList.toggle('d-none');
        container.classList.toggle('d-none');
        header.classList.toggle('d-none');

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
    currentPage++;
    getTrendingSongsList(currentPage);
    // setTimeout(() => {
    //     trendingSongCard.style.transform = `translateX(0px)`;
    //     trendingSongCard.style.transition = 'all 2.5s linear';
    // }, 500);
}

async function trendingSongMovePrev() {
    currentPage--;
    getTrendingSongsList(currentPage);
}

trendingSongBtnNext.addEventListener('click', trendingSongMoveNext);
trendingSongBtnPrev.addEventListener('click', trendingSongMovePrev);



// library section
async function fetchMusicLibrary() {
    activeList = 'libraryList';
    trendingSongsContainer.style.top = '11%';
    trendingSongCard.style.flexFlow = 'wrap';
    document.querySelector('.trending_song_btns').classList.add('d-none');
    trendingSongCard.innerHTML = await model.loadGallary(await model.getLibraryList());
}
displayLibrary.addEventListener('click', fetchMusicLibrary);

async function fetchTrendingLibrary() {
    activeList = 'trendingSongs';
    trendingSongsContainer.style.top = '11%';
    trendingSongCard.style.flexFlow = 'wrap';
    document.querySelector('.trending_song_btns').classList.add('d-none');
    trendingSongCard.innerHTML = await model.loadGallary(await model.getMusicList());
}

expandTrendingListBtn.addEventListener('click', fetchTrendingLibrary);


function homeScreenLoad() {
    activeList = 'trendingSongs';
    const heading = document.querySelector('.heading');
    trendingSongsContainer.style.top = '67%';
    trendingSubContainer.style.height = 'auto';
    trendingSubContainer.style.overflowY = 'hidden';
    heading.textContent = 'Trending Songs';
    trendingSongCard.style.flexFlow = 'row';
    document.querySelector('.trending_song_btns').classList.remove('d-none');
    currentPage = 1
    getTrendingSongsList(currentPage);
}

//home screen / getTrendingSongsList
homeScreen.addEventListener('click', homeScreenLoad);

function selectedSongDisplay(displaySongId) {
    var selectedSong;
    if (activeList == 'trendingSongs') {
        selectedSong = trendingSongsList.find(trendingSong => {
            return trendingSong.songId == displaySongId;
        })
    } else if (activeList == 'playList') {
        selectedSong = playSongsList.find(playsong => {
            return playsong.songId == displaySongId;
        })
    } else if (activeList == 'libraryList') {
        selectedSong = librarySongsList.find(playsong => {
            return playsong.songId == displaySongId;
        })
    }
    selectedCard = selectedSong;
    trendingSongCard.style.marginBottom = '80px';
    songPlayContainer.classList.remove("hidden");

    console.log(displaySongId, 'SongId');
    if (selectedSong) {
        const audioHtml = `<audio class="audio_song playing_audio" src="./assests/music/${selectedSong.audioFile}" type="audio/mpeg">
                    </audio>`;
        document.querySelector('.audio_song_container').innerHTML = audioHtml;

        const musicInfoHtml = `<div>
                        <img width="50" height="50" src="./assests/images/${selectedSong.songImgUrl}" alt="${selectedSong.songTitle}">
                            </div>
                    <div class="music_info">
                        <span>${selectedSong.songTitle}</span>
                        <span>${selectedSong.songWriter}</span>
                    </div>`;
        document.querySelector('.music_info_sec').innerHTML = musicInfoHtml;

        lyricsShow();

    }

}


//search results
async function showSerachResult(searchValue) {

    const heading = document.querySelector('.heading');
    trendingSubContainer.style.height = '91vh';
    document.querySelector('.trending_song_btns').classList.add('d-none');

    trendingSongsContainer.style.top = '11%';
    trendingSongCard.style.flexFlow = 'wrap';
    heading.textContent = 'Search Results';

    var searchResultsList = trendingSongsList.filter(trendingSong => {
        return (trendingSong.songTitle).toLowerCase() == (searchValue).toLowerCase();
    })

    if (searchResultsList && searchResultsList.length > 0) {
        trendingSongCard.innerHTML = await model.loadGallary(searchResultsList);
    } else {
        trendingSongCard.innerHTML = 'OOPs No search found!';
        setTimeout(() => {
            // homeScreenLoad();
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