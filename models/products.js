const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    userid: {type:String, required: true},
    productName: {type:String, required: true},
    productType: {type:String},
    productDesc: {type:String}
});

ProductSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('products', ProductSchema, 'products');
