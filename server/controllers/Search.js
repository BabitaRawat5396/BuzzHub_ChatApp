const User = require("../models/User");

exports.search = async (req, res) => {
  try {
    const { searchValue } = req.body;

    if (!searchValue) {
      return res.status(400).json({
        success: false,
        message: "Search value is required.",
      });
    }

    // 'i' flag for case-insensitive search
    const regex = new RegExp(searchValue, "i");
    const users = await User.find({ userName: regex });

    if (users.length === 0) {
      return res.status(404).json({
        success: true,
        message: "No users found with the given search value.",
        users: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Search completed successfully.",
      users: users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to search.",
      error: error.message,
    });
  }
};
