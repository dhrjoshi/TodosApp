const express = require('express');
const router = express.Router();

const AuthMiddleware = require('../middlewares/auth');

const UserController = require('../controllers/user-controller');
router.post('/signUp', UserController.signUp);
router.post('/signIn', UserController.signIn);

const TaskController = require('../controllers/task-controller');
router.post('/createTask', AuthMiddleware.auth, TaskController.create);
router.get('/getTask/:id', TaskController.get);
router.get('/getAllTasks', TaskController.getAll);
router.put('/updateTask', TaskController.update);
router.delete('/deleteTask/:id', AuthMiddleware.auth, TaskController.deleteTask);

module.exports = router;