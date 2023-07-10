let cachedData = null;

export async function fetchBrawlers() {
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await fetch("https://api.brawlapi.com/v1/brawlers");
    const data = await response.json();
    cachedData = data;
    return cachedData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
