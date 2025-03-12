import React, { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  TextField,
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
} from "@mui/material";
import "./patients-list.scss";
import { fetchPatientData } from "../../../api";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const PatientList = ({ setSelectedPatient }) => {
  const { data, error } = useQuery({
    queryKey: ["patientData"],
    queryFn: fetchPatientData,
  });

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedPatient, setLocalSelectedPatient] = useState(null);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    if (data) {
      const patientList = Array.isArray(data) ? data : data?.patients || [];
      const defaultPatient =
        patientList.find((p) => p.name === "Jessica Taylor") || patientList[0];
      setSelectedPatient(defaultPatient);
      setLocalSelectedPatient(defaultPatient);
    }
  }, [data, setSelectedPatient]);

  if (error) return <Typography color="error">Error loading data</Typography>;

  const patientData = Array.isArray(data) ? data : data?.patients || [];
  const filteredPatients = patientData.filter((patient) =>
    patient.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const toggleSearch = useCallback(() => {
    setIsSearchVisible((prev) => !prev);
    setSearch("");
    setDebouncedSearch("");
  }, []);

  return (
    <Card className="patient-list">
      <div style={{ display: "flex", alignItems: "center" }}>
        <h1 style={{ position: "relative", left: "1rem" }}>Patients</h1>

        <SearchOutlinedIcon
          style={{ marginLeft: "11rem", cursor: "pointer" }}
          onClick={toggleSearch}
        />
      </div>

      <CardContent className="patient-container">
        {isSearchVisible && (
          <TextField
            label="Search Patients"
            variant="outlined"
            fullWidth
            style={{ marginBottom: "2rem" }}
            className="search-bar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        )}

        <Box className="patient-records">
          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient, index) => (
                <Box
                key={index}
                className={`patients-row ${
                  selectedPatient?.id === patient.id ? "selected" : ""
                }`}
                onClick={() => {
                  setSelectedPatient(patient);
                  setLocalSelectedPatient(patient);
                }}
              >
                <Box className="patient-item">
                  <Avatar
                    src={patient.profile_picture}
                    alt={patient.name}
                    className="avatar"
                  />
                  <Box className="patient-info">
                    <Typography variant="h6">{patient.name}</Typography>
                    <Typography variant="body2">
                      {patient.gender}, {patient.age}
                    </Typography>
                  </Box>
                </Box>
                <MoreHorizOutlinedIcon className="horizontal-dots-icon" />
              </Box>
              
            ))
          ) : (
            <Typography>No patients found</Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default PatientList;
