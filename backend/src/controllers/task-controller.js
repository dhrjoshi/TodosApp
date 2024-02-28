const TaskService = require('../services/task-service');
const taskService = new TaskService();

const create = async (req,res) => {
    try {
        const response = await taskService.createTask(req.body,req.user.id);
        return res.status(200).json({
            data: response,
            success: true,
            message: 'Successfully created a task',
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Not able to create task',
            err: error
        });
    }
}

const get = async (req,res) => {
    try {
        const response = await taskService.getTaskById(req.params.id);
        return res.status(200).json({
            data: response,
            success: true,
            message: 'Successfully fetched a task',
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Not able to fetch task',
            err: error
        });
    }
}

const getAll = async (req,res) => {
    try {
        const response = await taskService.getAllTasks(req.query);
        return res.status(200).json({
            data: response,
            success: true,
            message: 'Successfully fetched tasks',
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Not able to fetch tasks',
            err: error
        });
    }
}

const update = async (req,res) => {
    try {
        const response = await taskService.updateTask(req.params.id,req.body);
        return res.status(200).json({
            data: response,
            success: true,
            message: 'Successfully updated the task',
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Not able to update task',
            err: error
        });
    }
}

const deleteTask = async (req,res) => {
    try {
        const response = await taskService.deleteTask(req.params.id,req.user.id);
        return res.status(200).json({
            data: response,
            success: true,
            message: 'Successfully deleted the task',
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Not able to delete the task',
            err: error
        });
    }
}

module.exports = {
    create,
    get,
    getAll,
    update,
    deleteTask
}