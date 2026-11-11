// JavaScript portofolio Himawan Ibnu Afif Muzakki

const skills = [
  { nama: "HTML dasar", level: "Sedang dipelajari" },
  { nama: "Mengetik cepat", level: "Dasar" },
  { nama: "Video editing", level: "Dasar" },
  { nama: "Fotografi", level: "Dasar" },
  { nama: "Videografi", level: "Dasar" }
];

const daftarSkill = document.querySelector("#daftar-skill");
const jumlahSkill = document.querySelector("#jumlah-skill");

if (daftarSkill && jumlahSkill) {
  const daftarItemSkill = skills.map((skill) => {
    const item = document.createElement("li");
    item.textContent = `${skill.nama} (${skill.level})`;
    return item;
  });

  daftarSkill.replaceChildren(...daftarItemSkill);
  jumlahSkill.textContent = `Ada ${skills.length} keahlian yang sedang saya kembangkan.`;
}

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

const proyek = [
  {
    judul: "Halaman Profil Pertama",
    kategori: "HTML",
    gambar: "img/Halamanertama.png",
    alt: "Tangkapan layar halaman profil pertama",
    deskripsi: "Halaman perkenalan diri yang dibuat dengan HTML."
  },
  {
    judul: "Form Kontak",
    kategori: "HTML",
    gambar: "img/TabelKontak.png",
    alt: "Tangkapan layar halaman form kontak",
    deskripsi: "Form kontak dengan isian nama, email, nomor HP, dan pesan."
  },
  {
    judul: "Jadwal Belajar",
    kategori: "HTML",
    gambar: "img/JadwalBelajar.png",
    alt: "Tangkapan layar tabel jadwal belajar",
    deskripsi: "Tabel jadwal belajar mingguan yang dibuat dengan HTML."
  },
  {
    judul: "Portofolio Responsif",
    kategori: "CSS",
    gambar: "img/portofolio.png",
    alt: "Tangkapan layar portofolio responsif",
    deskripsi: "Halaman portofolio dengan tata letak dan gaya CSS responsif."
  },
  {
    judul: "Latihan JavaScript Dasar",
    kategori: "JavaScript",
    gambar: "img/latihan1JS.png",
    alt: "Tangkapan layar hasil latihan JavaScript dasar di console",
    deskripsi: "Hasil latihan variabel, kondisi, dan fungsi JavaScript."
  },
  {
    judul: "Latihan Logika JavaScript",
    kategori: "JavaScript",
    gambar: "img/logikaJS.png",
    alt: "Tangkapan layar hasil lima latihan logika JavaScript di console",
    deskripsi: "Hasil lima latihan fungsi logika JavaScript di console."
  }
];

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

if (daftarProyek && jumlahProyek) {
  tampilkanProyek();
}

filterProyek?.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;

  const tombol = event.target.closest("button[data-filter]");
  if (tombol && filterProyek.contains(tombol)) {
    tampilkanProyek(tombol.dataset.filter);
  }
});
