// controllers/authController.js
const bcrypt = require('bcrypt');
const { z } = require('zod');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/userModel.js');
const { signupSchema, signinSchema } = require('../utils/zodValidation');

// Sign Up Controller
const signup = async (req, res) => {
    const validation = signupSchema.safeParse(req.body);
    if (!validation.success) {
        return res.status(411).json({ errors: validation.error.errors });
    }

    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const userExists = await UserModel.findOne({ email });
        console.log(userExists);
        if (userExists) return res.status(403).json({ error: 'User already exists' });

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

        // Create and save the user
        const newUser = new UserModel({ name, email, password: hashedPassword });
        console.log(newUser);
        await UserModel.create(newUser);


        res.status(200).json({ message: 'Signed up successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Server11 error', details: err.message });
    }
};

// Sign In Controller
const signin = async (req, res) => {

    //signin validation
    const validation = signinSchema.safeParse(req.body);
    if (!validation.success) {
        return res.status(411).json({ errors: validation.error.errors });
    }



    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) return res.status(403).json({ error: 'Wrong credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(403).json({ error: 'Wrong credentials' });

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
};

module.exports = {
    signup,
    signin,
};
