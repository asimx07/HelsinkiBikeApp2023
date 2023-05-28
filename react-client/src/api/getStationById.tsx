export const getStationByID = async (id: string) => {
  try {
    console.log(id);
    const response = await fetch(`http://localhost:3000/station/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch stations");
    }

    return response;
  } catch (error) {
    console.error("Error fetching stations:", error);
    throw error;
  }
};
