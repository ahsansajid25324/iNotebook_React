
const JWT_Secret="mfemf@@$2kr"
const jwt = require('jsonwebtoken');


const fetchuser=(req,res,next)=>{
    const token=req.header("auth-token")
    if(!token){
        res.status(401).json({error:"Please authenticate a valid token"})

    }

    try {
        const data=jwt.verify(token,JWT_Secret)
        req.user=data.user

    next()
        
    } catch (error) {
        res.status(401).json({error:"Please authenticate a valid token"})
        
    }

    
}

module.exports=fetchuser;