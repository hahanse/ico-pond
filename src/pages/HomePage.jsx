import React from 'react';
import '../assets/css/HomePage.css';

//foto deskripsi singkat
import image2 from '../assets/image/image2.jpg';

// foto bagian manfaat
import pakan from '../assets/image/pakan.png';
import usir from '../assets/image/usir.png';
import sistem from '../assets/image/sistem.png';

//foto keunggulan
import kembangbiak from '../assets/image/kembangbiak.png';
import manusia from '../assets/image/manusia.png';
import pemantauan from '../assets/image/pemantauan.png';
import pemeliharaan from '../assets/image/pemeliharaan.png';
import perlindungan from '../assets/image/perlindungan.png';

function HomePage() {
  const features = [
    {
      title: 'Pakan & Pupuk Otomatis',
      desc: 'Pemberian pakan dan pupuk secara teratur sesuai kondisi lingkungan, menstabilkan keseimbangan nutrisi dan efisiensi pemeliharaan.',
      photo: pakan
    },
    {
      title: 'Anti Hama Burung',
      desc: 'Pengusiran hama burung secara otomatis. Melindungi kolam dari hama burung, menjaga lingkungan kolam tetap aman tanpa pengusiran manual.',
      photo: usir
    },
    {
      title: 'Riwayat Sistem Otomatis',
      desc: 'Mencatat riwayat aktivitas kolam secara otomatis melalui sistem sensor akurat dan informatif.',
      photo: sistem
    },
  ];

  const icons = [
    {
      image: pemeliharaan,
      text: 'Pemeliharaan Otomatis'
    },
    {
      image: pemantauan,
      text: 'Pemantauan Jarak Jauh'
    },
    {
      image: kembangbiak,
      text: 'Pengaturan Lingkungan Kolam Ideal'
    },
    {
      image: perlindungan, 
      text: 'Perlindungan Otomatis'
    },
    {
      image: manusia,
      text: 'Efisiensi Tenaga Kerja'
    },
  ];

  return (
    <div className="container">
      <section className="hero">
        <div className="hero-text">
          <h1>Sistem Pemeliharaan dan Perlindungan Otomatis.</h1>
          <h2>Tidak Perlu Secara Manual!</h2>
          <p>
            Pemantau perawatan kolam dengan aplikasi kami. Ketika peternak panen otomatis & sistem pemeliharaan ikan secara efisien,
            sistem pintar kami memberikan pengalaman yang lancar dan aman, kapan saja, di mana saja.
          </p>
        </div>
        <div className="hero-image">
          <img src={image2} alt="ICo-Pond Preview" className="hero-image" />
        </div>
      </section>

      <section className="features">
        <p className="subtitle">Kenapa menggunakan ICo-Pond?</p>
        <h2>Manfaat Ico-Pond sebagai pemantauan kolam peternak</h2>
        <div className="feature-cards">
          {features.map((item, idx) => (
            <div className="card" key={idx}>
              <img src={item.photo} alt={item.title} className="feature-icon" />
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="future">
        <h2>Masa Depan Bersama ICo-Pond</h2>
        <div className="icon-grid">
          {icons.map((item, idx) => (
            <div className="icon-item" key={idx}>
              <img src={item.image} alt={item.text} />
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;