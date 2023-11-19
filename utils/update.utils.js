import Developer from "../models/developer.models.js";
import { fetchRepos, fetchUserData } from "./fetch.utils.js";

export const updateViewCount = async (id, currViewCount) => {
  try {
    await Developer.findOneAndUpdate({ id }, { view_count: ++currViewCount });
    return true;
  } catch (err) {
    return false;
  }
};

export const updateDeveloperProfile = async (github_id) => {
  try {
    const userData = await fetchUserData(github_id);
    const repoData = await fetchRepos(github_id);
    const repos = [];
    for (let repo of repoData.data) {
      let { name, html_url, description, updated_at } = repo;
      repos.push({ name, html_url, description, updated_at });
    }
    let { name, avatar_url, bio, company, email, location } = userData.data;
    if (!name) name = github_id;
    await Developer.findOneAndUpdate(
      { id: github_id },
      {
        name,
        avatar_url,
        bio,
        company,
        email,
        location,
        repos,
      }
    );
    console.log(`Developer profile updated for ${github_id}`);
  } catch (error) {
    console.error(
      `Error updating developer profile for ${github_id}: ${error.message}`
    );
  }
};
