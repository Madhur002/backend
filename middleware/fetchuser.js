import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET =  process.env.JWT_SECRET;

const fetchuser = (req,res,next) => {
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: "Please authenticate using valid token"})
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next()     
    } catch (error) {
        res.status(401).send({error: "Please authenticate using valid token"})
    }
}

export default fetchuser;

