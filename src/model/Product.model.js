const mongoose = require("mongoose");
const file = {
  title: {
    type: String,
    maxlength: 20,
    require: [true, "Please enter title"],
    default: "Yet to add Title",
  },
  description: {
    type: String,
    require: [true, "Please Enter the description"],
    default: "Yet to add description",
  },
  image: {
    type: String,
    require: [true, "Please add image"],
    default:
      "https://w1.pngwing.com/pngs/314/924/png-transparent-person-logo-symbol-man-black-black-and-white-silhouette.png",
  },
  price: { type: Number, require: [true, "Please enter price"] },
  rate: {
    type: Number,
    require: [true, "Please enter the rating for each of clothes"],
    default: 0,
  },
  offers: { type: Array, default: [] },
  quantityInStock: { type: Number, default: 0 },
  gender: {
    type: String,
    enum: ["Male", "Female", "Non-binary"],
    default: "Male",
  },
};

const productSchema = new mongoose.Schema(file, { versionKey: false });
const productModel = mongoose.model("clothing", productSchema);

module.exports = productModel;
