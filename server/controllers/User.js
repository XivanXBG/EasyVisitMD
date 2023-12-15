const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "First name is required!"],
        minLength: [3, "First name must be at least 3 characters long!"]
    },
    familyName: {
        type: String,
        required: [true, "Family name is required!"],
        minLength: [3, "Family name must be at least 3 characters long!"]
    },
    username: {
        type: String,
        required: [true, "Username is required!"],
        minLength: [10, "Username must be at least 10 characters long!"],
        unique: { value: true, message: "Username already exists!" },
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
        minLength: [4, "Password must be at least 4 characters long!"],
    },
    role:{
        type: String,
        default:'User'
    }
});
userSchema.virtual("repeatPassword").set(function(value) {
    if (value !== this.password) {
        throw new Error("Password missmatch!");
    }
});

userSchema.pre("save", async function() {
    let pass = this.password.trim();
    this.password = pass;

    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
});

const User = mongoose.model("User", userSchema);

module.exports = User;