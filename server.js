const express = require('express')
const path = require('path')
const mongoose = require('mongoose')

async function connectToDatabase() {
    const db = "mongodb+srv://nihar:nihar2308@contactkeeper-2fmg2.mongodb.net/test?retryWrites=true&w=majority"
    try {
        await mongoose.connect(db,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Database Connected');
    } catch (err) {
        console.error(err.message)
        process.exit(1)
    }
}

const app = express()
connectToDatabase()

app.use(express.json({extended: false }))
app.use('/api/imagesList', require('./routes/imagesList'))

if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'))
    
    app.use('*', ( req, res ) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))