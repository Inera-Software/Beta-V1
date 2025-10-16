import { NextResponse } from "next/server";
import User from "@/models/Authentication_Schema"
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { error } from "console";
import connectToDB from "@/config/database";


export async function POST(request: Request) {
  try{
    const body = await request.json();

    if(body.action !== 'register'){
      return NextResponse.json({ error: "Invalid action"}, {status: 400});
    }

    const {UserName, Email, Password, ConfirmPassword} = body;

    // Basic handeler

    if(!UserName || !Email || !Password || !ConfirmPassword){
      return NextResponse.json({error: 'All fields are required'}, {status: 400});
    }

    if(!validator.isEmail(Email)){
      return NextResponse.json({error: 'Email is required'},{status:400});
    }

    if(Email.length < 10){
      return NextResponse.json({error: 'The Email must be atleast 10 letters long'},{status: 400});
    }

    if(UserName.length < 5){
      return NextResponse.json({error: 'The username must be atleast 5 characters'}, {status: 400});
    }

    if(Password.length < 10){
      return NextResponse.json({error: 'password must be atleast 10 characters'}, {status: 400});
    }

    if(Password !== ConfirmPassword){
      return NextResponse.json({error: 'password and confirm password is not matching'}, {status: 400});
    }

    await connectToDB();

    const existing_Email = await User.findOne({email: Email});
    const existing_User = await User.findOne({username: UserName});

    if(existing_Email||existing_User){
      return NextResponse.json({error: 'User already registered'},{status:400});
    }

    const hashedPassword = await bcrypt.hash(Password,12);

    const NEW_USER = await User.create({
      username: UserName,
      email: Email,
      password: hashedPassword
    });

    //Generate Tokens

    const token = jwt.sign({id: NEW_USER._id, email: NEW_USER.email}, process.env.JWT_SECRET!, {expiresIn: "7d"})

    return NextResponse.json({ // sending to client side
      message: 'Registered successfully',
      user: { id: NEW_USER._id, 
        username: NEW_USER.username,
        email: NEW_USER.email
      }, token
    }, {status: 201});

  } catch (err) {
    console.error(err);
    return NextResponse.json({error: 'Server error'}, {status:500});
  }

  

  //  if (body.action === "login") {
  //    const { email, password } = body;

  //    // Basic validation
  //    if (!email || !password) {
  //      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  //    }
    
  //    // Simulate successful login
  //    console.log(`Simulating login for: ${email}`);
  //    return NextResponse.json({ success: true, message: "Login successful!" });
  // }

  //  return NextResponse.json({ error: "Invalid action specified." }, { status: 400 });
}
