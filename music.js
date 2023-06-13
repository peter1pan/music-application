// music detayları

class Musics {
  constructor(tittle, singer, img, musicFile) {
    this.tittle = tittle;
    this.singer = singer;
    this.img = img;
    this.musicFile = musicFile;
  }

  // şarkının başlığı ve adı gelicek bir fonksiyon
  getMusic() {
    return this.tittle + this.singer;
  }
}

// servis kullanmayı bilmediğim için tek tek oluşturcam

const musicList = [
  new Musics(
    "Elden ring OST",
    "Elden ring",
    "elden-ring.jpg",
    "Elden-ring.mp3"
  ),

  new Musics(
    "Waltz for zizi",
    "Cowboy Bebop",
    "Cowboy-Bebop.jpg",
    "Cowboy-bebop-waltz-zizi.mp3"
  ),
  new Musics(
    "Ban & Elanie",
    "Nanatsu no taizai",
    "ban-elanie.jpg",
    "ban-and-elaine.mp3"
  ),
];
