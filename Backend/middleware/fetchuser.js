const jwt = require('jsonwebtoken');
const JWT_SECRET = "sohel@230$70";

const fetchuser = (req , res, next)=>{ // as middleware takes 3 parameters
    const token = req.header("auth-token"); // taking the auth-token from logged in user and checking it on getuser API
    
    if(!token){ // to check if auth-token is proper or not.
        return res.status(401).send({error:"Access Denied, verify with the valid credentials"});
    }

    try {
        const data = jwt.verify( token,JWT_SECRET ); // verifying token & JWT_secret;
        req.user = data.user;
        next(); // ?

    } catch (error) {
        res.status(401).send({error:"Access Denied, verify with the valid credentials"});
    }
    
}
module.exports = fetchuser;