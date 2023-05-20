export const getJourneys = async (params: any) => {
  return await fetch(`http://localhost:3000/journey?${params}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
};
