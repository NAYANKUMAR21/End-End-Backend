const mongoose = require("mongoose");
const file = {
  name: { type: String, required: [true, "Please Enter Your Name"] },
  email: {
    type: String,
    unique: true,
    required: [true, "Please Enter Your Name"],
    validate: {
      validator: function (v) {
        return /\S+@\S+\.\S+/.test(v); // Regular expression for validating email format
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
    timestamps: true,
  },
  password: {
    type: String,
    required: [true, "Please enter the password"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
};

const authSchema = new mongoose.Schema(file, { versionKey: false });
const authModel = mongoose.model("user", authSchema);

module.exports = authModel;
