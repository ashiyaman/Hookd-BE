const mongoose = require('mongoose')

const accessoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    compatiable: {
        type: [String]
    },
    material: String,
    price: {
        type: Number,
        required: true
    },
    daysForReplacement: {
        type: Number,
        default: 7
    },
    warranty: Boolean,
    yearsForWarranty: Number,
    images: {
        type: [String],
        required: true
    },
    model: {
        type: String,
        required: true
    },
    productCode: {
        type: String,
        required: true,
        unique: true
    },
    color: String,
    specifications: [String],
    reviews: [String],
    tags: [String]
},
{timestamps: true})

const accessories = 