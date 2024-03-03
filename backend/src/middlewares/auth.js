const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req,res,next) => {
    try {
        const token = req.cookies.token || req.body.token || req.headers.authorization;
        if(!token || token === undefined){
            throw {
                message: 'Token Missing'
            }
        }
        //verify token:-
        const payload = jwt.verify(token,JWT_SECRET);
        req.user = payload;
        next();
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            data: {},
            success: false,
            message: 'Something went wrong while verifying token',
            err: error
        });
    }
}

module.exports = {
    auth
}