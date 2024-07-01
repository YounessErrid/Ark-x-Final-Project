const Client = require('../models/client.model');
const Agency = require('../models/agency.model');
const Admin = require('../models/admin.model');


const login  = async (req, res) =>{
    try {
      const {user} = req

      let userData = null

      switch(user.role){

          case "client" :
            userData = await Client.findOne({ userId: user._id })

            if(!userData){
              return res.staus(404).json({message : 'Clint data not found'})
            }

            return res.status(200).json({
              success: true,
              message: "Successfully logged in",
              user: {
                id: user._id,
                role: user.role,
                fullname: user.fullname,
                profile: user.profile_image,
                email: user.email
              },
            });

          case 'agency':
          userData = await Agency.findOne({ userId: user._id });
          if (!userData) {
            return res.status(404).json({ message: 'Agency data not found' });
          }
          return res.status(200).json({
            success: true,
              message: "Successfully logged in",
            user: {
              id: user._id,
              agencyId: userData._id,
              email: user.email,
              role: user.role,
              agencyName: userData.agencyName,
              address: userData.addresse, 
              hasAccess: userData.hasAccess,
            },
          });
      
          case "admin" :
            userData = await Admin.findOne({ userId: user._id })

            if(!userData){
              return res.staus(404).json({message : 'Admin data not found'})
            }

            return res.status(200).json({
              success: true,
              message: "Successfully logged in",
              user: {
                id: user._id,
                role: user.role,
                fullname: user.fullname,
                profile: user.profile_image,
              },
            });
      
          default:
        return res.status(500).json({ message: 'Invalid user role' });
        
      }

    } catch (error) {
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      success: true,
      message: "Successfully logged out",
    });
  });
  };

const checkSession = async (req, res) => {
const user = req.user;
try {
    if (user) {
        let userData = null

        switch(user.role){
  
            case "client" :
              userData = await Client.findOne({ userId: user._id })
  
              if(!userData){
                return res.staus(404).json({message : 'Clint data not found'})
              }
  
              return res.status(200).json({
                success: true,
                message: "Successfully logged in",
                user: {
                  id: user._id,
                  role: user.role,
                  fullname: user.fullname,
                  profile: user.profile_image,
                  email: user.email
                },
              });
  
            case 'agency':
            userData = await Agency.findOne({ userId: user._id });
            if (!userData) {
              return res.status(404).json({ message: 'Agency data not found' });
            }
            return res.status(200).json({
            success: true,
            message: "Successfully logged in",
              user: {
                id: user._id,
                agencyId: userData._id,
                email: user.email,
                role: user.role,
                agencyName: userData.agencyName,
                address: userData.addresse, 
                hasAccess: userData.hasAccess,
              },
            });
        
            case "admin" :
              userData = await Admin.findOne({ userId: user._id })
  
              if(!userData){
                return res.staus(404).json({message : 'Admin data not found'})
              }
  
              return res.status(200).json({
                success: true,
                message: "Successfully logged in",
                user: {
                  id: user._id,
                  role: user.role,
                  fullname: user.fullname,
                  profile: user.profile_image,
                },
              });
        
            default:
          return res.status(500).json({ message: 'Invalid user role' });
          
        }
    } else {
    res.status(401).json({
        success: false,
        message: "Unauthorized",
    });
    }
} catch (error) {
    return res
    .status(500)
    .json([
        { error: "Internal server error" },
        { message: `Error verifying user session: ${error.message}` },
    ]);
}
};

module.exports = { login, logout, checkSession };
  