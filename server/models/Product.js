const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  // this category property is used to allow user to search for certain watch feature, eg. classic, luxury, female...
  // this property will not show on product cards!!
  category: {
    type: [String],
    required: true,
  },
  // this tags propery is used to render to the product cards, to let user know some of the watch features
  tags: {
    type: [String],
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
