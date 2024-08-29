const { validationResult } = require("express-validator");

const Project = require("../models/project.model");
const httpStatus = require("../utils/httpStatus");
const HttpError = require("../utils/httpError");
const asyncWrapper = require("../middlewares/asyncWrapper");

const getProjects = asyncWrapper(async (req, res, next) => {
  const projects = await Project.find({}, { __v: false });
  res.json({
    status: httpStatus.SUCCESS,
    data: { projects },
  });
});

const getProject = asyncWrapper(async (req, res, next) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    const error = HttpError.create(
      "project not found",
      httpStatus.NOT_FOUND,
      httpStatus.FAIL
    );
    return next(error);
  }

  console.log({ project });

  return res.json({
    status: httpStatus.SUCCESS,
    data: { project },
  });
});

const addProject = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = HttpError.create(
      errors.array(),
      httpStatus.BAD_REQUEST,
      httpStatus.FAIL
    );
    return next(error);
  }

  const { title, modalTitle, description, features, imageSrc } = req.body;
  const newProject = new Project({
    title,
    modalTitle,
    description,
    features,
    imageSrc,
  });
  await newProject.save();
  res.status(201).json({
    status: httpStatus.SUCCESS,
    data: { project: newProject },
  });
});

const updateProject = asyncWrapper(async (req, res, next) => {
  let updatedProject = await Project.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true, runValidators: true }
    // return the updated document & enforce schema validation
  );

  if (!updatedProject) {
    const error = HttpError.create(
      "project not found",
      httpStatus.NOT_FOUND,
      httpStatus.FAIL
    );
    return next(error);
  }

  return res.status(200).json({
    status: httpStatus.SUCCESS,
    data: { project: updatedProject },
  });
});

const deleteProject = asyncWrapper(async (req, res, next) => {
  const deletedProject = await Project.findByIdAndDelete(req.params.id);

  if (!deletedProject) {
    const error = HttpError.create(
      "project not found",
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
  getProjects,
  getProject,
  addProject,
  updateProject,
  deleteProject,
};
