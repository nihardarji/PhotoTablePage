const express = require('express')
const ImagesListModel = require('../model/ImagesListModel')
const router = express.Router()


router.get('/:lat/:lng/:dis', async (req, res) => {
    
    try {
        const latitude = req.params.lat
        const longitude = req.params.lng
        const dis = req.params.dis

        const imagesData = await ImagesListModel.find({})
        const finalResponse = imagesData.filter(image => getDistanceFromLatLonInFeet(image.location.latitude, image.location.longitude, latitude, longitude) <= dis)

        res.json(finalResponse)

    } catch (error) {
        
        res.status(500).json({ msg: 'Server Error'})
    }
})

router.get('/', async (req, res) => {
    
    try {
        const query = req.query.q
        const re = new RegExp(query, 'i')
        const imagesData = await ImagesListModel.find({description : {$regex : re}})
        
        res.json(imagesData)

    } catch (error) {
        
        res.status(500).json({ msg: 'Server Error'})
    }
})

const getDistanceFromLatLonInFeet = (lat1,lon1,lat2,lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d*3280.84; // convert it in feet
  }
  
const deg2rad =(deg) => {
    return deg * (Math.PI/180)
}

module.exports = router