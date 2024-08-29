const Contact = require("../models/contact.model");
const httpStatus = require("../utils/httpStatus");
const httpError = require("../utils/httpError");
const asyncWrapper = require("../middlewares/asyncWrapper");

const getContactData = asyncWrapper(async (req, res, next) => {
  const contact = await Contact.findOne({}, { __v: false });

  if (!contact) {
    const error = httpError.create(
      "contact data not found",
      httpStatus.NOT_FOUND,
      httpStatus.FAIL
    );
    return next(error);
  }

  res.json({
    status: httpStatus.SUCCESS,
    data: { contact },
  });
});

const updateContactData = asyncWrapper(async (req, res, next) => {
  let updatedData = await Contact.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true, runValidators: true }
  );

  return res.status(200).json({
    status: httpStatus.SUCCESS,
    data: { contact: updatedData },
  });
});

module.exports = {
  getContactData,
  updateContactData,
};
