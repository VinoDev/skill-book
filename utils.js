import jwt from 'jsonwebtoken';

const jwtSign = (payload) => {
    return jwt.sign(
        payload, 
        process.env.JWT_SECRET,
        { expiresIn: parseInt(process.env.TOKEN_EXPIRATION) }
    )
}

const createProfileObject = (req) => {

    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body;

    const profileObject = {};
    profileObject.user = req.user.id;
    if(company) profileObject.company = company;
    if(website) profileObject.website = website;
    if(location) profileObject.location = location;
    if(bio) profileObject.bio = bio;
    if(status) profileObject.status = status;
    if(githubusername) profileObject.githubusername = githubusername;
    if(skills) {
        profileObject.skills = skills.split(',').map(skill=>skill.trim());
    }
    profileObject.social = {};
    if(youtube) profileObject.social.youtube = youtube;
    if(twitter) profileObject.social.twitter = twitter;
    if(facebook) profileObject.social.facebook = facebook;
    if(linkedin) profileObject.social.linkedin = linkedin;
    if(instagram) profileObject.social.instagram = instagram;

    return profileObject;
}

const errorHandler = {
    postNotFound: (res) => {
        return res.status(400).json(
            { errors: [ 
                { msg: 'Post not found.' } 
            ]
        })
    },
    profileNotFound: (res) => {
        return res.status(400).json(
            { errors: [ 
                { msg: 'Profile not found.' } 
            ]
        })
    },
    userNotFound: (res) => {
        return res.status(400).json(
            { errors: [ 
                { msg: 'User not found.' } 
            ]
        })
    },
    notAuthorized: (res) => {
        return res.status(401).json(
            { errors: [
                { msg: 'User not authorized' }
            ] 
        })
    },
    serverError: (res) => {
        return res.status(500).send(
            { errors: [
                { msg: 'Server Error' }
            ] 
        })
    },
    validationErrors: (res, errors) => {
        return res.status(400).json(
            { errors: errors.array() }
        );
    },
    customError: (res, statusCode, msg) => {
        return res.status(statusCode).send(
            { errors: [
                { msg: msg }
            ] 
        })
    }
}

export { jwtSign, createProfileObject, errorHandler };