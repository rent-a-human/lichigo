const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const cloudinary = require('cloudinary').v2


// @desc    Upload images
// @route   POST /upload/cloud
router.post('/cloud', async (req, res) => {
    try {
        const file = req.files.image
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            public_id: `${Date.now()}`,
            resource_type: 'auto',
            folder: 'images'
        })
        console.log(result)
        res.json(result);
    } catch (error) {
        console.error(error)
        res.render('error/500')
    }
})

module.exports = router