const API_URL = "https://fedskillstest.coalitiontechnologies.workers.dev";

const getAuthHeader = () => {
  const username = "coalition";
  const password = "skills-test";
  const encodedAuth = btoa(`${username}:${password}`); 
  return `Basic ${encodedAuth}`;
};

export const fetchPatientData = async () => {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      Authorization: getAuthHeader(),
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch patient data");
  }

  return response.json();
};
