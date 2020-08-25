
const dbService = require('../../service/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {

    getById,
    add,
    getByEmail,
    update,
}




async function getById(userId) {
    const collection = await dbService.getCollection('user')
    try {
        const user = await collection.findOne({ "_id": ObjectId(userId) })
        delete user.password
        return user
    } catch (err) {
        console.log(`ERROR: while finding user ${userId}`)
        throw err;
    }
}


async function add(user) {
    const collection = await dbService.getCollection('user');
    user.attendedEvents = [];
    user.createdEvents = [];
    user.isAdmin = false
    try {
        await collection.insertOne(user);
        return user;
    } catch (err) {
        console.log(`ERROR: cannot insert user`)
        throw err;
    }
}


async function getByEmail(email) {
    const collection = await dbService.getCollection('user')
    try {
        const user = await collection.findOne({email})
        return user
    } catch (err) {
        console.log(`ERROR: while finding user ${email}`)
        throw err;
    }
}


async function update(user) {
    const collection = await dbService.getCollection('user')
    user._id = ObjectId(user._id);
    try {
        await collection.replaceOne({ "_id": user._id }, { $set: user })
        return user
    } catch (err) {
        console.log(`ERROR: while update user ${user}`)
        throw err;
    }
}





