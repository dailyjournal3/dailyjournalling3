// URL Google Apps Script Web App (ganti dengan milikmu)
const endpointURL = 'https://script.google.com/macros/s/AKfycbx1ZC94VuW01GlqCYy_vCCB2ffLvLa-ijnEmO6912IZoNtDskbpwhzi2gBJFcLJx2dQ/exec';

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

// Fungsi buat slug (nama file foto)
function slugify(text) {
  return text.toLowerCase().replace(/ /g, '-').replace(/[^\w\-]+/g, '');
}

// Element DOM
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

// Tampilkan detail siswa, foto, dan load pesan menfess dari Sheets
function tampilkanDetail(nama) {
  currentSiswa = nama;
  namaTerpilih.textContent = nama;
  const fotoFileName = slugify(nama) + '.jpg';
  fotoSiswa.src = 'images/' + fotoFileName;
  fotoSiswa.alt = 'Foto ' + nama;

  detail.classList.remove('hidden');
  namaList.style.display = 'none';

  fetchPesanDariSheets();
  menfessInput.value = '';
}

// Fetch pesan dari Google Sheets via Web App
async function fetchPesanDariSheets() {
  if (!currentSiswa) return;
  try {
    const res = await fetch(endpointURL);
    const data = await res.json();

    // Filter pesan khusus siswa yang dipilih
    const pesanSiswa = data.filter(item => item.nama === currentSiswa);

    // Tampilkan pesan
    pesanList.innerHTML = '';
    if (pesanSiswa.length === 0) {
      pesanList.innerHTML = '<li>Belum ada pesan menfess nih.</li>';
    } else {
      pesanSiswa.forEach(p => {
        const li = document.createElement('li');
        li.textContent = p.pesan;
        pesanList.appendChild(li);
      });
    }
  } catch (err) {
    console.error('Error fetch pesan:', err);
    pesanList.innerHTML = '<li>Gagal mengambil pesan menfess.</li>';
  }
}

// Kirim pesan ke Sheets via POST request
async function kirimPesanKeSheets(nama, pesan) {
  try {
    const res = await fetch(endpointURL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ nama, pesan }),
    });
    return await res.json();
  } catch (err) {
    console.error('Error kirim pesan:', err);
    return { status: 'error', message: 'Gagal mengirim pesan' };
  }
}

// Event kirim pesan
kirimBtn.addEventListener('click', async () => {
  const pesan = menfessInput.value.trim();
  if (!pesan) {
    alert('Tulis pesan dulu ya!');
    return;
  }
  const result = await kirimPesanKeSheets(currentSiswa, pesan);
  if (result.status === 'success') {
    menfessInput.value = '';
    fetchPesanDariSheets();
    alert('Pesan menfess sudah terkirim!');
  } else {
    alert('Gagal kirim pesan: ' + result.message);
  }
});

// Tombol kembali ke daftar
backBtn.addEventListener('click', () => {
  detail.classList.add('hidden');
  namaList.style.display = 'flex';
});

// Inisialisasi tampilan daftar nama
tampilkanDaftar();