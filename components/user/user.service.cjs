const User = require("./user.model.cjs");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require("../task/task.model.cjs");
const Token = require('../token/token.model.cjs');

const signToken = (userId) => {
    const payload = {
        user: {
            id: userId
        }
    };

    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN
            },
            (err, token) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(token);
                }
            }
        );
    });
};

exports.registerUser = async (email, name, password) => {
    let user = await User.findOne({
        email
    });
    if (user) {
        const error = new Error('User already exists');
        error.statusCode = 400;
        throw error;
    }

    user = new User({
        email,
        name,
        password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const token = await signToken(user.id);
    await new Token({
        userId: user._id,
        token
    }).save();

    return {
        user,
        token
    };
};

exports.loginUser = async (email, password) => {
    const user = await User.findOne({
        email
    });
    if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        const error = new Error('Invalid credentials');
        error.statusCode = 400;
        throw error;
    }

    const token = await signToken(user.id);
    await new Token({
        userId: user._id,
        token
    }).save();

    return token;
};

exports.updateUser = async (id, password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const updatedUser = await User.findByIdAndUpdate(
        id, {
            password: hashedPassword
        }, {
            new: true
        }
    );

    return updatedUser;
};

exports.getUserById = async (id) => {
    const user = await User.findById(id)
        .populate('tasks').lean();

    return user;
};

exports.deleteUser = async (id) => {
    await User.findById(id);

    await Task.deleteMany({
        user: id
    });

    await User.findByIdAndDelete(id);

    await Token.deleteMany({
        userId: id
    });

    return {
        message: 'User successfully deleted'
    };
};