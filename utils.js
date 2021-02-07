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

export { jwtSign, createProfileObject };