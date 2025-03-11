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

const PORT = process.env.PORT
app.listen()