import http from "http";
import Developer from "../models/developer.models.js";
import { fetchRepos, fetchUserData } from "../utils/fetch.utils.js";
import { updateViewCount } from "../utils/update.utils.js";

// GET ALL DEVELOPERS
export const getAllDevelopers = async (req, res) => {
  try {
    let search = req.query.search;
    if (!search) {
      search = "";
    }
    const totalCount = await Developer.find().count();
    const result = await Developer.find({
      $or: [
        { name: { $regex: new RegExp(search, "i") } },
        { id: { $regex: new RegExp(search, "i") } },
      ],
    }).sort({ view_count: -1 });
    const developers = [];
    for (let developer of result) {
      const { id, avatar_url } = developer;
      developers.push({ id, avatar_url });
    }
    res.status(200).json({
      status: http.STATUS_CODES[200],
      developers,
      developers_count: totalCount,
    });
  } catch (error) {
    res.status(500).json({
      status: http.STATUS_CODES[500],
      message: "Something Went Wrong!!",
    });
  }
};

// GET DEVELOPER INFORMATION
export const getDeveloperInfo = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Developer.findOne({ id });
    if (!result) {
      return res.status(404).json({
        status: http.STATUS_CODES[404],
        message: "Developer Not Found",
      });
    }
    const developerUpdated = await updateViewCount(id, result.view_count);
    if (!developerUpdated) {
      throw new Error("Something Went Wrong");
    }
    res
      .status(200)
      .json({ status: http.STATUS_CODES[200], developerInfo: result });
  } catch (error) {
    res.status(500).json({
      status: http.STATUS_CODES[500],
      message: "Something Went Wrong!!",
    });
  }
};

// CREATE DEVELOPER
export const createDeveloper = async (req, res) => {
  try {
    const {
      github_id,
      linkedin_id,
      codechef_id,
      hackerrank_id,
      twitter_id,
      medium_id,
      leetcode_id,
      codeforces_id,
    } = req.body;
    if (!github_id) {
      return res.status(404).json({
        status: http.STATUS_CODES[404],
        message: "GITHUB ID is not found",
      });
    }

    const isDeveloperExist = await Developer.findOne({ id: github_id });
    if (isDeveloperExist) {
      return res.status(409).json({
        status: http.STATUS_CODES[409],
        message: "Developer already exist",
      });
    }

    const userData = await fetchUserData(github_id);
    const repoData = await fetchRepos(github_id);
    const repos = [];
    for (let repo of repoData.data) {
      let { name, html_url, description, updated_at } = repo;
      repos.push({ name, html_url, description, updated_at });
    }
    let { name, avatar_url, bio, company, email, location } = userData.data;
    if (!name) name = github_id;
    await Developer.create({
      id: github_id,
      name,
      avatar_url,
      bio,
      company,
      email,
      location,
      github_id,
      linkedin_id,
      codechef_id,
      hackerrank_id,
      twitter_id,
      medium_id,
      leetcode_id,
      codeforces_id,
      repos,
    });
    res
      .status(201)
      .json({ status: http.STATUS_CODES[201], developer_id: github_id });
  } catch (error) {
    if (error?.response?.status == 404) {
      return res.status(400).json({
        status: http.STATUS_CODES[400],
        message: "Github Username is Invalid",
      });
    }
    console.log(error);
    res.status(500).json({
      status: http.STATUS_CODES[500],
      message: "Something Went Wrong!!",
    });
  }
};
