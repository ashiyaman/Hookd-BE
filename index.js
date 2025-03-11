const mongoose = require('mongoose')
const express = require('express')
require('dotenv').config()

const { initializeDatabase } = require('./db/db.connection')

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