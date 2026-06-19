import { Meme } from "./types";
import { User, Experience } from "./types/types";

const API_URL = "/api";
const MEME_API_URL = "https://justmeme.wtf/api/v1/random";
const KANYE_API_URL = "https://api.kanye.rest/";

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(`${API_URL}/users`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const fetchExperiences = async (): Promise<Experience[]> => {
  try {
    console.log("Fetchinf experience");
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const response = await fetch(`${API_URL}/experiences`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching experiences:", error);
    throw error;
  }
};

export const fetchRandomMeme = async (): Promise<Meme> => {
  try {
    const res = await fetch(`${MEME_API_URL}`);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching experiences:", error);
    throw error;
  }
};

export const fetchKayneQuote = async (): Promise<{ quote: string }> => {
  try {
    const res = await fetch(`${KANYE_API_URL}`);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching experiences:", error);
    throw error;
  }
};
