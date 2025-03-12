import React, { useState } from "react";
import {
  Avatar,
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Button,
} from "@mui/material";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import EventIcon from "@mui/icons-material/EventOutlined";
import GppGoodIcon from "@mui/icons-material/GppGoodOutlined";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/FemaleOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import "./patients.scss";

const PatientsProfile = ({ selectedPatient }) => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  if (!selectedPatient)
    return <Typography>Select a patient to view details</Typography>;

  const renderDetail = (label, Icon, value) => (
    <Box className="patient-detail">
      <Typography>{label}</Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Icon
          sx={{
            backgroundColor: "#f6f7f8",
            borderRadius: "50%",
            padding: "4px",
            color: "black",
          }}
        />
        <Typography>{value || "N/A"}</Typography>
      </Box>
    </Box>
  );

  return (
    <div className="patients">
      <Box className="patients__list">
        <Card>
          <CardContent>
            <Box className="patients__image" display="flex" justifyContent="center">
              <Avatar
                src={selectedPatient.profile_picture}
                alt={selectedPatient.name}
                sx={{ height: "150px", width: "150px" }}
              />
            </Box>
            <Typography variant="h6" align="center">
              {selectedPatient.name}
            </Typography>

            {renderDetail("Date Of Birth", EventIcon, `${selectedPatient.age} years old`)}
            {renderDetail("Gender", selectedPatient.gender === "Male" ? MaleIcon : FemaleIcon, selectedPatient.gender)}
            {renderDetail("Contact Info", PhoneOutlinedIcon, selectedPatient.phone_number)}
            {renderDetail("Emergency Contacts", PhoneOutlinedIcon, selectedPatient.emergency_contact)}
            {renderDetail("Insurance Provider", GppGoodIcon, selectedPatient.insurance_type)}

            {showMoreInfo && (
              <>
                {renderDetail("Address", EventIcon, selectedPatient.address)}
                {renderDetail("Medical History", GppGoodIcon, selectedPatient.medical_history)}
              </>
            )}

            {!showMoreInfo && (
              <Box mt={2} textAlign="center">
                <Button 
                  variant="contained"
                  sx={{ borderRadius: "20px", color: "black", background: "#01F0D0" }}
                  onClick={() => setShowMoreInfo(true)}
                >
                  Show All Information
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>

      <Box className="patients__lab-results">
        <Card>
          <CardContent>
            <Typography variant="h6">Lab Results</Typography>
            {Array.isArray(selectedPatient.lab_results) &&
            selectedPatient.lab_results.length > 0 ? (
              selectedPatient.lab_results.map((result, index) => (
                <Box
                  key={index}
                  className="lab-result-item"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 0",
                  }}
                >
                  <Typography>{result}</Typography>
                  <IconButton sx={{ color: "black" }}>
                    <FileDownloadOutlinedIcon />
                  </IconButton>
                </Box>
              ))
            ) : (
              <Typography>No Lab Results Available</Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default PatientsProfile;
