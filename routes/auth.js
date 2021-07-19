//import dependencies
import express from 'express'
import jwt from 'jsonwebtoken'
import validator from 'express-validator'

//initailize router
const router = express.Router()
const {check, validationResult} = validator;

//import models
import User from '../models/User.js'

//import JWT middleware
import auth from '../middleware/auth.js'

//@GET - /api/auth - login and get user token = Public
router.get('/', auth, async(req, res)=>{
    try {
        const user = await User.findById(req.user.id).select("-password")
        res.json(user)
    } catch (error) {
        res.status(500).send("Server Error!")
    }
})

//@POST - /api/auth - login with email and password - Public
router.post('/', [
    check("email", "Please include a valid email address").isEmail(),
    check("password", "Password is required").exists()
], async(req, res) =>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {email, password} = req.body;

    try {
        let user = await User.findOne({email})

        if(!user){
            return res.status(400).json({msg: "Invalid credential"})
        }

        if(!(await user.comparePasswords(password))){
            return res.status(400).json({msg: "Invalid credential"})
        }

        const payload = {
            user: {
                id: user._id,
            },
        }

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {expiresIn: 36000},
            (err, token) =>{
                if(err){
                    throw err
                }
                res.json({token})
            }
        )

    } catch (error) {
        res.status(500).json("Server Error")
    }
})


export default router;