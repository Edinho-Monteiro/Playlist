const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const song = document.getElementById('audio');
const cover = document.getElementById('cover');
const play = document.getElementById('play');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const likeButton = document.getElementById('like');
const currentProgress = document.getElementById('current-progress');
const progressContainer = document.getElementById('progress-container');
const shuffleButton = document.getElementById('shuffle');
const repeatButton = document.getElementById('repeat');
const songTime = document.getElementById('song-time');
const totalTime = document.getElementById('total-time');


// const fundoMusical = {
//     songName : 'Fundo Musical',
//     artist : 'Original Henrique Barros',
//     file : 'fundo-musical',
//     liked : false,
// }

// const autobahn = {
//     songName : 'Autobahn',
//     artist : 'Kraftwerk',
//     file : 'autobahn',
//     liked : false,
// }

// const rubycon1 = {
//     songName : 'Rubycon - Parte 1',
//     artist : 'Tangerine Dream',
//     file : 'rubycon1',
//     liked : false,
// }

// const rubycon2 = {
//     songName : 'Rubycon - Parte 2',
//     artist : 'Tangerine Dream',
//     file : 'rubycon2',
//     liked : false,
// }

// const phaedra = {
//     songName : 'Phaedra',
//     artist : 'Tangerine Dream',
//     file : 'phaedra',
//     liked : false,
// }

// const ricochet = {
//     songName : 'Ricochet',
//     artist : 'Tangerine Dream',
//     file : 'ricochet',
//     liked : false,
// }
// const Messiah = {
//     songName : 'Oração',
//     artist : 'Aná Bekoach',
//     file : 'ana-bekoach',
//     liked : false,
// }

const evangelho = {
    songName : 'Evangelho de Fariseus',
    artist : 'Aymeê Rocha',
    file : 'evangelho-fariseus',
    liked : false,
}

// const fusion = {
//     songName : 'Flight Variation',
//     artist : 'Estas Tonne - Fusion',
//     file : 'fusion-variation',
//     liked : false,
// }

// const hatikiva = {
//     songName : 'Hino de Israel',
//     artist : 'Hatikiva',
//     file : 'hatikiva',
//     liked : false,
// }

// const hebrew = {
//     songName : 'Hebrew Music ',
//     artist : 'Aná Bekoach',
//     file : 'hebrew-music',
//     liked : false,
// }

// const lecha = {
//     songName : 'Song for Shabbat',
//     artist : 'Lecha Dodi',
//     file : 'lecha-dodi',
//     liked : false,
// }

// const most = {
//     songName : 'Song of Songs',
//     artist : 'Most Anciente',
//     file : 'most-anciente',
//     liked : false,
// }

// const perception = {
//     songName : 'Estas Tonne - Perception',
//     artist : 'Estas Tonne',
//     file : 'perception',
//     liked : false,
// }

// const yamma = {
//     songName : 'Rencontres de Voyage en Orient',
//     artist : 'Yamma',
//     file : 'rencontres-voyage',
//     liked : false,
// }

// const shema = {
//     songName : 'Shema Yisrael',
//     artist : 'Gadol Elohai',
//     file : 'shema-yisrael',
//     liked : false,
// }

// const solomon = {
//     songName : 'Song of Solomon',
//     artist : 'Shir Hashirim',
//     file : 'song-of-solomon',
//     liked : false,
// }

// const waymaker = {
//     songName : 'Harp worship Sea of Galilee',
//     artist : 'Shema & Waymaker',
//     file : 'waymaker',
//     liked : false,
// }

// const aymee = {
//     songName : 'Louvor e Adoração',
//     artist : 'Aimeê Rocha',
//     file : 'aymee',
//     liked : false,
// }

const escudo = {
    songName : 'Escudo',
    artist : 'Voz da Verdade',
    file : 'escudo',
    liked : false,
}

let isPlaying = false;
let isShuffled = false;
let repeatOn = false;

// const originalPlaylist = [fundoMusical, escudo, Messiah, evangelho, fusion, rubycon2, hatikiva, ricochet, hebrew, lecha, most, phaedra,perception, autobahn, yamma, shema, solomon, rubycon1, waymaker, aymee];
const originalPlaylist = [evangelho, escudo];
        

// Não funcionou com o comando abaixo, pois não pude mais acrescentar novas músicas com essa opção acionada. O problema é que não está salvando os likes nas músicas. Quando se reinicia o aplicativo, todos os likes que haviam sido dados desaparecem. 
// const originalPlaylist = JSON.parse(localStorage.getItem('playlist')) ?? [fundoMusical, escudo, Messiah, evangelho, 
//     fusion, rubycon2, hatikiva, ricochet, hebrew, lecha, most, phaedra,perception, autobahn, 
//     yamma, shema, solomon, rubycon1, waymaker, aymee];

let sortedPlaylist = [...originalPlaylist];

let index = 0;

function playSong() {
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    song.play();
    isPlaying = true;
}

function pauseSong() {
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    song.pause();
    isPlaying = false;
}

function playPauseDecider() {
    if(isPlaying === true) {
        pauseSong();
    }
    else {
        playSong();
    }
}

function likeButtonRender() {
    if (sortedPlaylist[index].liked === true) {
        likeButton.querySelector('.bi').classList.remove('bi-heart');
        likeButton.querySelector('.bi').classList.add('bi-heart-fill');
        likeButton.classList.add('button-active');
    } else {
        likeButton.querySelector('.bi').classList.add('bi-heart');
        likeButton.querySelector('.bi').classList.remove('bi-heart-fill');
        likeButton.classList.remove('button-active');
    }
}

function initializeSong() {
    cover.src = `images/${sortedPlaylist[index].file}.png`;
    song.src = `songs/${sortedPlaylist[index].file}.mp3`;
    songName.innerText = sortedPlaylist[index].songName;
    bandName.innerText = sortedPlaylist[index].artist;
    likeButtonRender();
}

function previousSong() {
    if (index === 0) {
        index = sortedPlaylist.length - 1;
    }
    else {
        index -= 1;
    }
    initializeSong();
    playSong();
}


function nextSong() {
    if (index === sortedPlaylist.length - 1) {
         index = 0;
    }
    else {
        index += 1;
    }
    initializeSong();
    playSong();
}

function updateProgress() {
    const barWidth = (song.currentTime/song.duration)*100;
    currentProgress.style.setProperty('--progress', `${barWidth}%`);
    songTime.innerText = toHHMMSS(song.currentTime);
}

function jumpTo(event) {
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX;
    const jumpTotime = (clickPosition/width)* song.duration;
    song.currentTime = jumpTotime;
}

function shuffleArray(preShuffleArray) {
    const size = preShuffleArray.length;
    let currentIndex = size - 1;
    while(currentIndex > 0) {
        let randomIndex = Math.floor(Math.random()* size);
        let aux = preShuffleArray[currentIndex];
        preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
        preShuffleArray[randomIndex] = aux;
        currentIndex -= 1;
    }
}

function shuffleButtonClicked() {
    if (isShuffled === false) {
        isShuffled = true;
        shuffleArray(sortedPlaylist);
        shuffleButton.classList.add('button-active');
    }
    else {
        isShuffled = false;
        sortedPlaylist = [...originalPlaylist];
        shuffleButton.classList.remove('button-active');
    }
}

function repeatButtonClicked() {
    if (repeatOn === false) {
        repeatButton.classList.add('button-active');
        repeatOn = true;
    }
    else {
        repeatOn = false;
        repeatButton.classList.remove('button-active');
    }
}

function nextOrRepeat() {
    if (repeatOn === false) {
        nextSong();
    }
    else {
        playSong();
    }
}

function toHHMMSS(originalNumber) {
    let hours = Math.floor(originalNumber / 3600);   
    let min = Math.floor((originalNumber - hours * 3600) / 60); 
    let secs = Math.floor(originalNumber - hours * 3600 - min * 60);

    return `${hours.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
} 

function updateTotalTime() {
    totalTime.innerText =  toHHMMSS(song.duration);
} 

function likeButtonClicked() {
    if (sortedPlaylist[index].liked === false) {
        sortedPlaylist[index].liked = true;
    } else {
        sortedPlaylist[index].liked = false;
    }
    likeButtonRender();
    localStorage.setItem('playlist', JSON.stringify(originalPlaylist));
}

initializeSong();

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', updateProgress);
song.addEventListener('ended', nextOrRepeat);
song.addEventListener('loadedmetadata', updateTotalTime);
progressContainer.addEventListener('click', jumpTo);
shuffleButton.addEventListener('click', shuffleButtonClicked);
repeatButton.addEventListener('click', repeatButtonClicked);
likeButton.addEventListener('click', likeButtonClicked);