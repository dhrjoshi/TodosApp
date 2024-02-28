const mongoose = require('mongoose');

const connect = async () => {
    await mongoose.connect('mongodb://localhost/todosApp');
}

module.exports = connect;