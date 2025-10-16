import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    lowercase: true,
    unique: true,
    minlength: [3, "Username must be at least 3 characters long"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    unique: true,
    // Using a regex for basic email format validation is better than a length check.
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
    select: false, // Prevents password from being returned in queries by default
  },
});

// Proper model caching for Next.js (prevents OverwriteModelError)
const User =
  mongoose.models.User || mongoose.model("User", userSchema);

export default User;
