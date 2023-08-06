const config = require('config');
module.exports = (access) => { //['Admin']
    return (req, res, next) => {
        if (config.get('authorization')) {
            if (access.includes(req.user.accessCode)) { ///Student
                next();
            } else {
                return res.status(403).send('You are unauthorized to access the resource.');
            }
        } else {
            next();
        }
    }
}


