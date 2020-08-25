const authService = require('./auth.service')
const logger = require('../../service/logger.service')


async function signup(req, res) {

    try {
        const user = req.body;
        const { email, password, username } = user
        logger.debug(email + ", " + username);
        const account = await authService.signup(user);
        logger.debug(`auth.route - new account created: ` + JSON.stringify(account))
        const savedUser = await authService.login(email, password);
        req.session.user = savedUser
        res.json(savedUser)
    } catch (err) {
        logger.error('[SIGNUP] ' + err)
        res.status(401).send({ error: 'could not signup, please try later' })
        throw err;
    }
}

async function login(req, res) {
    
    const user = req.body;
    const { email, password } = user
    try {
        const user = await authService.login(email, password)
        req.session.user = user;
        res.json(user);
    } catch (err) {
        res.status(401).send({ error: err })
    }
}


async function logout(req, res) {
    try {
        req.session.destroy()
        res.send({ message: 'logged out successfully' })
    } catch (err) {
        res.status(500).send({ error: err })
    }
}

module.exports = {
    login,
    signup,
    logout
}