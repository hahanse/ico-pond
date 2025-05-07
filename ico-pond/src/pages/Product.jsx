import React, { useState } from "react";
import GaugeChart from "react-gauge-chart";
import "../assets/css/Product.css";

const hamaData = [
  { no: 1, waktu: "6 Mei 2025, 11:00", keterangan: "Terdeteksi gerakan hama burung" },
  { no: 2, waktu: "7 Mei 2025, 12:00", keterangan: "Terdeteksi gerakan hama burung" },
  { no: 3, waktu: "8 Mei 2025, 13:00", keterangan: "Terdeteksi gerakan hama burung" },
  { no: 4, waktu: "8 Mei 2025, 14:00", keterangan: "Terdeteksi gerakan hama burung" },
  { no: 5, waktu: "10 Mei 2025, 15:00", keterangan: "Terdeteksi gerakan hama burung" },
  { no: 6, waktu: "11 Mei 2025, 18:00", keterangan: "Terdeteksi gerakan hama burung" },
  { no: 7, waktu: "12 Mei 2025, 17:00", keterangan: "Terdeteksi gerakan hama burung" },
];

const pakanData = [
  { no: 1, waktu: "5 Mei 2025, 10:00", keterangan: "Pemberian pakan otomatis" },
  { no: 2, waktu: "6 Mei 2025, 09:30", keterangan: "Pemberian pupuk cair" },
  { no: 3, waktu: "7 Mei 2025, 08:45", keterangan: "Pemberian pakan manual" },
  { no: 4, waktu: "9 Mei 2025, 10:15", keterangan: "Pemberian pupuk organik" },
];

const Product = () => {
  const [activeTab, setActiveTab] = useState("hama");
  const phValue = 4.9;
  const activityData = activeTab === "hama" ? hamaData : pakanData;

  return (
    <div className="product-container">
      <div className="text-center my-6">
        <h2 className="section-title text-2xl font-bold mb-4">Monitoring</h2>
      </div>

      <div className="gauge-box">
        <h3 className="gauge-title">pH</h3>
        <GaugeChart
          id="ph-gauge"
          nrOfLevels={420}
          arcsLength={[3/14, 3/14, 2.5/14, 2.5/14, 3/14]}
          colors={["#ff0000", "#ffff00", "#00ff00", "#0000ff", "#800080"]}
          percent={phValue / 14}
          arcPadding={0.01}
          cornerRadius={3}
          textColor="#000"
          needleColor="#90ee90"
          needleBaseColor="#90ee90"
          formatTextValue={() => `${phValue} pH`}
        />
      </div>

      <h2 className="section-title mt-8">Riwayat Aktivitas Kolam</h2>

      {/* Tombol pindah tab */}
      <div className="button-group">
        <button
          className={`tab-button ${activeTab === "hama" ? "active" : ""}`}
          onClick={() => setActiveTab("hama")}
        >
          Deteksi Hama Burung
        </button>
        <button
          className={`tab-button ${activeTab === "pakan" ? "active" : ""}`}
          onClick={() => setActiveTab("pakan")}
        >
          Cek Pakan & Pupuk
        </button>
      </div>

      {/* Tabel log */}
      <div className="log-table">
        <div className="table-header">
        </div>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Waktu</th>
              <th>Keterangan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {activityData.map((row) => (
              <tr key={row.no}>
                <td>{row.no}</td>
                <td>{row.waktu}</td>
                <td>{row.keterangan}</td>
                <td>-</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Product;
