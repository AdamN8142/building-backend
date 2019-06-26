const express = require('express')
const app = express()
const port = 3000



const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);



app.listen(port, () => console.log(`Example app listening on port ${port}!`))