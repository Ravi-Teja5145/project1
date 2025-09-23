const Vendor = require("../models/Vendor");
const jwk = require ("jsonwebtoken");
const bcrypt = require("bcryptjs");
const vendor = require("../models/Vendor");


const vendorRigister = async (req,res)=>{
    const {username ,email ,password} = req.body
    try {
        const vendorEmail = await vendor.findOne({email});
        if (vendorEmail) {
            return res.status(400).json("Email already taken");
            
        }
        const hashedPassword = await bcrypt.hash(password,10);
        
        const newVendor = new vendor({
            username,
            email,
            password: hashedPassword
        });
        await newVendor.save();
        res.status(201).json({message : "vendor registered successfully bro ....."})
        console.log ("registered successfully bro .....")

    } catch (error) {
        console.error(error);
        res.status(500).json({error:"internal server error"})
    }
}

const vendorLogin = async(req,res)=>{
    const {email , password} = req.body;
    try {
        const vendor = await Vendor.findOne({email});
        if (!vendor || !(await bcrypt.compare(password, vendor.password))){
            return res.status(401).json({error:"invalid username or password bro"})
        }

        res.status(200).json({success : "login successful"})
        console.log(email);

    } catch (error) {
        
    }
}
    
    module.exports = {vendorRigister,vendorLogin}