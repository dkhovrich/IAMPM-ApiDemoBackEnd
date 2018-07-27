import passport from 'passport';
import passportJWT from 'passport-jwt';

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_KEY
}, function (jwtPayload, next) {
    if (jwtPayload && jwtPayload.id && typeof jwtPayload.id === 'string') {
        next(null, jwtPayload);
    } else {
        next(null, false);
    }
}));