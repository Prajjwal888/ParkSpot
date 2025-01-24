const mongoose = require("mongoose");
const cities = require("./cities");
const { names } = require("./seedHelpers");
const Parking = require("../models/parking");
const { imageUrls } = require("./photos");
const User = require("../models/user");
async function connectDB(){
await mongoose.connect(process.env.MONGODB_URL).then(()=>console.log("DB Connected"));
}
connectDB();

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Parking.deleteMany({});
  await User.findByIdAndUpdate("67928b5325d4cace3a1924fd", { role: "admin" });
  for (let i = 0; i < 10; i++) {
    const random20 = Math.floor(Math.random() * 20) + 1;
    const price = Math.floor(Math.random() * 20) + 10;
    const imageIndex = Math.floor(Math.random() * 5);
    const parking = new Parking({
      author: "67928b5325d4cace3a1924fd",
      location: `${cities[random20].city}, ${cities[random20].state}`,
      title: `${sample(names)}`,
      images: [{ url: imageUrls[imageIndex] }],
      description:
        "A spacious parking area with enough room to accommodate both two-wheelers and four-wheelers. The space features a 20x12 ft layout with a 10 ft clearance, ensuring hassle-free parking even for larger vehicles. Equipped with 24/7 CCTV surveillance, gated entry, and floodlights, it ensures top-notch security. Additional features include an EV charging station, shaded parking, and easy access for all users. Ideal for both short-term and long-term parking needs.",
      slotsAvailable: {
        twoWheeler: 20,
        fourWheeler: 10,
      },
      phoneNumber: "9123456789",
      price,
    });
    await parking.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
