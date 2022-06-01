export const config = {
    passport: {
        secret: 'usersecret',
        expiresIn: 604800 // 1 week
    },
    env: {
        port: 4000,
        mongoDBUri: 'mongodb://localhost:27017/authentication',
        // mongoDBUri: 'mongodb+srv://MurthyMajji:Hnaveen143@cluster0.xn9ll.mongodb.net/?retryWrites=true&w=majority'
    },
};