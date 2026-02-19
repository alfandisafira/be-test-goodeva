# Todo App - Test Goodeva

Berikut adalah panduan singkat untuk menginstal dan menjalankan aplikasi Backend (BE) dan Frontend (FE), beserta panduan penggunaan fiturnya.

## ⚙️ Persyaratan Sistem
* **Node.js Version:** 22

---

## 🚀 Cara Menjalankan Aplikasi

### Menjalankan Backend (BE)

1. *Clone* repository dengan menjalankan perintah berikut di terminal/cmd:
   ```bash
   git clone [https://github.com/alfandisafira/test-goodeva.git](https://github.com/alfandisafira/test-goodeva.git)
   ```

2. Masuk ke folder repository yang baru saja di-*clone*.

3. Instal *dependency* dengan menjalankan perintah:
   ```bash
   npm i
   ```

4. Jalankan server Backend dengan perintah:
   ```bash
   npm run start:dev
   ```

### Menjalankan Frontend (FE)

1. Buka tab baru di terminal/cmd, lalu arahkan ke folder repository utama yang telah di-*clone*.

2. Masuk ke folder *client*:
   ```bash
   cd client
   ```

3. Instal *dependency* untuk Frontend dengan menjalankan perintah:
   ```bash
   npm i
   ```

4. Jalankan aplikasi Frontend dengan perintah:
   ```bash
   npm run dev
   ```

---

## 📝 Skenario Penggunaan

Aplikasi ini memiliki beberapa fitur utama yang dapat dicoba:

1. **Menambahkan Todo**
   * Tambahkan todo baru dengan mengetik pada input *"Add new todo title..."*.
   * Jika sudah, klik tombol **Add**.

2. **Mengubah Status Todo**
   * Pada setiap item todo yang tampil, terdapat opsi untuk status todo.
   * Ubah status dengan memilih opsi status yang tersedia langsung pada item todo tersebut.

3. **Mencari Todo**
   * Masukkan judul yang ingin dicari pada input *"Search todo title..."*.
   * Todo yang sesuai akan otomatis muncul berdasarkan judul yang dicari.