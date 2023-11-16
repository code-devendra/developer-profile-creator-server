import mongoose from "mongoose";

const RepoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  html_url: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  updated_at: {
    type: Date,
    required: true,
  },
});

const DeveloperSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  avatar_url: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  view_count: {
    type: Number,
    default: 1,
  },
  company: {
    type: String,
    default: "",
  },
  blog: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    default: "",
  },
  github_id: {
    type: String,
    required: true,
  },
  linkedin_id: {
    type: String,
    default: "",
  },
  codechef_id: {
    type: String,
    default: "",
  },
  hackerrank_id: {
    type: String,
    default: "",
  },
  twitter_id: {
    type: String,
    default: "",
  },
  medium_id: {
    type: String,
    default: "",
  },
  leetcode_id: {
    type: String,
    default: "",
  },
  codeforces_id: {
    type: String,
    default: "",
  },
  repos: { type: [RepoSchema], default: undefined },
});

const Developer = mongoose.model("Developer", DeveloperSchema);

export default Developer;
