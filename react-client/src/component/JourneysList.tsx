import React, { useEffect, useState } from "react";
import { getJourneys } from "../api/getJourneys";
import "../styles/JourneysList.css";
export const JourneysList = () => {
  const [allJourneys, setJourneys] = useState<
    {
      durationInSeconds: number;
      returnStationName: string;
      departureStationName: string;
      coveredDistanceInMeters: number;
      _id: string;
    }[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setTotalPages] = useState(1);
  const pageSize = 30;

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
  }, [currentPage, pageCount]);
  //const totalPages = Math.ceil(journeys.length / pageSize);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, pageCount));
    console.log("next");
  };
  return (
    <div className="journeys-container">
      <table className="journeys-table">
        <thead>
          <tr justify-content="space-between">
            <th>Departure Station Name</th>
            <th>Return Station Name</th>
            <th>Duration (in minutes)</th>
            <th>Covered Distance (in kilometers)</th>
          </tr>
        </thead>
        <tbody>
          {allJourneys.map((journey) => (
            <tr key={journey._id}>
              <td>{journey.departureStationName}</td>
              <td>{journey.returnStationName}</td>
              <td>{(journey.durationInSeconds / 60).toFixed(3)}</td>
              <td>{(journey.coveredDistanceInMeters / 1000).toFixed(3)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-container">
        <button
          className="page-button"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{currentPage}</span>
        <button
          className="page-button"
          onClick={handleNextPage}
          disabled={currentPage === pageCount}
        >
          Next
        </button>
        <div>{pageCount}</div>
      </div>
    </div>
  );
};
