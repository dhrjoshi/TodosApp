const UserService = require('../services/user-service');
const userService = new UserService();

const signUp = async (req,res) => {
    try {
        const response = await userService.signUp(req.body);
        return res.status(200).json({
            data: response,
            success: true,
            message: 'Successfully signed-up',
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            data: {},
            success: false,
            message: 'Not able to sign-up',
            err: error
        });
    }
}

const signIn = async (req,res) => {
    try {
        const response = await userService.login(req.body);
        const options = {
            expires: new Date( Date.now() + 3*24*60*60*1000),
            httpOnly:true
        }
        res.cookie("token", response.token, options).status(200).json({
            // success:true,
            // token,
            // user,
            // message:'User Logged in successfully',
            data: response,
            success: true,
            message: 'Successfully login',
            err: {}
        });
        // return res.status(200).json({
        //     data: response,
        //     success: true,
        //     message: 'Successfully login',
        //     err: {}
        // });
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            data: {},
            success: false,
            message: 'Not able to sign-in',
            err: error
        });
    }
}

module.exports = {
    signUp,
    signIn
}