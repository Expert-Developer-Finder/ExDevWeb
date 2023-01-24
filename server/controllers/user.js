import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";

dotenv.config();

export const signin = async (req, res) => {
    const {email, password} = req.body;

    try {
        const existingUser = await User.findOne({email});
        if(!existingUser) return res.status(404).json({message: "User doesn't exist!"});

        const isPwdCorrect = await bcrypt.compare(password,existingUser.password);

        if(!isPwdCorrect) return res.status(400).json({message: "Invalid credentials!"});

        const token =jwt.sign({email: existingUser.email, id: existingUser._id}, process.env.JWT_SECRET, {expiresIn: "1h"});

        res.status(200).json({result:existingUser, token});
    } catch(err) {
        res.status(500).json({message: "Something went wrong!"});

    }


}

const checkIfPasswordIsStrong = (pwd) => {
    if (pwd.length < 8) return false;

    var hasCapital = false;
    if( /[A-Z]/.test(pwd)) hasCapital = true
    if (!hasCapital) return false;
    
    var hasNumeric = false;
    for (var i = 0; i < pwd.length; i++) 
        if(pwd.charAt(i) >= '0' &&  pwd.charAt(i) <= '9' ) hasNumeric = true;
    if (!hasNumeric) return false;

    return (pwd.includes('!') || pwd.includes('@') || pwd.includes('#') || pwd.includes('&') || pwd.includes('*') || pwd.includes('$') || pwd.includes('.'));
}

export const signup = async (req, res) => {
    const {email, password, firstName, lastName, confirmPassword} = req.body;

    try {
        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({message: "User already exist!"});

        // uncomment when you want to check for strong passwords

        //if (!checkIfPasswordIsStrong(password)) return res.status(400)
        //.json({message: "Your password should be at least 8 characters, should include at least one numeric character and one upper case letter, and should have one of these special chararcters: !@#$&*."});
    
        if(password !== confirmPassword) return res.status(400).json({message: "Passwords don't match!"});

        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({email, password: hashedPassword, name: `${firstName} ${lastName}`, bio:""});
        const token =jwt.sign({email: result.email, id: result._id}, "test", {expiresIn: "1h"});

        res.status(200).json({result, token});
    } catch(err) {
        res.status(500).json({message: "Something went wrong!"});
    }
    
}