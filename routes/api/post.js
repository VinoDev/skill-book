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

// @route   GET api/post
// @desc    GET all posts
// @access  Private
router.get(
    '/', 
    auth,
    async(req, res) => {
        try {
            const posts = await Post.find().sort({ date: -1 });

            if(!posts){
                return res.status(404).json({ errors: [ { msg: 'Posts not found.' } ]})
            }

            res.json(posts);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }

})

// @route   GET api/post/:id
// @desc    GET post by ID
// @access  Private
router.get(
    '/:id', 
    auth,
    async(req, res) => {
        try {
            const post = await Post.findById(req.params.id);

            if(!post){
                return res.status(404).json({ errors: [ { msg: 'Post not found.' } ]})
            }

            res.json(post);
        } catch (error) {
            if(error.kind === 'ObjectId'){
                return res.status(404).json({ errors: [ { msg: 'Post not found.' } ]})
            }

            console.error(error.message);
            res.status(500).send('Server Error');
        }

})

// @route   GET api/post/:id
// @desc    DELETE post by ID
// @access  Private
router.delete(
    '/:id', 
    auth,
    async(req, res) => {
        try {
            const post = await Post.findById(req.params.id);

            if(!post){
                return res.status(404).json({ errors: [ { msg: 'Post not found.' } ]})
            }

            if(post.user.toString() !== req.user.id) {
                return res.status(401).json({ msg: 'User not authorized' });
            }

            await post.remove();

            res.json({ msg: "Post removed"});
        } catch (error) {
            if(error.kind === 'ObjectId'){
                return res.status(404).json({ errors: [ { msg: 'Post not found.' } ]})
            }

            console.error(error.message);
            res.status(500).send('Server Error');
        }

})

export default router;