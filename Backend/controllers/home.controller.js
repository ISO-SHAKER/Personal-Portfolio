const Home = require("../models/home.model");
const httpStatus = require("../utils/httpStatus");
const httpError = require("../utils/httpError");
const asyncWrapper = require("../middlewares/asyncWrapper");

const getHomeData = asyncWrapper(async (req, res, next) => {
  const home = await Home.findOne({}, { __v: false });

  if (!home) {
    const error = httpError.create(
      "home data not found",
      httpStatus.NOT_FOUND,
      httpStatus.FAIL
    );
    return next(error);
  }

  res.json({
    status: httpStatus.SUCCESS,
    data: { home },
  });
});

const updateHomeData = asyncWrapper(async (req, res, next) => {
  let updatedData = await Home.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true, runValidators: true }
  );

  return res.status(200).json({
    status: httpStatus.SUCCESS,
    data: { home: updatedData },
  });
});

module.exports = {
  getHomeData,
  updateHomeData,
};
