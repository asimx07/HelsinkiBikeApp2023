export const getStations = async (params: any) => {
  return await fetch(`http://localhost:3000/stations?${params}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
};
