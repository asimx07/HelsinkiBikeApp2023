import React, { useEffect, useState } from "react";
import { getStations } from "../api/getStations";
import Header from "./Header";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Container,
  Typography,
  CssBaseline,
} from "@mui/material";

const APP_URL = import.meta.env.VITE_PUBLIC_URL;

const styles = {
  root: {
    minHeight: "100vh",
    minWidth: "100vw",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),url(${
      APP_URL + "/src/assets/bg.jpg"
    })`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "top-right",
    display: "flex",
    textAlign: "center",
  },
  headerContainer: {
    position: "absolute",
    top: 0,
    width: "100%",
    background: "rgba(0,0,0,0)",
  },
  tableCell: {
    backgroundColor: "#000",
    color: "#fff",
  },
  tableCellText: {
    color: "#fff",
    fontSize: "1rem",
  },
  paper: {
    marginTop: "100px",
    width: "100%",
    overflow: "auto",
    backgroundColor: "#0000006e",
  },
  tableContainer: {
    maxHeight: 450,
    display: "flex",
  },
  tableFooter: {
    color: "#fff",
    fontSize: "1rem",
  },
};

interface Column {
  id: "ID" | "Name" | "Adress" | "Kaupunki" | "Operaattor" | "Kapasiteet";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  {
    id: "ID",
    label: "Station ID",
    minWidth: 200,
  },
  { id: "Name", label: "Station Name", minWidth: 200 },
  {
    id: "Adress",
    label: "Station Address",
    minWidth: 200,
  },
  {
    id: "Kaupunki",
    label: "City",
    minWidth: 200,
  },
  {
    id: "Operaattor",
    label: "Operator",
    minWidth: 200,
  },
  {
    id: "Kapasiteet",
    label: "Capacity",
    minWidth: 200,
  },
];

export const StationsList = () => {
  const [allStations, setStations] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Dynamic page size
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStations() {
      try {
        const params = new URLSearchParams({
          page: currentPage.toString(),
          pageSize: pageSize.toString(),
        });
        const response = await getStations(params);

        if (!response.ok) {
          throw new Error("Failed to fetch stations");
        }

        const { stations: newStations, totalPages: totalPagesCount } =
          await response.json();

        setTotalPages(totalPagesCount);
        setStations(newStations);
        setError(null); // Reset error if fetching was successful
        console.log(newStations);
      } catch (error) {
        // Handle the error
        console.error("Error fetching stations:", error);
        setError("Failed to fetch stations");
      }
    }

    fetchStations();
  }, [currentPage, pageSize]);

  const handlePageSizeChange = (
    event: React.ChangeEvent<{ value: string }>
  ) => {
    const newPageSize = parseInt(event.target.value, 10);
    const newTotalPages = Math.ceil(allStations.length / newPageSize);

    setPageSize(newPageSize);
    setTotalPages(newTotalPages);
    setCurrentPage(1);
  };

  if (error) {
    return (
      <>
        <CssBaseline />
        <Container style={styles.root}>
          <Header />
          <Paper
            sx={{
              marginTop: "100px",
              width: "100%",
              overflow: "hidden",
              backgroundColor: "#0000006e",
            }}
          >
            <Typography
              variant="h5"
              align="center"
              style={{ color: "#fff", padding: "50px" }}
            >
              Oops :( something is broken. Please Return to Home
            </Typography>
          </Paper>
        </Container>
      </>
    );
  }
  return (
    <>
      <CssBaseline />

      <Container style={styles.root}>
        <Header />

        <Paper sx={styles.paper}>
          <TableContainer sx={styles.tableContainer}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        ...styles.tableCell,
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {allStations.map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          sx={styles.tableCellText}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            style={styles.tableFooter}
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={pageSize * totalPages}
            rowsPerPage={pageSize}
            page={currentPage - 1}
            onPageChange={(event: any, newPage: number) =>
              setCurrentPage(newPage + 1)
            }
            onRowsPerPageChange={handlePageSizeChange}
          />
        </Paper>
      </Container>
    </>
  );
};
