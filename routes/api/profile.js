import express from 'express';
import validator from 'express-validator';
import fetch from 'node-fetch';
import auth from '../../middleware/auth.js';
import { Profile } from '../../models/index.js';
import { createProfileObject, errorHandler } from '../../utils.js';
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
            return errorHandler.customError(res, 400, 'There is no profile for this user');
        }

        res.json(profile);  
        
    } catch(error) {
        console.error(error.message);
        errorHandler.serverError(res);
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
            return errorHandler.validationErrors(res, errors);
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
            errorHandler.serverError(res);
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
        errorHandler.serverError(res);
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
            return errorHandler.customError(res, 400, 'There is no profile for this user');
        }

        res.json(profile);
    } catch(error) {
        console.error(error.message);
        if(error.kind === 'ObjectId') {
            return errorHandler.profileNotFound(res);
        }
        errorHandler.serverError(res);
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
            return errorHandler.validationErrors(res, errors);
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
                return errorHandler.profileNotFound(res);
            }
            profile.experience.unshift(newExp);
            await profile.save()

            res.json(profile);
        } catch(error) {
            console.error(error.message);
            errorHandler.serverError(res);
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
                return errorHandler.profileNotFound(res);
            }
            if(profile.experience.length === 0){
                return errorHandler.customError(res, 400, 'This profile has no experience');
            }

            const removeIndex = profile.experience
                .map(exp => exp.id)
                .indexOf(req.params.exp_id);
            
            profile.experience.splice(removeIndex, 1);

            await profile.save()
            res.json(profile);
        } catch(error) {
            console.error(error.message);
            errorHandler.serverError(res);
        }
})

// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private
router.put(
    '/education', 
    [
        auth,
        [
            check('school', 'School is required').notEmpty(),
            check('degree', 'Degree is required').notEmpty(),
            check('fieldofstudy', 'Field of study is required').notEmpty(),
            check('from', 'From date is requierd').notEmpty()
        ]
    ], 
    async(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return errorHandler.validationErrors(res, errors);
        }
        const {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        } = req.body;

        const newEdu = {
            school,
            degree,
            fieldofstudy,
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
                return errorHandler.profileNotFound(res);
            }
            profile.education.unshift(newEdu);
            await profile.save()

            res.json(profile);
        } catch(error) {
            console.error(error.message);
            errorHandler.serverError(res);
        }
})

// @route   PUT api/profile/education/:edu_id
// @desc    Remove education from profile
// @access  Private
router.put('/education/:edu_id', auth, async(req, res) => {
        try {
            const profile = await Profile.findOne({
                user: req.user.id
            })
            if(!profile){
                return errorHandler.profileNotFound(res);
            }
            if(profile.education.length === 0){
                return errorHandler.customError(res, 400, 'This profile has no education');
            }

            const removeIndex = profile.education
                .map(edu => edu.id)
                .indexOf(req.params.edu_id);
            
            profile.education.splice(removeIndex, 1);

            await profile.save()
            res.json(profile);
        } catch(error) {
            console.error(error.message);
            errorHandler.serverError(res);
        }
})

// @route   PUT api/profile/github/:username
// @desc    Get user repo from github
// @access  Public
router.get('/github/:username', async(req, res) => {
    try {
        const uri = `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_SECRET}`;

        const githubResponse = await fetch(uri);

        if(githubResponse.status === 404) {
            return errorHandler.customError(res, 404, 'No github profile found');
        } else if (githubResponse.status === 200) {
            return res.json(
                await githubResponse.json()
            );
        } else {
            return errorHandler.customError(res, 400, 'Something went wrong with fetching github data');
        }
    } catch(error) {
        console.error(error.message);
        errorHandler.serverError(res);
    }
})
export default router;