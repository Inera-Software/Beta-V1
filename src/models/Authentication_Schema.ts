
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    lowercase: true,
    unique: "A user with that username already exists.",
    minlength: [3, "Username must be at least 3 characters long"],
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    unique: "A user with that email already exists.",
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
    minlength: [12, "Password must be at least 12 characters long"],
    select: false,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
