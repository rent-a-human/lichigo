const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    availableUnits: {
        type: Number
    },
    productName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        default: 'groceries',
        enum: ['groceries', 'fast-food', 'farmacy']
    },
    image: {
        type: String
    },
    userVendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    unit: {
        type: String,
        required: true,
        default: 'unit',
        enum: ['unidad', 'g', 'kg']
    }

})

module.exports = mongoose.model('Product', ProductSchema)