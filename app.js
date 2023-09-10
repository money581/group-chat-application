const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const sequelize = require('./util/database');
const cors = require('cors');
const app = express();
dotenv.config();
app.use(cors())
app.use(bodyParser.json({ extended: false }));
const userRoute = require('./routers/user');
app.use(userRoute)
sequelize
    .sync()
   // .sync({force: true})
    .then(result => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    }); 



