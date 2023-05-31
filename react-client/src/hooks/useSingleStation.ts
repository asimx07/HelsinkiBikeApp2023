import { useState, useEffect } from "react";
import { getStationByID } from "../api/getStationById";
import { useParams } from "react-router-dom";

export const useSingleStation = () => {
  const { id } = useParams();
  const [station, setStation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStation = async (id: string) => {
      try {
        const response = await getStationByID(id);
        const stationData = await response.json();
        setStation(stationData);
      } catch (err) {
        setError("Failed to fetch station data.");
      } finally {
        setLoading(false);
      }
    };

    fetchStation(id || "");
  }, [id]);

  return { station, loading, error };
};
