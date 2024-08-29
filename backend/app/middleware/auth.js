import UnauthenticatedException from '../exceptions/unauthenticated-exception.js';
import verify from 'jsonwebtoken';
import appKey from '../../config/app.js';
import db from '../../db.js';


export async function auth(req, res, next) {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]

    if (!token)
        return next(new UnauthenticatedException())

    verify(token, appKey, async (err, user) => {
        if (err)
            return next(new UnauthenticatedException('Invalid token!'));

        try {

            req.user = await db.mst_user.findUnique({
                where: {
                    username: user.username,
                },
            });
            next();
        } catch (e) {
            return res.status(e.status || 401).send({ message: 'User not found!' });
        }
    })
}