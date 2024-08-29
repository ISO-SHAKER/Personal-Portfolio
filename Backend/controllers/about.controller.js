const About = require("../models/about.model");
const httpStatus = require("../utils/httpStatus");
const httpError = require("../utils/httpError");
const asyncWrapper = require("../middlewares/asyncWrapper");

const getAboutData = asyncWrapper(async (req, res, next) => {
  const about = await About.findOne({}, { __v: false });

  if (!about) {
    const error = httpError.create(
      "about data not found",
      httpStatus.NOT_FOUND,
      httpStatus.FAIL
    );
    return next(error);
  }

  res.json({
    status: httpStatus.SUCCESS,
    data: { about },
  });
});

const updateAboutData = asyncWrapper(async (req, res, next) => {
  let updatedData = await About.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true, runValidators: true }
  );

  return res.status(200).json({
    status: httpStatus.SUCCESS,
    data: { about: updatedData },
  });
});

module.exports = {
  getAboutData,
  updateAboutData,
};
