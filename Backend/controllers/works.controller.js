const { validationResult } = require("express-validator");

const Work = require("../models/work.model");
const httpStatus = require("../utils/httpStatus");
const HttpError = require("../utils/httpError");
const asyncWrapper = require("../middlewares/asyncWrapper");

const getWorks = asyncWrapper(async (req, res, next) => {
  const works = await Work.find({}, { __v: false });
  res.json({
    status: httpStatus.SUCCESS,
    data: { works },
  });
});

const getWork = asyncWrapper(async (req, res, next) => {
  const work = await Work.findById(req.params.id);
  if (!work) {
    const error = HttpError.create(
      "education not found",
      httpStatus.NOT_FOUND,
      httpStatus.FAIL
    );
    return next(error);
  }
  return res.json({
    status: httpStatus.SUCCESS,
    data: { work },
  });
});

const addWork = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = HttpError.create(
      errors.array(),
      httpStatus.BAD_REQUEST,
      httpStatus.FAIL
    );
    return next(error);
  }

  const { mainTitle, subTitle, calendar } = req.body;
  const newWork = new Work({ mainTitle, subTitle, calendar });
  await newWork.save();
  res.status(201).json({
    status: httpStatus.SUCCESS,
    data: { work: newWork },
  });
});

const updateWork = asyncWrapper(async (req, res, next) => {
  let updatedWork = await Work.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true, runValidators: true }
    // return the updated document & enforce schema validation
  );

  if (!updatedWork) {
    const error = HttpError.create(
      "education not found",
      httpStatus.NOT_FOUND,
      httpStatus.FAIL
    );
    return next(error);
  }

  return res.status(200).json({
    status: httpStatus.SUCCESS,
    data: { work: updatedWork },
  });
});

const deleteWork = asyncWrapper(async (req, res, next) => {
  const deletedWork = await Work.findByIdAndDelete(req.params.id);

  if (!deletedWork) {
    const error = HttpError.create(
      "work not found",
      httpStatus.NOT_FOUND,
      httpStatus.FAIL
    );
    return next(error);
  }

  return res.status(200).json({
    status: httpStatus.SUCCESS,
    data: null,
  });
});

module.exports = {
  getWorks,
  getWork,
  addWork,
  updateWork,
  deleteWork,
};
