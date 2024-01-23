const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "First name is required!"],
        minLength: [3, "First name must be at least 3 characters long!"]
    },
    family: {
        type: String,
        required: [true, "Family name is required!"],
        minLength: [3, "Family name must be at least 3 characters long!"]
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        minLength: [10, "Email must be at least 10 characters long!"],
        unique: true,
        uniqueCaseInsensitive: true, // Ensure case-insensitive uniqueness
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
        minLength: [4, "Password must be at least 4 characters long!"],
    },
    role: {
        type: String,
        default: "user", // Set the default role to "user"
    },
});




userSchema.virtual("repeatPassword").set(function (value) {
    if (value !== this.password) {
        throw new Error("Password mismatch!");
    }
});

userSchema.pre("save", async function () {
    const existingUser = await mongoose.model("User").findOne({ email: this.email });

    if (existingUser) {
        throw new Error("Email already exists!");
    }

    let pass = this.password.trim();
    let email = this.email.trim();
    let name = this.name.trim()
    let family = this.family.trim();

    this.email = email;
    this.name = name;
    this.family = family;
    this.password = pass;

    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
});


const User = mongoose.model("User", userSchema);

module.exports = User;
