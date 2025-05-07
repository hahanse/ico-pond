import React from 'react';
import '../assets/css/HomePage.css';
import pakan from '../assets/image/pakan.png';
import usir from '../assets/image/usir.png';
import sistem from '../assets/image/sistem.png';

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

  const items = new Array(6).fill('akjhasdklhajkhasd');

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
        <div className="hero-image" />
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
          {items.map((text, idx) => (
            <div className="icon-item" key={idx}>
              <div className="icon-placeholder"></div>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;