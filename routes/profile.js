const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

const Product = require('../models/Product')

// @desc    User Profile
// @route   GET perfil/
router.get('/', ensureAuth, async (req, res) => {
    try {
        const products = await Product.find({ vendor: req.user.id }).lean()
        const user = req.user.toJSON();
        const picture = req.user.picture
        console.log(user)
        console.log('ese fue')
        console.log(products)
        res.render('profile', {
            user,
            products
        })
    } catch (error) {
        console.log(error)
        res.render('error/500')
    }
})

module.exports = router