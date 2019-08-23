export {};
import {ServiceResponse} from "../DataInterfaces";
import ErrorWithStatusCode from "../ErrorWithStatusCode";

const User = require('../model/User');
const jwt = require('jsonwebtoken');
const NodeRSA = require('node-rsa');
let key = new NodeRSA(process.env.rsaKey, 'pkcs1-private-pem', {
    'encryptionScheme': 'pkcs1'
});

async function loginUser(email: string, password: string): Promise<ServiceResponse> {
    let userObject = await User.findOne({emailId: email});
    if (userObject == null) {
        throw new ErrorWithStatusCode("User does not exist!", 404);
    }

    if (key.decryptPublic(userObject.password, 'utf8') === password) {
        let token: any = jwt.sign({
            emailId: email,
            password: password
        }, process.env.secret);
        let response: ServiceResponse = {
            statusCode: 200,
            data: {
                message: "Login Successful!",
                token: token
            }
        };
        return response;
    } else {
        throw new ErrorWithStatusCode("Invalid credentials!", 401);
    }
}

async function loginWithJwt(token: string): Promise<ServiceResponse> {
    let decoded: { emailId: string, password: string } = null;
    try {
        decoded = jwt.verify(token, process.env.secret);
    } catch (err) {
        let response: ServiceResponse = {
            statusCode: 500,
            data: {
                message: err.message
            }
        };
        return response;
    }

    return await loginUser(decoded.emailId, decoded.password);
}

async function registerUser(email: string, password: string, name: string): Promise<ServiceResponse> {
    let userObject = await User.findOne({emailId: email});
    let response: ServiceResponse;

    if (userObject != null) {
        response = {
            statusCode: 500,
            data: {
                message: "User already exists!"
            }
        };
        return response;
    }

    try {
        let newUser = new User({
            name: name,
            emailId: email,
            password: key.encryptPrivate(password, 'base64')
        });
        await newUser.save();
    } catch (err) {
        response = {
            statusCode: 500,
            data: {
                message: err
            }
        };
        return response;
    }

    let token: any = jwt.sign({
        emailId: email,
        password: password
    }, process.env.secret);

    response = {
        statusCode: 200,
        data: {
            message: "Login Successful!",
            token: token
        }
    };
    return response;
}

async function getUser(jwtToken: string): Promise<ServiceResponse> {
    let response: ServiceResponse;
    let decoded: { emailId: string, password: string } = null;
    try {
        decoded = jwt.verify(jwtToken, process.env.secret);
        let user = await User.findOne({emailId: decoded.emailId});
        response = {
            statusCode: 200,
            data: {
                message: "User found!",
                user: user
            }
        };
    } catch (err) {
        response = {
            statusCode: 500,
            data: {
                message: err.message
            }
        };
    }
    return response;
}

module.exports = {
    loginUser: loginUser,
    loginWithJwt: loginWithJwt,
    registerUser: registerUser,
    getUser: getUser
};
