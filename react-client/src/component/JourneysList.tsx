import React, { useEffect, useState } from "react";
import { getJourneys } from "../api/getJourneys";
export const JourneysList = () => {
  const [journeys, setJourneys] = useState<
    {
      durationInSeconds: number;
      returnStationName: string;
      departureStationName: string;
      coveredDistanceInMeters: number;
      _id: string;
    }[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  useEffect(() => {
    async function fetchJourneys() {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        pageSize: pageSize.toString(),
      });
      const response = await getJourneys(params);
      const newJourneys = await response.json();
      setJourneys(newJourneys);
      console.log(newJourneys);
    }

    fetchJourneys();
  }, [currentPage]);
  //const totalPages = Math.ceil(journeys.length / pageSize);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, 100));
    console.log("next");
  };
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Departure Station Name</th>
            <th>Return Station Name</th>
            <th>Duration (in minutes)</th>
            <th>Covered Distance (in kilometers)</th>
          </tr>
        </thead>
        <tbody>
          {journeys.map((journey) => (
            <tr key={journey._id}>
              <td>{journey.departureStationName}</td>
              <td>{journey.returnStationName}</td>
              <td>{(journey.durationInSeconds / 60).toFixed(3)}</td>
              <td>{(journey.coveredDistanceInMeters / 1000).toFixed(3)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{currentPage}</span>
        <button onClick={handleNextPage} disabled={currentPage === 100}>
          Next
        </button>
      </div>
    </div>
  );
};
