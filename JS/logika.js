// Soal 1
console.log("Soal 1: ganjil atau genap");
function ganjilGenap(angka) {
  if (angka % 2 === 0) {
    return "genap";
  } else {
    return "ganjil";
  }
}
console.log("ganjilGenap(7) = " + ganjilGenap(7));
console.log("ganjilGenap(12) = " + ganjilGenap(12));
console.log("ganjilGenap(0) = " + ganjilGenap(0));

// Soal 2
console.log("Soal 2: konversi suhu");
const celsiusKeFahrenheit = (celsius) => {
  return (celsius * 9 / 5) + 32;
};
console.log("celsiusKeFahrenheit(0) = " + celsiusKeFahrenheit(0));
console.log("celsiusKeFahrenheit(100) = " + celsiusKeFahrenheit(100));
console.log("celsiusKeFahrenheit(-40) = " + celsiusKeFahrenheit(-40));

// Soal 3
console.log("Soal 3: nilai terbesar");
function nilaiTerbesar(a, b, c) {
  if (a >= b && a >= c) {
    return a;
  } else if (b >= a && b >= c) {
    return b;
  } else {
    return c;
  }
}
console.log("nilaiTerbesar(5, 9, 2) = " + nilaiTerbesar(5, 9, 2));
console.log("nilaiTerbesar(80, 75, 80) = " + nilaiTerbesar(80, 75, 80));
console.log("nilaiTerbesar(-3, -7, -1) = " + nilaiTerbesar(-3, -7, -1));

// Soal 4
console.log("Soal 4: tahun kabisat");
function tahunKabisat(tahun) {
  if ((tahun % 4 === 0 && tahun % 100 !== 0) || (tahun % 400 === 0)) {
    return true;
  } else {
    return false;
  }
}
console.log("tahunKabisat(2024) = " + tahunKabisat(2024));
console.log("tahunKabisat(2026) = " + tahunKabisat(2026));
console.log("tahunKabisat(1900) = " + tahunKabisat(1900));
console.log("tahunKabisat(2000) = " + tahunKabisat(2000));

// Soal 5
console.log("Soal 5: diskon belanja");
function hargaSetelahDiskon(totalBelanja) {
  if (totalBelanja >= 200000) {
    return totalBelanja * 0.8;
  } else if (totalBelanja >= 100000) {
    return totalBelanja * 0.9;
  } else {
    return totalBelanja;
  }
}
console.log("hargaSetelahDiskon(250000) = " + hargaSetelahDiskon(250000));
console.log("hargaSetelahDiskon(100000) = " + hargaSetelahDiskon(100000));
console.log("hargaSetelahDiskon(75000) = " + hargaSetelahDiskon(75000));