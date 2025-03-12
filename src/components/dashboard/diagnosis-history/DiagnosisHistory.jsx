import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Line } from "react-chartjs-2";
import { Card, CardContent, Typography, MenuItem, Select } from "@mui/material";
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./diagnosis-history.scss";
import { fetchPatientData } from "../../../api";
import RespiratoryRate from "../../../assets/respiratory_rate.png";
import HeartRate from "../../../assets/HeartBPM.png";
import Tempreture from "../../../assets/temperature.png";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DiagnosisHistory = () => {
  const { data, error } = useQuery({
    queryKey: ["patientData"],
    queryFn: fetchPatientData,
  });

  if (error) return <Typography color="error">Error loading data</Typography>;

  const patientData = Array.isArray(data) ? data : [];
  const diagnosisHistory = patientData[0]?.diagnosis_history || [];

  const formattedData = diagnosisHistory.map((entry) => ({
    ...entry,
    shortMonth: new Date(
      entry.year,
      new Date()
        .toLocaleString("en-US", { month: "short" })
        .indexOf(entry.month)
    ).toLocaleString("en-US", { month: "short" }),
  }));

  const [monthsToShow, setMonthsToShow] = useState(6);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(formattedData.slice(-monthsToShow));
  }, [formattedData, monthsToShow]);

  const handleFilterChange = (event) => {
    setMonthsToShow(parseInt(event.target.value, 10));
  };

  const labels = filteredData.map(
    (entry) => `${entry.shortMonth} ${entry.year}`
  );
  const systolicValues = filteredData.map(
    (entry) => entry.blood_pressure?.systolic?.value || 0
  );
  const diastolicValues = filteredData.map(
    (entry) => entry.blood_pressure?.diastolic?.value || 0
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "Systolic Pressure (mmHg)",
        data: systolicValues,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 2,
        pointRadius: 4,
        tension: 0.5,
      },
      {
        label: "Diastolic Pressure (mmHg)",
        data: diastolicValues,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderWidth: 2,
        pointRadius: 4,
        tension: 0.5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: { display: true, text: "Blood Pressure (mmHg)" },
      },
      x: {
        title: { display: true, text: "Month & Year" },
      },
    },
  };

  const latestEntry = diagnosisHistory.at(-1);

  return (
    <Card className="diagnosis-history">
      <CardContent>
        <Typography
          variant="h6"
          style={{ fontWeight: "600", marginBottom: "1rem" }}
        >
          Diagnosis History
        </Typography>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Typography>Blood Pressure</Typography>
          <Select
            value={monthsToShow}
            onChange={handleFilterChange}
            style={{ marginBottom: "10px", width: "150px", height: "30px" }}
          >
            <MenuItem value={3}>Last 3 Months</MenuItem>
            <MenuItem value={6}>Last 6 Months</MenuItem>
            <MenuItem value={12}>Last 12 Months</MenuItem>
          </Select>
        </div>

        <div className="chart-container">
          <div className="graph-wrapper">
            <Line data={chartData} options={options} />
          </div>

          <div className="bp-values">
            <Typography
              variant="h6"
              style={{
                fontWeight: "700",
                marginTop: "1rem",
                marginRight: "1.9rem"
              }}
            >
              {latestEntry?.blood_pressure?.systolic?.value || "N/A"} mmHg
            </Typography>
            <Typography
              variant="subtitle1"
            >
              <ArrowDropUpOutlinedIcon />
              Higher than average
            </Typography>

            <Typography
              variant="h6"
              style={{
                fontWeight: "700",
                marginTop: "1rem",
                marginRight: "1.9rem"
              }}
            >
              {latestEntry?.blood_pressure?.diastolic?.value || "N/A"} mmHg
            </Typography>
            <Typography
              variant="subtitle1"
            >
              <ArrowDropDownOutlinedIcon />
              Lower than average
            </Typography>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Card
            item
            xs={4}
            className="metric"
            sx={{
              width: "27%",
              backgroundColor: "#e0f3fa",
              borderRadius: "11px",
            }}
          >
            <img
              src={RespiratoryRate}
              alt="Respiratory Rate"
              style={{ marginLeft: "1rem", marginTop: "1rem" }}
            />
            <Typography variant="subtitle1" style={{ marginLeft: "0.5rem" }}>
              Respiratory Rate
            </Typography>
            <Typography
              variant="h6"
              style={{ fontWeight: "700", marginLeft: "0.5rem" }}
            >
              {latestEntry?.respiratory_rate?.value || "N/A"} bpm
            </Typography>
            <Typography
              className={`status ${
                latestEntry?.respiratory_rate?.levels?.toLowerCase() ||
                "unknown"
              }`}
              style={{ marginLeft: "0.5rem" }}
            >
              {latestEntry?.respiratory_rate?.levels || "Unknown"}
            </Typography>
          </Card>

          <Card
            item
            xs={4}
            className="metric"
            sx={{
              width: "27%",
              backgroundColor: "#ffe6e9",
              borderRadius: "11px",
            }}
          >
            <img
              src={Tempreture}
              alt="Temperature"
              style={{ marginLeft: "1rem", marginTop: "1rem" }}
            />
            <Typography variant="subtitle1" style={{ marginLeft: "0.5rem" }}>
              Temperature
            </Typography>
            <Typography
              variant="h6"
              style={{ fontWeight: "700", marginLeft: "0.5rem" }}
            >
              {latestEntry?.temperature?.value || "N/A"}°C
            </Typography>
            <Typography
              className={`status ${
                latestEntry?.temperature?.levels?.toLowerCase() || "unknown"
              }`}
              style={{ marginLeft: "0.5rem" ,fontSize:14}}
            >
              {latestEntry?.temperature?.levels || "Unknown"}
            </Typography>
          </Card>

          <Card
            item
            xs={4}
            className="metric"
            sx={{
              width: "27%",
              backgroundColor: "#ffe6e9",
              borderRadius: "11px",
            }}
          >
            <img
              src={HeartRate}
              alt="Heart Rate"
              style={{ marginLeft: "1rem", marginTop: "1rem" }}
            />
            <Typography variant="subtitle1" style={{ marginLeft: "0.5rem" ,fontSize:14}}>
              Heart Rate
            </Typography>
            <Typography
              variant="h6"
              style={{ fontWeight: "700", marginLeft: "0.5rem" }}
            >
              {latestEntry?.heart_rate?.value || "N/A"} bpm
            </Typography>
            <Typography
              className={`status ${
                latestEntry?.heart_rate?.levels?.toLowerCase() || "unknown"
              }`}
              style={{ marginLeft: "0.5rem", display:"flex", alignItems:"center", fontSize:14}}
            >
              <ArrowDropDownOutlinedIcon/>{latestEntry?.heart_rate?.levels || "Unknown"}
            </Typography>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default DiagnosisHistory;
