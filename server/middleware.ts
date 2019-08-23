let jwt = require('jsonwebtoken');
const HelperService = require("./service/HelperService");

async function checkToken(req, res, next) {
    let token = HelperService.getJwtTokenFromRequest(req);
    if (typeof token !== "undefined") {
        try {
            await jwt.verify(token, process.env.secret);
            req.token = token;
            next();
        } catch (e) {
            return res.status(403).json({
                success: false,
                message: "You are not logged in!"
            });
        }
    } else {
        return res.status(403).json({
            success: false,
            message: "You are not logged in!"
        });
    }
}

module.exports = {
    checkToken: checkToken
};
