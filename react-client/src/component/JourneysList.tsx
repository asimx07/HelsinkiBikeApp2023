import React, { useEffect, useState } from "react";
import { getJourneys } from "../api/getJourneys";
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
  IconButton,
} from "@mui/material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import { styles } from "../styles/tableStyles";
const APP_URL = import.meta.env.VITE_PUBLIC_URL;
import { useJourneysList } from "../hooks/useJourneys";

interface Column {
  id:
    | "departureStationName"
    | "returnStationName"
    | "durationInSeconds"
    | "coveredDistanceInMeters";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
  sortable?: boolean;
}

const columns: readonly Column[] = [
  {
    id: "departureStationName",
    label: "Departure Station",
    minWidth: 200,
  },
  { id: "returnStationName", label: "Return Station", minWidth: 200 },
  {
    id: "durationInSeconds",
    label: "Journey Duration (Minutes)",
    minWidth: 100,
    format: (value: number) => (value / 60).toFixed(2),
    sortable: true,
  },
  {
    id: "coveredDistanceInMeters",
    label: "Journey Distance (KMs)",
    minWidth: 100,
    format: (value: number) => (value / 1000).toFixed(2),
    sortable: true,
  },
];

export const JourneysList = () => {
  const {
    sortColumn,
    sortDirection,
    allJourneys,
    currentPage,
    totalPages,
    pageSize,
    error,
    handleSort,
    sortedJourneys,
    handlePageSizeChange,
    setCurrentPage,
  } = useJourneysList();
  const renderSortIcon = (columnId: string) => {
    // Check if the column is sortable
    const sortableColumn = columns.find(
      (column) => column.id === columnId && column.sortable
    );
    if (sortableColumn) {
      // Render the sort icon based on the sort direction
      return sortDirection === "asc" ? (
        <ArrowUpward fontSize="small" />
      ) : (
        <ArrowDownward fontSize="small" />
      );
    }

    return null;
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
              variant="h"
              align="center"
              style={{ color: "#fff", padding: "50px" }}
            >
              Oops :( something is broken. Please return to Home.
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
                      onClick={() => column.sortable && handleSort(column.id)}
                    >
                      {column.label}
                      {column.sortable && (
                        <IconButton
                          size="small"
                          disabled={!column.sortable}
                          color="inherit"
                        >
                          {renderSortIcon(column.id)}
                        </IconButton>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedJourneys.map((row) => (
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
