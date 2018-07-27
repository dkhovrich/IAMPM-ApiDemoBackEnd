import passport from 'passport';
import passportJWT from 'passport-jwt';

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_KEY
}, function (jwtPayload, next) {
    const { id } = jwtPayload;
    if (id && typeof id === 'string') {
        next(null, jwtPayload);
    } else {
        next(null, false);
    }
}));