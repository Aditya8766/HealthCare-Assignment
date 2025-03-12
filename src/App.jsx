import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import Navbar from "./components/navbar/Navbar";
import PatientsProfile from "./components/dashboard/patients-profile/PatientProfile";
import PatientList from "./components/dashboard/patients-list/PatientsList";
import DiagnosisHistory from "./components/dashboard/diagnosis-history/DiagnosisHistory";
import DiagnosticList from "./components/dashboard/diagnostic-list/DiagnosticList";
import './app.css';

const queryClient = new QueryClient();

const App = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);

  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <div className="container">
        <PatientsProfile selectedPatient={selectedPatient} />
        <PatientList setSelectedPatient={setSelectedPatient} />

        <div className="diagnosis-section">
          <DiagnosisHistory />
          <DiagnosticList />
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default App;
