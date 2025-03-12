const mongoose = require('mongoose')
const express = require('express')
require('dotenv').config()
const fs = require('fs')
const cors = require('cors')

const { initializeDatabase } = require('./db/db.connection')

const Accessories = require('./models/Accessories.models')
const Category = require('./models/Category.models')

/*const jsonData = fs.readFileSync('./accessories.json')
const accessoriesData = JSON.parse(jsonData)*/

initializeDatabase()

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    try{
        res.send('Welcome to Hookd - The ultimate mobile accessories shopping app.')
    }
    catch(error){
        res.status(500).json({error: 'Internal Server Error'})
    }
})

const seedData = () => {
    try{
        for(const categoryData of categoriesData){
            const category = new Category({
                name: categoryData.name,
                image: categoryData.image,
                description: categoryData.description
            })
            category.save()
        }
    }
    catch(error){
        console.log(error)
    }
}

const seedAccessoryData = () => {
   try{
        for(const accessoryData of accessoriesData){
            const accessory = new Accessories({
                name: accessoryData.name,
                brand: accessoryData.brand,
                category: accessoryData.category,
                subCategory: accessoryData.subCategory,
                description: accessoryData.description,
                price: accessoryData.price,
                compatibility: accessoryData.compatibility,
                color: accessoryData.color,
                material: accessoryData.material,
                daysForReplacement: accessoryData.daysForReplacement,
                warranty: accessoryData.warranty,
                yearsForWarranty: accessoryData.yearsForWarranty,
                images: accessoryData.images,
                model: accessoryData.model,
                productCode: accessoryData.productCode,
                specifications: accessoryData.specifications,
                reviews: accessoryData.reviews,
                tags: accessoryData.tags
            })
            accessory.save()
        }
    }
    catch(error){
        throw error
    }
}

//seedData()
//seedAccessoryData()

app.get('/categories', async(req, res) => {
    try{
        const categories = await Category.find()
        if(!categories){
            res.status(404).json({error: 'No categories found'})
        }
        res.status(200).json(categories)
    }
    catch(error){
        res.status(500).json({error: 'Internal Server Error'})
    }
})

app.get('/categories/:categoryId', async (req, res) => {
    try{
        const category = await Category.findById(req.params.categoryId)
        if(!category){
            res.status(404).json({error: 'Category not found'})
        }
        res.status(200).json(category)
    }
    catch(error){
        res.status(500).json({error: 'Internal Server Error'})
    }
})

app.get('/products', async (req, res) => {
    try{
        const accessories = await Accessories.find()
        if(!accessories){
            res.status(404).json({error: 'No products found'})
        }
        res.status(200).json(accessories)
    }
    catch(error){
        res.status(500).json({error: 'Internal Server Error'})
    }
})

app.get('/category/products/:categoryId', async(req, res) => {
    try{
        const accessories = await Accessories.find({category: req.params.categoryId})
        if(!accessories){
            res.status(404).json({error: 'No products found'})
        }
        res.status(200).json(accessories)
    }
    catch(error){
        res.status(500).json({error: 'Internal Server Error'})
    }
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})