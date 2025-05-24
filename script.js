document.getElementById("journalForm").addEventListener("submit", function(event) {
  event.preventDefault();
  const form = event.target;

  const agenda = form.agenda.value;
  const syukur = form.syukur.value;
  const pelajaran = form.pelajaran.value;
  const perbaikan = form.perbaikan.value;
  const mood = form.mood.value;
  const produktivitas = form.produktivitas.value;
  const pagi = form.pagi.value;
  const siang = form.siang.value;
  const malam = form.malam.value;
  const catatan = form.catatan.value;
  const tugas = form.tugas.value;

  const foto = document.getElementById("foto").files[0];
  let fotoURL = "";
  if (foto) {
    fotoURL = URL.createObjectURL(foto);
  }

  const dataJurnal = {
    agenda,
    syukur,
    pelajaran,
    perbaikan,
    mood,
    produktivitas,
    makanan: { pagi, siang, malam },
    catatan,
    tugas,
    fotoURL,
    waktu: new Date().toLocaleString()
  };

  localStorage.setItem("jurnalHariIni", JSON.stringify(dataJurnal));
  tampilkanHasil();

  form.reset();
  form.produktivitas.nextElementSibling.value = "50%";
});

function tampilkanHasil() {
  const hasilDiv = document.getElementById("hasilJurnal");
  const data = JSON.parse(localStorage.getItem("jurnalHariIni"));
  if (!data) return;

  hasilDiv.innerHTML = `
    <h2>Hasil Jurnal (${data.waktu})</h2>
    🗓️ <strong>Agenda:</strong><br>${data.agenda.replace(/\n/g, "<br>")}<br><br>
    🌼 <strong>Hal yang disyukuri:</strong><br>${data.syukur}<br><br>
    📘 <strong>Pelajaran yang didapat:</strong><br>${data.pelajaran}<br><br>
    🔁 <strong>Perbaikan:</strong><br>${data.perbaikan}<br><br>
    😄 <strong>Mood:</strong> ${data.mood}<br>
    📊 <strong>Produktivitas:</strong> ${data.produktivitas}%<br><br>
    🍽️ <strong>Makanan Hari Ini:</strong><br>
    - Pagi: ${data.makanan.pagi}<br>
    - Siang: ${data.makanan.siang}<br>
    - Malam: ${data.makanan.malam}<br><br>
    📝 <strong>Catatan:</strong><br>${data.catatan}<br><br>
    🎯 <strong>Daftar Tugas:</strong><br>${data.tugas.replace(/\n/g, "<br>")}
  `;

  if (data.fotoURL) {
    const img = document.createElement("img");
    img.src = data.fotoURL;
    img.style.maxWidth = "100%";
    img.style.marginTop = "10px";
    hasilDiv.appendChild(img);
  }
}

// Saat halaman dibuka, tampilkan data yang tersimpan
window.onload = tampilkanHasil;
