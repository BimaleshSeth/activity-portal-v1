const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    if (config.get('authentication')) {
        const token = req.header('x-auth-token');
        if (!token) return res.status(401).send('Access Denied. No token provided.');

        try {
            const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
            req.user = decoded;
            // console.log(decoded);
            next();
        }
        catch (ex) {
            res.status(400).send('Invalid Token.');
        }
    } else {
        next();
    }
} 