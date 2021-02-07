import express from 'express';
import validator from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import auth from '../../middleware/auth.js'
import User from '../../models/User.js';
const router = express.Router();
const { check, validationResult } = validator;

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get('/', auth, async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
})

// @route   POST api/users
// @desc    Login user
// @access  Public
router.post(
    '/',
    [
        check('email', 'Please include a valid email')
            .isEmail(),
        check('password', 'Password is required')
            .exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body; 

        try {
            const user = await User.findOne({ email });

            if(!user) {
                return res.status(400).json({ errors: [ {msg: 'Invalid Credentials' } ]})
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch) {
                return res.status(400).json({ errors: [ { msg: 'Invalid Credentials' } ] })
            }

            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload, 
                process.env.JWT_SECRET,
                { expiresIn: process.env.TOKEN_EXPIRATION },
                (error, token) => {
                    if(error) throw error;
                    res.json({ token });
                }
            )

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server error");
        }
})

export default router;