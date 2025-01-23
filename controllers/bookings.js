const Booking = require("../models/booking");
const Parking=require("../models/parking");
module.exports.index = async (req, res) => {
  const user = req.user;
  const bookings = await Booking.find({ user: user._id }).populate("parking");
  res.render("bookings/index", { bookings });
};
module.exports.renderNewForm = async (req, res) => {
  const { parkingId, userId } = req.params;
  const user = req.user;
  const parking = await Parking.findById(parkingId);
  res.render("bookings/new", { parking, user });
};
module.exports.createBooking = async (req, res) => {
  const { userId, parkingId } = req.params;
  const booking = new Booking(req.body.booking);
  booking.user = userId;
  booking.parking = parkingId;
  const parking = await Parking.findById(parkingId);
  if (booking.slotType === "twoWheeler") {
    parking.slotsAvailable.twoWheeler -= 1;
  } else {
    parking.slotsAvailable.fourWheeler -= 1;
  }
  await booking.save();
  await parking.save();
  req.flash("success", "Successfully done a booking");
  res.redirect("/parkings");
};
module.exports.editForm = async (req, res) => {
  const { id } = req.params;
  const booking = await Booking.findById(id);
  const parkings = await Parking.find();
  if (!booking) {
    req.flash("error", "Cannot find that booking");
    res.redirect("/bookings");
  }
  res.render("bookings/edit", { booking });
};
module.exports.updateBooking = async (req, res) => {
  const { id } = req.params;
  const booking = await Booking.findByIdAndUpdate(
    id,
    { ...req.body.booking },
    { new: true }
  );
  await booking.save();
  req.flash("success", "Successfully updated the booking");
  res.redirect(`/bookings/${booking._id}`);
};
module.exports.deleteBooking = async (req, res) => {
  const { id } = req.params;
  const booking = await Booking.findById(id);
  const parking = await Parking.findById(booking.parking);
  if (booking.slotType === "twoWheeler") {
    parking.slotsAvailable.twoWheeler += 1;
  } else {
    parking.slotsAvailable.fourWheeler += 1;
  }
  await parking.save();
  await Booking.findByIdAndDelete(id);
  req.flash("success", "Successfully delete a booking");
  res.redirect("/bookings");
};
