const basicAuth = require('express-basic-auth');

const authenticateUsers = {
    'admin': 'secret',
    'user1': 'password1',
};

const getUnauthorizedResponse = req => {
    return req.auth
        ? ('Credentials for ' + req.auth.user + ' rejected')
        : 'No credentials provided';
};

const basicAuthMiddleware = basicAuth({
    users: authenticateUsers,
    unauthorizedResponse: getUnauthorizedResponse
});

module.exports = basicAuthMiddleware;
