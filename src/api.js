import credentials from "./credentials";

const getAuthHeader = () => {
  const encodedAuth = btoa(`${credentials.USERNAME}:${credentials.PASSWORD}`);
  return { Authorization: `Basic ${encodedAuth}` };
};

export const fetchPatientData = async () => {
  try {
    const response = await fetch(credentials.API_URL, {
      method: "GET",
      headers: getAuthHeader(),
    });

    if (!response.ok) throw new Error("Failed to fetch patient data");

    return await response.json();
  } catch (error) {
    console.error("Error fetching patient data:", error);
    throw error;
  }
};
