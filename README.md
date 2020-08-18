<h1 align="center">Selamat datang di Restaurant Finder! 👋</h1>

## Apa itu Restaurant Finder?

Web Restaurant Finder yang dibuat oleh <a href="https://github.com/adhiariyadi"> Adhi Ariyadi </a>. **Restaurant Finder adalah Website untuk mencari restaurant dan reviewnya melalui website dengan mudah.**

## Fitur apa saja yang tersedia di Restaurant Finder?

- Show all restaurans
- Add restaurant
- Update restaurant
- Delete restaurant
- Detail restaurant
- Show reviews
- Add review

## Release Date

**Release date : 17 Aug 2020**

> Restaurant Finder merupakan project open source yang dibuat oleh Adhi Ariyadi. Kalian dapat download/fork/clone. Cukup beri stars di project ini agar memberiku semangat. Terima kasih!

---

## Install

1. **Clone Repository**

```bash
git clone https://github.com/adhiariyadi/Restaurant-Finder-PERN.git
cd Restaurant-Finder-PERN
```

2. **Jalankan Server Restaurant Finder**

- _Instalasi website_

```bash
cd server
npm install
```

- _Install <a href="https://www.enterprisedb.com/downloads/postgres-postgresql-downloads">PostgreSQL</a>_

- _Membuat Database Dan Table_

```bash
// membuat database restaurant
create database db_restaurant

// membuat tale restaurants
CREATE TABLE restaurants (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location TEXT NOT NULL,
    price INT NOT NULL CHECK(price >= 1 and price <= 5)
);

// membuat tale reviews
CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL CHECK(rating >= 1 and rating <= 5)
);
```

- _Buka `.env` lalu ubah baris berikut sesuai dengan databasemu yang ingin dipakai_

```bash
PORT=3005
PGHOST="localhost"
PGUSER="postgres"
PGDATABASE="db_restaurant"
PGPASSWORD="root"
PGPORT=5432
```

- _Jalankan website_

```bash
npm start
```

2. **Jalankan Client Restaurant Finder**

- _Instalasi website_

```bash
cd client
npm install
```

- _Jalankan website_

```bash
npm start
```

## Author

- Facebook : <a href="https://web.facebook.com/adhiariyadi.me/"> Adhi Ariyadi</a>
- LinkedIn : <a href="https://www.linkedin.com/in/adhiariyadi/"> Adhi Ariyadi</a>

## Contributing

Contributions, issues and feature requests di persilahkan.
Jangan ragu untuk memeriksa halaman masalah jika Anda ingin berkontribusi. **Berhubung Project ini saya sudah selesaikan sendiri, namun banyak fitur yang kalian dapat tambahkan silahkan berkontribusi yaa!**

## License

- Copyright © 2020 Adhi Ariyadi.
- **Restaurant Finder is open-sourced software licensed under the MIT license.**
