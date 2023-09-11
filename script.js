
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

(function autoSelectedSong() {
    // displaySongId
    const selectedSong = trendingSongsList.filter(trendingSong => {
        return trendingSong.songId == 2;
    })
    selectedCard = selectedSong;

})();


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
    console.log(selectedCard, 'selectedCard');
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

        console.log('just clicked trendingSongCard');

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
        // if (e.target.closest('.music_card_current')) {
        //     console.log('just clicked slideContainer');

        //     if (e.target.closest('.music_card_current').querySelector('#play')) {
        //         const id = e.target.closest('.music_card_current').querySelector('#play')
        //         if (!id.classList.contains('d-none')) {
        //             console.log('pllllllllayinggg playactive');
        //             // newmusicplaybtn.click('playing')
        //         } else {
        //             console.log('paussseeeeee pauseactive');
        //             // newmusicplaybtn.click('pause')
        //         }
        //     }
        // }

        // const musicCardNext = document.querySelector('.music_card_next');
        // const musicCardPrev = document.querySelector('.music_card_prev');
        // musicCardNext.addEventListener('click', playNextSong);
        // musicCardPrev.addEventListener('click', playPrevSong)


    }
});

function audioValueUpdate() {
    // const audio = document.querySelector('.playing_audio');
    // const audioSlider = document.querySelector('#seek-slider');

    // audio.addEventListener('timeupdate', () => {
    //     audioSlider.max = (audio.duration).toFixed(2);
    //     audioSlider.value = (audio.currentTime).toFixed(2);
    // });
    main();

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
    console.log('just clicked newmusicplaybtn', e);

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
            trendingSongIndex = songId - 3;
            playNextSong();
            trendingSongMoveNext();
        } else {
            currentSlide = songId + 2;
            trendingSongIndex = songId + 3;
            playPrevSong();
            trendingSongMovePrev();
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
        // playingSongCardList1.length >= 3 && slideContainer.removeChild(slideContainer.lastChild)
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

    }
}

nextSongPlayBtn.addEventListener('click', playNextSong);

function lyricsShow() {

}

function syncLyric(lyrics, time) {
    const scores = [];
    lyrics.forEach(lyric => {
        // get the gap or distance or we call it score
        var score = time - (lyric.time.toFixed(2));
        score = score.toFixed(2)
        // score = Number(0.5) + Number(score);
        console.log(lyric.time.toFixed(2), 'lyric.time');
        console.log(score, 'score', Number(0.5) + Number(score), 'Number(0.5) + Number(score);');
        console.log(time, 'time');
        // only accept score with positive values
        if (score >= 0) scores.push(score);
    });
    console.log(scores);
    if (scores.length == 0) return null;

    // get the smallest value from scores
    const closest = Math.min(...scores);
    console.log(closest, 'closssee', scores[0]);
    // return the index of closest lyric
    console.log(scores.indexOf(`${closest}`), 'scores.indexOf(closest)');
    return scores.indexOf(`${closest}`);
}
// lrc (String) - lrc file text
function parseLyric(lrc) {
    // will match "[00:00.00] ooooh yeah!"
    // note: i use named capturing group
    // console.log(time, 'time', text);
    const regex = /^\[(?<time>\d{2}:\d{2}(.\d{2})?)\](?<text>.*)/;
    console.log(regex, 'regess');
    // split lrc string to individual lines
    const lines = lrc.split("\n");
    // console.log(lines, 'lines');
    const output = [];
    // console.log(lines);
    lines.forEach(line => {
        // console.log(line.split("\r")[0]);
        if (line.split("\r")[0].split(']')[0] != '') {

            const [time, text] = [line.split("\r")[0].split(']')[0].replace('[', ''), line.split("\r")[0].split(']')[1]];
            console.log(time, text, 'time, text');

            output.push({
                time: parseTime(time),
                text: text.trim()
            });
        }

        // const match = line.match(' ');
        // console.log(match, 'match');
        // if doesn't match, return.
        // if (match == null) return;
        // output.push({
        //     time: parseTime(time),
        //     text: text.trim()
        // });
        // console.log(output, 'output');
    });
    // console.log(output.time, 'output');
    // parse formated time
    // "03:24.73" => 204.73 (total time in seconds)
    function parseTime(time) {
        const minsec = time.split(":");

        const min = parseInt(minsec[0]) * 60;
        const sec = parseFloat(minsec[1]);

        return min + sec;
    }

    return output;
}


async function main() {
    const frame = document.querySelector(".lyrics_show");
    const audio = document.querySelector('.playing_audio')

    const res = await fetch("./assests/heeriye_lyrics.txt");
    const lrc = await res.text();
    frame.style.color = 'white';

    const lyrics = parseLyric(lrc);
    audio.addEventListener('timeupdate', () => {
        const audioSlider = document.querySelector('#seek-slider');

        audioSlider.max = Math.floor(audio.duration)
        audioSlider.value = Math.floor(audio.currentTime)

        const time = (audio.currentTime).toFixed(2);

        console.log('dvdvdfv', time, 'audio.currentTime');
        const index = syncLyric(lyrics, time);

        if (index == null || index < 0) return;
        console.log(index, 'index');

        frame.innerHTML = lyrics[index].text;
        console.log(frame.innerHTML, 'lyrics[index].text', lyrics[index].text);
    });
    // audio.ontimeupdate = () => {
    //     const time = (audio.currentTime).toFixed(2);
    //     console.log('dvdvdfv', time, 'audio.currentTime');
    //     const index = syncLyric(lyrics, time);

    //     console.log(index, 'index');
    //     if (index == null || index < 0) return;
    //     frameContent.innerHTML = lyrics[index].text;
    //     console.log(frameContent.innerHTML, 'lyrics[index].text', lyrics[index].text);
    // };

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
        // document.querySelector('.lyrics_sec_bg_img').style.opacity = '0.7';
        // main();
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

    if (trendingSongsList.length
        > trendingSongIndex) {

        allSongCard.forEach((card, i) => {
            if (i == 0) {
                card.remove()
            }
            card.style.transition = 'all 55s linear';
        })

        // 
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
        const lyricsIframe = document.querySelector('.lyrics_show')
        // console.log(lyricsIframe, lyricsIframe.body);
        // lyricsIframe.onload = function (e) {
        //     console.log(lyricsIframe, 'frame');
        //     var body = lyricsIframe.contentWindow.document.querySelector('body');
        //     body.style.color = 'white';
        // }
        audioValueUpdate();
        // setTimeout(() => {

        //     main();
        // })
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