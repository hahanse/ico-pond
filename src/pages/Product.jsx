import React, { useState, useEffect } from "react";
import GaugeChart from "react-gauge-chart";
import io from "socket.io-client";
import "../assets/css/Product.css";

const socket = io("http://localhost:3000");

const initialPakanData = [
  { no: 1, waktu: "5 Mei 2025, 10:00", keterangan: "Pemberian pakan otomatis" },
  { no: 2, waktu: "6 Mei 2025, 09:30", keterangan: "Pemberian pupuk cair" },
  { no: 3, waktu: "7 Mei 2025, 08:45", keterangan: "Pemberian pakan manual" },
  { no: 4, waktu: "9 Mei 2025, 10:15", keterangan: "Pemberian pupuk organik" },
];

const Product = () => {
  const [activeTab, setActiveTab] = useState("hama");
  const [phValue, setPhValue] = useState(7);
  const [hamaData, setHamaData] = useState([]);
  const [pakanData] = useState(initialPakanData);

  useEffect(() => {
    // Ambil 10 gambar terbaru saat load
    fetch("http://localhost:3000/")
      .then((response) => response.json())
      .then((data) => {
        if (data.imageUrls && data.imageUrls.length > 0) {
          const formattedData = data.imageUrls.slice(0, 10).map((item, index) => ({
            no: index + 1,
            waktu: new Date(item.timestamp).toLocaleString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }),
            keterangan: "Terdeteksi gerakan hama",
            imageUrl: item.url,
          }));
          setHamaData(formattedData);
        }
      })
      .catch((error) => console.error("Error fetching images:", error));

    // Dengar update pH
    socket.on("phUpdate", (newPhValue) => {
      console.log("pH diterima dari server:", newPhValue);
      setPhValue(newPhValue);
    });

    // Dengar gambar baru
    socket.on("newImageUrl", (data) => {
      const { url, timestamp } = data;
      const newData = {
        no: 1,
        waktu: new Date(timestamp).toLocaleString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        keterangan: "Terdeteksi gerakan hama",
        imageUrl: url,
      };

      setHamaData((prev) => {
        const updated = [newData, ...prev].slice(0, 10);
        return updated.map((item, index) => ({ ...item, no: index + 1 }));
      });
    });

    return () => {
      socket.off("phUpdate");
      socket.off("newImageUrl");
    };
  }, []);

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
          nrOfLevels={500}
          arcsLength={[0.2, 0.2, 0.2, 0.2, 0.2]}
          colors={["#ff0000", "#ffa500", "#00ff00", "#00bfff", "#800080"]}
          percent={phValue / 14}
          arcPadding={0.01}
          cornerRadius={3}
          textColor="#000"
          needleColor="#90ee90"
          needleBaseColor="#90ee90"
          formatTextValue={() => `${phValue.toFixed(2)} pH`}
        />
        <div className="ph-labels">
          <span style={{ color: "#ff0000" }}>Sangat Asam</span>
          <span style={{ color: "#ffa500" }}>Asam</span>
          <span style={{ color: "#00ff00" }}>Netral</span>
          <span style={{ color: "#00bfff" }}>Basa</span>
          <span style={{ color: "#800080" }}>Sangat Basa</span>
        </div>
      </div>

      <h2 className="section-title mt-8">Riwayat Aktivitas Kolam</h2>

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

      <div className="log-table">
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
            {activityData.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {activeTab === "hama"
                    ? "Belum ada deteksi hama"
                    : "Belum ada riwayat pakan atau pupuk"}
                </td>
              </tr>
            ) : (
              activityData.map((row) => (
                <tr key={row.no}>
                  <td>{row.no}</td>
                  <td>{row.waktu}</td>
                  <td>{row.keterangan}</td>
                  <td>
                    {activeTab === "hama" && row.imageUrl ? (
                      <img
                        src={row.imageUrl}
                        alt="Hama"
                        style={{ width: "100px", borderRadius: "6px" }}
                      />
                    ) : activeTab === "pakan" ? (
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        Peringatan: Periksa pakan atau pupuk!
                      </span>
                    ) : null}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Product;
