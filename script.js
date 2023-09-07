import * as model from './Js/model.js';
const cardEl = document.querySelectorAll('.card');
const showLyricsBtn = document.querySelector('.show_Lyrics_btn');
const navBtns = document.querySelectorAll('.nav_item_click');
const navList = document.querySelector('.nav_list')
const displayLibrary = document.querySelector('.library');

const trendingSongCard = document.querySelector('.trending_songs_cards');
const trendingSongPlayBtn = document.getElementById('trendingSongPlay');
const trendingSongBtnPrev = document.querySelector('.trending_song_btn_prev');
const trendingSongBtnNext = document.querySelector('.trending_song_btn_next');
const expandLibraryBtn = document.querySelector('.btn_expand_library');

const slides = document.querySelectorAll('.slidebox');
const slideContainer = document.querySelector('.slide_container');

const previousSongPlayBtn = document.querySelector('.previous_song_btn');
const nextSongPlayBtn = document.querySelector('.next_song_btn');


const trendingSongsList = await model.getMusicList();

async function getTrendingSongsList() {
    trendingSongCard.innerHTML = await model.trendingSongMarkup();
}


trendingSongCard.addEventListener('mouseover', (e) => {
    // console.log(e.target.closest('.song-img'));
    if (e.target.closest('.song-img')) {

        let button = document.createElement("button");
        button.classList.add('btn_play_icon_small');
        button.setAttribute('id', 'trendingSongPlay');
        // let p = document.createElement("svg");
        // p.innerHTML=
        button.innerHTML = `<svg class="play_icon">
                <use href="./assests/icons.svg#play-icon"></use>
            </svg>`;

        // trendingSongCard.append(button);

        // console.log(div.childNodes); // NodeList [ <p> ]
        // console.log(e.target.closest('.song-img').classList);

    }
})

function trending() {
    // const html = ;
    // trendingSongCard.innerHTML = html;
}
trending();






function load() {
    if (trendingSongsList.length !== 0 && trendingSongsList.length >= 3) {

        // trendingSongsList.forEach(trendingSong => {
        //     html = `<div class="playing_song_card music_card_prev">
        //                     <img src="./assests/images/${trendingSongsList[0].songImg}" alt="${trendingSongsList[0].songTitle}">
        //              <div class="playing_song_info">
        //                         <span class="song_title">${trendingSongsList[0].songTitle}</span>
        //                         <span class="song_writer">${trendingSongsList[0].songWriter}</span>
        //                     </div>
        //                     <div class="overlay"> </div>    </div>`
        // })

        slideContainer.innerHTML = `<div class="playing_song_card music_card_prev">
                            <img src="./assests/images/${trendingSongsList[0].songImg}" alt="${trendingSongsList[0].songTitle}">
                     <div class="playing_song_info">
                                <span class="song_title">${trendingSongsList[0].songTitle}</span>
                                <span class="song_writer">${trendingSongsList[0].songWriter}</span>
                            </div>
                            <div class="overlay"> </div>    </div>
                        <div class="playing_song_card music_card_current">
                            <img src="./assests/images/${trendingSongsList[1].songImg}" alt="${trendingSongsList[1].songTitle}">
                      <div class="playing_song_info">
                                <span class="song_title">${trendingSongsList[1].songTitle}</span>
                                <span class="song_writer">${trendingSongsList[1].songWriter}</span>
                            </div>
                            <div class="overlay"> </div>    </div>
                        <div class="playing_song_card music_card_next ">
                            <img src="./assests/images/${trendingSongsList[2].songImg}" alt="${trendingSongsList[2].songTitle}">
                    <div class="playing_song_info">
                                <span class="song_title">${trendingSongsList[2].songTitle}</span>
                                <span class="song_writer">${trendingSongsList[2].songWriter}</span>
                            </div>
                            <div class="overlay"> </div>     </div>
                         `
    } else {
        slideContainer.textContent = 'No Songs Available';
    }

}

load();

const musicCardNext = document.querySelector('.music_card_next');
const musicCardPrev = document.querySelector('.music_card_prev');
const musicPlayBtn = document.querySelector('.music_play_btn');
const playingSongCardList = document.querySelectorAll('.playing_song_card');
var currentSlide = 0;

// trendingSongPlay
function playPrevSong() {
    currentSlide--;
    console.log(currentSlide);
    if (currentSlide == 0) {
        previousSongPlayBtn.classList.add('disabled');
    } else {
        nextSongPlayBtn.classList.remove('disabled');
    }

    slides.forEach(slide => {
        slide.style.transform = `translate3d(-${currentSlide * 11}%, 0, 0)`;
        slide.style.transition = 'width 2s, height 2s, transform 2s';
    });
    setTimeout(() => {
        console.log(slideContainer.hasChildNodes(), slideContainer.removeChild(slideContainer.lastChild));
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


        console.log(playingSongCardList, 'playingSongCardList');
        playingSongCardList.forEach(card => {
            // card.classList.remove('music_card_prev')
            // card.classList.remove('music_card_current')
            // card.classList.remove('music_card_next')
        })
        const html = `<div class="playing_song_card music_card_next">
                            <img src="./assests/images/${trendingSongsList[2 + currentSlide].songImg}" alt="${trendingSongsList[2 + currentSlide].songTitle}">
                        </div>`;

        slideContainer.insertAdjacentHTML('beforeend', html);

        slides.forEach(slide => {
            slide.style.transform = `translate3d(-${(currentSlide) * 11}%, 0, 0)`; //-34%
            slide.style.transition = 'width 2s, height 2s, transform 2s';
        });
        // slideContainer.removeChild(list.firstElementChild);
        // console.log(slideContainer.hasChildNodes(), slideContainer.removeChild(slideContainer.firstChild));
        if (playingSongCardList.length == 5) {

            setTimeout(() => {
                // slideContainer.removeChild(slideContainer.firstElementChild);
            }, 2500)
        }
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
document.getElementById('musicPlay').addEventListener('click', () => {
    document.querySelector(".song_play_container").classList.toggle("hidden");
});

//trending song btns prevList nextList
function trendingSongMoveNext() {

    trendingSongBtnPrev.classList.remove('disabled')
    console.log('trendingSong');
}
function trendingSongMovePrev() {
    console.log('trendingSong');
}
trendingSongBtnNext.addEventListener('click', trendingSongMoveNext)
trendingSongBtnPrev.addEventListener('click', trendingSongMovePrev)



// library section
function getLibraryList() {

}
displayLibrary.addEventListener('click', getLibraryList)
expandLibraryBtn.addEventListener('click', getLibraryList)


//Audio play pause
const audio = document.querySelector('audio');
const btnPlayPause = document.querySelectorAll('.btn_play_pause');

musicPlayBtn.addEventListener('click', (e) => {
    // audio.duration
    console.log(audio.duration, 'audio.duration');
    const closestBtn = e.target.closest('.btn_play_pause');
    if (closestBtn) {
        if (closestBtn.getAttribute('id') == 'play') {
            audio.play();
            console.log(audio.seekable.end(audio.seekable.length - 1), 'dfsfs');
        } else {
            audio.pause();
        }
    }

    btnPlayPause.forEach(btn => {
        btn.classList.toggle('d-none');
    })
})
