// script bilgileri
const curretMusic = document.querySelector(".curretMusic");
const title = document.querySelector(".title");
const image = document.querySelector("#music-image");
const singer = document.querySelector(".singer");
const next = document.querySelector("#next");
const play = document.querySelector("#play");
const prev = document.querySelector("#prev");
const currentTime = document.querySelector(".current-time");
const timeRange = document.querySelector(".time-range");
const durationTime = document.querySelector(".duration-time");
const volumeIcon = document.querySelector("#volume-icon");
const volumeBar = document.querySelector("#volume-bar");
const loop = document.querySelector("#loop");
const music_list = document.querySelector(".grid-container2 .music-list");
const shuffle = document.querySelector("#shuffle");
const player = new MusicPlayer(musicList);

window.addEventListener("load", () => {
  let musics = player.getMusic();
  displayMusic(musics);
  displayMusicList(player.musicList);
  curretPlayingMusic();
});

function displayMusic(musics) {
  // title.innerText = musics.tittle;
  // singer.innerText = musics.singer;
  image.src = "img/" + musics.img;
  audio.src = "mp3/" + musics.musicFile;
}

play.addEventListener("click", () => {
  const isMusicPlay = curretMusic.classList.contains("playing");
  isMusicPlay ? pauseMusic() : playMusic();
});

function pauseMusic() {
  // müziği durdurma fonksiyonu
  curretMusic.classList.remove("playing");
  play.classList = "fa-regular fa-circle-play";
  audio.pause();
}
function playMusic() {
  // müziği başlatma fonksiyonu
  curretMusic.classList.add("playing");
  play.classList = "fa-regular fa-circle-stop";
  audio.play();
}
prev.addEventListener("click", () => {
  prevMusic();
});

next.addEventListener("click", () => {
  nextMusic();
});

const prevMusic = () => {
  player.previousMusic();
  let music = player.getMusic();
  displayMusic(music);
  playMusic();
  curretPlayingMusic();
};

const nextMusic = () => {
  player.nextMusic();
  let music = player.getMusic();
  displayMusic(music);
  playMusic();
  curretPlayingMusic();
};

audio.addEventListener("loadedmetadata", () => {
  durationTime.textContent = timeCalculator(audio.duration);
  timeRange.max = Math.floor(audio.duration);
});

// Süre hesaplama fonksiyonu
function timeCalculator(totalSecond) {
  const minute = Math.floor(totalSecond / 60);
  const second = Math.floor(totalSecond % 60);
  const updateSecond = second < 10 ? `0${second}` : `${second}`;
  result = `${minute}:${updateSecond} `;

  return result;
}

audio.addEventListener("timeupdate", () => {
  timeRange.value = Math.floor(audio.currentTime);
  currentTime.textContent = timeCalculator(timeRange.value);
});

audio.addEventListener("ended", () => {
  nextMusic();
});

timeRange.addEventListener("input", () => {
  currentTime.textContent = timeCalculator(timeRange.value);
  audio.currentTime = timeRange.value;
});

let soundStatus = "notMuted";
volumeIcon.addEventListener("click", () => {
  if (soundStatus === "notMuted") {
    audio.muted = true;
    soundStatus = "Muted";
    volumeIcon.classList = "fa-solid fa-volume-xmark id=volume-icon>>";
    volumeBar.value = 0;
  } else {
    audio.muted = false;
    soundStatus = "notMuted";
    volumeIcon.classList = "fa-solid fa-volume-high id=volume-icon>";
    volumeBar.value = 50;
  }
});
volumeBar.addEventListener("input", (e) => {
  let volumeValue = e.target.value;

  audio.volume = volumeValue / 100;
  if (volumeValue == 0) {
    audio.muted = true;
    volumeIcon.classList = "fa-solid fa-volume-xmark id=volume-icon>";
  } else {
    audio.muted = false;
    volumeIcon.classList = "fa-solid fa-volume-high id=volume-icon>";
  }
});

let musicLoop = "notLoop";

loop.addEventListener("click", (LoopEvent) => {
  let loopButton = LoopEvent.target;

  if (musicLoop == "notLoop") {
    musicLoop = "loop";
    loopButton.style.color = "#d3c3ff";
    audio.loop = true;
  } else {
    loopButton.style.color = "white";
    musicLoop = "notLoop";
    audio.loop = false;
  }
});

let musicShuffle = "notShuffle";

shuffle.addEventListener("click", (shuffleEvent) => {
  let shuffleButton = shuffleEvent.target;
  if (musicShuffle == "notShuffle") {
    musicShuffle = "Shuffle";
    shuffleButton.style.color = "#d3c3ff";
    
  } else {
    shuffleButton.style.color = "white";
    musicShuffle = "notShuffle";
  }
});

const displayMusicList = (list) => {
  for (i = 0; i < list.length; i++) {
    let divTag = `
<div>
<li li-index='${i}' onclick="selectedMusic(this)">
<span class="tittle2">${list[i].tittle}</span>
<span id="music-${i}" class="music-time total-time">5:53</span>
</li>
</div>
<audio class="music-${i}" src="mp3/${list[i].musicFile}"></audio> 
`;
    music_list.insertAdjacentHTML("beforeend", divTag);

    let divAudioDuration = music_list.querySelector(`#music-${i}`);
    let divAudiTag = music_list.querySelector(`.music-${i}`);

    divAudiTag.addEventListener("loadeddata", () => {
      divAudioDuration.innerText = timeCalculator(divAudiTag.duration);
    });
  }
};

const selectedMusic = (li) => {
  player.index = li.getAttribute("li-index");
  displayMusic(player.getMusic());
  playMusic();
  curretPlayingMusic();
};

const curretPlayingMusic = () => {
  for (let li of music_list.querySelectorAll("li")) {
    if (li.classList.contains("playing")) {
      li.classList.remove("playing");
    }

    if (li.getAttribute("li-index") == player.index) {
      li.classList.add("playing");
    }
  }
};
