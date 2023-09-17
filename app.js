const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');

const cors = require('cors');
require('dotenv').config();

const User = require('./models/user');
const Chat = require('./models/chat');
const Group = require('./models/group');
const UserGroup = require('./models/usergroup');

const app = express();
app.use(cors())
app.use(bodyParser.json({ extended: false }));
const userRoute = require('./routes/user');
const chatRoute = require('./routes/chat');
const groupRoute = require('./routes/group');
const groupChatRoute = require('./routes/groupchat');

app.use('/users',userRoute);
app.use('/users', chatRoute);
app.use(groupRoute);
app.use(groupChatRoute);


User.hasMany(Chat);
Chat.belongsTo(User);
User.belongsToMany(Group, {through:'usergroup'});
Group.belongsToMany(User,{through:'usergroup'})

sequelize
.sync()
//.sync({force: true})
.then(result=>{
   app.listen(3000);
})
.catch(err=>{
    console.log(err);
}); 