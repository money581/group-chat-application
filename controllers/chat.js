const Chat = require('../models/chat');

exports.postChat = async(req, res, next)=>{
  try{
    console.log('message', req.body.text);
    console.log('id', req.user.id);

    await Chat.create({
        message: req.body.text,
        userId:req.user.id,
        userName:req.user.name
    })
    res.status(201).json({message:'Successfully sent text'});
  } 
  catch(err){
    console.log(err);
    res.status(500).json({message: err, success:false})
  }
}
exports.getchat = async (req, res, next) => {
  try {
      const messages = await Chat.findAll()
      res.status(201).json({ success: true, message: messages });
  }
  catch (err) {
      res.status(500).json({ message: err, success: false })
  }
}