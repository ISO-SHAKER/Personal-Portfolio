const { validationResult } = require("express-validator");

const Education = require("../models/education.model");
const httpStatus = require("../utils/httpStatus");
const HttpError = require("../utils/httpError");
const asyncWrapper = require("../middlewares/asyncWrapper");

const getEducations = asyncWrapper(async (req, res, next) => {
  const educations = await Education.find({}, { __v: false });
  res.json({
    status: httpStatus.SUCCESS,
    data: { educations },
  });
});

const getEducation = asyncWrapper(async (req, res, next) => {
  const education = await Education.findById(req.params.id);
  if (!education) {
    const error = HttpError.create(
      "education not found",
      httpStatus.NOT_FOUND,
      httpStatus.FAIL
    );
    return next(error);
  }
  return res.json({
    status: httpStatus.SUCCESS,
    data: { education },
  });
});

const addEducation = asyncWrapper(async (req, res, next) => {
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
  const newEducation = new Education({ mainTitle, subTitle, calendar });
  await newEducation.save();
  res.status(201).json({
    status: httpStatus.SUCCESS,
    data: { education: newEducation },
  });
});

const updateEducation = asyncWrapper(async (req, res, next) => {
  let updatedEducation = await Education.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true, runValidators: true }
    // return the updated document & enforce schema validation
  );

  if (!updatedEducation) {
    const error = HttpError.create(
      "education not found",
      httpStatus.NOT_FOUND,
      httpStatus.FAIL
    );
    return next(error);
  }

  return res.status(200).json({
    status: httpStatus.SUCCESS,
    data: { education: updatedEducation },
  });
});

const deleteEducation = asyncWrapper(async (req, res, next) => {
  const deletedEducation = await Education.findByIdAndDelete(req.params.id);

  if (!deletedEducation) {
    const error = HttpError.create(
      "education not found",
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
  getEducations,
  getEducation,
  addEducation,
  updateEducation,
  deleteEducation,
};
