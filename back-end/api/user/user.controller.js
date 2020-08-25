const userService = require('./user.service')
const logger = require('../../service/logger.service')

async function getUser(req, res) {
    const userId = req.params.userId;
    const user = await userService.getById(userId)
    res.send(user)
}
  
async function updateUser(req, res) {
    const user = req.body;

    try {
        await userService.update(user)
        res.send(user)
    } catch(err){
        console.log('user controller: cannot update user')
    }
}
  


module.exports = {
    getUser,
    updateUser
}