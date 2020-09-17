const mongoose = require('mongoose')

const ImagesListSchema = mongoose.Schema({
    image_url: {
        type: String,
        required: true
    },
    location: {
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    },
    description: {
        type: String,
        required: true
    },
    created_by: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('images', ImagesListSchema)