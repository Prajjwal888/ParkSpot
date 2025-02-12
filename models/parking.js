const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;
const ParkingSchema = new Schema({
    title: String,
    images: [
        {
            url: String,
            filename: String
        }
    ],
    price: Number,
    description: String,
    location: String,
    phoneNumber:String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    slotsAvailable: {
        twoWheeler: { type: Number, required: true, default: 0 },
        fourWheeler: { type: Number, required: true, default: 0 },
    }
})
ParkingSchema.post('findOneAndDelete', async function (parking) {
    if (parking) {
        await Review.deleteMany({
            _id: {
                $in: parking.reviews
            }
        })
    }
})
module.exports = mongoose.model('Parking', ParkingSchema);