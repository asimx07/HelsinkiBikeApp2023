import { Link } from "react-router-dom";
import Header from "./Header";
import { styles } from "../styles/tableStyles";
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
import { useStationsList } from "../hooks/useStations.ts";
import { useNavigate } from "react-router-dom";

import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

const APP_URL = import.meta.env.VITE_PUBLIC_URL;

interface Column {
  id: "ID" | "Name" | "Adress" | "Kaupunki" | "Operaattor" | "Kapasiteet";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
  sortable?: boolean;
}

const columns: readonly Column[] = [
  {
    id: "ID",
    label: "Station ID",
    minWidth: 200,
    sortable: true,
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
    sortable: true,
  },
];

export const StationsList = () => {
  const navigate = useNavigate();

  const {
    sortDirection,
    currentPage,
    totalPages,
    pageSize,
    error,
    handleSort,
    sortedStations,
    handlePageSizeChange,
    setCurrentPage,
  } = useStationsList();
  const handleAddStation = () => {
    navigate("/station/create");
  };

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
        <Container sx={styles.root}>
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

      <Container sx={styles.root}>
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
                {sortedStations.map((row) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row._id}
                    component={Link}
                    to={`${APP_URL}/station/${row.ID}`}
                  >
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
            data-testid="rows-per-page"
            style={styles.tableFooter}
            rowsPerPageOptions={[5, 10, 15, 50]}
            component="div"
            count={totalPages}
            rowsPerPage={pageSize}
            page={currentPage - 1}
            onPageChange={(_event: any, newPage: number) =>
              setCurrentPage(newPage + 1)
            }
            onRowsPerPageChange={handlePageSizeChange}
            ActionsComponent={() => (
              <IconButton onClick={handleAddStation}>
                <AddCircleOutlineOutlinedIcon
                  sx={{ color: "#fff", fontSize: "2rem" }}
                />
              </IconButton>
            )}
          />
        </Paper>
      </Container>
    </>
  );
};
