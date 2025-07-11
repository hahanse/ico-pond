import React from 'react';
import '../assets/css/About.css';

// Foto tim
import rafi from '../assets/image/rafi.jpg';
import bayu from '../assets/image/bayu.jpg';
import fakhri from '../assets/image/fakhri.jpg';

// Gambar kolam
import image2 from '../assets/image/image2.jpg';
import image3 from '../assets/image/image3.jpg';
import image4 from '../assets/image/image4.jpg';
import image5 from '../assets/image/image5.jpg';

// GIF kolam
import kolamGif from '../assets/image/gif.gif';

function About() {
  const imageList = [image2, image3, image4, image5];

  const team = [
    { name: 'Rafi Raihan Firdaus', role: 'Front-End', photo: rafi },
    { name: 'Bayu Haikall Salsabil', role: 'Back-End', photo: bayu },
    { name: 'Fakhri Fitra Perdana', role: 'IoT', photo: fakhri },
  ];

  return (
    <div className="about-container">
      <section className="about-top">
        <h2>Tentang Kami</h2>
        <p>
          Kami adalah tim mahasiswa Teknik Telekomunikasi Universitas Telkom yang meneliti sistem
          pemeliharaan dan perlindungan kolam bibit ikan lele berbasis IoT. Sistem ini terintegrasi
          melalui website dan dilengkapi fitur otomatisasi seperti pemberian pakan, pupuk, deteksi
          serta pengusiran hama burung. Tujuan kami adalah membantu peternak mengelola kolam bibit
          ikan lele secara efisien dan real-time.
        </p>
        <div className="image-row">
          {imageList.map((img, idx) => (
            <div key={idx} className="image-box">
              <img src={img} alt={`kolam-${idx}`} />
            </div>
          ))}
        </div>
      </section>

      <section className="about-gif">
      <div className="gif-wrapper">
        <img src={kolamGif} alt="GIF kolam" />
        <div className="gif-caption">
          Implementasi sistem ICo-Pond
        </div>
      </div>
      </section>

      <section className="about-team">
        <h2>Anggota Tim</h2>
        <div className="team-grid">
          {team.map((member, idx) => (
            <div className="team-card" key={idx}>
              <img src={member.photo} alt={member.name} className="team-photo" />
              <h4>{member.name}</h4>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </section>
      
      <section className="about-location">
        <h2>Lokasi Penelitian</h2>
        <p>Bandung Techno Park</p>
        <div className="map-container">
          <iframe
            title="Lokasi Kolam"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.3289824321746!2d107.6277440750442!3d-6.970459993030169!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e9ace29fcd5f%3A0xfa6ffa9182123965!2sBandung%20Techno%20Park!5e0!3m2!1sen!2sid!4v1747387110590!5m2!1sen!2sid"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
}

export default About;
