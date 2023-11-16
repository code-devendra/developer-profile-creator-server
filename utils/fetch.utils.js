import axios from "axios";
const GITHUB_BASE_URL = "https://api.github.com/users";
export const fetchUserData = async (userId) => {
  const fetchUrl = `${GITHUB_BASE_URL}/${userId}`;
  const result = await axios.get(fetchUrl);
  return result;
};

export const fetchRepos = async (userId) => {
  const fetchUrl = `${GITHUB_BASE_URL}/${userId}/repos`;
  const result = await axios.get(fetchUrl);
  return result;
};
