export {};
import ErrorWithStatusCode from "../ErrorWithStatusCode";
import {ServiceResponse} from "../DataInterfaces";

let express = require('express');
let router = express.Router();
const UserService = require("../service/UserService");

router.post('/login-with-jwt', async function (req, res) {
    if (req.body == null || req.body.token == null) {
        return res.status(400).json({
            message: "Bad request. Token not found!"
        });
    }

    let token = req.body.token;
    try {
        let serviceResponse: ServiceResponse = await UserService.loginWithJwt(token);
        return res.status(serviceResponse.statusCode).json({
            ...serviceResponse.data
        });
    } catch (error) {
        const errorWithCode = error as ErrorWithStatusCode;
        return res.status(errorWithCode.code).json({
            message: errorWithCode.message
        });
    }
});

router.post('/login', async function (req, res) {
    if (req.body == null || req.body.emailId == null || req.body.password == null) {
        return res.status(400).json({
            message: "Bad request. Email id or Password missing!"
        });
    }
    let email: string = req.body.emailId;
    let password: string = req.body.password;

    try {
        let serviceResponse: ServiceResponse = await UserService.loginUser(email, password);
        return res.status(serviceResponse.statusCode).json({
            ...serviceResponse.data
        });
    } catch (error) {
        const errorWithCode = error as ErrorWithStatusCode;
        return res.status(errorWithCode.code).json({
            message: errorWithCode.message
        });
    }
});

router.post('/register', async function (req, res) {
    if (req.body == null || req.body.emailId == null || req.body.password == null) {
        return res.status(400).json({
            message: "Bad request. Email id or Password missing!"
        });
    }
    let email: string = req.body.emailId;
    let password: string = req.body.password;
    let name: string = req.body.name;

    try {
        let serviceResponse: ServiceResponse = await UserService.registerUser(email, password, name);
        return res.status(serviceResponse.statusCode).json({
            ...serviceResponse.data
        });
    } catch (error) {
        const errorWithCode = error as ErrorWithStatusCode;
        return res.status(errorWithCode.code).json({
            message: errorWithCode.message
        });
    }
});

module.exports = router;
