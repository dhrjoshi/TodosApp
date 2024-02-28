const TaskRepository = require('../repository/task-repository');
const UserRepository = require('../repository/user-repository');

const taskRepository = new TaskRepository();
const userRepository = new UserRepository();

class TaskService {
    async createTask(data,userId) {
        try {
            const task = await taskRepository.create(data);
            const userData = userId;
            let updatedUser;
            if(userData){
                updatedUser = await userRepository.update(userData,{$push: {tasks: task._id}});
            }
            return task;
        } catch (error) {
            console.log('Something went wrong in Service layer');
            throw error;
        }
    }

    async getTaskById(id) {
        try {
            const response = await taskRepository.get(id);
            return response;
        } catch (error) {
            console.log('Something went wrong in Service layer');
            throw error;
        }
    }

    async getAllTasks() {
        try {
            const response = await taskRepository.getAll();
            return response;
        } catch (error) {
            console.log('Something went wrong in Service layer');
            throw error;
        }
    }

    async updateTask(id,data) {
        try {
            const response = await taskRepository.update(id,data);
            return response;
        } catch (error) {
            console.log('Something went wrong in Service layer');
            throw error;
        }
    }

    async deleteTask(id,userId) {
        try {
            const response = await taskRepository.destroy(id);
            const userData = await userRepository.get(userId);
            let updatedUser;
            if(userData){
                updatedUser = await userRepository.update(userId,{$pull: {tasks: id}});
            }
            return response;
        } catch (error) {
            console.log('Something went wrong in Service layer');
            throw error;
        }
    }
}

module.exports = TaskService;