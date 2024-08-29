const { validationResult } = require("express-validator");

const Skill = require("../models/skill.model");
const httpStatus = require("../utils/httpStatus");
const HttpError = require("../utils/httpError");
const asyncWrapper = require("../middlewares/asyncWrapper");

// CRUD operations for the main skills
const getSkills = asyncWrapper(async (req, res, next) => {
  const skills = await Skill.find({}, { __v: false });
  res.json({
    status: httpStatus.SUCCESS,
    data: { skills },
  });
});

const getSkill = asyncWrapper(async (req, res, next) => {
  const skill = await Skill.findById(req.params.id);
  if (!skill) {
    const error = HttpError.create(
      "skill not found",
      httpStatus.NOT_FOUND,
      httpStatus.FAIL
    );
    return next(error);
  }
  return res.json({
    status: httpStatus.SUCCESS,
    data: { skill },
  });
});

const addSkill = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = HttpError.create(
      errors.array(),
      httpStatus.BAD_REQUEST,
      httpStatus.FAIL
    );
    return next(error);
  }

  const { category, experience, skillsList } = req.body;
  const newSkill = new Skill({ category, experience, skillsList });
  await newSkill.save();
  res.status(201).json({
    status: httpStatus.SUCCESS,
    data: { skill: newSkill },
  });
});

const updateSkill = asyncWrapper(async (req, res, next) => {
  let updatedSkill = await Skill.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true, runValidators: true }
    // return the updated document & enforce schema validation
  );

  if (!updatedSkill) {
    const error = HttpError.create(
      "skill not found",
      httpStatus.NOT_FOUND,
      httpStatus.FAIL
    );
    return next(error);
  }

  return res.status(200).json({
    status: httpStatus.SUCCESS,
    data: { skill: updatedSkill },
  });
});

const deleteSkill = asyncWrapper(async (req, res, next) => {
  const deletedSkill = await Skill.findByIdAndDelete(req.params.id);

  if (!deletedSkill) {
    const error = HttpError.create(
      "skill not found",
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

// CRUD operations for skillsList items

const addSkillItem = asyncWrapper(async (req, res, next) => {
  const skill = await Skill.findById(req.params.id);

  if (!skill) {
    const error = HttpError.create(
      "skill not found",
      httpStatus.NOT_FOUND,
      httpStatus.FAIL
    );
    return next(error);
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = HttpError.create(
      errors.array(),
      httpStatus.BAD_REQUEST,
      httpStatus.FAIL
    );
    return next(error);
  }

  const { name, image } = req.body;

  const newSkillItem = {
    name,
    image,
  };

  skill.skillsList.push(newSkillItem);

  await skill.save();

  return res.status(201).json({
    status: httpStatus.SUCCESS,
    data: {
      skillItem: newSkillItem,
    },
  });
});

const getSkillItem = asyncWrapper(async (req, res, next) => {
  const skill = await Skill.findById(req.params.id);
  if (!skill) {
    const error = HttpError.create(
      "skill not found",
      httpStatus.NOT_FOUND,
      httpStatus.FAIL
    );
    return next(error);
  }

  const skillItem = skill.skillsList.find(
    (skillItem) => skillItem._id.toString() === req.params.itemId
  );

  if (!skillItem) {
    const error = HttpError.create(
      "skill item not found",
      httpStatus.NOT_FOUND,
      httpStatus.FAIL
    );
    return next(error);
  }

  return res.status(200).json({
    status: httpStatus.SUCCESS,
    data: { skillItem },
  });
});

const updateSkillItem = asyncWrapper(async (req, res, next) => {
  const skill = await Skill.findById(req.params.id);
  if (!skill) {
    const error = HttpError.create(
      "skill not found",
      httpStatus.NOT_FOUND,
      httpStatus.FAIL
    );
    return next(error);
  }

  const skillItem = skill.skillsList.find(
    (skillItem) => skillItem._id.toString() === req.params.itemId
  );

  if (!skillItem) {
    const error = HttpError.create(
      "skill item not found",
      httpStatus.NOT_FOUND,
      httpStatus.FAIL
    );
    return next(error);
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = HttpError.create(
      errors.array(),
      httpStatus.BAD_REQUEST,
      httpStatus.FAIL
    );
    return next(error);
  }

  const { name, image } = req.body;

  const updatedSkillItem = {
    name,
    image,
  };

  skillItem.name = updatedSkillItem.name;
  skillItem.image = updatedSkillItem.image || skillItem.image;

  await skill.save();

  return res.status(200).json({
    status: httpStatus.SUCCESS,
    data: { skillItem: updatedSkillItem },
  });
});

const deleteSkillItem = asyncWrapper(async (req, res, next) => {
  const skill = await Skill.findById(req.params.id);

  if (!skill) {
    const error = HttpError.create(
      "skill not found",
      httpStatus.NOT_FOUND,
      httpStatus.FAIL
    );
    return next(error);
  }

  const skillItem = skill.skillsList.find(
    (skillItem) => skillItem._id.toString() === req.params.itemId
  );

  if (!skillItem) {
    const error = HttpError.create(
      "skill item not found",
      httpStatus.NOT_FOUND,
      httpStatus.FAIL
    );
    return next(error);
  }

  const deletedSkillItem = skillItem;

  skill.skillsList = skill.skillsList.filter(
    (skillItem) => skillItem._id.toString() !== req.params.itemId
  );

  await skill.save();

  return res.status(200).json({
    status: httpStatus.SUCCESS,
    data: {
      skillItem: deletedSkillItem,
    },
  });
});

module.exports = {
  getSkills,
  getSkill,
  addSkill,
  updateSkill,
  deleteSkill,
  addSkillItem,
  getSkillItem,
  updateSkillItem,
  deleteSkillItem,
};
