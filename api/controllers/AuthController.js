const {User} = require("../models");
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const {JWT_SECRET} = require('../config');
const EmailSender = require("../services/Email");

const register = async (req, res) => {
    const {username, email, password, user_type} = req.body;

    try {
        const existingUser = await User.findOne({ where: { username } });

        if (existingUser) {
        return res.status(409).json({ msg: 'Username already exists' });
        }

        const emailExist = await User.findOne({where: {email}});
        if(emailExist){
        return res.status(409).json({msg: 'Email already registered. Please try a different email account.'});
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const user = await User.create({  email, username, password: hashedPassword, user_type });

        const token = jwt.sign({ userId: user.id, role: user.user_type }, JWT_SECRET, { expiresIn: '3d' });

        const send = new EmailSender();
        
        send.sendEmail(email, `Registration successful.`)

        return res.status(201).json({ msg: 'User registered successfully', data: user, token, role: user.user_type, userId: user.id });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ err: 'Error registering user' });
    }
}

const login = async (req, res) => {

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ msg: 'Invalid email or password' });
      }
  
      // Compare the provided password with the stored hashed password
      const isPasswordValid = await bcryptjs.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ msg: 'Invalid email or password' });
      }
      // Create a JWT token
      const token = jwt.sign({ userId: user.id, role: user.user_type }, JWT_SECRET, { expiresIn: '3d' });
  
      return res.status(200).json({ msg: 'Login successful', token, role: user.user_type, userId: user.id });
    } catch (error) {
      console.error('Error logging in:', error);
      return res.status(500).json({ err: 'Error logging in' });
    }
}


module.exports = {
    register,
    login
}