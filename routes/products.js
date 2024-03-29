const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const Product = require('../models/Product')

// @desc    Show add page
// @route   GET /products/add
router.get('/add', (req, res) => {
    console.log(req.user)
    res.render('products/add')
})

// @desc    Returns all products
// @route   GET /products/add
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({ }).lean()
        res.status(200).json(products);
    } catch (error) {
        console.log(error)
        res.render('error/500')
    }
})

// @desc    Process add form
// @route   POST /products
router.post('/', ensureAuth, async (req, res) => {
    try {
        console.log(req.user)
        req.body.userVendor = req.user.id
        console.log(req.body)
        await Product.create(req.body)
        res.redirect('/dashboard')
    } catch (error) {
        console.error(error)
        res.render('error/500')
    }
})

module.exports = router