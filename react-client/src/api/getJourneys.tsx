export const getJourneys = async (params: any) => {
  try {
    const response = await fetch(`http://localhost:3000/journey?${params}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch journeys");
    }

    return response;
  } catch (error) {
    console.error("Error fetching journeys:", error);
    throw error;
  }
};
