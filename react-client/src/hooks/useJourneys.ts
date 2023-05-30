import { useMemo, useState, useEffect } from "react";
import { getJourneys } from "../api/getJourneys";

export const useJourneysList = () => {
  const [sortColumn, setSortColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [allJourneys, setJourneys] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchJourneys() {
      try {
        const params = new URLSearchParams({
          page: currentPage.toString(),
          pageSize: pageSize.toString(),
        });
        const response = await getJourneys(params);

        if (!response.ok) {
          throw new Error("Failed to fetch journeys");
        }

        const { journeys: newJourneys, totalPages: totalPagesCount } =
          await response.json();

        setTotalPages(totalPagesCount);
        setJourneys(newJourneys);
        setError(null);
        console.log(newJourneys);
      } catch (error) {
        console.error("Error fetching journeys:", error);
        setError("Failed to fetch journeys");
      }
    }

    fetchJourneys();
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

  const sortedJourneys = useMemo(() => {
    if (sortColumn) {
      const sortedArray = [...allJourneys].sort((a, b) => {
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

    return allJourneys;
  }, [allJourneys, sortColumn, sortDirection]);

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
    allJourneys,
    currentPage,
    totalPages,
    pageSize,
    error,
    handleSort,
    sortedJourneys,
    handlePageSizeChange,
    setCurrentPage,
  };
};
