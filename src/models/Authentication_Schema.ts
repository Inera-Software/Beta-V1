import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    lowercase: true,
    unique: true,
    minlength: [5, "Username must be at least 5 characters long"],
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    unique: true,
    minlength: [10, "Email must be at least 10 characters long"],
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
