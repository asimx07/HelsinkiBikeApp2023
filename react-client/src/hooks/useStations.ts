import { useMemo, useState, useEffect } from "react";
import { getStations } from "../api/getStations";

export const useStationsList = () => {
  const [sortColumn, setSortColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [allStations, setStations] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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
        setError(null);
      } catch (error) {
        console.error("Error fetching stations:", error);
        setError("Failed to fetch stations");
      } finally {
        setLoading(false);
      }
    }

    fetchStations();
  }, [currentPage, pageSize]);

  const handleSort = (columnId: string) => {
    if (sortColumn === columnId) {
      setSortDirection((prevDirection) =>
        prevDirection === "asc" ? "desc" : "asc"
      );
    } else {
      setSortColumn(columnId);
      setSortDirection("asc");
    }
  };

  const sortedStations = useMemo(() => {
    if (sortColumn) {
      const sortedArray = [...allStations].sort((a, b) => {
        const valueA = a[sortColumn];
        const valueB = b[sortColumn];

        if (valueA < valueB) {
          return sortDirection === "asc" ? -1 : 1;
        }
        if (valueA > valueB) {
          return sortDirection === "asc" ? 1 : -1;
        }
        return 0;
      });

      return sortedArray;
    }

    return allStations;
  }, [allStations, sortColumn, sortDirection]);

  const handlePageSizeChange = (
    event: React.ChangeEvent<{ value: string }>
  ) => {
    const newPageSize = parseInt(event.target.value, 10);

    setPageSize(newPageSize);
    setCurrentPage(1);
  };

  return {
    sortColumn,
    sortDirection,
    allStations,
    currentPage,
    totalPages,
    pageSize,
    error,
    loading,
    handleSort,
    sortedStations,
    handlePageSizeChange,
    setCurrentPage,
  };
};
