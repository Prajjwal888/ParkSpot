const Parking = require("../models/parking");
const cloudinary = require("../cloudinary");
const User = require("../models/user");
module.exports.index = async (req, res) => {
  const parkings = await Parking.find({});
  res.render("parkings/index", { parkings });
};
module.exports.renderNewForm = (req, res) => {
  res.render("parkings/new");
};
module.exports.createParking = async (req, res) => {
  const parking = new Parking(req.body.parking);
  await User.findByIdAndUpdate(req.user_id, { role: "admin" });
  parking.images = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));
  parking.author = req.user._id;
  await parking.save();
  req.flash("success", "Successfully made a new parking space");
  res.redirect(`/parkings/${parking._id}`);
};
module.exports.showParking = async (req, res) => {
  const parking = await Parking.findById(req.params.id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("author");
  if (!parking) {
    req.flash("error", "Cannot find that parking space");
    return res.redirect("/parkings");
  }
  res.render("parkings/show", { parking });
};
module.exports.editForm = async (req, res) => {
  const { id } = req.params;
  const parking = await Parking.findById(id);
  if (!parking) {
    req.flash("error", "Cannot find that parking space");
    return res.redirect("/parkings");
  }
  res.render("parkings/edit", { parking });
};
module.exports.updateParking = async (req, res) => {
  const { id } = req.params;
  const parking = await Parking.findByIdAndUpdate(
    id,
    { ...req.body.parking },
    { new: true }
  );
  const imgs = req.files.map((f) => ({ url: f.path, filename: f.filename }));
  parking.images.push(...imgs);
  // console.log(req.body);
  await parking.save();
  if (req.body.images) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await parking.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } },
    });
  }
  req.flash("success", "Successfully updated the parking space");
  res.redirect(`/parkings/${parking._id}`);
};
module.exports.deleteParking = async (req, res) => {
  const { id } = req.params;
  await Parking.findByIdAndDelete(id);
  req.flash("success", "Successfully delete a parking space");
  res.redirect("/parkings");
};
