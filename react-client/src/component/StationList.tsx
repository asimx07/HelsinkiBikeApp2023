import React, { useEffect, useState } from "react";
import { getStations } from "../api/getStations";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import theme from "../styles/theme";

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

export const StationList = () => {
  const [allStations, setStations] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Dynamic page size

  useEffect(() => {
    async function fetchStations() {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        pageSize: pageSize.toString(),
      });
      const response = await getStations(params);
      const { stations: newStations, totalPages: totalPagesCount } =
        await response.json();

      setTotalPages(totalPagesCount);
      setStations(newStations);
      console.log(newStations);
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

  return (
    <>
      <Paper className="table-paper">
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
              {allStations.map((row) => (
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
