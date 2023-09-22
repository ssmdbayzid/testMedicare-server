const User = require("../models/UserSchema")
// Get all users
exports.getAllUser = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        return res.status(200).json({success: true, data: users})
    } catch (error) {
        return res.status(404).json({success: false,  message: "Not found"})
    }
}

// Get single user
exports.getSingleUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId).select("-password")

        return res.status(200).json({success: true, message: "User Found", data: user})
    } catch (error) {
        return res.staus(404).json({message: "User not found"})
    }
}

// Update User
exports.updateUser = async (req, res)=> {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message:  "User not found"})
        }
        const updateUser = await User.findByIdAndUpdate(userId, req.body, { new: true })

        return res.status(200).json({success: true, message: "User update successfully", updateUser})
    } catch (error) {
        return res.status(401).json({success:  false, message: error.message})
    }
}

// Delete User

exports.deleteUser = async (req, res)=> {
    const userId = req.params.id
try {
    const deleteUser = await User.findByIdAndDelete(userId);
    return res.status(200).json({success:  true, message: `Delete ${deleteUser.name} user successfully`})
} catch (error) {
    return res.status(500).json({success: false, message: error.message})
}
}