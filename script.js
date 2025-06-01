const siswa = [
  "Aika Hasna Rihadatulaisy", "Aila Darin Aqilah", "Almeira Bilqis Azarine", "Annisa Nurnazmi",
  "Anugrah Sastra Ditrya Ramadhana", "Berliana Aulia Putri", "Chandralita Sukma Namina",
  "Charissa Nazwa Ardestia", "Danis Dihyan Palguna", "Dede Fano Sofiyudin", "Dwi Keyla",
  "Fakhira Nada Zalfa", "Fathia Nurahma Dianah", "Ferdi Herdiyansah", "Genta Revolusi",
  "Ghassani Syahmah Azzahra", "Gybran Rakha Pratama", "Hasna Tarisha Kusuma", "Jessica Hutauruk",
  "Jihan Dzakiyyatunnisa", "Keizza Wiratama Aditya Nugraha", "Key Aura Nazwa",
  "Keysha Naya Ristiyani", "Khezia Anju Kiren Sitinjak", "Meifa Fatimatuzzahra", "Muki Nurrohmah",
  "Nadindra Fadhil Al-Faiq", "Nadya Sri Mustika", "Radith Apriliyan Nurul Haq",
  "Raka Zulfa Saputra", "Rifdah Aufaa Nurhalizah", "Rizky Fadillah", "Shalfa Nur Fadhillah",
  "Silah Gustiana", "Siti Amirah", "Siti Nurhumaida Rahma", "Talitha Fadhilah Kanza"
];

function slugify(text) {
  return text.toLowerCase().replace(/ /g, '-').replace(/[^\w\-]+/g, '');
}

const namaList = document.getElementById('nama-list');
const detail = document.getElementById('detail');
const namaTerpilih = document.getElementById('nama-terpilih');
const fotoSiswa = document.getElementById('foto-siswa');
const menfessInput = document.getElementById('menfess-input');
const kirimBtn = document.getElementById('kirim-btn');
const pesanList = document.getElementById('pesan-list');
const backBtn = document.getElementById('back-btn');

let currentSiswa = null;
const endpoint = 'https://script.google.com/macros/s/AKfycbwUSMGM3BZeqDvSOzBWpeINPnIhjeGRHZbgTaCx1KRAeX126hUP43A72gKuwinRfRU/exec';

function tampilkanDaftar() {
  namaList.innerHTML = '';
  siswa.forEach((nama) => {
    const div = document.createElement('div');
    div.textContent = nama;
    div.className = 'nama-item';
    div.addEventListener('click', () => tampilkanDetail(nama));
    namaList.appendChild(div);
  });
}

function tampilkanDetail(nama) {
  currentSiswa = nama;
  namaTerpilih.textContent = nama;
  const fotoFileName = slugify(nama) + '.jpg';
  fotoSiswa.src = 'images/' + fotoFileName;
  fotoSiswa.alt = 'Foto ' + nama;

  detail.classList.remove('hidden');
  namaList.style.display = 'none';

  loadPesan(); // Ambil semua pesan dari Google Sheets
  menfessInput.value = '';
}

function kirimPesan(pesan) {
  fetch(endpoint, {
    method: 'POST',
    body: new URLSearchParams({
      nama: currentSiswa,
      pesan: pesan
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.status === 'success') {
      alert('Pesan berhasil dikirim!');
      menfessInput.value = '';
      loadPesan(); // Refresh pesan setelah kirim
    } else {
      alert('Gagal mengirim pesan: ' + data.message);
    }
  })
  .catch(err => {
    console.error(err);
    alert('Gagal mengirim pesan 😭');
  });
}

function loadPesan() {
  fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      const pesanArr = data.filter(item => item.nama === currentSiswa);
      pesanList.innerHTML = '';

      if (pesanArr.length === 0) {
        pesanList.innerHTML = '<li>Belum ada pesan untuk siswa ini.</li>';
      } else {
        pesanArr.forEach((item) => {
          const li = document.createElement('li');
          li.textContent = item.pesan;
          pesanList.appendChild(li);
        });
      }
    })
    .catch(error => {
      console.error(error);
      alert('Gagal mengambil pesan 😢');
    });
}

kirimBtn.addEventListener('click', () => {
  const pesan = menfessInput.value.trim();
  if (!pesan) {
    alert('Tulis dulu pesannya yaa!');
    return;
  }
  kirimPesan(pesan);
});

backBtn.addEventListener('click', () => {
  detail.classList.add('hidden');
  namaList.style.display = 'flex';
});

tampilkanDaftar();
