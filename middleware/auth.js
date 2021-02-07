import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const token = req.header('x-auth-token');

    if(!token) {
        return res.status(401).json({ msg: "Authorization denied" })
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decodedToken);
        req.user = decodedToken.user;
        next()
    } catch(error) {
        res.status(401).json({ msg: 'Authorization denied' })
    }
}