const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, validateBooking } = require("../middleware");
const bookings = require("../controllers/bookings");

router.get("/bookings", isLoggedIn, catchAsync(bookings.index));

router.get(
  "/parkings/:parkingId/user/:userId/bookings/new",
  isLoggedIn,
  catchAsync(bookings.renderNewForm)
);

router.post(
  "/parkings/:parkingId/user/:userId/bookings",
  isLoggedIn,
  validateBooking,
  catchAsync(bookings.createBooking)
);

router
  .route("/bookings/:id")
  .put(isLoggedIn, validateBooking, catchAsync(bookings.updateBooking))
  .delete(isLoggedIn, catchAsync(bookings.deleteBooking));

router.get("/bookings/:id/edit", isLoggedIn, catchAsync(bookings.editForm));

module.exports = router;
