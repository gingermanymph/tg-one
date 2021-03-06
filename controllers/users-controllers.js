const HttpError = require('../models/http-error');
const User = require('../models/user');
const path = require('path');

const getUserById = async (req, res, next) => {
    const userId = req.params.uid;
    let user;

    try {
        user = await User.findOne({ _id: userId }, '-password');
    } catch (err) {
        const error = new HttpError('Fetching users failed, please try again later.', 500);
        return next(error);
    }

    res.json({ user: user.toObject({ getters: true }) });
};

const getUserByUserName = async (req, res, next) => {
    const userName = req.query.u;
    let user;

    try {
        user = await User.findOne({ username: userName }, '-password');
    } catch (err) {
        const error = new HttpError('Fetching users failed, please try again later.', 500);
        return next(error);
    }

    res.json({ user: user.toObject({ getters: true }) });
};

const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        const error = new HttpError('Sing up failed, please try again later.', 500);
        return next(error);
    }

    if (existingUser) {
        const error = new HttpError('User exits already, please login insead.', 422);
        return next(error);
    }

    const createdUser = new User({
        username,
        email,
        password,
        image: req.file ? req.file.path : path.join('uploads', 'images', 'default.png'),
        chats: []
    });

    try {
        await createdUser.save();
    } catch (err) {
        const error = new HttpError('Signig up failed, please try again later.', 500);
        return next(error);
    }

    res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser;

    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        const error = new HttpError('Logging in failed, please try again later.', 500);
        return next(error);
    }

    if (!existingUser || existingUser.password !== password) {
        const error = new HttpError('Cloud not identify user, credentials seem to be wrong.', 401);
        return next(error);
    }

    res.json({ message: 'Logged in.' })
};

const updateProfile = async (req, res, next) => {
    const { username, password, id } = req.body;

    let user;
    try {
        user = await User.findById(id);
    } catch (err) {
        const error = new HttpError('Fetching users failed, please try again later.', 500);
        return next(error);
    }

    user.username = username;
    user.password = password;
    user.image = req.file.path;

    try {
        await user.save();
    } catch (err) {
        console.log(err)
        const error = new HttpError('Something went wrong, could not update user.', 500);
        return next(error);
    }

    res.status(200).json({ user: user.toObject({ getters: true }) });
};

module.exports = {
    getUserById,
    getUserByUserName,
    signup,
    login,
    updateProfile
}