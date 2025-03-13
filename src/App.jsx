import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Box } from "@mui/material";
import Navbar from "./components/navbar/Navbar";
import PatientsProfile from "./components/dashboard/patients-profile/PatientProfile";
import PatientList from "./components/dashboard/patients-list/PatientsList";
import DiagnosisHistory from "./components/dashboard/diagnosis-history/DiagnosisHistory";
import DiagnosticList from "./components/dashboard/diagnostic-list/DiagnosticList";
import './app.scss';

const queryClient = new QueryClient();

const App = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);

  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Box className="container">
        <PatientsProfile selectedPatient={selectedPatient} />
        <PatientList setSelectedPatient={setSelectedPatient} />

        <Box className="diagnosis-section">
          <DiagnosisHistory />
          <DiagnosticList />
        </Box>
      </Box>
    </QueryClientProvider>
  );
};

export default App;
