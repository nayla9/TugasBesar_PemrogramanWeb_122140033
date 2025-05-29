# Judul website = CaféFinder.ID

# Deskripsi
CaféFinder.ID adalah sebuah platform website yang menyediakan informasi lengkap tentang kafe-kafe yang ada di Bandar Lampung. Di dalamnya user dapat dengan mudah menemukan kafe berdasarkan lokasi, jam operasional, rating, ataupun ulasannya. Website ini juga memberikan fitur review yang memungkinkan pengguna untuk menambahkan ulasan serta rating pada kafe yang ada.

# Backend
- `pyramid`
- `pyramid_jwt`
- `sqlalchemy`
- `passlib`
- `waitress`
- `marshmallow`
- `bycrypt`
- `

  ## instalasi backend
  mkdir backend
  cd backend
  python -m venv venv
  venv\Scripts\activate
  pip install -r requirements.txt
  pserve development.ini --reload
  

# Frontend (React)
- react
- react-dom
- react-router-dom
- axios
- bootstrap
- classnames

## inisialisasi frontend
mkdir frontend
cd frontend
npm install
npm start

# Fitur Aplikasi
Autentikasi Pengguna: Fitur registrasi dan login menggunakan JSON Web Token (JWT).
Manajemen Café (untuk role admin): Tambah café baru, edit informasi café, dan hapus café (CRUD).
Review Pengguna: Pengguna bisa memberikan ulasan berupa komentar dan rating pada café.
Detail Café: Tampilan lengkap informasi café: nama, lokasi, jam buka, deskripsi, dan gambar.
Tampilan Responsif: Desain menggunakan Bootstrap sehingga mendukung tampilan di berbagai ukuran layar.
Dashboard Admin: Halaman khusus untuk mengelola data café secara efisien.
