const UserGroup = require('../models/usergroup');

exports.getGroupUser = async (req,res,next)=>{
    try{
      const grpusers = await UserGroup.findAll({where:{groupId:req.query.groupid}});
      res.status(201).json({message: 'Successfully sent grouptext', grpusers:grpusers})
    }catch(err){
       console.log(err);
       res.status(500).json({error:err})
    }
}