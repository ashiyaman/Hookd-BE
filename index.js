const mongoose = require('mongoose')
const express = require('express')
require('dotenv').config()
const fs = require('fs')

const Accessories = require('./models/Accessories.models')

const { initializeDatabase } = require('./db/db.connection')
const jsonData = fs.readFileSync('./accessories.json')
const accessoriesData = JSON.parse(jsonData)
console.log(accessoriesData)

initializeDatabase()

const app = express()

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
        for(const accessoryData of accessoriesData){
            const accessory = new Accessories({
                name: accessoryData.name,
                brand: accessoryData.brand,
                category: accessoryData.category,
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
    catch{
        throw error
    }
}

seedData()

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

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})