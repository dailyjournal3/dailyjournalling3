const siswa = [
  "Aika Hasna Rihadatulaisy",
  "Aila Darin Aqilah",
  "Almeira Bilqis Azarine",
  "Annisa Nurnazmi",
  "Anugrah Sastra Ditrya Ramadhana",
  "Berliana Aulia Putri",
  "Chandralita Sukma Namina",
  "Charissa Nazwa Ardestia",
  "Danis Dihyan Palguna",
  "Dede Fano Sofiyudin",
  "Dwi Keyla",
  "Fakhira Nada Zalfa",
  "Fathia Nurahma Dianah",
  "Ferdi Herdiyansah",
  "Genta Revolusi",
  "Ghassani Syahmah Azzahra",
  "Gybran Rakha Pratama",
  "Hasna Tarisha Kusuma",
  "Jessica Hutauruk",
  "Jihan Dzakiyyatunnisa",
  "Keizza Wiratama Aditya Nugraha",
  "Key Aura Nazwa",
  "Keysha Naya Ristiyani",
  "Khezia Anju Kiren Sitinjak",
  "Meifa Fatimatuzzahra",
  "Muki Nurrohmah",
  "Nadindra Fadhil Al-Faiq",
  "Nadya Sri Mustika",
  "Radith Apriliyan Nurul Haq",
  "Raka Zulfa Saputra",
  "Rifdah Aufaa Nurhalizah",
  "Rizky Fadillah",
  "Shalfa Nur Fadhillah",
  "Silah Gustiana",
  "Siti Amirah",
  "Siti Nurhumaida Rahma",
  "Talitha Fadhilah Kanza"
];

// Membuat slug (nama file foto) dari nama siswa
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

// Tampilkan daftar nama siswa
function tampilkanDaftar() {
  namaList.innerHTML = '';
  siswa.forEach((nama) => {
    const div = document.createElement('div');
    div.textContent = nama;
    div.className = 'nama-item';
    div.addEventListener('click', () => {
      tampilkanDetail(nama);
    });
    namaList.appendChild(div);
  });
}

// Tampilkan detail siswa + foto + menfess
function tampilkanDetail(nama) {
  currentSiswa = nama;
  namaTerpilih.textContent = nama;
  const fotoFileName = slugify(nama) + '.jpg'; // format nama file foto
  fotoSiswa.src = 'images/' + fotoFileName;
  fotoSiswa.alt = 'Foto ' + nama;

  // Tampilkan detail, sembunyikan daftar nama
  detail.classList.remove('hidden');
  namaList.style.display = 'none';

  // Load pesan menfess dari localStorage
  loadPesan();
  menfessInput.value = '';
}

// Simpan pesan menfess ke localStorage
function simpanPesan(pesan) {
  if (!currentSiswa) return;
  const key = 'menfess-' + slugify(currentSiswa);
  let pesanArr = JSON.parse(localStorage.getItem(key)) || [];
  pesanArr.push(pesan);
  localStorage.setItem(key, JSON.stringify(pesanArr));
}

// Load pesan menfess dari localStorage dan tampilkan
function loadPesan() {
  if (!currentSiswa) return;
  const key = 'menfess-' + slugify(currentSiswa);
  let pesanArr = JSON.parse(localStorage.getItem(key)) || [];
  pesanList.innerHTML = '';
  pesanArr.forEach((p) => {
    const li = document.createElement('li');
    li.textContent = p;
    pesanList.appendChild(li);
  });
}

kirimBtn.addEventListener('click', () => {
  const pesan = menfessInput.value.trim();
  if (!pesan) {
    alert('Tulis pesan dulu ya!');
    return;
  }
  simpanPesan(pesan);
  menfessInput.value = '';
  loadPesan();
  alert('Pesan menfess sudah terkirim!');
});

backBtn.addEventListener('click', () => {
  detail.classList.add('hidden');
  namaList.style.display = 'flex';
});

tampilkanDaftar();     