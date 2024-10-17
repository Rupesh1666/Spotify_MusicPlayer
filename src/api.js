const API_URL = 'https://cms.samespace.com/items/songs';

export const fetchSongs = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched songs data:", data); // Log the response data
        return data; // Ensure this is an array
    } catch (error) {
        console.error("Error fetching songs:", error);
        return []; // Return an empty array in case of error
    }
};
