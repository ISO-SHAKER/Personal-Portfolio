const { validationResult } = require("express-validator");

const Service = require("../models/service.model");
const httpStatus = require("../utils/httpStatus");
const HttpError = require("../utils/httpError");
const asyncWrapper = require("../middlewares/asyncWrapper");

const getServices = asyncWrapper(async (req, res, next) => {
  const services = await Service.find({}, { __v: false });
  res.json({
    status: httpStatus.SUCCESS,
    data: { services },
  });
});

const getService = asyncWrapper(async (req, res, next) => {
  const service = await Service.findById(req.params.id);
  if (!service) {
    const error = HttpError.create(
      "service not found",
      httpStatus.NOT_FOUND,
      httpStatus.FAIL
    );
    return next(error);
  }
  return res.json({
    status: httpStatus.SUCCESS,
    data: { service },
  });
});

const addService = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = HttpError.create(
      errors.array(),
      httpStatus.BAD_REQUEST,
      httpStatus.FAIL
    );
    return next(error);
  }

  const { title, modalTitle, modalDescription, provisions } = req.body;
  const newService = new Service({
    title,
    modalTitle,
    modalDescription,
    provisions,
  });
  await newService.save();
  res.status(201).json({
    status: httpStatus.SUCCESS,
    data: { service: newService },
  });
});

const updateService = asyncWrapper(async (req, res, next) => {
  let updatedService = await Service.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true, runValidators: true }
    // return the updated document & enforce schema validation
  );

  if (!updatedService) {
    const error = HttpError.create(
      "service not found",
      httpStatus.NOT_FOUND,
      httpStatus.FAIL
    );
    return next(error);
  }

  return res.status(200).json({
    status: httpStatus.SUCCESS,
    data: { service: updatedService },
  });
});

const deleteService = asyncWrapper(async (req, res, next) => {
  const deletedService = await Service.findByIdAndDelete(req.params.id);

  if (!deletedService) {
    const error = HttpError.create(
      "course not found",
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
  getServices,
  getService,
  addService,
  updateService,
  deleteService,
};
