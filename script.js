let audioElement = new Audio('sza.mp3');
let i = 0;
let masterPlay = document.getElementById("masterplay");
let myProgressbar = document.getElementById("progressbar");
let gif = document.getElementById("gif1");
let songname = document.getElementById("SongName1");
let currentTimeElem = document.getElementById("current-time");
let totalDurationElem = document.getElementById("total-duration");
let song = Array.from(document.getElementsByClassName("songItems"));

let songs = [
    { SongName: "Open Arms", filePath: "sza.mp3", coverPath: "sza.jpg" },
    { SongName: "Dusk Till Dawn", filePath: "dusk.mp3", coverPath: "kend.jpg" },
    { SongName: "Shape of You", filePath: "ed.mp3", coverPath: "sa.jpeg" },
    { SongName: "Hymn for the weeknd", filePath: "hymn.mp3", coverPath: "s.jpeg" },
    { SongName: "Good Days", filePath: "sza.mp3", coverPath: "smiths2.jpeg" },
    { SongName: "Call Out By My Name", filePath: "hymn.mp3", coverPath: "imp.jpeg" }
];

song.forEach((element, i) => {
    element.getElementsByTagName("span")[0].innerHTML = songs[i].SongName;
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime == 0) {
        document.getElementById(i).classList.add("fa-pause");
        document.getElementById(i).classList.remove("fa-play");
        audioElement.play();
        masterPlay.classList.remove("fa-play");
        masterPlay.classList.add("fa-pause");
        gif.style.opacity = 1;
    } else {
        makeAllPlay();
        audioElement.pause();
        document.getElementById(i).classList.remove("fa-pause");
        document.getElementById(i).classList.add("fa-play");
        masterPlay.classList.remove("fa-pause");
        masterPlay.classList.add("fa-play");
        gif.style.opacity = 0;
    }
});

audioElement.addEventListener('timeupdate', () => {
    const progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressbar.value = progress;
    currentTimeElem.textContent = formatTime(audioElement.currentTime);
    totalDurationElem.textContent = formatTime(audioElement.duration);
});

myProgressbar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressbar.value * audioElement.duration) / 100;
});

const makeAllPlay = () => {
    Array.from(document.getElementsByClassName("playSong")).forEach((e) => {
        e.classList.add("fa-play");
        e.classList.remove('fa-pause');
    });
}

Array.from(document.getElementsByClassName("playSong")).forEach((element) => {
    element.addEventListener('click', (e) => {
        i = parseInt(e.target.id);
        if (audioElement.src.endsWith(songs[i].filePath) && !audioElement.paused) {
            audioElement.pause();
            e.target.classList.remove('fa-pause');
            e.target.classList.add('fa-play');
            masterPlay.classList.remove("fa-pause");
            masterPlay.classList.add("fa-play");
            gif.style.opacity = 0;
        } else {
            makeAllPlay();
            songname.innerHTML = songs[i].SongName;
            e.target.classList.remove("fa-play");
            e.target.classList.add('fa-pause');
            audioElement.src = songs[i].filePath;
            audioElement.currentTime = 0;
            audioElement.play();
            masterPlay.classList.remove("fa-play");
            masterPlay.classList.add("fa-pause");
            gif.style.opacity = 1;
        }
    });
});

document.getElementById('previous').addEventListener('click', () => {
    if (i <= 0) {
        i = songs.length - 1;
    } else {
        i -= 1;
    }
    makeAllPlay();
    document.getElementById(i).classList.add("fa-pause");
    document.getElementById(i).classList.remove("fa-play");
    songname.innerHTML = songs[i].SongName;
    audioElement.src = songs[i].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
    gif.style.opacity = 1;
});

document.getElementById('next').addEventListener('click', () => {
    if (i >= songs.length - 1) {
        i = 0;
    } else {
        i += 1;
    }
    makeAllPlay();
    document.getElementById(i).classList.add("fa-pause");
    document.getElementById(i).classList.remove("fa-play");
    songname.innerHTML = songs[i].SongName;
    audioElement.src = songs[i].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
    gif.style.opacity = 1;
});
