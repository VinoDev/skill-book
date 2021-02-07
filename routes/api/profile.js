import express from 'express';
import auth from '../../middleware/auth.js';
import { User, Profile } from '../../models/index.js';
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

    } catch(error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
})

export default router;