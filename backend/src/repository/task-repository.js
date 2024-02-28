const Task = require('../models/task');

class TaskRepository {
    async create(data) {
        try {
            const task = await Task.create(data);
            return task;
        } catch (error) {
            console.log('Something went wrong in Repository layer');
            throw error;
        }
    }

    async get(id) {
        try {
            const task = await Task.findById(id);
            return task;
        } catch (error) {
            console.log('Something went wrong in Repository layer');
            throw error;
        }
    }

    async getAll() {
        try {
            const response = await Task.find({});
            return response;
        } catch (error) {
            console.log('Something went wrong in Repository layer');
            throw error;
        }
    }

    async update(id,data) {
        try {
            const response = await Task.findByIdAndUpdate(id,data,{new: true});
            return response;
        } catch (error) {
            console.log('Something went wrong in Repository layer');
            throw error;
        }
    }

    async destroy(id) {
        try {
            await Task.findByIdAndDelete(id);
            return true;
        } catch (error) {
            console.log('Something went wrong in Repository layer');
            throw error;
        }
    }
}

module.exports = TaskRepository;