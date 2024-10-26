const tracks = [
    { 
        title: "Алматының түндері", 
        artist: "Қайрат Нұртас", 
        url: "track1.mp3", 
        cover: "cover1.jpg" 
    },
    { 
        title: "Qansha kun?", 
        artist: "Sadraddin", 
        url: "track2.mp3", 
        cover: "cover2.jpg" 
    },
    { 
        title: "Камин", 
        artist: "Jony", 
        url: "track3.mp3", 
        cover: "cover3.jpg" 
    }
];

let currentTrackIndex = 0;
const audio = document.getElementById("audio");
const playPauseButton = document.getElementById("play-pause");
const nextButton = document.getElementById("next");
const trackCover = document.getElementById("track-cover");
const trackTitle = document.getElementById("track-title");
const trackArtist = document.getElementById("track-artist");
const progress = document.getElementById("progress");
const volumeControl = document.getElementById("volume");
const trackList = document.getElementById("track-list");

// Инициализация плеера
function loadTrack(index) {
    const track = tracks[index];
    audio.src = track.url;
    trackCover.src = track.cover;
    trackTitle.textContent = track.title;
    trackArtist.textContent = track.artist;
}

// Воспроизведение/пауза
playPauseButton.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playPauseButton.textContent = "Pause";
    } else {
        audio.pause();
        playPauseButton.textContent = "Play";
    }
});

nextButton.addEventListener("click", () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    audio.play();
    playPauseButton.textContent = "Pause";
});

audio.addEventListener("timeupdate", () => {
    progress.value = (audio.currentTime / audio.duration) * 100 || 0;
});

progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

volumeControl.addEventListener("input", () => {
    audio.volume = volumeControl.value;
});

tracks.forEach((track, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = track.title;
    listItem.addEventListener("click", () => {
        currentTrackIndex = index;
        loadTrack(currentTrackIndex);
        audio.play();
        playPauseButton.textContent = "Pause";
    });
    trackList.appendChild(listItem);
});

loadTrack(currentTrackIndex);
