import express from 'express';
import validator from 'express-validator';
import auth from '../../middleware/auth.js';
import { User, Profile } from '../../models/index.js';
import { createProfileObject } from '../../utils.js';
const { check, validationResult } = validator;
const router = express.Router();


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

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post(
    '/',
    [
        auth, 
        [
            check('status', 'Status is required').notEmpty(),
            check('skills', 'Skills is required').notEmpty(),
        
        ]
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const profileObject = createProfileObject(req);

        try {
            const profile = await Profile.findOne({ user: req.user.id })
            if(profile) {
                const updatedProfile = await Profile.findOneAndUpdate(
                    { user: req.user,id },
                    { $set: profileObject },
                    { new: true }
                )
                return res.json(updatedProfile);
            }

            const newProfile = new Profile(profileObject);
            await newProfile.save();
            res.json(newProfile);            

        } catch(error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    }
)

export default router;