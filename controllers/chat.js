const Chat = require('../models/chat');

exports.chat = async(req, res, next)=>{
  try{
    console.log('message', req.body.text);
    console.log('id', req.user.id);

    await Chat.create({
        message: req.body.text,
        userId:req.user.id
    })
    res.status(201).json({message:'Successfully sent text'});
  } 
  catch(err){
    console.log(err);
    res.status(500).json({message: err, success:false})
  }
}