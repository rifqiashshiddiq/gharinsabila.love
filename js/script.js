// =========================================================
// Undangan Digital — Gharin & Sabila (Demo/Percobaan)
// Logic: buka/tutup popup, navigasi antar popup lewat footer,
// dan redirect ke halaman RSVP terpisah.
// =========================================================

document.addEventListener('DOMContentLoaded', function () {

  const overlay = document.getElementById('popupOverlay');
  const frame = document.getElementById('popupFrame');

  // Konten tiap popup. Yang sudah ada gambar dari ilustrator pakai
  // type "image". Yang belum ada asetnya pakai "placeholder" —
  // tinggal diganti jadi "image" begitu file-nya siap.
  const popups = {
    ourJourney: {
      type: 'image',
      src: 'assets/popup-ourstory.png',
      alt: 'Our Love Journey — Cerita Gharin & Sabila',
      footer: true
    },
    groom: {
      type: 'placeholder',
      icon: '🤵',
      title: 'The Groom',
      text: 'Konten profil mempelai pria masih disiapkan ilustrator. Placeholder ini tinggal diganti gambar aslinya.',
      footer: false
    },
    bride: {
      type: 'placeholder',
      icon: '👰',
      title: 'The Bride',
      text: 'Konten profil mempelai wanita masih disiapkan ilustrator. Placeholder ini tinggal diganti gambar aslinya.',
      footer: false
    },
    eventInfo: {
      type: 'placeholder',
      icon: '🗓️',
      title: 'Event Info',
      text: 'Detail akad & resepsi masih disiapkan ilustrator. Placeholder ini tinggal diganti gambar aslinya.',
      footer: false
    },
    location: {
      type: 'image',
      src: 'assets/popup-location.png',
      alt: 'The Wedding Venue — Lokasi Acara',
      footer: true
    },
    gallery: {
      type: 'image',
      src: 'assets/popup-gallery.png',
      alt: 'Photo Gallery — Cherished Moments',
      footer: true
    }
  };

  function renderPopup(key) {
    const data = popups[key];
    if (!data) return;

    frame.innerHTML = '';

    // tombol tutup
    const closeBtn = document.createElement('button');
    closeBtn.className = 'popup-close';
    closeBtn.setAttribute('aria-label', 'Tutup');
    closeBtn.textContent = '✕';
    closeBtn.addEventListener('click', closePopup);
    frame.appendChild(closeBtn);

    if (data.type === 'image') {
      const img = document.createElement('img');
      img.className = 'popup-image';
      img.src = data.src;
      img.alt = data.alt;
      frame.appendChild(img);

      // footer nav baked-in di gambar (Beranda | Galeri | Lokasi | RSVP)
      if (data.footer) {
        const zones = [
          { cls: 'pfh-home', action: () => closePopup() },
          { cls: 'pfh-gallery', action: () => renderPopup('gallery') },
          { cls: 'pfh-location', action: () => renderPopup('location') },
          { cls: 'pfh-rsvp', action: () => goToRsvp() }
        ];
        zones.forEach(z => {
          const btn = document.createElement('button');
          btn.className = 'popup-footer-hotspot ' + z.cls;
          btn.addEventListener('click', z.action);
          frame.appendChild(btn);
        });
      }
    } else {
      const ph = document.createElement('div');
      ph.className = 'popup-placeholder';
      ph.innerHTML = `
        <div class="ph-icon">${data.icon}</div>
        <h2>${data.title}</h2>
        <p>${data.text}</p>
        <div class="ph-note">Placeholder — menunggu aset ilustrator</div>
      `;
      frame.appendChild(ph);
    }

    overlay.classList.add('open');
  }

  function closePopup() {
    overlay.classList.remove('open');
  }

  function goToRsvp() {
    window.location.href = 'rsvp.html';
  }

  // klik area gelap di luar frame utk menutup
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closePopup();
  });

  // Escape utk menutup
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closePopup();
  });

  // ---- Hubungkan hotspot di halaman utama ----
  const bindings = {
    'hotspot-our-journey': () => renderPopup('ourJourney'),
    'hotspot-groom': () => renderPopup('groom'),
    'hotspot-bride': () => renderPopup('bride'),
    'hotspot-eventinfo': () => renderPopup('eventInfo'),
    'hotspot-location': () => renderPopup('location'),
    'hotspot-gallery': () => renderPopup('gallery'),
    'hotspot-rsvp': () => goToRsvp()
  };

  Object.keys(bindings).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', bindings[id]);
  });

});
