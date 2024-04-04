import { Express } from "express";

const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors')

const PORT = 3000;
const app: Express = express();

const scrapRoute = require('./Scrap');

app.use(cors());
app.use(bodyParser());

app.use(express.json());
app.use('/images', scrapRoute)

app.listen(PORT, async () => {
    console.log(`⚡️ Server is running on port ${PORT}`)
})