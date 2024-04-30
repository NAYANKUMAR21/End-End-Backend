const productModel = require("../model/Product.model");
const redisClient = require("../utils/redis");
const GetProducts = async (req, res) => {
  const { id } = req.params;
  try {
    console.log(id);
    if (id) {
      let IdData = await redisClient.GET(id);
      if (IdData) {
        return res.status(200).send({ message: IdData });
      }
      let singleData = await productModel.find({ _id: id });
      await redisClient.SET(id, singleData);
      return res.status(200).send({ message: singleData });
    }

    let allData = await productModel.find({});
    return res.status(200).send({ message: allData });
  } catch (er) {
    return res.status(403).send({ message: er.message });
  }
};
const AddSingleProductData = async (req, res) => {
  const {
    title,
    description,
    image,
    price,
    rate,
    offers,
    quantityInStock,
    gender,
  } = req.body;
  try {
    const addDataToBack = new productModel({
      title,
      description,
      image,
      price,
      rate,
      offers,
      quantityInStock,
      gender,
    });
    await addDataToBack.save();
    return res.status(200).send({ message: "Data to backend" });
  } catch (er) {
    return res.status(403).send({ message: er.message });
  }
};
module.exports = { GetProducts, AddSingleProductData };
