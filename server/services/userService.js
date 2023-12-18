const User = require('../models/User');


exports.loadUsers = async() =>{
    try {
        const users  = User.find();
        return users
    } catch (error) {
        throw new Error('Error loading users!')
    }
}

exports.register = async(userData)=>{
    console.log(userData);
    try {
        const user = await User.create(userData);
    } catch (error) {
        console.log(error);
    }
}