// music kontrolleri

class MusicPlayer {
  constructor(musicList) {
    this.musicList = musicList;
    this.index = 0; // 1. şarkıdan başlaması için index 0 yazdım
  }

  getMusic() {
    return this.musicList[this.index]; // muzik listesi içerisinden o anki indexteki muziği getirme başlangıçta 0 yani ilk müzik gelecektir
  }

  nextMusic() {
    if (this.index + 1 < this.musicList.length) {
      // index muzik listesinin uzunluğuna eşit olmayana kadar kadar arttır eğer müzik listesinin sonuna gelmişsse en baştaki müziği dön
      this.index++;
    } else {
      this.index = 0;
    }
  }

  previousMusic() {
    if (this.index != 0) {
      this.index--;
    } else {
      this.index = this.musicList.length - 1;
    }
  }
}
