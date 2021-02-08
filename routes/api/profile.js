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

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get('/', async(req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']) 
        res.json(profiles);
    } catch(error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get('/user/:user_id', async(req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.params.user_id
        }).populate('user', ['name', 'avatar']) 

        if(!profile){
            return res.status(400).json({ msg: 'Profile not found' });
        }

        res.json(profile);
    } catch(error) {
        console.error(error.message);
        if(error.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.status(500).send('Server Error');
    }
})

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
router.put(
    '/experience', 
    [
        auth,
        [
            check('title', 'Title is required').notEmpty(),
            check('company', 'Company is required').notEmpty(),
            check('from', 'From date is required').notEmpty()
        ]
    ], 
    async(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        const {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        } = req.body;

        const newExp = {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        }

        try {
            const profile = await Profile.findOne({
                user: req.user.id
            })
            if(!profile){
                return res.status(400).json({ msg: 'Profile not found' });
            }
            profile.experience.unshift(newExp);
            await profile.save()

            res.json(profile);
        } catch(error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
})

// @route   PUT api/profile/experience/:exp_id
// @desc    Remove expirience from profile
// @access  Private
router.put('/experience/:exp_id', auth, async(req, res) => {
        try {
            const profile = await Profile.findOne({
                user: req.user.id
            })
            if(!profile){
                return res.status(400).json({ msg: 'Profile not found' });
            }
            if(profile.experience.length === 0){
                return res.status(400).json({ msg: 'This profile has no experience.' });
            }

            const removeIndex = profile.experience
                .map(exp => exp.id)
                .indexOf(req.params.exp_id);
            
            profile.experience.splice(removeIndex, 1);

            await profile.save()
            res.json(profile);
        } catch(error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
})
export default router;