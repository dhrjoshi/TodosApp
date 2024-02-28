const User = require('../models/user');

class UserRepository {
    async create(data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            console.log('Something went wrong in Repository layer');
            throw error;
        }
    }

    async findBy(data) {
        try {
            const response = await User.findOne(data);
            return response;
        } catch (error) {
            console.log('Something went wrong in Repository layer');
            throw error;
        }
    }

    async get(id) {
        try {
            const response = await User.findById(id);
            return response;
        } catch (error) {
            console.log('Something went wrong in Repository layer');
            throw error;
        }
    }

    async update(id,data) {
        try {
            const response = await User.findByIdAndUpdate(id,data,{new: true});
            return response;
        } catch (error) {
            console.log('Something went wrong in Repository layer');
            throw error;
        }
    }
}

module.exports = UserRepository;