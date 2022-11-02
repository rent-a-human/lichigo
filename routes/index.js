const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

const Product = require('../models/Product')

// @desc    Login/Landing page
// @route   GET /
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login'
    })
})

// @desc    Dashboard
// @route   GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
    try {
        const products = await Product.find({ vendor: req.user.id }).lean()
        res.render('dashboard', {
            name: req.user.firstName,
            products
        })
    } catch (error) {
        console.log(error)
        res.render('error/500')
    }
})

// @desc    Carro de compras
// @route   GET /productos
router.get('/comprar', async (req, res) => {
    try {
        const products = await Product.find({ }).lean()
        res.render('products/products', {
            products
        })
    } catch (error) {
        console.log(error)
        res.render('error/500')
    }
})

module.exports = router