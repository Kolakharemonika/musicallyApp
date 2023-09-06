import * as model from './Js/model.js';
const cardEl = document.querySelectorAll('.card');
const showLyricsBtn = document.querySelector('.show_Lyrics_btn');
const navBtns = document.querySelectorAll('.nav_item_click');

const trendingSongsEl = document.querySelector('.trending_songs_cards');

const musicPlayBtn = document.querySelector('.music_play_btn');
const navList = document.querySelector('.nav_list')
const trendingSongCard = document.querySelector('.trending_song_cards')


console.log(await model.getMusicList());

const trendingSongsList = await model.getMusicList();

async function getTrendingSongsList() {
    trendingSongsEl.innerHTML = await model.trendingSongMarkup();
}
// getTrendingSongsList();

// function changeImage(move) { //working code slides 3
//     const imgCards = document.querySelectorAll('.img_card');
//     console.log(imgCards);

//     imgCards.forEach((card, i) => {
//         if (i == 0 && move == 'prev') {
//             cardEl.insertBefore(card, card[i])
//         }
//         if (i == 2 && move == 'next') {
//             cardEl.insertAdjacentElement('afterBegin', card)
//         }
//     })

// }
function trending() {
    // const html = ;
    // trendingSongCard.innerHTML = html;
}
trending();
const imgCards = document.querySelectorAll('.img_card');

const sliderBtn = document.querySelector('.slide-dots');

const slides = document.querySelectorAll('.slidebox');
const previousSongPlayBtn = document.querySelector('.previous_song_btn');
const nextSongPlayBtn = document.querySelector('.next_song_btn');


previousSongPlayBtn.addEventListener('click', () => {
    const move = 'prev';

    var moveTo;
    moveTo = move == 'prev' ? '0' : (move == 'current' ? '100' : '200');

    slides.forEach(slide => {
        move == 'prev'
        slide.style.transform = `translate3d(-0%, 0, 0)`;
        slide.style.transition = 'width 2s, height 2s, transform 2s';
    });
});
nextSongPlayBtn.addEventListener('click', () => {
    const move = 'prev';

    var moveTo;
    moveTo = move == 'prev' ? '0' : (move == 'current' ? '100' : '200');

    slides.forEach(slide => {
        move == 'prev'
        slide.style.transform = `translate3d(-11%, 0, 0)`; //-34%
        slide.style.transition = 'width 2s, height 2s, transform 2s';
    });
});

// translate3d(-100%, 0, 0)
// transition: width 2s, height 2s, transform 2s;

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

document.getElementById('musicPlay').addEventListener('click', () => {
    document.querySelector(".song_play_container").classList.toggle("hidden");
});

musicPlayBtn.addEventListener('click', (e) => {
    // console.log(e.target.closest('.music_play_btn_svg'));

    console.log(e.target);
    if (e.target.closest('.music_play_btn_svg')) {
        console.log(e.target.closest('.music_play_btn_svg').getAttribute('href'));

        musicPlayBtn.classList.toggle("pause");
    }

});