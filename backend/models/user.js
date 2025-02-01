const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  rollNo: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  orders: {
    type: [Schema.Types.ObjectId],
    ref: "orders-spit",
  },
});

const User = model("user-spit", userSchema);

module.exports = User;
