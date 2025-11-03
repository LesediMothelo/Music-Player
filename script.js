// ===== Confetti =====
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();
const confettiPieces = [];
const colors = [
  "#FF5F7E",
  "#FFD300",
  "#3CE3FF",
  "#8DFF5F",
  "#FF9B00",
  "#FF00FF",
];
for (let i = 0; i < 150; i++) {
  confettiPieces.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 6 + 4,
    dx: Math.random() * 2 - 1,
    dy: Math.random() * 3 + 1,
    color: colors[Math.floor(Math.random() * colors.length)],
    tilt: Math.random() * 10,
    tiltAngleIncrement: Math.random() * 0.07 + 0.05,
    tiltAngle: 0,
  });
}
function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confettiPieces.forEach((p) => {
    ctx.beginPath();
    ctx.lineWidth = p.r;
    ctx.strokeStyle = p.color;
    ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
    ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
    ctx.stroke();
  });
  confettiPieces.forEach((p) => {
    p.tiltAngle += p.tiltAngleIncrement;
    p.y += p.dy;
    p.x += p.dx;
    p.tilt = Math.sin(p.tiltAngle) * 15;
    if (p.y > canvas.height) {
      p.y = -20;
      p.x = Math.random() * canvas.width;
    }
  });
  requestAnimationFrame(drawConfetti);
}
drawConfetti();

// ===== Music Player =====
const songs = [
  {
     src: "/assets/songs/Tyla - IS IT.mp3",
    img: "/images/tyla-cover-wwp.jpg",
    title: "IS IT",
    artist: "Tyla",
    start: 1,
    end: 55
  },
  {
    src: "/assets/songs/Tyla - Jump.mp3",
    img: "/images/tyla-jump.png",
    title: "Jump",
    artist: "Tyla",
    start: 1,
    end: 55
  },
  {
    src: "/assets/songs/Tyla - MR. MEDIA.mp3",
    img: "/images/tyla-cover-wwp.jpg",
    title: "MR.MEDIA",
    artist: "Tyla",
    start: 1,
    end: 55
  },
];
let currentSong = 0;
const audio = document.getElementById("audio");
const vinyl = document.getElementById("vinyl");
const centerImg = document.getElementById("centerImg");
const playPauseBtn = document.getElementById("playPause");
const container = document.getElementById("container");
const songTitle = document.getElementById("songTitle");
const artistName = document.getElementById("artistName");
const songInfo = document.getElementById("songInfo");

// Progress bar
const progressContainer = document.createElement("div");
progressContainer.className = "progress-container";
const progressBar = document.createElement("div");
progressBar.className = "progress-bar";
progressContainer.appendChild(progressBar);
container.appendChild(progressContainer);

function loadSong(index) {
  const s = songs[index];
  centerImg.style.opacity = 0;
  setTimeout(() => {
    centerImg.src = s.img;
    centerImg.style.opacity = 1;
  }, 300);

  songTitle.textContent = s.title;
  artistName.textContent = s.artist;

  audio.src = s.src;
  audio.currentTime = s.start || 0;
  audio.play();

  vinyl.style.animationPlayState = "running";
  container.classList.add("glow");
  songInfo.classList.add("pulse-glow");
  playPauseBtn.textContent = "⏸ Pause";

  audio.ontimeupdate = () => {
    if (s.end && audio.currentTime >= s.end) {
      audio.pause();
      vinyl.style.animationPlayState = "paused";
      container.classList.remove("glow");
      songInfo.classList.remove("pulse-glow");
      playPauseBtn.textContent = "▶️ Play";
    }
    const progressPercent =
      ((audio.currentTime - (s.start || 0)) /
        ((s.end || audio.duration) - (s.start || 0))) *
      100;
    progressBar.style.width = `${progressPercent}%`;
  };
}

playPauseBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    vinyl.style.animationPlayState = "running";
    container.classList.add("glow");
    songInfo.classList.add("pulse-glow");
    playPauseBtn.textContent = "⏸ Pause";
  } else {
    audio.pause();
    vinyl.style.animationPlayState = "paused";
    container.classList.remove("glow");
    songInfo.classList.remove("pulse-glow");
    playPauseBtn.textContent = "▶️ Play";
  }
});

document.getElementById("nextArrow").addEventListener("click", () => {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
});
document.getElementById("prevArrow").addEventListener("click", () => {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
});

loadSong(currentSong);



