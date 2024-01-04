const User = require('../models/User');
const {loadErrorMessages} = require('../utils/errorParser')

exports.loadUsers = async() =>{
    try {
        const users  = User.find();
        return users
    } catch (error) {
        throw new Error('Error loading users!')
    }
}

exports.register = async(userData)=>{
    
    try {
        const user = await User.create(userData);
    } catch (error) {
        throw loadErrorMessages(error);
    }
}

exports.login = async (userData) => {
    const {email,password} = userData;
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Username or password is invalid");
  }
  const isPassValid = await bcrypt.compare(password, user.password);

  if (!isPassValid) {
    throw new Error("Username or password is invalid");
  }

  // const data = {
  //   _id: user._id,
  //   email: user.email,
  //   username: user.username,
  // };
  // const token = await jwt.sign(data, SECRET, { expiresIn: "1d" });
  // return token;
};
