const Parking = require('../models/parking');
const Review = require('../models/review');
module.exports.createReview = async (req, res) => {
    const parking = await Parking.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    parking.reviews.push(review);
    await review.save();
    await parking.save();
    req.flash('success', 'Created a new review');
    res.redirect(`/parkings/${parking._id}`);
}
module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Parking.findByIdAndUpdate(id, { $pull: { review: reviewId } })
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted a review');
    res.redirect(`/parkings/${id}`);
}