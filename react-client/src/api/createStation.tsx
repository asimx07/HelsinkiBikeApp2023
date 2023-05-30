export const createStation = async (params: any) => {
  try {
    const response = await fetch(`http://localhost:3000/station`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { statusCode: 500, error: "Failed to save Station" };
  }
};
