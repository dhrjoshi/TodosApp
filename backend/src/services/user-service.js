const UserRepository = require('../repository/user-repository');
const userRepository = new UserRepository();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

class UserService {
    async signUp(data) {
        try {
            const email = data.email;
            const existingUser = await userRepository.findBy({email});
            if(existingUser){
                throw {
                    message: 'User already exists, Please login!!!'
                }
            }
            const hashedPassword = await bcrypt.hash(data.password,10);
            data.password = hashedPassword;
            const user = await userRepository.create(data);
            return user;
        } catch (error) {
            console.log('Something went wrong in Service layer');
            throw error;
        }
    }

    async login(data) {
        try {
            if(!data.email || !data.password){
                throw {
                    message: 'Fill all details carefully'
                }
            }
            
            const email = data.email;
            let user = await userRepository.findBy({email});
            if(!user){
                throw {
                    message: 'User not registered'
                }
            }
            
            //verify password and generate JWT token
            const payload = {
                email: user.email,
                id: user._id,
                role: user.role
            };
            if(await bcrypt.compare(data.password,user.password)){
                const token = jwt.sign(payload, JWT_SECRET, {expiresIn: '1h'});
                user = user.toObject();
                user.token = token;
                user.password = undefined;
                return {token,user};
            } else {
                throw {
                    message: 'Password Incorrect'
                }
            }
        } catch (error) {
            console.log('Something went wrong in Service layer');
            throw error;
        }
    }
}

module.exports = UserService;