import React, { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Line } from "react-chartjs-2";
import { Card, CardContent, Typography, MenuItem, Select, Box } from "@mui/material";
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
import Temperature from "../../../assets/temperature.png";

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

  const formattedData = useMemo(() => {
    return diagnosisHistory.map((entry) => ({
      ...entry,
      shortMonth: new Date(
        entry.year,
        new Date().toLocaleString("en-US", { month: "short" }).indexOf(entry.month)
      ).toLocaleString("en-US", { month: "short" }),
    }));
  }, [diagnosisHistory]);

  const [monthsToShow, setMonthsToShow] = useState(6);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(formattedData.slice(-monthsToShow));
  }, [formattedData, monthsToShow]);

  const handleFilterChange = (event) => {
    setMonthsToShow(parseInt(event.target.value, 10));
  };

  const labels = filteredData.map((entry) => `${entry.shortMonth} ${entry.year}`);
  const systolicValues = filteredData.map((entry) => entry.blood_pressure?.systolic?.value || 0);
  const diastolicValues = filteredData.map((entry) => entry.blood_pressure?.diastolic?.value || 0);

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
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Diagnosis History</Typography>

        <Box display="flex" alignItems="center" justifyContent="space-around">
          <Typography>Blood Pressure</Typography>
          <Select value={monthsToShow} onChange={handleFilterChange} sx={{ mb: 2, width: 150, height: 30 }}>
            <MenuItem value={3}>Last 3 Months</MenuItem>
            <MenuItem value={6}>Last 6 Months</MenuItem>
            <MenuItem value={12}>Last 12 Months</MenuItem>
          </Select>
        </Box>

        <Box className="chart-container">
          <Box className="graph-wrapper">
            <Line data={chartData} options={options} />
          </Box>

          <Box className="bp-values">
            <Typography variant="h6" fontWeight={700} mt={2}>{latestEntry?.blood_pressure?.systolic?.value || "N/A"} mmHg</Typography>
            <Typography variant="subtitle1"><ArrowDropUpOutlinedIcon /> Higher than average</Typography>
            <Typography variant="h6" fontWeight={700} mt={2}>{latestEntry?.blood_pressure?.diastolic?.value || "N/A"} mmHg</Typography>
            <Typography variant="subtitle1"><ArrowDropDownOutlinedIcon /> Lower than average</Typography>
          </Box>
        </Box>

        <Box display="flex" justifyContent="space-around">
          {[{
            img: RespiratoryRate, title: "Respiratory Rate", value: latestEntry?.respiratory_rate?.value || "N/A", bg: "#e0f3fa"
          }, {
            img: Temperature, title: "Temperature", value: latestEntry?.temperature?.value || "N/A", bg: "#ffe6e9"
          }, {
            img: HeartRate, title: "Heart Rate", value: latestEntry?.heart_rate?.value || "N/A", bg: "#ffe6e9"
          }].map((metric, index) => (
            <Card key={index} className="metric" sx={{ width: "27%", backgroundColor: metric.bg, borderRadius: 2 }}>
              <img src={metric.img} alt={metric.title} />
              <Typography variant="subtitle1">{metric.title}</Typography>
              <Typography variant="h6">{metric.value} bpm</Typography>
            </Card>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default DiagnosisHistory;