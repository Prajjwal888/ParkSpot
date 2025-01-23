const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    parking: {
        type: Schema.Types.ObjectId,
        ref: 'Parking',
        required: true
    },
    slotType: {
        type: String,
        enum: ['twoWheeler', 'fourWheeler'],
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    bookingStatus: {
        type: String,
        enum: ['Active', 'Upcoming', 'Completed', 'Canceled'],
        default: 'Upcoming'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Booking', BookingSchema);
