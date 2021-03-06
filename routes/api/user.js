import express from 'express';
import validator from 'express-validator';
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import auth from '../../middleware/auth.js';
import { User, Profile, Post } from '../../models/index.js';
import { jwtSign, errorHandler } from '../../utils.js';
const { check, validationResult } = validator;
const router = express.Router();

// @route   POST api/user
// @desc    Register user
// @access  Public
router.post(
    '/',
    [
        check('name', 'Name is required')
            .notEmpty(),
        check('email', 'Please include a valid email')
            .isEmail(),
        check('password', 'Please enter a password with 6 or more characters')
            .isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return errorHandler.validationErrors(res, errors);
        }

        const { name, email, password } = req.body; 

        try {
            const user = await User.findOne({ email });

            if(user) {
                return errorHandler.customError(res, 400, 'User already exists');
            }

            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: "mm"
            })

            const newUser = new User({
                name,
                email,
                avatar,
                password
            });

            const salt = await bcrypt.genSalt(10);

            newUser.password = await bcrypt.hash(password, salt);

            await newUser.save();

            const payload = {
                user: {
                    id: newUser.id
                }
            }

            const token = jwtSign(payload);
            res.json({ token });

        } catch (error) {
            console.error(error.message);
            errorHandler.serverError(res);
        }
})

// @route   DELETE api/user
// @desc    Delete user, profile & posts
// @access  Private
router.delete('/', auth, async(req, res) => {
    try {

        await Post.deleteMany({ user: req.user.id })

        const user = await User.findById(req.user.id).select('-password');

        if(!user){
            return errorHandler.userNotFound(res);
        }

        await Profile.findOneAndRemove({ user: req.user.id });

        await User.findOneAndRemove({ _id: req.user.id });

        res.json({ msg: 'User deleted' });
    } catch(error) {
        console.error(error.message);
        errorHandler.serverError(res);
    }
})

export default router;