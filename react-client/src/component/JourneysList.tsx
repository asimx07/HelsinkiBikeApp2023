import React, { useEffect, useState } from "react";
import { getJourneys } from "../api/getJourneys";
import "../styles/JourneysList.css";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Header from "./Header";
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
    minWidth: 200,
    format: (value: number) => (value / 60).toFixed(2),
  },
  {
    id: "coveredDistanceInMeters",
    label: "Journey Distance (KMs)",
    minWidth: 200,
    format: (value: number) => (value / 1000).toFixed(2),
  },
];

export const JourneysList = () => {
  const [allJourneys, setJourneys] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Dynamic page size

  useEffect(() => {
    async function fetchJourneys() {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        pageSize: pageSize.toString(),
      });
      const response = await getJourneys(params);
      const { journeys: newJourneys, totalPages: totalPagesCount } =
        await response.json();

      setTotalPages(totalPagesCount);
      setJourneys(newJourneys);
      console.log(newJourneys);
    }

    fetchJourneys();
  }, [currentPage, pageSize]);
  const handlePageSizeChange = (
    event: React.ChangeEvent<{ value: string }>
  ) => {
    const newPageSize = parseInt(event.target.value, 10);
    const newTotalPages = Math.ceil(allJourneys.length / newPageSize);

    setPageSize(newPageSize);
    setTotalPages(newTotalPages);
    setCurrentPage(1);
  };

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {allJourneys.map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
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
    </>
  );
};
