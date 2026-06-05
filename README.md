# Manajemen Produk DummyJSON

Aplikasi web satu halaman (Single Page Application - SPA) sederhana yang dibuat menggunakan **Vanilla JavaScript** (ES6+) dan **Fetch API**. Aplikasi ini mensimulasikan operasi CRUD (Create, Read, Update, Delete) menggunakan mock API dari [DummyJSON](https://dummyjson.com).

## Fitur
1. **Melihat Daftar Produk**: Memuat dan menampilkan daftar produk secara asinkron dari API saat halaman pertama kali dibuka.
2. **Tambah Produk (POST)**: Menambahkan data produk baru. Data balikan dari server akan langsung ditambahkan ke tampilan layar (DOM) secara dinamis tanpa reload halaman.
3. **Edit Produk (PUT)**: Mengubah nama atau harga produk yang ada dan memperbarui tampilan UI secara dinamis berdasar respons terbaru dari server.
4. **Hapus Produk (DELETE)**: Menghapus produk. Jika operasi sukses, elemen akan langsung terhapus dari UI tanpa memicu reload halaman.
5. **Error Handling & Notifikasi**: Menampilkan *Toast Notification* yang informatif saat operasi berhasil maupun ketika terjadi kegagalan jaringan atau HTTP error.
6. **Desain Modern**: Antarmuka modern menggunakan efek glassmorphism, mode gelap (dark mode), grid layout dan animasi CSS.

> **Catatan Penting**: DummyJSON adalah layanan mock API. Perubahan yang dilakukan (Tambah, Edit, Hapus) akan disimulasikan berhasil (dan merespons dengan struktur data yang sesuai), tetapi tidak tersimpan secara permanen di server mereka. Me-refresh halaman akan mengembalikan data ke kondisi data default mereka. Aplikasi ini difokuskan pada manipulasi DOM dan logika HTTP Request di sisi klien (keduanya berfungsi 100%).

## Teknologi yang Digunakan
- **HTML5**: Struktur kerangka (Semantic HTML)
- **CSS3**: Gaya visual (Custom Properties, CSS Grid, Flexbox, Keyframes Animation, Glassmorphism UI)
- **Vanilla JavaScript**: `async/await`, Fetch API, Manipulasi DOM dinamis, Error Handling `try...catch`

## Cara Menjalankan Aplikasi
Karena ini adalah murni HTML, CSS, dan JavaScript statis (Front-end Vanilla), Anda tidak memerlukan instalasi backend apapun.

1. Buka folder proyek ini (`dummyjson-crud`).
2. Buka (double click) file `index.html` menggunakan web browser modern apa pun (seperti Google Chrome, Mozilla Firefox, Microsoft Edge, atau Safari).
3. (Opsional) Untuk pengalaman terbaik, Anda juga dapat membukanya menggunakan ekstensi **Live Server** (di VS Code) agar file dihidangkan melalui server HTTP lokal (misal: `http://127.0.0.1:5500`).

## Struktur File
- `index.html` : Struktur kerangka halaman UI utama.
- `style.css` : Gaya dan desain halaman (styling, layout, animasi).
- `app.js` : Logika utama aplikasi (Fetch API request dan pembaruan DOM).

## Ketentuan Tambahan (Tugas)
Sesuai instruksi:
- Dilarang hanya menggunakan HTTP Method 'GET' (aplikasi ini menggunakan POST, PUT, DELETE, dan GET).
- Wajib menggunakan `async/await` alih-alih promise `.then()`.
- Wajib menerapkan Error Handling dengan `try...catch`.
- Perubahan DOM harus terjadi secara dinamis (tanpa reload browser).
