import express from 'express';
import validator from 'express-validator';
import fetch from 'node-fetch';
import auth from '../../middleware/auth.js';
import { User, Profile, Post } from '../../models/index.js';
import { createProfileObject } from '../../utils.js';
const { check, validationResult } = validator;
const router = express.Router();

// @route   POST api/post
// @desc    Create a post
// @access  Private
router.post(
    '/', 
    [
        auth,
        [
            check('text', 'Text is required').notEmpty(),
        ]
    ], 
    async(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findById(req.user.id).select('-password');
            if(!user){
                return res.status(400).json({ errors: [ { msg: 'User not found.' } ]})
            }
    
            const newPost = new Post({
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            })    

            const post = await newPost.save();

            res.json(post);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }

})

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get('/me', auth, async(req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id })
            .populate('user', ['name', 'avatar']);
        
        if(!profile) {
            return res.status(400).json({msg: 'There is no profile for this user'});
        }

        res.json(profile);  
        
    } catch(error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

export default router;