const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const cors = require('cors');

const User = require('./models/user');
const Chat = require('./models/chat');

require('dotenv').config();

const app = express();
app.use(cors())
app.use(bodyParser.json({ extended: false }));
const userRoute = require('./routers/user');
const chatRoute = require('./routers/chat');

app.use('/user',userRoute);
app.use('/users', chatRoute);

User.hasMany(Chat);
Chat.belongsTo(User);

sequelize
.sync()
//.sync({force: true})
.then(result=>{
   app.listen(3000);
})
.catch(err=>{
    console.log(err);
}); 


