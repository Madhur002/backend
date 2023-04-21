import express from "express";
import User from "../models/User.js";
import { body, validationResult } from 'express-validator';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const router = express.Router();
const JWT_SECRET = 'Madhurisagoodb$oy';


router.post('/createuser',[
  body('name', 'Enter a valid name with more than 3 characters').isLength({ min:3 }),
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
], async (req, res) => {
  // if there are errors return bad request and the errors 
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({ errors:errors.array() });
  }
  // check wheather the user with the same email exists or not 
try {
  let user = await User.findOne({email: req.body.email});
  if (user) {
    return res.status(400).json({error: "User with the same email already exists"})
  }
  const salt = await bcrypt.genSalt(10);
  const secPass = await bcrypt.hash(req.body.password, salt);

  // CREATE A NEW USER 
    user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: secPass,
})

const data = {
  user:{
    id: user.id
  }
}

const authtoken = jwt.sign(data,JWT_SECRET);
res.json({authtoken});

} catch (error) {
  console.error(error.message);
  res.status(500).send("some error occured"); 
}
});

// now we authenticate the user using POST "/api/auth/login" no login required.
router.post('/login',[
  body('email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  // if there are errors return bad request and the errors 
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({ errors:errors.array() });
  }
  const {email, password} = req.body;
  try {
    let user = await User.findOne({email});
    if (!user){
      return res.status(400).json({error: "Please try to login using correct credentials"});
    }

    const passwordCompare =await bcrypt.compare(password, user.password);
    if (!passwordCompare){
      return res.status(400).json({error: "Please try to login using correct credentials"});
    }

    const data = {
      user:{
        id: user.id
      }
    }
    
    const authtoken = jwt.sign(data,JWT_SECRET);
    res.send({authtoken});

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error"); 
  }
});
export default router;


