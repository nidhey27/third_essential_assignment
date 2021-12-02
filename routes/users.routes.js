module.exports = app => {
    const user = require("../controllers/users.controller");

    var router = require("express").Router();

    

    router.post('/create' ,user.createUser)
    router.get('/', user.getAllUsers)
    router.get('/:id', user.getUser)
    router.put('/update/:id', user.updateUser)
    router.delete('/delete/:id', user.deleteUser)
    

    app.use('/api/user', router);
};