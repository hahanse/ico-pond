import React from 'react';
import '../assets/css/About.css';
import rafi from '../assets/image/rafi.jpg';
import bayu from '../assets/image/bayu.jpg';
import fakhri from '../assets/image/fakhri.jpg';


function About() {
  const imageList = [
    'image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg'
  ];

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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
        <img src="kolam-animation.gif" alt="GIF kolam" />
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
    </div>
  );
}

export default About;