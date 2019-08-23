function getJwtTokenFromRequest(req: any) {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (typeof token !== "undefined") {
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }
    }
    return token;
}

module.exports = {
    getJwtTokenFromRequest: getJwtTokenFromRequest
};
