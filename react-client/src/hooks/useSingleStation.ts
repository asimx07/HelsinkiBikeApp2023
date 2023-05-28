import { useState, useEffect } from "react";
import { getStationByID } from "../api/getStationById";
import { useParams } from "react-router-dom";

export const useSingleStation = () => {
  const { id } = useParams<{ id: string }>();
  const [station, setStation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStation = async () => {
      try {
        const response = await getStationByID(id);
        const stationData = await response.json();
        setStation(stationData);
        console.log(stationData);
      } catch (err) {
        setError("Failed to fetch station data.");
      } finally {
        setLoading(false);
      }
    };

    fetchStation();
  }, [id]);

  return { station, loading, error };
};
