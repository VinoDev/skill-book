import express from 'express';
import validator from 'express-validator';
import bcrypt from 'bcryptjs';
import auth from '../../middleware/auth.js'
import User from '../../models/User.js';
import { jwtSign, errorHandler } from '../../utils.js';

const router = express.Router();
const { check, validationResult } = validator;

// @route   GET api/auth
// @desc    User auth
// @access  Public
router.get('/', auth, async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error.message);
        errorHandler.serverError(res);
    }
})

// @route   POST api/auth
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
            return errorHandler.validationErrors(res, errors);
        }

        const { email, password } = req.body; 

        try {
            const user = await User.findOne({ email });

            if(!user) {
                return errorHandler.customError(res, 400, 'Invalid Credentials');
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch) {
                return errorHandler.customError(res, 400, 'Invalid Credentials');
            }

            const payload = {
                user: {
                    id: user.id
                }
            }

            const token = jwtSign(payload);
            res.json({ token });

        } catch (error) {
            console.error(error.message);
            errorHandler.serverError(res);
        }
})

export default router;