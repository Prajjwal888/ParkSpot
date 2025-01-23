const Joi = require('joi');

module.exports.parkingSchema = Joi.object({
    parking: Joi.object({
        title: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        price: Joi.number().required().min(0),
        slotsAvailable: Joi.object({
            twoWheeler: Joi.number().required(),
            fourWheeler: Joi.number().required()
        }).required(),
        // image: Joi.string().required(),
        location: Joi.string().required(),
        description: Joi.string().required()
    }).required(),
    deleteImages: Joi.array()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required()
    }).required()
});

module.exports.bookingSchema = Joi.object({
    booking: Joi.object({
        user: Joi.string().required(),
        parking: Joi.string().required(), 
        slotType: Joi.string()
            .valid('twoWheeler', 'fourWheeler')
            .required(), 
        startTime: Joi.date().iso().required(), 
        endTime: Joi.date()
            .iso()
            .greater(Joi.ref('startTime'))
            .required(),
        bookingStatus: Joi.string()
            .valid('Active', 'Upcoming', 'Completed', 'Canceled')
            .default('Upcoming'), 
        createdAt: Joi.date().default(Date.now)
    }).required()
});
