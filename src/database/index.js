const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://brenoeduardocostamoreira:LnKYwYU8jzzPI8a5@cluster0.ngfnghv.mongodb.net/?retryWrites=true&w=majority');

mongoose.Promise = global.Promise;

module.exports = mongoose;