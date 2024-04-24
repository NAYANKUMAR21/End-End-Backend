const productModel = require("../model/Product.model");
const redisClient = require("../utils/redis");
const GetProducts = async (req, res) => {
  const { id } = req.params;
  try {
    let IdData = await redisClient.GET(key);
    if (IdData) {
      return res.status(200).send({ message: IdData });
    }
    if (id) {
      const getAlldata = await productModel.find({ _id: id });

      await redisClient.SET(key, getAlldata);

      return res.status(200).send({ getAlldata });
    }
    const getAlldata = await productModel.find({});
    return res.status(200).send({ getAlldata });
  } catch (er) {
    return res.status(403).send({ message: er.message });
  }
};
const addSingleProductData = async (req, res) => {
  const { title, description, image, price, rate, offers, quantity, gender } =
    req.body;
  try {
    const addDataToBack = new productModel({
      title,
      description,
      image,
      price,
      rate,
      offers,
      quantity,
      gender,
    });
    await addDataToBack.save();
    return res.status(200).send({ message: "Data to backend" });
  } catch (er) {
    return res.status(403).send({ message: er.message });
  }
};
module.exports = { GetProducts, addSingleProductData };
