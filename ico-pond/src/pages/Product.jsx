import React from "react";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import '../dist/css/Product.css';

const activityData = [
  { no: 1, waktu: "6 Mei 2025, 11:00", keterangan: "Terdeteksi gerakan hama burung" },
  { no: 2, waktu: "7 Mei 2025, 12:00", keterangan: "Terdeteksi gerakan hama burung" },
  { no: 3, waktu: "8 Mei 2025, 13:00", keterangan: "Terdeteksi gerakan hama burung" },
  { no: 4, waktu: "8 Mei 2025, 14:00", keterangan: "Terdeteksi gerakan hama burung" },
  { no: 5, waktu: "10 Mei 2025, 15:00", keterangan: "Terdeteksi gerakan hama burung" },
  { no: 6, waktu: "11 Mei 2025, 18:00", keterangan: "Terdeteksi gerakan hama burung" },
  { no: 7, waktu: "12 Mei 2025, 17:00", keterangan: "Terdeteksi gerakan hama burung" },
];

// Nilai pH dari 0–14 (misalnya 7 adalah netral)
const phValue = 7;

const gaugeData = [
  {
    name: "pH",
    value: phValue,
    fill: phValue < 6 ? "#EA4228" : phValue > 8 ? "#5BE12C" : "#F5CD19",
  },
];

const Product = () => {
  return (
    <div className="product-container">
      <h2 className="section-title">Monitoring</h2>
      <div className="gauge-box">
        <h3>pH</h3>
        <ResponsiveContainer width="100%" height={250}>
          <RadialBarChart
            cx="50%"
            cy="100%"
            innerRadius="70%"
            outerRadius="100%"
            startAngle={180}
            endAngle={0}
            data={gaugeData}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 14]}
              angleAxisId={0}
              tick={false}
            />
            <RadialBar
              background
              clockWise
              dataKey="value"
              cornerRadius={20}
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="ph-value">pH: {phValue}</div>
      </div>

      <h2 className="section-title">Riwayat Aktivitas Kolam</h2>
      <div className="log-table">
        <div className="table-header">
          <span>Tabel Log</span>
          <span className="icon">{`</>`}</span>
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
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Product;
