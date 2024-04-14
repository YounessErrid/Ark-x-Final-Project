const Agency = require("../../models/agency.model");
const bcrypt = require("bcrypt");

const login = (req, res) => {
    res.status(200).json({
        success: true,
        message: "Successfully logged in",
    });
};

const register = async (req, res) => {
    const {agencyName, location, password, email    } = req.body;
    try{
        if(!agencyName||!location||!password||!email){
            return res.status(400).json({
                message: "Please fill all the fields"
            })
        }
        const existingAgency = await Agency.findOne({ email});
        if(existingAgency){
            return res.status(400).json({ error: "Email already exists" });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const newAgency = new Agency({
            agencyName: agencyName,
            location: location,
            password: hashedPassword,
            email: email,
        });
        await newAgency.save();
        return res
           .status(201).json({
            message: 'agency created successfully',
             success: true
            });
        
    } catch (error) {
        return res.status(500)
        .json({
            error: 'internal server error', 
            message: error.message, success: false
        });
    }}
    const destroy = async (req, res) => {
        req.logout(function(err) {
            if (err) { return next(err); }
            res.status(200).json({
                success: true,
                message: 'Successfully logged out'
            })
          });
    }
    
    module.exports = {
      login,
      register,
      destroy,
    };