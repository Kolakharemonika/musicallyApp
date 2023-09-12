
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
const expandLibraryBtn = document.querySelector('.btn_expand_library');
const newmusicplaybtn = document.querySelector('.newmusicplaybtn');
const playNextSongBtn = document.querySelector('.play_next_song_btn');
const playPrevSongBtn = document.querySelector('.play_prev_song_btn');

const searchInput = document.querySelector('.search_field');
const searchBtn = document.querySelector('.search_btn');

// variable declarations
var selectedCard;
const slidedisplay = 3;
const trendingSongDisplay = 6;
var songState = { state: 'ready' };
var currentSlide = 0;
var trendingSongIndex = trendingSongDisplay - 1;

//function declarations
(async function load() {
    slideContainer.innerHTML = await model.generateMarkup(slidedisplay)
})();

// getTrendingSongsList
async function getTrendingSongsList() {
    trendingSongCard.innerHTML = await model.trendingSongMarkup(trendingSongDisplay);
}
getTrendingSongsList();

const trendingSongsList = await model.getMusicList();

function selectedSong(id) {

    trendingSongCard.querySelectorAll('.song_card').forEach(card => {

        const displaySongId = card.getAttribute('id');

        if (displaySongId) {
            const selectedSong = trendingSongsList.find(trendingSong => {
                return trendingSong.songId == selectedCard.songId;
            })
        }

    })
}

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
        const displaySongId = e.target.closest('.song_card').getAttribute('id')

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
        newmusicplaybtn.click();

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
        newmusicplaybtn.click()



    }
});

// const musicCardNext = document.querySelector('.music_card_next');
// const musicCardPrev = document.querySelector('.music_card_prev');

// musicCardNext.addEventListener('click', playNextSong);
// musicCardPrev.addEventListener('click', playPrevSong)


function playPauseMusic(curPlaying, idd) {
    const audio = document.querySelector('.playing_audio');

    if (songState.state == 'ready' || songState.state == 'pause') {
        audio.play();
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

async function findNextSelectedSong(songId, where) {

    var songIndex = trendingSongsList.findIndex(trendingSong => {
        return trendingSong.songId == (songId || selectedCard.songId);
    });

    (where == 'prev') ? songIndex-- : songIndex++;

    if (songIndex < trendingSongsList.length && songIndex >= 0) {
        const selectedSong = trendingSongsList.find((trendingSong, i) => {
            return (i == songIndex);
        })
        selectedCard = selectedSong;
        selectedSongDisplay(selectedSong.songId);
        newmusicplaybtn.click();

        // if (where == 'next' && songId >= 5) {
        //     currentSlide = songId - 2;
        //     trendingSongIndex = songId - 3;
        //     playNextSong();
        //     trendingSongMoveNext();
        // }
        // if (where == 'prev' && songId >= 6) {
        //     currentSlide = songId + 2;
        //     trendingSongIndex = songId + 3;
        //     playPrevSong();
        //     trendingSongMovePrev();
        // }
        // newmusicplaybtn.click();
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
    if (currentSlide == 0) {
        previousSongPlayBtn.classList.add('disabled');
    } else {
        nextSongPlayBtn.classList.remove('disabled');
    }
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
    }, 100);
}

previousSongPlayBtn.addEventListener('click', playPrevSong);

async function playNextSong() {
    currentSlide++;
    console.log(currentSlide, 'currentSlide');
    if (currentSlide == 6) {
        nextSongPlayBtn.classList.add('disabled');
    } else {
        previousSongPlayBtn.classList.remove('disabled');
    }

    //remove first slide
    console.log(slideContainer);
    console.log(slideContainer.removeChild(slideContainer.firstElementChild));

    //add new slide
    const markup = await model.dispalyNextSingleCardMarkup(currentSlide + 2)
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
    }, 100);
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
    trendingSongIndex++;
    const allSongCard = document.querySelectorAll('.song_card');

    if (trendingSongsList.length
        > trendingSongIndex) {

        allSongCard.forEach((card, i) => {
            if (i == 0) {
                card.remove()
            }
            card.style.transition = 'all 55s linear';
        })

        const html = await model.displaySingleTrendingCardMarkup(trendingSongIndex)

        setTimeout(() => {
            trendingSongCard.style.transform = `translateX(0px)`;
            trendingSongCard.style.transition = 'all 2.5s linear';
        }, 500)
        trendingSongCard.insertAdjacentHTML('beforeend', html)
    }

    if (trendingSongIndex == 8) {
        trendingSongBtnNext.classList.add('disabled')
    } else {
        trendingSongBtnPrev.classList.remove('disabled')
        trendingSongBtnNext.classList.remove('disabled')
    }
}


async function trendingSongMovePrev() {
    trendingSongIndex--;
    const allSongCard = document.querySelectorAll('.song_card');

    if (trendingSongsList.length > trendingSongIndex) {

        allSongCard.forEach((card, i) => {
            if (i == allSongCard.length - 1) {
                card.remove();
            }
            card.style.transition = 'all 55s linear';
        })
        // trendingSongIndex = trendingSongIndex - 5
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


function homeScreenLoad() {
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
homeScreen.addEventListener('click', homeScreenLoad);

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