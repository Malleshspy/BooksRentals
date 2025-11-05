const users = require('../models/user.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, roles } = req.body;
    console.log(req.body);

    // Check if user already exists
    const existingUser = await users.findOne({ email });
    if (existingUser) {return res.status(400).json({ message: "User already exists" });}

    // Hash the password
    const salt = await bcrypt.genSalt(10); // generate salt
    const hashedPassword = await bcrypt.hash(password, salt); // hash password

    // Create new user with hashed password
    const newUser = new users({
      name,email,password: hashedPassword,roles,
    });

    // Save user
    await newUser.save();

    res.status(201).json({
      message: "✅ User registered successfully",
      user: {id: newUser._id,name: newUser.name,email: newUser.email,roles: newUser.roles,},
    });
  } 
  catch (err) {
    console.error("❌ Registration error:", err);
    res.status(500).json({ error: "Failed to register user", details: err.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await users.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare password with bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, email: user.email, roles: user.roles }, // payload
      process.env.JWT_SECRET || "bnmallesh@123", // secret key
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' } // token expiry
    );

    res.cookie('token', token, { httpOnly: true, secure: true,sameSite: 'Strict', maxAge: 3600000 }); // 1 hour

    // Respond with user data and token
    res.status(200).json({
      message: '✅ Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        roles: user.roles,
      },
      token,
    });
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
};



