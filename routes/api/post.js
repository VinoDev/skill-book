import express from 'express';
import validator from 'express-validator';
import auth from '../../middleware/auth.js';
import { User, Post } from '../../models/index.js';
import { errorHandler } from '../../utils.js';
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
            return errorHandler.validationErrors(res, errors);
        }

        try {
            const user = await User.findById(req.user.id).select('-password');
            if(!user){
                return errorHandler.userNotFound(res);
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
            errorHandler.serverError(res);
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

            if(posts.length === 0){
                return errorHandler.customError(res, 404, 'Posts not found');
            }

            res.json(posts);
        } catch (error) {
            console.error(error.message);
            errorHandler.serverError(res);
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
                return errorHandler.postNotFound(res);
            }

            res.json(post);
        } catch (error) {
            if(error.kind === 'ObjectId'){
                return errorHandler.postNotFound(res);
            }

            console.error(error.message);
            errorHandler.serverError(res);
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
                return errorHandler.postNotFound(res);
            }

            if(post.user.toString() !== req.user.id) {
                return errorHandler.notAuthorized(res);
            }

            await post.remove();

            res.json({ msg: "Post removed"});
        } catch (error) {
            if(error.kind === 'ObjectId'){
                return errorHandler.postNotFound(res);
            }

            console.error(error.message);
            errorHandler.serverError(res);
        }

})

// @route   PUT api/post/like/:id
// @desc    Like a post
// @access  Private
router.put(
    '/like/:id', 
    auth,
    async(req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            
            if(!post){
                return errorHandler.postNotFound(res);
            }

            if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                return errorHandler.customError(res, 400, 'Post already liked');
            }

            post.likes.unshift({ user: req.user.id });

            await post.save();

            res.json(post.likes);
        } catch (error) {
            if(error.kind === 'ObjectId'){
                return errorHandler.postNotFound(res);
            }

            console.error(error.message);
            errorHandler.serverError(res);
        }

})

// @route   PUT api/post/unlike/:id
// @desc    Unlike a post
// @access  Private
router.put(
    '/unlike/:id', 
    auth,
    async(req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            
            if(!post){
                return errorHandler.postNotFound(res);
            }

            if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                return errorHandler.customError(res, 400, 'Post has not yet been liked');
            }

            const removeIndex = post.likes
                .map(like => like.user.toString())
                .indexOf(req.user.id)

            post.likes.splice(removeIndex, 1);

            await post.save();

            res.json(post.likes);
        } catch (error) {
            if(error.kind === 'ObjectId'){
                return errorHandler.postNotFound(res);
            }

            console.error(error.message);
            errorHandler.serverError(res);
        }

})

// @route   PUT api/post/:id/comment
// @desc    Comment on a post
// @access  Private
router.put(
    '/:id/comment', 
    [
        auth,
        [
            check('text', 'Text is required').notEmpty()
        ]
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return errorHandler.validationErrors(res, errors);
        }

        try {
            const user = await User.findById(req.user.id).select('-password');
            if(!user){
                return errorHandler.userNotFound(res);
            }

            const post = await Post.findById(req.params.id);
            if(!post){
                return errorHandler.postNotFound(res);
            }

            const newComment = {
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            }

            post.comments.unshift(newComment);

            await post.save()

            res.json(post.comments);
        } catch (error) {
            if(error.kind === 'ObjectId'){
                return errorHandler.postNotFound(res);
            }

            console.error(error.message);
            errorHandler.serverError(res);
        }

})

// @route   PUT api/post/:id/comment/:comment_id
// @desc    Delete comment from a post
// @access  Private
router.put(
    '/:id/comment/:comment_id', 
    auth,
    async(req, res) => {
        try {
            const user = await User.findById(req.user.id).select('-password');
            if(!user){
                return errorHandler.userNotFound(res);
            }

            const post = await Post.findById(req.params.id);
            if(!post){
                return errorHandler.postNotFound(res);
            }

            const comment = post.comments.find(comment => comment.id === req.params.comment_id);
            if(!comment){
                return errorHandler.customError(res, 404, "Comment does not exist");
            }

            if(comment.user.toString() !== req.user.id) {
                return errorHandler.notAuthorized(res);
            }

            const removeIndex = post.comments
                .map(comment => comment.user.toString())
                .indexOf(req.user.id)

            post.comments.splice(removeIndex, 1);

            await post.save();

            res.json(post.comments);
        } catch (error) {
            if(error.kind === 'ObjectId'){
                return errorHandler.postNotFound(res);
            }

            console.error(error.message);
            errorHandler.serverError(res);
        }

})

export default router;