import * as model from './Js/model.js';
const cardEl = document.querySelectorAll('.card');
const showLyricsBtn = document.querySelector('.show_Lyrics_btn');
const navBtns = document.querySelectorAll('.nav_item_click');
const navList = document.querySelector('.nav_list')
const trendingSongCard = document.querySelector('.trending_song_cards')

// console.log(model.music);
console.log(model.loadRecipe(2));
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
function changeImage(move) {
    var moveTo = 50;

    // moveTo = move == 'prev' ? '0' : (move == 'current' ? '100' : '200');
    imgCards.forEach((slide, i) => {
        // move == 'prev'
        console.log(i);
        // slide.style.transform = `translate3d(-${moveTo}%, 0, 0)`;
        // slide.style.transition = 'width 2s, height 2s, transform 2s';
        // if (i == 0) {
        //     slide.style.visibility = 'hidden'
        // }

    });
}

function showHidwLyrics() {
    console.log('showLyricsBtn');
    showLyricsBtn.textContent = showLyricsBtn.textContent == 'Hide Lyrics' ? 'Show Lyrics' : 'Hide Lyrics';
    document.querySelector('.lyrics_sec').classList.toggle('hidden');
}

showLyricsBtn.addEventListener('click', showHidwLyrics)
document.querySelector('.expand_btn').addEventListener('click', showHidwLyrics);


//activate navbar btns
navList.addEventListener('click', (e) => {
    e.stopPropagation();
    navBtns.forEach(navbtn => {
        navbtn.classList.remove('active');
    })
    e.target.closest('.nav_item_click').classList.add('active');
})

document.querySelector(".dropbtn").addEventListener('click', () => {
    document.querySelector("#profileDropdown").classList.toggle("show");
})
