import Developer from "../models/developer.models.js";

export const updateViewCount = async (id, currViewCount) => {
  try {
    await Developer.findOneAndUpdate({ id }, { view_count: ++currViewCount });
    return true;
  } catch (err) {
    return false;
  }
};
