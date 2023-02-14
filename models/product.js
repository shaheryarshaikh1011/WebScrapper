var mongoose = require("mongoose");

var ProductSchema = new mongoose.Schema({
   name: String,
   price: String,
   image: String,
   ingredients:String,
   description:String,
   diet:String,
   size:String,
});

module.exports = mongoose.model("Product", ProductSchema);

