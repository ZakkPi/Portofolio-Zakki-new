// Latihan JavaScript Dasar - Minggu 06
// Kalkulator nilai rapor di console

// 1. Pesan pertama ke Console
console.log("Halo, saya Himawan Ibnu Afif Muzakki!");
console.log("Ini latihan JavaScript pertamaku.");

// 2. Data siswa
const nama = "Himawan Ibnu Afif Muzakki"
const kelas = "X RPL 1"
const kkm = 75;
let nilaiTugas = 85;
let nilaiUts = 78
let nilaiUas = 89
let kehadiran = 90;

console.log(`Nama: ${nama}, kelas: ${kelas}`);
console.log(`Nilai tugas ${nilaiTugas}, UTS ${nilaiUts}, UAS ${nilaiUas}`);

// 3. Hasil nilai Zakki
const rataRata = (nilaiTugas + nilaiUts + nilaiUas) / 3;
const lulus = rataRata >= kkm;
const dapatSertifikat = lulus && kehadiran >= 80;
console.log(`Rata-rata nilai: ${rataRata}`);
console.log(`lulus KKM: ${lulus}`);
console.log(`Dapat sertifikat: ${dapatSertifikat}`);

let nilai = 95;

// Predikat dengan if, else if, dan else
let predikatNilai;

if (rataRata >= 90) {
    predikatNilai = "A";
} else if (rataRata >= 80) {
    predikatNilai = "B"
} else if (rataRata >= 70) {
    predikatNilai = "C"
} else {
    predikatNilai = "D"
}

console.log(`Predikat: ${predikatNilai}`);

// Pesan kelulusan
if (lulus) {
    console.log("Selamat kamu lulus KKM!");
} else {
    console.log("Tetap semangat, ikuti remedial ya.");
}

function predikat(nilai) {
    if (nilai >= 90) {
        return "A";
    } else if (nilai >= 80) {
        return "B";
    } else if (nilai >= 70) {
        return "C";
    }

    return "D";
}

function rapor(namaSiswa, tugas, uts, uas) {
    const rataRataNilai = (tugas + uts + uas) / 3;
    return `Rapor ${namaSiswa}: rata-rata ${rataRataNilai.toFixed(2)}, predikat ${predikat(rataRataNilai)}`;
}

// 5. Menguji fungsi predikat dengan beberapa nilai
console.log(`predikat (95) = ${predikat (95)}`); // A
console.log(`predikat (90) = ${predikat (90)}`); // A, tepat di batas
console.log(`predikat (84) = ${predikat (84)}`); // B
console.log(`predikat (70) = ${predikat (70)}`); // c
console.log(`predikat (69) = ${predikat (69)}`); // D

// 6. Rapor beberapa siswa
console.log(rapor("Zakki", 85, 78, 89));
console.log(rapor("Dywina", 92, 88, 96));
console.log(rapor("Adam", 70, 65, 72));
