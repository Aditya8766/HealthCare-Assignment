import React, { useState, useMemo } from "react";
import { fetchPatientData } from "../../../api";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import "./diagnostic-list.scss";

const DiagnosticList = () => {
  const { data, error } = useQuery({
    queryKey: ["patientData"],
    queryFn: fetchPatientData,
  });

  const [months] = useState(12);
  const patientData = useMemo(
    () => (Array.isArray(data) ? data : data?.patients || []),
    [data]
  );

  const patient = useMemo(
    () => patientData.find((p) => p?.name === "Jessica Taylor"),
    [patientData]
  );

  if (error) return <Typography color="error">Error loading data</Typography>;
  if (!patient) return <Typography>No data found for Jessica Taylor</Typography>;

  const filteredDiagnostics = patient.diagnostic_list?.slice(0, months) || [];

  return (
    <Box className="patients__info">
      <Card>
        <CardContent>
          <Typography variant="h6">Diagnostic List</Typography>

          {filteredDiagnostics.length > 0 ? (
            <TableContainer
              component={Paper}
              className="diagnostic-table"
              sx={{ maxHeight: 300, overflowY: "scroll" }}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Problem Diagnostic</strong></TableCell>
                    <TableCell><strong>Description</strong></TableCell>
                    <TableCell><strong>Status</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredDiagnostics.map((item, index) => (
                    <TableRow key={index} className="hover-row">
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{item.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography>No Diagnostic List Available</Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default DiagnosticList;