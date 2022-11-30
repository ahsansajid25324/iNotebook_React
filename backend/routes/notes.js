const express=require('express')
const router=express.Router()
const fetchuser=require('../Middleware/fetchuser')
const { body, validationResult } = require('express-validator');
const Notes=require("../models/Notes")

router.get('/fetchnotes',fetchuser,async(req,res)=>{
    
    
    const notes = await Notes.find({user:req.user.id});
    
    res.json(notes)

})


router.post('/addnote',fetchuser,[
    body('title',"Enter a title").isLength({min:5}),
    body('tag',"Enter a tag ").exists(),
    body('description',"Enter a description").isLength({min:5})

],async(req,res)=>{
    const{title,description,tag}=req.body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    const notes=new Notes({
        title,description,tag,user:req.user.id
    })

    
    const savednote=await notes.save()

    res.json(savednote)


})


// 3rd route that updatenote
router.put('/updatenote/:id',fetchuser, async (req,res)=>{
    const {title,description,tag}=req.body
    const newNote={}
    if(title){newNote.title=title}
    if(description){newNote.description=description}
    if(tag){newNote.tag=tag}

    let note= await Notes.findById(req.params.id)   
    if(!note){return res.status(404).send("Not Found")}

    

    if(note.user.toString()!==req.user.id){return res.status(401).send("Not allowed")}

    note= await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({note})

})


router.get('/deletenote/:id',fetchuser, async (req,res)=>{
    

    let note= await Notes.findById(req.params.id)   
    if(!note){return res.status(404).send("Not Found")}

    

    if(note.user.toString()!==req.user.id){return res.status(401).send("Not allowed")}

    note= await Notes.findByIdAndDelete(req.params.id)
    res.json({'note':'congrats your note has been deleted'})

})



module.exports=router;