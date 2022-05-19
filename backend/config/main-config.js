export const config = {
    passport: {
        secret: 'usersecret',
        expiresIn: 604800 // 1 week
    },
    env: {
        port: 4000,
        mongoDBUri: 'mongodb://localhost:27017/authentication'
    },
};