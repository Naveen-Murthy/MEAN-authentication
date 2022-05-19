import {
    Strategy,
    ExtractJwt
} from 'passport-jwt';
import {
    getUserById
} from '../models/user';
import {
    config
} from './main-config';


export const applyPassportStrategy = passport => {
    const options = {};
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    options.secretOrKey = config.passport.secret;

    passport.use(
        new Strategy(options, (payload, done) => {
            getUserById(payload.user._id, (err, user) => {
                if (err) {
                    return done(err, false);
                }

                if (user) {
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            });
        })
    );
};