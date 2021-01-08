import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    images: {
        type: Array,
        required: true
    },
    checked: {
        type: Boolean,
        required: true
    },
    inStock: {
        type: Number,
        default: 0
    },
    sold: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true
})

let DataSet = mongoose.models.product || mongoose.model('product', productSchema)
export default DataSet