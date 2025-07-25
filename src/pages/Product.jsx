import React, { useState, useEffect } from "react";
import GaugeChart from "react-gauge-chart";
import io from "socket.io-client";
import "../assets/css/Product.css";

const socket = io("https://deployta-production-2a69.up.railway.app/");


const Product = () => {
  const [activeTab, setActiveTab] = useState("hama");
  const [phValue, setPhValue] = useState(7);
  const [hamaData, setHamaData] = useState([]);
  const [pakanData, setPakanData] = useState([]);
  const [fullscreenImg, setFullscreenImg] = useState(null);

  const openFullscreen = (imgSrc) => setFullscreenImg(imgSrc);
  const closeFullscreen = () => setFullscreenImg(null);

  const [currentPage, setCurrentPage] = useState(1); // halaman aktif
  const itemsPerPage = 10; // jumlah item per halaman

  useEffect(() => {
    const savedHama = localStorage.getItem("hamaData");
    if (savedHama) {
      const parsed = JSON.parse(savedHama).map(item => ({
        ...item,
        keterangan: "Terdeteksi makhluk hidup dekat kolam"
      }));
      setHamaData(parsed);
      localStorage.setItem("hamaData", JSON.stringify(parsed)); // Simpan hasil yang sudah diperbarui

    }

    const fetchHamaData = () => {
      fetch("https://deployta-production-2a69.up.railway.app/")
        .then((res) => res.json())
        .then((data) => {
          if (data.imageUrls?.length > 0) {
            const formatted = data.imageUrls.slice(0, 100).map((item, index) => ({
              no: index + 1,
              waktu: new Date(item.timestamp).toLocaleString("id-ID", {
                day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit",
              }),
              keterangan: "Terdeteksi ada mahluk hidup dekat kolam",
              imageUrl: item.url,
            }));
            setHamaData(formatted);
            localStorage.setItem("hamaData", JSON.stringify(formatted));
          }
        })
        .catch((err) => console.error("Gagal fetch gambar:", err));
    };
    fetchHamaData();
    if (savedHama) {
      setHamaData(JSON.parse(savedHama));
    } else {
      fetchHamaData();
    }

    fetch("https://log-servo-default-rtdb.firebaseio.com/servoLogs.json")
    .then((res) => res.json())
    .then((firebaseData) => {
      const entries = Object.values(firebaseData || {});
      const formatted = entries
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .map((item, index) => {
          let keterangan = "";
          let aksi = "";
  
          if (item.jenis === "pakan") {
            keterangan = "Pakan telah diberikan";
            aksi = "Servo pemberi pakan berjalan";
          } else if (item.jenis === "pupuk") {
            keterangan = "Pupuk telah diberikan";
            aksi = "Servo pemberi pupuk berjalan";
          } else if (item.status === "hujan") {
            keterangan = "Peringatan: hujan terdeteksi";
            aksi = "pemberian pakan ditunda";
          } else if (item.status === "tidak") {
            keterangan = "Hujan telah berhenti";
            aksi = "pemberian pakan dapat dilanjutkan";
          }
  
          return {
            no: index + 1,
            waktu: new Date(item.timestamp).toLocaleString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
            keterangan,
            aksi,
          };
        })
        .slice(0, 100); // Batasi data sampai 100 item
  
    
      setPakanData(formatted);
      localStorage.setItem("pakanData", JSON.stringify(formatted));
    })
    .catch(() => {
      setPakanData(initialPakanData);
      localStorage.setItem("pakanData", JSON.stringify(initialPakanData));
    });
  

    const interval = setInterval(fetchHamaData, 5 * 60 * 1000);

    socket.on("phUpdate", (newPhValue) => {
      setPhValue(newPhValue);
    });

    socket.on("newImageUrl", ({ url, timestamp }) => {
      const newData = {
        no: 1,
        waktu: new Date(timestamp).toLocaleString("id-ID", {
          day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit",
        }),
        keterangan: "Terdeteksi ada mahluk hidup dekat kolam",
        imageUrl: url,
      };

      setHamaData((prev) => {
        const updated = [newData, ...prev].slice(0, 100).map((item, index) => ({ ...item, no: index + 1 }));
        localStorage.setItem("hamaData", JSON.stringify(updated));
        return updated;
      });
    });

    socket.on("servoLog", () => {
      fetch("https://log-servo-default-rtdb.firebaseio.com/servoLogs.json")
        .then((res) => res.json())
        .then((firebaseData) => {
          const entries = Object.values(firebaseData || {});
          const formatted = entries
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .map((item, index) => ({
              no: index + 1,
              waktu: new Date(item.timestamp).toLocaleString("id-ID", {
                day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit",
              }),
              keterangan: item.jenis === "pakan" ? "Pakan telah diberikan" : "Pupuk telah diberikan",
              aksi: item.jenis === "pakan" ? "Servo pemberi pakan berjalan" : "Servo pemberi pupuk berjalan",
            }));
          setPakanData(formatted);
        });
    });
    // Tambahan: Terima event peringatan hujan
    socket.on("curahHujanUpdate", (status) => {
      const waktu = new Date().toLocaleString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    
      if (status.toLowerCase() === "hujan") {
        const newLog = {
          no: 1,
          waktu,
          keterangan: "Peringatan: hujan terdeteksi",
          aksi: "pemberian pakan ditunda",
        };
    
        setPakanData((prev) => {
          const updated = [newLog, ...prev].slice(0, 100).map((item, index) => ({ ...item, no: index + 1 }));
          
          return updated;
        });
      } else if (status.toLowerCase() === "tidak") {
        const newLog = {
          no: 1,
          waktu,
          keterangan: "Hujan telah berhenti",
          aksi: "pemberian pakan dapat dilanjutkan",
        };
    
        setPakanData((prev) => {
          const updated = [newLog, ...prev].slice(0, 100).map((item, index) => ({ ...item, no: index + 1 }));
          
          return updated;
        });
      }
    });
    

    return () => {
      clearInterval(interval);
      socket.off("phUpdate");
      socket.off("newImageUrl");
      socket.off("servoLog");
      socket.off("curahHujanUpdate");
    };
  }, []);

  // Pilih data sesuai tab aktif
  const activityData = activeTab === "hama" ? hamaData : pakanData;

  // PAGINATION logic
  const sortedData = [...activityData];
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = sortedData
    .slice(startIndex, endIndex)
    .map((item, index) => ({
      ...item,
      no: startIndex + index + 1
    }));
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  return (
    <div className="product-container">
      <div className="text-center my-6">
        <h2 className="section-title text-2xl font-bold mb-4">Monitoring</h2>
      </div>

      <div className="gauge-section">
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
            formatTextValue={() => `${phValue.toFixed(2)}`}
          />
          <div className="ph-labels">
            <span style={{ color: "#ff0000" }}>Sangat Asam</span>
            <span style={{ color: "#ffa500" }}>Asam</span>
            <span style={{ color: "#00ff00" }}>Netral</span>
            <span style={{ color: "#00bfff" }}>Basa</span>
            <span style={{ color: "#800080" }}>Sangat Basa</span>
          </div>
        </div>

        <div className="ph-legend">
          <div className="legend-item"><span className="legend-color" style={{ backgroundColor: "#ff0000" }}></span>2–4</div>
          <div className="legend-item"><span className="legend-color" style={{ backgroundColor: "#ffa500" }}></span>4–6</div>
          <div className="legend-item"><span className="legend-color" style={{ backgroundColor: "#00ff00" }}></span>6–8</div>
          <div className="legend-item"><span className="legend-color" style={{ backgroundColor: "#00bfff" }}></span>8–10</div>
          <div className="legend-item"><span className="legend-color" style={{ backgroundColor: "#800080" }}></span>10–12</div>
        </div>
      </div>

      <h2 className="section-title mt-8">Riwayat Aktivitas Kolam</h2>

       <div className="button-group">
        <button
          className={`tab-button ${activeTab === "hama" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("hama");
            setCurrentPage(1);
          }}
        >
          Deteksi Hama Burung
        </button>
        <button
          className={`tab-button ${activeTab === "pakan" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("pakan");
            setCurrentPage(1);
          }}
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
              {activeTab === "pakan" && <th>Aksi</th>}
              {activeTab === "hama" && <th>Gambar</th>}
            </tr>
          </thead>
          <tbody>
            {activityData.length === 0 && (
              <tr>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  Tidak ada data
                </td>
              </tr>
            )}
            {paginatedData.map((row) => (
              <tr key={row.no}>
                <td>{row.no}</td>
                <td>{row.waktu}</td>
                <td>{row.keterangan}</td>
                {activeTab === "pakan" && (
                  <td style={{ textAlign: "center" }}>{row.aksi}</td>
                )}

                {activeTab === "hama" && (
                  <td style={{ textAlign: "center" }}>
                    {row.imageUrl ? (
                      <img
                        src={row.imageUrl}
                        alt="Hama"
                        className="table-image"
                        onClick={() => openFullscreen(row.imageUrl)}
                      />
                    ) : (
                      ""
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`tab-button ${currentPage === i + 1 ? "active" : ""}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}


      {fullscreenImg && (
          <div className="fullscreen-overlay" onClick={closeFullscreen}>
            <button className="close-btn" onClick={closeFullscreen}>×</button>
            <img src={fullscreenImg} alt="Fullscreen" className="fullscreen-img"/>
          </div>
        )}
    </div>
  </div>
  );
};

export default Product;
