const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isAuthor, validateParking } = require("../middleware");
const parkings = require("../controllers/parkings");
const multer = require("multer");
const { storage } = require("../cloudinary");
const parking = require("../models/parking");
const upload = multer({ storage });

router
  .route("/")
  .get(catchAsync(parkings.index))
  .post(
    isLoggedIn,
    upload.array("image"),
    validateParking,
    catchAsync(parkings.createParking)
  );

router.get("/new", isLoggedIn, parkings.renderNewForm);

router
  .route("/:id")
  .get(catchAsync(parkings.showParking))
  .put(
    isLoggedIn,
    isAuthor,
    upload.array("image"),
    validateParking,
    catchAsync(parkings.updateParking)
  )
  .delete(isLoggedIn, isAuthor, catchAsync(parkings.deleteParking));

router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(parkings.editForm));

module.exports = router;
