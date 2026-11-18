// JavaScript portofolio Himawan Ibnu Afif Muzakki

const tombolTema = document.querySelector("#tombol-tema");

if (tombolTema) {
  tombolTema.addEventListener("click", () => {
    const temaGelap = document.body.classList.toggle("gelap");
    tombolTema.textContent = temaGelap ? "Mode Terang" : "Mode Gelap";
    tombolTema.setAttribute("aria-pressed", String(temaGelap));
  });
}

const formKontak = document.querySelector("#form-kontak");

if (formKontak) {
  const kotakPesan = formKontak.querySelector("#pesan");
  const hitungKarakter = formKontak.querySelector("#hitung-karakter");
  const statusForm = formKontak.querySelector("#status-form");
  const maksimalKarakter = 300;

  const perbaruiHitungKarakter = () => {
    if (kotakPesan && hitungKarakter) {
      hitungKarakter.textContent = `${kotakPesan.value.length}/${maksimalKarakter} karakter`;
    }
  };

  perbaruiHitungKarakter();
  kotakPesan?.addEventListener("input", perbaruiHitungKarakter);

  formKontak.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!kotakPesan || !statusForm) return;

    const isiPesan = kotakPesan.value.trim();
    if (!isiPesan) {
      statusForm.hidden = false;
      statusForm.textContent = "Pesan tidak boleh kosong.";
      kotakPesan.focus();
      return;
    }

    if (isiPesan.length > maksimalKarakter) {
      statusForm.hidden = false;
      statusForm.textContent = `Pesan terlalu panjang (${isiPesan.length}/${maksimalKarakter} karakter).`;
      kotakPesan.focus();
      return;
    }

    const dataForm = new FormData(formKontak);
    const isiEmail = [
      `Nama: ${dataForm.get("nama")}`,
      `Email: ${dataForm.get("email")}`,
      `Nomor HP: ${dataForm.get("hp")}`,
      `Keperluan: ${dataForm.get("keperluan")}`,
      "",
      isiPesan
    ].join("\n");
    const tujuanEmail = "afifsukaujian@gmail.com";
    const subjek = encodeURIComponent(`Pesan portofolio dari ${dataForm.get("nama")}`);

    statusForm.hidden = false;
    statusForm.textContent = "Membuka aplikasi email untuk mengirim pesan.";
    window.location.href = `mailto:${tujuanEmail}?subject=${subjek}&body=${encodeURIComponent(isiEmail)}`;
  });
}

// 1. Daftar keahlian (halaman Beranda), data dari data/keahlian.json
const daftarSkill = document.querySelector("#daftar-skill");
const jumlahSkill = document.querySelector("#jumlah-skill");

async function muatKeahlian() {
  try {
    const response = await fetch("data/keahlian.json");
    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }

    const skills = await response.json();
    daftarSkill?.replaceChildren();
    skills.forEach((skill) => {
      const item = document.createElement("li");
      item.textContent = `${skill.nama} (${skill.level})`;
      daftarSkill?.appendChild(item);
    });

    if (jumlahSkill) {
      jumlahSkill.textContent = `Ada ${skills.length} keahlian yang sedang saya kembangkan.`;
    }
  } catch (error) {
    if (jumlahSkill) {
      jumlahSkill.textContent = "Daftar keahlian gagal dimuat.";
    }
    console.error("Data keahlian gagal dimuat:", error);
  }
}

if (daftarSkill) {
  muatKeahlian();
}

// 4. Daftar proyek (halaman Proyek), data dari data/proyek.json
let proyek = [];
const daftarProyek = document.querySelector("#daftar-proyek");
const jumlahProyek = document.querySelector("#jumlah-proyek");
const filterProyek = document.querySelector("#filter-proyek");

function buatKartu(item) {
  const kartu = document.createElement("article");
  kartu.className = "kartu";

  const label = document.createElement("span");
  label.className = "label";
  label.textContent = item.kategori;

  const judul = document.createElement("h3");
  judul.textContent = item.judul;

  const gambar = document.createElement("img");
  gambar.src = item.gambar;
  gambar.alt = item.alt;
  gambar.width = 280;
  gambar.loading = "lazy";

  const deskripsi = document.createElement("p");
  deskripsi.textContent = item.deskripsi;

  kartu.append(label, judul, gambar, deskripsi);
  return kartu;
}

function tampilkanProyek(kategori = "Semua") {
  if (!daftarProyek || !jumlahProyek) return;

  const proyekTerpilih = kategori === "Semua"
    ? proyek
    : proyek.filter((item) => item.kategori === kategori);

  daftarProyek.replaceChildren(...proyekTerpilih.map(buatKartu));
  jumlahProyek.textContent = `Menampilkan ${proyekTerpilih.length} dari ${proyek.length} proyek.`;

  if (filterProyek) {
    filterProyek.querySelectorAll("button[data-filter]").forEach((tombol) => {
      const aktif = tombol.dataset.filter === kategori;
      tombol.classList.toggle("aktif", aktif);
      tombol.setAttribute("aria-pressed", String(aktif));
    });
  }
}

async function muatProyek() {
  if (daftarProyek && jumlahProyek) {
    jumlahProyek.textContent = "Memuat proyek...";
  }

  try {
    const response = await fetch("data/proyek.json");
    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }
    proyek = await response.json();
    tampilkanProyek("Semua");
  } catch (error) {
    if (daftarProyek) {
      daftarProyek.replaceChildren();
    }
    if (jumlahProyek) {
      jumlahProyek.textContent = "Data proyek gagal dimuat.";
    }
    console.error("Data proyek gagal dimuat:", error);
  }
}

if (daftarProyek && jumlahProyek) {
  muatProyek();
}

filterProyek?.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;

  const tombol = event.target.closest("button[data-filter]");
  if (tombol && filterProyek.contains(tombol)) {
    tampilkanProyek(tombol.dataset.filter);
  }
});

// 5. Repositori GitHub terbaru (halaman Proyek)
const username = "ZakkPi";
const alamatRepo = `https://api.github.com/users/${username}/repos`;
const pilihan = "?per_page=100";
const daftarRepo = document.querySelector("#daftar-repo");
const statusRepo = document.querySelector("#status-repo");

async function ambilRepo() {
  if (!daftarRepo || !statusRepo) return;

  statusRepo.textContent = "Memuat...";
  try {
    const response = await fetch(alamatRepo + pilihan);
    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }

    const repos = (await response.json())
      .sort((a, b) => b.updated_at.localeCompare(a.updated_at))
      .slice(0, 6);
    daftarRepo.replaceChildren();
    repos.forEach((repo) => {
      const item = document.createElement("li");
      const tautan = document.createElement("a");
      tautan.href = repo.html_url;
      tautan.target = "_blank";
      tautan.rel = "noopener";
      tautan.textContent = `${repo.name} (${repo.language || "tanpa bahasa"}, ${repo.stargazers_count || 0} bintang)`;
      item.appendChild(tautan);
      daftarRepo.appendChild(item);
    });

    statusRepo.textContent = `${repos.length} repositori yang terakhir diperbarui:`;
  } catch (error) {
    daftarRepo.replaceChildren();
    statusRepo.textContent = "Maaf, daftar repositori gagal dimuat. Periksa username atau coba lagi nanti.";
    console.error("Data repositori GitHub gagal dimuat:", error);
  }
}

if (daftarRepo) {
  ambilRepo();
}