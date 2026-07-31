// =========================================================
// Welcome Screen — sapaan personal + countdown + buka tirai
// =========================================================
// Cara kirim link personal ke tamu:
//   index.html?to=Budi+Santoso   atau   index.html?to=Mr.X
// Kalau tidak ada parameter "to", pakai sapaan umum.

document.addEventListener('DOMContentLoaded', function () {

  const screenEl      = document.getElementById('welcomeScreen');
  const guestNameEl    = document.getElementById('welcomeGuestName');
  const greetBlock     = document.getElementById('welcomeGreetBlock');
  const instructionEl  = document.getElementById('welcomeInstructionBlock');
  const countdownEl    = document.getElementById('welcomeCountdown');
  const curtainLeft    = document.getElementById('curtainLeft');
  const curtainRight   = document.getElementById('curtainRight');
  const skipBtn        = document.getElementById('welcomeSkip');

  document.body.classList.add('welcome-active');

  // ---- 1. Baca nama tamu dari URL ----
  const params = new URLSearchParams(window.location.search);
  const rawName = params.get('to');
  if (rawName && rawName.trim() !== '') {
    const decoded = decodeURIComponent(rawName.replace(/\+/g, ' '));
    guestNameEl.textContent = decoded;
  } else {
    guestNameEl.textContent = 'Bapak/Ibu/Saudara/i';
  }

  // ---- 2. Preload aset besar di belakang layar ----
  // supaya pas tirai kebuka, halaman utama sudah siap tanpa nunggu loading.
  const assetsToPreload = [
    'assets/hero-bg.jpg',
    'assets/popup-ourstory.png',
    'assets/popup-location.png',
    'assets/popup-gallery.png'
  ];
  assetsToPreload.forEach(function (src) {
    const img = new Image();
    img.src = src;
  });

  // ---- 3. Timeline welcome screen (total maks 10 detik) ----
  let timers = [];
  function schedule(fn, delay) {
    timers.push(setTimeout(fn, delay));
  }
  function clearAllTimers() {
    timers.forEach(clearTimeout);
    timers = [];
  }

  function showInstruction() {
    greetBlock.classList.add('hide');
    instructionEl.classList.add('show');
  }

  function startCountdown() {
    instructionEl.classList.remove('show');
    let n = 3;
    countdownEl.textContent = n;
    countdownEl.classList.add('show');
    const tick = setInterval(function () {
      n -= 1;
      if (n > 0) {
        countdownEl.textContent = n;
      } else {
        clearInterval(tick);
      }
    }, 1000);
    timers.push(tick);
  }

  function openCurtain() {
    screenEl.classList.add('opening');
    curtainLeft.classList.add('open');
    curtainRight.classList.add('open');
    setTimeout(function () {
      document.body.classList.remove('welcome-active');
      document.body.classList.add('welcome-done');
    }, 1200);
  }

  // jadwal: 0s sapaan -> 2.5s instruksi -> 7s countdown -> 10s buka tirai
  schedule(showInstruction, 2500);
  schedule(startCountdown, 7000);
  schedule(openCurtain, 10000);

  // ---- 4. Tombol lewati ----
  skipBtn.addEventListener('click', function () {
    clearAllTimers();
    openCurtain();
  });

});
